import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";

/** Breadcrumb trail for a documentation page: docs › section › page. */
export function DocsBreadcrumb({
  sectionTitle,
  pageTitle,
}: {
  sectionTitle: string;
  pageTitle: string;
}) {
  return (
    <nav
      aria-label="مسار التنقّل"
      className={cx(t.label, "flex flex-wrap items-center gap-1.5 text-on-surface-variant")}
    >
      <Link href="/docs" className="transition-colors hover:text-primary">
        التوثيق
      </Link>
      <Icon name="chevron_left" className="text-sm text-outline" />
      <span>{sectionTitle}</span>
      <Icon name="chevron_left" className="text-sm text-outline" />
      <span className="font-semibold text-primary">{pageTitle}</span>
    </nav>
  );
}
