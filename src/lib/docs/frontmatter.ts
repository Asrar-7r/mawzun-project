/**
 * Minimal front-matter parser for the documentation source files.
 *
 * The docs only ever use a handful of scalar keys (`title`, `description`,
 * `order`), so a full YAML dependency would be overkill. Only the flat
 * `key: value` form between the leading `---` fences is supported, which is
 * exactly what the files under `docs/` use.
 */
export type Frontmatter = {
  title?: string;
  description?: string;
  order?: number;
};

const FENCE = "---";

/** Split a raw markdown file into its front-matter map and its body. */
export function parseFrontmatter(raw: string): {
  data: Frontmatter;
  content: string;
} {
  const normalized = raw.replace(/\r\n/g, "\n");

  if (!normalized.startsWith(FENCE)) {
    return { data: {}, content: normalized };
  }

  // The closing fence is the next line that is exactly `---`.
  const closingIndex = normalized.indexOf(`\n${FENCE}`, FENCE.length);
  if (closingIndex === -1) {
    return { data: {}, content: normalized };
  }

  const block = normalized.slice(FENCE.length, closingIndex).trim();
  const bodyStart = normalized.indexOf("\n", closingIndex + 1);

  const data: Frontmatter = {};
  for (const line of block.split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key === "order") {
      const parsed = Number(value);
      data.order = Number.isNaN(parsed) ? undefined : parsed;
    } else if (key === "title" || key === "description") {
      data[key] = value;
    }
  }

  const content =
    bodyStart === -1 ? "" : normalized.slice(bodyStart + 1).replace(/^\n+/, "");

  return { data, content };
}
