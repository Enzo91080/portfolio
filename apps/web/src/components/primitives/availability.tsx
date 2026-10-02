import { cn } from "@/lib/utils";

/** The blue availability dot — one of the four allowed uses of the accent. */
export function AvailabilityDot({ ring = false, className }: { ring?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block size-[7px] shrink-0 rounded-full bg-accent",
        ring && "shadow-[0_0_0_4px_var(--accent-soft)]",
        className,
      )}
    />
  );
}
