import type { ReactNode } from "react";
import Link from "next/link";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";

/**
 * Renders a markdown document with the Mawzun design system.
 *
 * `react-markdown` ships a synchronous component with no hooks, so it runs as a
 * Server Component: the markdown is parsed and rendered to RSC at build time and
 * ships no parser to the browser. Element overrides map the plain HTML tags onto
 * the project's tokens (see `globals.css`), which is why they intentionally use
 * `t.*` roles instead of raw font sizes.
 *
 * `rehype-slug` adds `id`s to headings so the in-page anchors used across
 * `docs/` resolve, and `remark-gfm` enables tables, task lists and strikethrough.
 */

const HEADING_CLASS = {
  1: cx(t.h1, "mb-space-sm font-bold text-on-surface"),
  2: cx(t.h2, "mt-space-lg mb-space-sm font-bold text-on-surface"),
  3: cx(t.h3, "mt-space-md mb-space-xs font-semibold text-on-surface"),
  4: cx(t.h3, "mt-space-md mb-space-xs font-semibold text-on-surface-variant"),
} as const;

function Heading({
  level,
  id,
  children,
}: {
  level: 1 | 2 | 3 | 4;
  id?: string;
  children?: ReactNode;
}) {
  const Tag = `h${level}` as "h1";
  return (
    <Tag id={id} className={cx("group scroll-mt-20", HEADING_CLASS[level])}>
      {children}
      {id ? (
        <a
          href={`#${id}`}
          aria-label="رابط مباشر للمقطع"
          className="ms-2 align-middle text-outline opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        >
          #
        </a>
      ) : null}
    </Tag>
  );
}

const components: Components = {
  h1: ({ id, children }) => (
    <Heading level={1} id={id}>
      {children}
    </Heading>
  ),
  h2: ({ id, children }) => (
    <Heading level={2} id={id}>
      {children}
    </Heading>
  ),
  h3: ({ id, children }) => (
    <Heading level={3} id={id}>
      {children}
    </Heading>
  ),
  h4: ({ id, children }) => (
    <Heading level={4} id={id}>
      {children}
    </Heading>
  ),
  p: ({ children }) => (
    <p className={cx(t.bodyLg, "my-space-sm leading-relaxed text-on-surface-variant")}>
      {children}
    </p>
  ),
  a: ({ href, children }) => {
    const external = typeof href === "string" && /^https?:\/\//.test(href);
    // Internal links (docs pages, stage routes, in-page anchors) use Next.js
    // routing so navigation stays client-side instead of reloading the page.
    if (!external && typeof href === "string" && href.startsWith("/")) {
      return (
        <Link
          href={href}
          className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary-container"
        >
          {children}
        </Link>
      );
    }
    if (!external && typeof href === "string" && href.startsWith("#")) {
      return (
        <a
          href={href}
          className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary-container"
        >
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary-container"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul
      className={cx(
        t.body,
        "my-space-sm list-disc space-y-1.5 ps-space-lg text-on-surface-variant",
      )}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      className={cx(
        t.body,
        "my-space-sm list-decimal space-y-1.5 ps-space-lg text-on-surface-variant",
      )}
    >
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-space-md rounded-e-lg border-s-4 border-primary bg-surface-container-low px-space-md py-space-sm text-on-surface-variant">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-space-lg border-surface-container-high" />,
  strong: ({ children }) => <strong className="font-bold text-on-surface">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ className, children }) => {
    if (/language-/.test(className ?? "")) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="rounded bg-surface-container px-1.5 py-0.5 font-code-sm text-[0.85em] text-primary-container">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <div className="my-space-md overflow-hidden rounded-xl border border-surface-container-high bg-inverse-surface">
      <pre className="overflow-x-auto p-space-md font-code-sm text-code-sm leading-relaxed text-inverse-on-surface">
        {children}
      </pre>
    </div>
  ),
  table: ({ children }) => (
    <div className="my-space-md overflow-x-auto rounded-xl border border-surface-container-high">
      <table className="w-full border-collapse text-start">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-surface-container-low">{children}</thead>,
  th: ({ children }) => (
    <th
      className={cx(
        t.labelSm,
        "border-b border-surface-container-high px-space-md py-space-sm text-start font-bold text-on-surface",
      )}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td
      className={cx(
        t.bodySm,
        "border-b border-surface-container-high/70 px-space-md py-space-sm text-start align-top text-on-surface-variant",
      )}
    >
      {children}
    </td>
  ),
};

export function DocsMarkdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div className={cx("max-w-none", className)}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {content}
      </Markdown>
    </div>
  );
}
