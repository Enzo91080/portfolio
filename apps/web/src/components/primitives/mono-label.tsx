import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Geist Mono technical label: numbering, metadata, stacks. Never fake code. */
export function MonoLabel({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("font-mono text-[12px] text-muted", className)} {...props} />;
}

/** Inline row of mono metadata, e.g. "01 · Projet principal · 2025". */
export function MetaList({
  items,
  accentFirst,
  className,
}: {
  items: string[];
  accentFirst?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] text-muted", className)}>
      {accentFirst ? <span className="text-accent">{accentFirst}</span> : null}
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
