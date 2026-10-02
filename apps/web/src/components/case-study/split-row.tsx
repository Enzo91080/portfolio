import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SplitRowProps = {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

/** Section pattern: numbered label on 3 columns, content on 9. Stacks when narrow. */
export function SplitRow({ label, children, className, contentClassName }: SplitRowProps) {
  return (
    <div className={cn("flex flex-wrap gap-x-[clamp(32px,5vw,80px)] gap-y-6", className)}>
      <div className="flex-[1_1_200px] font-mono text-[12px] text-muted">{label}</div>
      <div className={cn("min-w-0 flex-[3_1_480px]", contentClassName)}>{children}</div>
    </div>
  );
}
