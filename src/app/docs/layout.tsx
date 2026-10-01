import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { getDocsNav } from "@/lib/docs/registry";

export const metadata = {
  title: "التوثيق | موزون",
};

/**
 * Shell for every `/docs` route: a navigation rail on the reading side (the
 * grid's first column, which sits on the right because the document is RTL) and
 * the page content beside it.
 */
export default function DocsLayout({ children }: { children: ReactNode }) {
  const sections = getDocsNav();

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-gutter py-space-lg lg:grid-cols-[clamp(200px,22%,260px)_minmax(0,1fr)]">
      <DocsSidebar sections={sections} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
