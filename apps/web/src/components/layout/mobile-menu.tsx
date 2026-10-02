"use client";

import type { SiteContent, SectionId } from "@portfolio/content";
import { Dialog } from "radix-ui";
import { useRef, useState } from "react";
import { useMediaQuery, WIDE_QUERY } from "@/hooks/use-media-query";

type MobileMenuProps = {
  nav: SiteContent["nav"];
  label: string;
};

/** Full-screen numbered menu below 1100px. Radix handles focus trap and Escape. */
export function MobileMenu({ nav, label }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const isWide = useMediaQuery(WIDE_QUERY);
  const target = useRef<SectionId | null>(null);

  // Scroll once the dialog has released the scroll lock and restored focus.
  function handleCloseAutoFocus(event: Event) {
    const id = target.current;
    if (!id) return;
    event.preventDefault();
    target.current = null;
    document.getElementById(id)?.scrollIntoView();
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <Dialog.Root open={open && !isWide} onOpenChange={setOpen}>
      <Dialog.Trigger className="h-[34px] cursor-pointer rounded-full border border-line-strong bg-transparent px-3.5 text-[13px] wide:hidden">
        {nav.menuOpen}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          onCloseAutoFocus={handleCloseAutoFocus}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg p-5 text-ink"
        >
          <div className="flex h-11 items-center justify-between">
            <Dialog.Title className="font-mono text-[12px] font-normal text-muted">
              {nav.menuTitle}
            </Dialog.Title>
            <Dialog.Close className="h-11 cursor-pointer rounded-full border border-line-strong bg-transparent px-[18px]">
              {nav.menuClose}
            </Dialog.Close>
          </div>

          <nav aria-label={label}>
            <ol className="mt-10 flex flex-col font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.03em]">
              {nav.items.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      target.current = item.id;
                      setOpen(false);
                    }}
                    className="flex items-baseline gap-4 border-b border-line py-3.5"
                  >
                    <span className="font-mono text-[12px] font-normal text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-auto flex flex-col gap-1.5 pt-10 font-mono text-[12px] text-muted">
            {nav.menuFooter.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
