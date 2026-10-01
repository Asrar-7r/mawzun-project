---
name: Mawzun Semantic Guard
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3e4947'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6e7977'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a63'
  primary: '#005c55'
  on-primary: '#ffffff'
  primary-container: '#0f766e'
  on-primary-container: '#a3faef'
  inverse-primary: '#80d5cb'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#863b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#ac4d01'
  on-tertiary-container: '#ffe4d7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf2e8'
  primary-fixed-dim: '#80d5cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#00504a'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#ffdbca'
  tertiary-fixed-dim: '#ffb68e'
  on-tertiary-fixed: '#331200'
  on-tertiary-fixed-variant: '#763300'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: IBM Plex Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: IBM Plex Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: IBM Plex Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-trust, editorial-grade B2B SaaS atmosphere tailored for scholarly verification, semantic auditing, and real-time governance of Islamic content processed by enterprise AI models. 

### Design Philosophy & Aesthetic
The interface draws from **Modern Precision & Architectural Minimalism**, paired with the rigorous balance embedded in its core premise (*Mawzun* / موزون — balanced, measured, harmonious). It avoids ornate or cliché motifs, opting instead for contemporary institutional authority, extreme typographic clarity, subtle structural borders, and purposeful whitespace.

### Emotional Response & Personality
- **Equilibrium & Authority:** The UI instills uncompromising confidence in model compliance and semantic nuance.
- **Academic Serenity:** Interactions feel quiet, deliberative, and friction-free, eliminating visual clutter so auditors and engineers can evaluate complex parallel texts without cognitive fatigue.
- **Bilingual Fluency:** Conceived from the ground up for full Right-to-Left (RTL) dominance, preserving balanced optical weights between Arabic and Latin technical text.

## Colors

The palette balances clinical precision with natural equilibrium.

- **Primary (`#0F766E` — Deep Balance Teal):** Anchors verified states, semantic accuracy scores, active dashboard filters, and primary system actions. It radiates institutional trust and calm rigor.
- **Secondary (`#1E293B` — Scholarly Slate):** Used for structural contrast, primary headlines, high-priority navigation markers, and code-block chrome.
- **Tertiary (`#B45309` — Raw Amber / Waqf Alert):** Reserved for unverified outputs, semantic deviations, nuance warnings, and caution prompts requiring human validation.
- **Neutral Palette (`#0F172A` to `#F8FAFC`):** 
  - **Canvas Surface:** `#F8FAFC` (Slate-50 with a hint of warm neutrality).
  - **Card/Container Surface:** `#FFFFFF` (Crisp, pure optical white).
  - **Subtle Surface/Hover:** `#F1F5F9` (Slate-100).
  - **Borders & Dividers:** `#E2E8F0` (Slate-200) for structural bounding; `#CBD5E1` (Slate-300) for interactive control edges.
  - **Muted Data/Text:** `#64748B` (Slate-500) and `#475569` (Slate-600).
  - **High-Fidelity Text:** `#0F172A` (Slate-900).
- **Functional Semantics:**
  - **Passed/Optimal Validation:** `#047857` (Emerald-700) with `#ECFDF5` background.
  - **Flagged Violation/Doctrinal Conflict:** `#BE123C` (Rose-700) with `#FFF1F2` background.

## Typography

The typography relies on **IBM Plex Sans** (paired natively with **IBM Plex Sans Arabic** in production implementations). This pairing provides an engineered, structured cadence while upholding the calligraphic balance, baseline stability, and legibility required for formal Arabic semantic parsing.

### Typographic Principles
- **RTL Baseline Alignment:** Font sizing and line heights accommodate Arabic descenders and diacritical marks (*tashkeel*) without clipping or unbalancing Latin alphanumeric tokens.
- **Numerical Regularity:** Tabular lining figures (`tnum`) are enforced for latency, confidence score indices, token counts, and diff metrics.
- **Dual-Pane Parallelism:** Parallel review layouts (Original Text vs. Guardrail Sanitized Output) strictly standardize line heights between Arabic analysis strings and Latin model parameters.

## Layout & Spacing

The system implements a structured 12-column fluid grid governed by predictable vertical rhythms and directional mirroring for RTL environments.

### Spatial Architecture
- **Directional Standard:** Default orientation is Right-to-Left (`dir="rtl"`). Navigation trees, breadcrumbs, metrics bars, and modal controls flow naturally from the right.
- **Side Panel & Dashboard Shell:** Desktop environments utilize a fixed persistent rail (72px collapsed / 240px expanded) docked to the right edge. Content canvas expands dynamically with a maximum bound of 1600px for ultrawide viewing.
- **Responsive Adaptations:**
  - **Desktop (1200px+):** 12 columns, 24px gutters, 32px margins. Allows side-by-side verification consoles (Prompt vs. Canonical Reference vs. Mitigated Output).
  - **Tablet (768px – 1199px):** 8 columns, 16px gutters, 24px margins. Verification panels collapse into stacked tabbed inspectors.
  - **Mobile (< 768px):** 4 columns, 12px gutters, 16px canvas padding. Action bars pin to bottom sheets for thumb ergonomics.

## Elevation & Depth

Visual hierarchy is maintained through subtle tonal layering and crisp, low-contrast borders rather than deep or aggressive drop shadows. This preserves the feel of a high-reliability operational tool.

### Elevation Hierarchy
- **Canvas Base (`Level 0`):** `#F8FAFC` flat surface.
- **Card / Surface (`Level 1`):** Pure `#FFFFFF` resting on `#F8FAFC`, delimited by a 1px solid border in `#E2E8F0` and an ultra-subtle ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.03), 0 1px 2px -1px rgba(15, 23, 42, 0.03)`.
- **Raised Panels / Popovers (`Level 2`):** `#FFFFFF` container with a distinct crisp border (`#CBD5E1`) and directional ambient shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.03)`.
- **Modals & Flyout Inspectors (`Level 3`):** High-level overlay backed by a soft neutral backdrop tint (`rgba(15, 23, 42, 0.4)` with 4px backdrop blur). Elevated box shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.

## Shapes

The design system employs a **Rounded (`2`)** baseline geometry. This level of curvature balances crisp B2B technical rigor with an approachable, modern SaaS touch.

### Radius Assignments
- **Core Elements (Inputs, Buttons, Badges):** `0.5rem` (8px). Ensures crisp tap and click targets that fit tightly next to one another.
- **Card Containers & Modules:** `rounded-lg` (`1rem` / 16px) for card borders and inspection panels.
- **Large Overlays & Dialogs:** `rounded-xl` (`1.5rem` / 24px) for prominent modals and drawer corners.
- **Pills / Status Chips:** Full pill geometry (`rounded-full` / 9999px) strictly for dynamic audit states, scores, and tag filters.

## Components

### Buttons
- **Primary:** Solid `#0F766E` background, `#FFFFFF` text, subtle hover shift to `#115E59`. 8px border radius, 10px 18px padding for medium density. Focus state features a crisp 2px offset ring in `#0F766E`.
- **Secondary / Outline:** `#FFFFFF` background with a 1px `#CBD5E1` border and `#1E293B` text. Subtle `#F8FAFC` hover fill.
- **Ghost:** Transparent background, `#0F766E` or `#475569` text, background tint on hover (`#F0FDFA`).

### Status Badges & Chips
- **Semantic Safe / Balanced (موزون):** Text `#047857`, background `#ECFDF5`, border `#A7F3D0`. Includes a 6px solid emerald indicator dot.
- **Semantic Drift / Warning (تنبيه دلالي):** Text `#B45309`, background `#FFFBEB`, border `#FDE68A`.
- **Violation / Halted (مخالف للضوابط):** Text `#BE123C`, background `#FFF1F2`, border `#FECDD3`.

### Input Fields & Controls
- **Text Inputs & Filter Selectors:** Pure white surface, 1px `#CBD5E1` boundary, 8px radius. Active focus transitions to a solid 1px `#0F766E` border with a 3px soft focus halo (`rgba(15, 118, 110, 0.15)`). RTL labels anchor top-right with helper text flowing right-to-left.
- **Checkboxes & Radios:** 18px dimensions, 4px corner radius for checkboxes, circle for radios. Selected state fills `#0F766E` with crisp white validation checkmark.

### Cards & Comparison Panes
- **Audit Cards:** Minimal 1px `#E2E8F0` border on `#FFFFFF` surface. Clear internal hierarchy with header, semantic confidence metric, and inline diff view.
- **Diff / Inspection Split View:** Side-by-side or stacked Arabic text viewer. Original model output on the right, balanced/corrected output on the left. Subtle token highlighting: light rose `#FFE4E6` for excised misleading text, soft teal `#CCFBF1` for balanced replacement phrasing.