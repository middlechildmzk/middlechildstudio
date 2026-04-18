import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("h-10 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none", className)} {...props} />;
}
