import { cx } from "@/lib/cx";

type ProgressBarProps = {
  /** Percentage between 0 and 100. */
  value: number;
  /** Bar colour, e.g. `bg-primary`. */
  barClassName?: string;
  className?: string;
};

export function ProgressBar({
  value,
  barClassName = "bg-primary",
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cx(
        "h-1.5 w-full overflow-hidden rounded-full bg-surface-container",
        className,
      )}
    >
      <div
        className={cx("h-full rounded-full", barClassName)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}