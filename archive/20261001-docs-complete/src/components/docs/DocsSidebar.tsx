"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";
import type { DocSectionWithDocs } from "@/lib/docs/types";

/**
 * Documentation navigation rail.
 *
 * A Client Component because it needs the current pathname for the active
 * highlight and local state for the instant title filter. The section tree is
 * passed down from the server layout, so no filesystem access happens here.
 */
export function DocsSidebar({ sections }: { sections: readonly DocSectionWithDocs[] }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return sections;

    return sections
      .map((section) => ({
        ...section,
        docs: section.docs.filter(
          (doc) =>
            doc.title.toLowerCase().includes(needle) ||
            doc.description.toLowerCase().includes(needle) ||
            doc.slug.toLowerCase().includes(needle),
        ),
      }))
      .filter((section) => section.docs.length > 0);
  }, [sections, query]);

  return (
    <nav
      aria-label="تنقّل التوثيق"
      className="flex flex-col gap-space-sm lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pe-1"
    >
      <label className="flex items-center gap-space-xs rounded-lg border border-surface-container-high bg-surface-container-lowest px-space-sm py-2 shadow-sm focus-within:border-primary">
        <Icon name="search" className="text-base text-outline" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ابحث في التوثيق..."
          aria-label="ابحث في التوثيق"
          className={cx(
            t.bodySm,
            "w-full bg-transparent text-on-surface placeholder:text-outline focus:outline-none",
          )}
        />
      </label>

      <div className="flex flex-col gap-space-md">
        {filtered.map((section) => (
          <div key={section.dir} className="flex flex-col gap-1">
            <span className="flex items-center gap-space-xs px-space-xs">
              <Icon name={section.icon} className="text-base text-primary" />
              <span className={cx(t.labelSm, "font-bold tracking-wide text-on-surface")}>
                {section.title}
              </span>
            </span>
            <ul className="flex flex-col gap-0.5">
              {section.docs.map((doc) => {
                const active = pathname === doc.href;
                return (
                  <li key={doc.slug}>
                    <Link
                      href={doc.href}
                      aria-current={active ? "page" : undefined}
                      className={cx(
                        "flex items-center gap-space-xs rounded-lg px-space-sm py-1.5 transition-colors",
                        t.labelSm,
                        active
                          ? "bg-primary-container font-semibold text-on-primary-container shadow-sm"
                          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
                      )}
                    >
                      <span
                        className={cx(
                          "h-1.5 w-1.5 shrink-0 rounded-full",
                          active ? "bg-on-primary-container" : "bg-outline-variant",
                        )}
                      />
                      {doc.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {filtered.length === 0 ? (
          <p className={cx(t.bodySm, "px-space-xs text-outline")}>
            لا توجد صفحات مطابقة لـ «{query}».
          </p>
        ) : null}
      </div>
    </nav>
  );
}
