---
title: نظام التصميم
description: رموز التصميم في موزون — الألوان والطباعة والمسافات وأنصاف الأقطار والارتفاع.
order: 3
---

# نظام التصميم

نظام التصميم مطبَّق بالكامل كرموز (tokens) في [`src/app/globals.css`](https://github.com/Asrar-7r/mawzun-project/blob/main/src/app/globals.css)
داخل كتلة `@theme` (اصطلاح Tailwind v4). الأصل المرجعي في `stitch_mawzun/mawzun_semantic_guard/DESIGN.md`.

> **قاعدة ذهبية:** لا تُكتب قيم لون أو مقاس مباشرة في المكوّنات؛ استخدم دائماً أصناف الرموز
> (`bg-primary`, `text-headline-lg`, `p-space-md`…). راجع [ADR-0003](/docs/adr/0003-design-tokens).

## الألوان

كل لون معرّف كمتغيّر `--color-*`، فيصبح صنفاً جاهزاً في Tailwind.

### الألوان الأساسية

| الدور | الرمز | الاستخدام |
| --- | --- | --- |
| Primary | `#005c55` / `bg-primary` | الحالات المتحقّقة، درجات الدقة، الإجراءات الأساسية |
| Primary container | `#0f766e` / `bg-primary-container` | خلفيات مميّزة عالية الثقة |
| Primary fixed | `#9cf2e8` / `bg-primary-fixed` | لمحات فاتحة للشعارات والرقائق |
| Secondary | `#545f73` / `bg-secondary` | النصوص البنيوية والعناوين الثانوية |
| Tertiary (تحذير) | `#863b00` / `bg-tertiary` | الانحرافات الدلالية والتحذيرات التي تحتاج تدقيقاً بشرياً |
| Error | `#ba1a1a` / `bg-error` | مخالفة القيود المعتمدة |

### الأسطح والحدود

| الرمز | القيمة | الاستخدام |
| --- | --- | --- |
| `surface` | `#f8f9ff` | الخلفية العامة للتطبيق |
| `surface-container-lowest` | `#ffffff` | سطح البطاقات (الأبيض النقي) |
| `surface-container-low` | `#eff4ff` | أسطح ثانوية خفيفة |
| `surface-container-high` | `#dce9ff` | حالات التحويم والحدود |
| `on-surface` | `#0b1c30` | النص الأساسي |
| `on-surface-variant` | `#3e4947` | النص الثانوي |
| `outline` / `outline-variant` | `#6e7977` / `#bdc9c6` | الحدود والفواصل |

### المعاني الوظيفية (من DESIGN.md)

- **موزون / سليم:** نص `#047857`، خلفية `#ECFDF5`.
- **تنبيه دلالي:** نص `#B45309`، خلفية `#FFFBEB`.
- **مخالف للضوابط:** نص `#BE123C`، خلفية `#FFF1F2`.

## الطباعة

الخطوط: **IBM Plex Sans Arabic** للنصوص (عبر `next/font/google`)، و**JetBrains Mono** للكود.

الأدوار الطباعية موحّدة في [`src/lib/typography.ts`](https://github.com/Asrar-7r/mawzun-project/blob/main/src/lib/typography.ts)
كخريطة `t`، تجمع عائلة الخط مع مقياس الحجم والارتفاع:

| الدور | الصنف | الحجم / الارتفاع |
| --- | --- | --- |
| `t.h1` | `font-headline-xl text-headline-xl` | 32px / 44px |
| `t.h2` | `font-headline-lg text-headline-lg` | 24px / 34px |
| `t.h3` | `font-headline-sm text-headline-sm` | 18px / 26px |
| `t.bodyLg` | `font-body-lg text-body-lg` | 16px / 26px |
| `t.body` | `font-body-md text-body-md` | 14px / 22px |
| `t.bodySm` | `font-body-sm text-body-sm` | 12px / 18px |
| `t.label` | `font-label-md text-label-md` | 13px / 18px |
| `t.labelSm` | `font-label-sm text-label-sm` | 11px / 16px |
| `t.code` | `font-code-sm text-code-sm` | 12px / 18px (JetBrains Mono) |

```tsx
import { t } from "@/lib/typography";
<h1 className={t.h1}>عنوان</h1>
```

## المسافات

مقياس مخصّص: `space-xs` (0.25rem)، `space-sm` (0.5rem)، `space-md` (1rem)،
`space-lg` (1.5rem)، `space-xl` (2.5rem)، بالإضافة إلى `gutter` (1.5rem) و`margin` (2rem).
تُستخدم كأصناف مثل `p-space-md`, `gap-space-sm`.

## أنصاف الأقطار

من `0.25rem` (sm) إلى `full`، مع اصطلاح: `rounded-lg` (8px) للعناصر التفاعلية،
`rounded-xl` (1rem) لبطاقات، `rounded-2xl` للبوابات البارزة، `rounded-full` للرقائق.

## الارتفاع والعمق

تسلسل هرمي بالطبقات اللونية والحدود الرقيقة لا بالظلال العميقة:

| المستوى | الوصف |
| --- | --- |
| Level 0 | القماش الأساسي `#f8f9ff` (مسطّح) |
| Level 1 | بطاقة بيضاء بحدّ رقيق وظل محيط خفيف جداً ([Card](/docs/architecture/components#card)) |
| Level 2 | لوحات مرتفعة بحدّ أوضح |
| Level 3 | النوافذ واللوائح المنسدلة بخلفية معتمة وضباب خلفي |

## الشبكة والاستجابة

- حاوية المحتوى عبر [`PageShell`](/docs/architecture/components#pageshell) بعرض أقصى `6xl` أو `7xl`.
- **سطح المكتب (≥1200px):** شريط جانبي ثابت (256px) + قماش مرن.
- **التابلت (768–1199px):** تصطفّ اللوحات في مفتّشات تبويبية.
- **الجوال (<768px):** الشريط الجانبي درج منسدل، وأشرطة الإجراء تلتصق بالأسفل.
