import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsBreadcrumb } from "@/components/docs/DocsBreadcrumb";
import { DocsMarkdown } from "@/components/docs/DocsMarkdown";
import { DocsPager } from "@/components/docs/DocsPager";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";
import { stripLeadingH1 } from "@/lib/docs/markdown";
import {
  getDoc,
  getDocNeighbors,
  getSection,
  getStaticDocParams,
} from "@/lib/docs/registry";

const REPO_DOCS_BASE = "https://github.com/Asrar-7r/mawzun-project/blob/main/docs";

/** Prerender every doc; unknown slugs 404 instead of rendering on demand. */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticDocParams();
}

export async function generateMetadata({ params }: PageProps<"/docs/[...slug]">) {
  const { slug } = await params;
  const doc = getDoc(slug.join("/"));
  if (!doc) return {};

  return {
    title: `${doc.meta.title} | موزون`,
    description: doc.meta.description,
  };
}

export default async function DocPage({ params }: PageProps<"/docs/[...slug]">) {
  const { slug } = await params;
  const key = slug.join("/");
  const doc = getDoc(key);
  if (!doc) notFound();

  const section = getSection(doc.meta.section);
  const { prev, next } = getDocNeighbors(key);

  return (
    <article className="flex flex-col gap-space-md">
      <DocsBreadcrumb
        sectionTitle={section?.title ?? doc.meta.section}
        pageTitle={doc.meta.title}
      />

      <header className="flex flex-col gap-space-xs border-b border-surface-container-high pb-space-md">
        <h1 className={cx(t.h1, "font-bold tracking-tight text-on-surface")}>
          {doc.meta.title}
        </h1>
        {doc.meta.description ? (
          <p className={cx(t.bodyLg, "text-on-surface-variant")}>{doc.meta.description}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
          <span className={cx(t.code, "rounded bg-surface-container px-2 py-0.5 text-outline")}>
            docs/{key}.md
          </span>
          <Link
            href={`${REPO_DOCS_BASE}/${key}.md`}
            target="_blank"
            rel="noopener noreferrer"
            className={cx(
              t.labelSm,
              "inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-container",
            )}
          >
            <Icon name="edit_note" className="text-sm" />
            عدّل هذه الصفحة على GitHub
          </Link>
        </div>
      </header>

      <DocsMarkdown content={stripLeadingH1(doc.content)} />

      <DocsPager prev={prev} next={next} />
    </article>
  );
}
