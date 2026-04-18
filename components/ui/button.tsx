import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary";
};

export function Button({ className, variant = "default", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition focus:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-xl",
        variant === "default"
          ? "bg-white text-black hover:bg-white/90"
          : "bg-white/10 text-white hover:bg-white/15",
        className
      )}
      {...props}
    />
  );
}
