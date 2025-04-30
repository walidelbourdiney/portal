import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-background hover:bg-primary-light focus:bg-primary-dark disabled:bg-border disabled:text-foreground",

        destructive:
          "bg-destructive text-background hover:bg-destructive-light focus:bg-destructive-dark disabled:bg-border disabled:text-foreground",

        outline:
          "border border-border text-foreground hover:bg-secondary-light",

        secondary:
          "bg-secondary text-background hover:bg-secondary-dark focus:bg-secondary-dark disabled:bg-border disabled:text-foreground",

        ghost: "bg-transparent text-foreground hover:bg-secondary-light",

        link: "underline underline-offset-4 text-primary hover:text-primary-dark",
      },
      size: {
        default: "h-10 py-2 px-4",
        xs: "h-8 px-2 rounded-md",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
