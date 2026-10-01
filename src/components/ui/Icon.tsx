import { cx } from "@/lib/cx";

type IconProps = {
  /** Material Symbols ligature name, e.g. `verified_user`. */
  name: string;
  /** Render the filled variant of the glyph. */
  filled?: boolean;
  className?: string;
};

/**
 * Renders a Material Symbols ligature. The glyph itself is decorative, so it is
 * hidden from assistive tech — pass meaning through adjacent text.
 */
export function Icon({ name, filled = false, className = "text-xl" }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cx("material-symbols-outlined select-none leading-none", className)}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}