/**
 * Drop a leading level-1 heading from a doc body.
 *
 * Every file under `docs/` opens with `# Title`, but the doc route renders the
 * front-matter title in its own page header — so the body's own `h1` is
 * stripped to avoid rendering the title twice.
 */
export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+[^\n]*\n+/, "");
}
