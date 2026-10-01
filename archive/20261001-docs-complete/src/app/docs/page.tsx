import Link from "next/link";
import { DocsMarkdown } from "@/components/docs/DocsMarkdown";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";
import { stripLeadingH1 } from "@/lib/docs/markdown";
import { getDocsNav, getFirstDoc, getLandingMarkdown } from "@/lib/docs/registry";

export const dynamic = "force-static";

/**
 * Landing page of the documentation centre: a hero, a card per section, and the
 * `docs/README.md` body as the narrative index.
 */
export default function DocsHomePage() {
  const sections = getDocsNav();
  const firstDoc = getFirstDoc();
  const landing = getLandingMarkdown();

  return (
    <article className="flex flex-col gap-space-lg">
      <header className="relative overflow-hidden rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm">
        <span className="absolute inset-y-0 right-0 w-2 bg-primary" />
        <div className="flex flex-col gap-space-sm">
          <span
            className={cx(
              "inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary",
              t.labelSm,
            )}
          >
            <Icon name="menu_book" className="text-sm" filled />
            مركز التوثيق
          </span>
          <h1 className={cx(t.h1, "font-bold tracking-tight text-on-surface")}>
            توثيق منصة موزون
          </h1>
          <p className={cx(t.bodyLg, "max-w-3xl text-on-surface-variant")}>
            المصدر الرسمي لفهم المعمارية الدلالية، ونظام التصميم، وسير عمل التدقيق،
            وقواعد المساهمة. نفس المحتوى متاح في مستودع <code>docs/</code>.
          </p>
          {firstDoc ? (
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <Link
                href={firstDoc.href}
                className="flex items-center gap-space-xs rounded-lg bg-primary px-space-lg py-2.5 font-label font-bold text-on-primary shadow-sm transition-colors hover:bg-primary-container"
              >
                ابدأ من هنا
                <Icon name="arrow_back" className="text-base" />
              </Link>
              <a
                href="https://github.com/Asrar-7r/mawzun-project/tree/main/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-space-xs rounded-lg bg-surface-container px-space-md py-2.5 font-label font-medium text-on-surface transition-colors hover:bg-surface-container-high"
              >
                <Icon name="code" className="text-base" />
                المصدر على GitHub
              </a>
            </div>
          ) : null}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-space-sm sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => {
          const target = section.docs[0]?.href ?? "/docs";
          return (
            <Link
              key={section.dir}
              href={target}
              className="group flex flex-col gap-space-xs rounded-xl border border-surface-container-high bg-surface-container-lowest p-space-md shadow-sm transition-colors hover:border-primary/40 hover:bg-surface-container-low"
            >
              <span className="flex items-center gap-space-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-fixed/40 text-primary">
                  <Icon name={section.icon} className="text-xl" />
                </span>
                <span className={cx(t.h3, "font-bold text-on-surface")}>{section.title}</span>
              </span>
              <p className={cx(t.bodySm, "text-on-surface-variant")}>{section.description}</p>
              <span
                className={cx(
                  t.labelSm,
                  "mt-auto flex items-center gap-1 pt-space-xs font-semibold text-primary",
                )}
              >
                {section.docs.length} صفحة
                <Icon
                  name="arrow_back"
                  className="text-sm transition-transform group-hover:-translate-x-1"
                />
              </span>
            </Link>
          );
        })}
      </div>

      <section className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-space-lg shadow-sm">
        <DocsMarkdown content={stripLeadingH1(landing)} />
      </section>
    </article>
  );
}
