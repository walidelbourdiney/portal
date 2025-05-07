// import * as React from "react";

// import { cn } from "../../lib/utils";

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, ...props }, ref) => {
//     return (
//       <input
//         type={type}
//         className={cn(
//           "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
//           className
//         )}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Input.displayName = "Input";

// export { Input };

import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        <input
          ref={ref}
          type={type}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border border-secondary",
            "bg-transparent outline-none",
            "text-base placeholder:text-secondary-light",
            error
              ? "border-destructive text-destructive"
              : "border-border focus:border-primary",
            className
          )}
          {...props}
        />
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
