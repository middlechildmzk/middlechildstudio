"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SelectContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SelectContext = React.createContext<SelectContextValue | null>(null);

export function Select({
  value,
  onValueChange,
  children
}: {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ className, children }: React.HTMLAttributes<HTMLButtonElement>) {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("SelectTrigger must be used inside Select");
  return (
    <button
      type="button"
      onClick={() => ctx.setOpen(!ctx.open)}
      className={cn("flex h-10 w-full items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white", className)}
    >
      {children}
      <span className="text-white/50">▾</span>
    </button>
  );
}

export function SelectValue() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("SelectValue must be used inside Select");
  return <span>{ctx.value}</span>;
}

export function SelectContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const ctx = React.useContext(SelectContext);
  if (!ctx || !ctx.open) return null;
  return <div className={cn("absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-white/10 bg-[#11151b] p-1 shadow-2xl", className)}>{children}</div>;
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("SelectItem must be used inside Select");
  return (
    <button
      type="button"
      onClick={() => {
        ctx.onValueChange(value);
        ctx.setOpen(false);
      }}
      className={cn(
        "flex w-full rounded-lg px-3 py-2 text-left text-sm text-white hover:bg-white/10",
        ctx.value === value && "bg-white/10"
      )}
    >
      {children}
    </button>
  );
}
