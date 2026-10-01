---
title: التوجيه والمراحل
description: كيف يعمل App Router في موزون، وكيف يُشتق التنقّل بين المراحل من مصدر حقيقة واحد.
order: 2
---

# التوجيه والمراحل

## التوجيه (App Router)

يعتمد المشروع على App Router في Next.js 16:

- كل مجلد تحت `src/app/` يمثّل مقطع مسار، وملف `page.tsx` يجعل المقطع قابلاً للزيارة.
- `layout.tsx` الجذري يُغلّف كل الصفحات بـ [`AppShell`](/docs/architecture/components#appshell).
- الصفحة الجذرية `src/app/page.tsx` تُطلق `redirect()` إلى المرحلة الأولى.

> **اصطلاح Next.js 16:** وسيطات `params` تُمرّر كـ **Promise** وتُفكّ بـ `await`،
> كما في نوع الصفحة `PageProps<'/docs/[...slug]'>`.

## مصدر الحقيقة للمراحل: `src/lib/stages.ts`

ملف واحد يعرّف المراحل الست في مصفوفة `STAGES` ثابتة (`readonly`)، ويوفّر دوال مساعدة:

```ts
export const STAGES = [
  { slug: "01-input",         ordinal: "01", title: "إدخال النص", icon: "edit_note",   doneIcon: "check_circle" },
  { slug: "02-analysis",      ordinal: "02", title: "التحليل",    icon: "analytics",   doneIcon: "check_circle" },
  { slug: "03-constraints",   ordinal: "03", title: "القيود",     icon: "rule_folder", doneIcon: "check_circle" },
  { slug: "04-transformation",ordinal: "04", title: "التحويل",    icon: "transform",   doneIcon: "check_circle" },
  { slug: "05-audit",         ordinal: "05", title: "الفحص",      icon: "fact_check",  doneIcon: "check_circle" },
  { slug: "06-results",       ordinal: "06", title: "النتيجة",    icon: "verified",    doneIcon: "verified" },
] as const;
```

### الدوال المساعدة

| الدالة | الوظيفة |
| --- | --- |
| `stageHref(slug)` | يبني مسار المرحلة، مثال: `/01-input` |
| `stageFromPath(pathname)` | يستخرج المرحلة الحالية من المسار، ويُسقط للأولى عند عدم التطابق |
| `stageStatus(stage, current)` | يعيد `done` أو `active` أو `pending` نسبةً للمرحلة الحالية |
| `previousStage(current)` | المرحلة السابقة، أو `null` في البداية |
| `nextStage(current)` | المرحلة التالية، أو `null` في النهاية |
| `FIRST_STAGE` / `LAST_STAGE` | أطراف المسار |

### من يستهلكها؟

- [`Sidebar`](/docs/architecture/components#sidebar) — يبني القائمة ويحسب حالة كل مرحلة.
- [`TopBar`](/docs/architecture/components#topbar) — يبني مسار التنقّل (breadcrumb).
- [`StageNav`](/docs/architecture/components#stagenav) — يشتق أزرار الأمام/الخلف تلقائياً.

لأن الجميع يقرأ من نفس المصفوفة، فإضافة مرحلة واحدة تنعكس فوراً على الواجهات الثلاث.

## إضافة مرحلة جديدة

1. أضف عنصراً إلى `STAGES` بالترتيب الصحيح (مع `slug`, `ordinal`, `title`, `icon`, `doneIcon`).
2. أنشئ المجلد `src/app/<slug>/page.tsx` وصفحته.
3. لا حاجة لتعديل التنقّل — يُحدَّث تلقائياً.

> حالة المرحلة الحالية: المراحل `01`–`04` لها صفحات منفَّذة، و`05-audit` و`06-results`
> معرّفتان في مصدر الحقيقة وتنتظران التنفيذ. راجع [سير العمل](/docs/workflow/audit-pipeline).

## مركز التوثيق `/docs`

مركز التوثيق مسار مستقلّ:
- `/docs` — صفحة الهبوط.
- `/docs/[...slug]` — يعرض ملفاً محدداً من `docs/`، مع `generateStaticParams` لتوليد كل الصفحات ساكنًا.
- يقرأ المحتوى من ملفات Markdown عبر محرّك في `src/lib/docs/`.

راجع [بنية المشروع](/docs/getting-started/project-structure) لموقع هذه الملفات، و
[محرك التوثيق](/docs/architecture/docs-engine) لتفصيل الفهرسة والتوليد الساكن.
