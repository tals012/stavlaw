import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Script({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-[family-name:var(--font-angelic)] text-peach",
        className
      )}
    >
      {children}
    </span>
  );
}
