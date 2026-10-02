import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Pill buttons from the design system: radius 999, height 48 (56 for the
 * send action, 52 full-width on mobile).
 */
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,filter] duration-200 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-ink text-bg hover:bg-accent hover:text-white",
        outline: "border border-line-strong hover:border-accent",
        accent: "bg-accent text-white hover:text-white hover:brightness-110",
      },
      size: {
        default: "h-12 gap-2.5 px-[22px] text-[15px]",
        lg: "h-14 gap-3 px-7 text-base",
        block: "h-[52px] w-full justify-center text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
