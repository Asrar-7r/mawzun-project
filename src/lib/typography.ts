/**
 * Typography roles from DESIGN.md, expressed as the Tailwind class pair that
 * applies both the family and the size/leading/tracking scale.
 *
 * Kept as a map rather than scattered across components so the type ramp stays
 * consistent and the original `font-* text-*` pairing lives in one place.
 */
export const t = {
  h1: "font-headline-xl text-headline-xl",
  h2: "font-headline-lg text-headline-lg",
  h3: "font-headline-sm text-headline-sm",
  bodyLg: "font-body-lg text-body-lg",
  body: "font-body-md text-body-md",
  bodySm: "font-body-sm text-body-sm",
  label: "font-label-md text-label-md",
  labelSm: "font-label-sm text-label-sm",
  code: "font-code-sm text-code-sm",
} as const;

export type TypeRole = keyof typeof t;