import type { SiteContent } from "@portfolio/content";
import type { Locale } from "@portfolio/contracts";
import { AvailabilityDot } from "@/components/primitives/availability";
import { cn } from "@/lib/utils";
import { ContactForm } from "./contact-form";

type ContactSectionProps = {
  contact: SiteContent["contact"];
  email: string;
  locale: Locale;
};

const DIVERGING_LINES = [
  { top: "top-[18%]", rotate: "rotate-[4deg]" },
  { top: "top-[26%]", rotate: "rotate-[2deg]" },
  { top: "top-[34%]", rotate: "" },
];

/** A worked ending: surface background, three converging hairlines, oversized question. */
export function ContactSection({ contact, email, locale }: ContactSectionProps) {
  const lastChannel = contact.channels.length - 1;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative mt-[clamp(40px,6vw,80px)] overflow-hidden border-t border-line bg-surface"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {DIVERGING_LINES.map((line) => (
          <div
            key={line.top}
            className={cn(
              "absolute left-0 right-1/2 h-px origin-right bg-linear-to-r from-transparent to-line-strong",
              line.top,
              line.rotate,
            )}
          />
        ))}
      </div>

      <div className="container-site relative pt-[clamp(72px,10vw,150px)]">
        <div className="font-mono text-[12px] text-muted">{contact.label}</div>
        <h2
          id="contact-title"
          className="mt-5 max-w-[15ch] text-balance font-display text-[length:clamp(44px,7vw,112px)] font-bold leading-[0.95] tracking-[-0.05em]"
        >
          {contact.title}
        </h2>

        <div className="mt-[clamp(56px,7vw,96px)] flex flex-wrap gap-x-[clamp(32px,6vw,112px)] gap-y-14">
          <div className="flex flex-[1_1_260px] flex-col">
            <a
              href={`mailto:${email}`}
              className="break-words pb-6 pt-1 font-display text-[length:clamp(20px,2vw,28px)] font-semibold tracking-[-0.02em]"
            >
              {email}
            </a>
            {contact.channels.map((channel, index) => (
              <a
                key={channel.label}
                href={channel.href}
                download={channel.kind === "download" || undefined}
                className={cn(
                  "flex justify-between border-t border-line-strong py-4 text-[16px]",
                  index === lastChannel && "border-b",
                )}
              >
                <span>{channel.label}</span>
                <span aria-hidden="true">{channel.kind === "download" ? "↓" : "↗"}</span>
              </a>
            ))}
            <div className="mt-5 flex items-center gap-2.5 font-mono text-[12px] text-muted">
              <AvailabilityDot />
              {contact.responseTime}
            </div>
          </div>

          <ContactForm copy={contact.form} locale={locale} className="flex-[2_1_420px]" />
        </div>
      </div>
    </section>
  );
}
