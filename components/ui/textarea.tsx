import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("min-h-[100px] rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white outline-none", className)} {...props} />;
}
