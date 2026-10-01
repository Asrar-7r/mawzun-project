import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Removes the resting shadow, e.g. when the card is already flush. */
  flat?: boolean;
};

/**
 * Surface Level 1 from DESIGN.md: pure white on the `#F8F9FF` canvas, separated
 * by a crisp hairline border and an ultra-subtle ambient shadow rather than a
 * deep drop shadow.
 */
export function Card({ children, className, flat = false }: CardProps) {
  return (
    <div
      className={cx(
        "rounded-xl bg-surface-container-lowest border border-surface-container-high",
        !flat &&
          "shadow-[0_1px_3px_0_rgba(15,23,42,0.03),0_1px_2px_-1px_rgba(15,23,42,0.03)]",
        className,
      )}
    >
      {children}
    </div>
  );
}