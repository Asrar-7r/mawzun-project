import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

export type BadgeTone = "neutral" | "primary" | "tertiary" | "error" | "outline";

const TONES: Record<BadgeTone, string> = {
  neutral: "bg-surface-container text-secondary",
  primary: "bg-primary/10 text-primary",
  tertiary: "bg-tertiary-container/15 text-tertiary",
  error: "bg-error-container text-on-error-container",
  outline: "bg-surface-container-high text-secondary",
};

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  /** Renders a full pill instead of a rounded rectangle. */
  pill?: boolean;
  icon?: ReactNode;
  className?: string;
};

export function Badge({
  children,
  tone = "neutral",
  pill = false,
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 px-2 py-0.5 text-label-sm font-label-sm font-semibold",
        pill ? "rounded-full" : "rounded-md",
        TONES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}