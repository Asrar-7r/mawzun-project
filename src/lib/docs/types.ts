/**
 * Shared documentation types.
 *
 * Kept free of any `node:fs` import so Client Components (e.g. the docs
 * sidebar) can import them without pulling the server-only registry into the
 * browser bundle.
 */

/** A top-level documentation section (a folder under `docs/`). */
export type DocSection = {
  /** Folder name, also the first URL segment, e.g. `getting-started`. */
  readonly dir: string;
  /** Arabic section title shown in the sidebar. */
  readonly title: string;
  /** One-line section summary. */
  readonly description: string;
  /** Material Symbols icon name. */
  readonly icon: string;
  /** Sort order across sections. */
  readonly order: number;
};

/** A single documentation page. */
export type DocMeta = {
  /** Slug relative to `docs/`, without extension, e.g. `getting-started/installation`. */
  readonly slug: string;
  /** Absolute app href, e.g. `/docs/getting-started/installation`. */
  readonly href: string;
  /** Owning section `dir`. */
  readonly section: string;
  readonly title: string;
  readonly description: string;
  readonly order: number;
};

export type DocSectionWithDocs = DocSection & { readonly docs: readonly DocMeta[] };
