"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { nextStage, previousStage, stageFromPath } from "@/lib/stages";
import { t } from "@/lib/typography";

type StageNavProps = {
  /** Headline status shown next to the pulse dot. */
  status: string;
  /** Supporting line beneath the status. */
  hint?: string;
  /** Overrides the forward button label; defaults to the next stage title. */
  nextLabel?: string;
  /** Optional secondary action rendered before the forward button. */
  secondary?: { label: string; icon?: string };
};

const PRIMARY_LINK =
  "flex items-center gap-space-xs rounded-lg bg-primary px-space-lg py-2.5 font-label font-bold text-on-primary shadow-sm transition-all hover:bg-primary-container hover:shadow";

/**
 * Sticky action bar closing every stage screen. The forward/back targets are
 * derived from the current route, so it can never point at the wrong stage.
 */
export function StageNav({ status, hint, nextLabel, secondary }: StageNavProps) {
  const pathname = usePathname();
  const current = stageFromPath(pathname);
  const previous = previousStage(current);
  const next = nextStage(current);

  return (
    <div className="sticky bottom-4 z-30 mt-space-md w-full">
      <div className="flex flex-col items-center justify-between gap-space-md rounded-xl bg-surface-container-lowest/95 p-space-md shadow-xl backdrop-blur-md sm:flex-row">
        <div className="flex items-center gap-space-sm">
          <span className="h-3 w-3 animate-pulse rounded-full bg-primary" />
          <div className="flex flex-col">
            <span className={cx(t.label, "font-bold text-on-surface")}>{status}</span>
            {hint ? (
              <span className={cx(t.bodySm, "text-on-surface-variant")}>{hint}</span>
            ) : null}
          </div>
        </div>

        <div className="flex w-full items-center justify-end gap-space-sm sm:w-auto">
          {secondary ? (
            <button
              type="button"
              className="flex items-center gap-space-xs rounded-lg bg-surface-container px-space-md py-2.5 font-label font-medium text-on-surface transition-colors hover:bg-surface-container-high"
            >
              {secondary.icon ? <Icon name={secondary.icon} className="text-base" /> : null}
              {secondary.label}
            </button>
          ) : null}

          {next ? (
            <Link href={`/${next.slug}`} className={PRIMARY_LINK}>
              {nextLabel ?? `${next.ordinal} ${next.title}`}
              <Icon name="arrow_left" className="text-base" />
            </Link>
          ) : null}

          {previous ? (
            <Link
              href={`/${previous.slug}`}
              className="flex items-center gap-space-xs rounded-lg bg-surface-container px-space-md py-2.5 font-label font-medium text-on-surface transition-colors hover:bg-surface-container-high"
            >
              <Icon name="arrow_forward" className="text-base" />
              {previous.ordinal} {previous.title}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}