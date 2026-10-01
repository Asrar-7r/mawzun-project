"use client";

import { useEffect, useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";

type TocEntry = { id: string; text: string; level: 2 | 3 };

/**
 * In-page index ("في هذه الصفحة") for a documentation article.
 *
 * Collects the rendered `h2`/`h3` headings from the surrounding article after
 * mount, so the anchor links always match the `id`s produced by `rehype-slug`
 * without reimplementing its slug algorithm. Renders nothing on short pages.
 */
export function DocsToc() {
  const regionId = useId();
  const [entries, setEntries] = useState<readonly TocEntry[]>([]);

  useEffect(() => {
    // Deferred to a frame callback so the state update happens outside the
    // effect body (react-hooks/set-state-in-effect), after layout is ready.
    const frame = requestAnimationFrame(() => {
      const region = document.getElementById(regionId);
      const article = region?.closest("article") ?? document.querySelector("article");
      if (!article) return;

      const found = Array.from(article.querySelectorAll("h2[id], h3[id]"))
        .filter((heading) => !region?.contains(heading))
        .map((heading) => ({
          id: heading.id,
          text: heading.textContent?.replace(/#$/, "").trim() ?? "",
          level: heading.tagName === "H3" ? 3 : 2,
        }))
        .filter((entry): entry is TocEntry => entry.id.length > 0 && entry.text.length > 0);

      setEntries(found);
    });
    return () => cancelAnimationFrame(frame);
  }, [regionId]);

  if (entries.length < 2) return null;

  return (
    <nav
      id={regionId}
      aria-label="في هذه الصفحة"
      className="rounded-xl border border-surface-container-high bg-surface-container-low px-space-md py-space-sm shadow-sm"
    >
      <span className={cx(t.labelSm, "flex items-center gap-1 font-bold text-on-surface")}>
        <Icon name="list" className="text-base text-primary" />
        في هذه الصفحة
      </span>
      <ul className="mt-space-xs flex flex-col gap-1">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? "ms-space-md" : undefined}>
            <a
              href={`#${entry.id}`}
              className={cx(
                t.labelSm,
                "text-on-surface-variant underline-offset-2 transition-colors hover:text-primary hover:underline",
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
