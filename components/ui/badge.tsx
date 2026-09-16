import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Kept deliberately monochrome to match the portfolio's black/white
// design language (no filled colors, no rounded pills).
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-sm border font-medium tracking-tight transition-colors overflow-hidden",
  {
    variants: {
      variant: {
        outline: "border-grid-line bg-transparent text-foreground",
        solid: "border-transparent bg-black text-white",
      },
      size: {
        default: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-md",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  },
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
