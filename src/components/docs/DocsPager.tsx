import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";
import type { DocMeta } from "@/lib/docs/types";

const CARD =
  "flex flex-col gap-space-xs rounded-xl border border-surface-container-high bg-surface-container-lowest p-space-md shadow-sm transition-colors hover:border-primary/40 hover:bg-surface-container-low";

/** Previous/next navigation across the reading order of the docs. */
export function DocsPager({ prev, next }: { prev: DocMeta | null; next: DocMeta | null }) {
  return (
    <div className="mt-space-lg grid grid-cols-1 gap-space-sm sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} className={CARD}>
          <span className={cx(t.labelSm, "flex items-center gap-1 text-outline")}>
            <Icon name="arrow_forward" className="text-sm" />
            السابق
          </span>
          <span className={cx(t.h3, "font-semibold text-on-surface")}>{prev.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Link href={next.href} className={cx(CARD, "sm:items-end")}>
          <span className={cx(t.labelSm, "flex items-center gap-1 text-outline")}>
            التالي
            <Icon name="arrow_back" className="text-sm" />
          </span>
          <span className={cx(t.h3, "font-semibold text-on-surface")}>{next.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </div>
  );
}
