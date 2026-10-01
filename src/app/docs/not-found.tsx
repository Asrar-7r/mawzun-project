import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";

/** Shown when a `/docs/...` slug does not match any file under `docs/`. */
export default function DocsNotFound() {
  return (
    <div className="flex flex-col items-center gap-space-md rounded-2xl border border-surface-container-high bg-surface-container-lowest p-space-xl text-center shadow-sm">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-container text-outline">
        <Icon name="search_off" className="text-3xl" />
      </span>
      <h1 className={cx(t.h2, "font-bold text-on-surface")}>الصفحة غير موجودة</h1>
      <p className={cx(t.bodyLg, "max-w-md text-on-surface-variant")}>
        تعذّر العثور على صفحة التوثيق المطلوبة. قد يكون الرابط قديماً أو الصفحة قد
        نُقلت إلى قسم آخر.
      </p>
      <Link
        href="/docs"
        className="flex items-center gap-space-xs rounded-lg bg-primary px-space-lg py-2.5 font-label font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-container"
      >
        <Icon name="arrow_forward" className="text-base" />
        العودة إلى فهرس التوثيق
      </Link>
    </div>
  );
}
