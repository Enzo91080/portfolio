import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Max 1440 wrapper with the site's fluid side margins. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container-site", className)} {...props} />;
}
