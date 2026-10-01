import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type PageShellProps = {
  children: ReactNode;
  /** `max-w-6xl` (default) or `max-w-7xl` for the wider audit/result screens. */
  width?: "6xl" | "7xl";
  className?: string;
};

export function PageShell({ children, width = "6xl", className }: PageShellProps) {
  return (
    <div
      className={cx(
        "mx-auto flex w-full flex-col gap-space-lg py-space-lg",
        width === "7xl" ? "max-w-7xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}