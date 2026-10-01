import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { parseFrontmatter } from "@/lib/docs/frontmatter";
import type { DocMeta, DocSection, DocSectionWithDocs } from "@/lib/docs/types";

export type { DocMeta, DocSection, DocSectionWithDocs };

/**
 * Documentation registry.
 *
 * Reads the markdown files under `docs/` at build time and exposes a typed
 * navigation tree, full-text lookup and prev/next neighbours. This is the
 * single source of truth for the `/docs` routes — the markdown stays the
 * canonical content, the app only renders it.
 *
 * All file-system access happens on the server. These helpers must never be
 * imported from a Client Component.
 */

const DOCS_ROOT = path.join(process.cwd(), "docs");

/**
 * The curated section order and metadata. Folder names must match the
 * directories under `docs/`; anything not listed here is ignored.
 */
const SECTIONS: readonly DocSection[] = [
  {
    dir: "getting-started",
    title: "البداية السريعة",
    description: "التثبيت، بنية المشروع، والأوامر الأساسية.",
    icon: "rocket_launch",
    order: 1,
  },
  {
    dir: "architecture",
    title: "المعمارية",
    description: "النظرة العامة، التوجيه، نظام التصميم والمكوّنات.",
    icon: "account_tree",
    order: 2,
  },
  {
    dir: "workflow",
    title: "سير العمل",
    description: "مسار التدقيق الدلالي ومبدأ الحماية الدلالية.",
    icon: "schema",
    order: 3,
  },
  {
    dir: "reference",
    title: "المراجع",
    description: "الاصطلاحات البرمجية والمسرد ثنائي اللغة.",
    icon: "menu_book",
    order: 4,
  },
  {
    dir: "adr",
    title: "سجلات القرارات",
    description: "القرارات المعمارية الموثّقة (ADRs).",
    icon: "gavel",
    order: 5,
  },
];

function readFile(absPath: string): string {
  return fs.readFileSync(absPath, "utf8").replace(/\r\n/g, "\n");
}

/** Split the raw body of a doc, tolerating a missing front-matter block. */
function readDoc(absPath: string): { content: string; order: number; title?: string; description?: string } {
  const { data, content } = parseFrontmatter(readFile(absPath));
  return {
    content,
    order: typeof data.order === "number" ? data.order : Number.MAX_SAFE_INTEGER,
    title: data.title,
    description: data.description,
  };
}

/** Build the complete navigation tree from disk. Memoised for the request. */
export const getDocsNav = cache((): readonly DocSectionWithDocs[] => {
  return SECTIONS.map((section) => {
    const dirPath = path.join(DOCS_ROOT, section.dir);
    if (!fs.existsSync(dirPath)) {
      return { ...section, docs: [] };
    }

    const docs = fs
      .readdirSync(dirPath)
      .filter((file) => file.endsWith(".md"))
      .map((file): DocMeta => {
        const slugBase = file.replace(/\.md$/, "");
        const slug = `${section.dir}/${slugBase}`;
        const { title, description, order } = readDoc(path.join(dirPath, file));
        return {
          slug,
          href: `/docs/${slug}`,
          section: section.dir,
          title: title ?? slugBase,
          description: description ?? "",
          order,
        };
      })
      .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, "ar"));

    return { ...section, docs };
  }).sort((a, b) => a.order - b.order);
});

/** Flat, ordered list of every doc — the reading order used by prev/next. */
export const getFlatDocs = cache((): readonly DocMeta[] =>
  getDocsNav().flatMap((section) => section.docs),
);

/** Look up a doc and its raw markdown body by slug. */
export const getDoc = cache(
  (slug: string): { meta: DocMeta; content: string } | null => {
    const meta = getFlatDocs().find((doc) => doc.slug === slug);
    if (!meta) return null;

    const absPath = path.join(DOCS_ROOT, `${slug}.md`);
    if (!fs.existsSync(absPath)) return null;

    return { meta, content: readDoc(absPath).content };
  },
);

/** Prev/next doc in reading order, for the footer pager. */
export function getDocNeighbors(slug: string): {
  prev: DocMeta | null;
  next: DocMeta | null;
} {
  const flat = getFlatDocs();
  const index = flat.findIndex((doc) => doc.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

/** Params for `generateStaticParams` on the catch-all doc route. */
export function getStaticDocParams(): { slug: string[] }[] {
  return getFlatDocs().map((doc) => ({ slug: doc.slug.split("/") }));
}

/** Section that owns a given slug, used by the breadcrumb. */
export function getSection(dir: string): DocSection | null {
  return SECTIONS.find((section) => section.dir === dir) ?? null;
}

/** Markdown body of `docs/README.md`, rendered on the `/docs` landing page. */
export const getLandingMarkdown = cache((): string => {
  const absPath = path.join(DOCS_ROOT, "README.md");
  return fs.existsSync(absPath) ? readDoc(absPath).content : "";
});

/** The first doc in reading order, used as the "start here" target. */
export function getFirstDoc(): DocMeta | null {
  return getFlatDocs()[0] ?? null;
}

export { SECTIONS };
