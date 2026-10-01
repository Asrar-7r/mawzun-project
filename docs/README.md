---
title: فهرس التوثيق
description: خريطة شاملة لتوثيق منصة موزون — نقطة البداية لكل ما تحتاجه لفهم النظام والمساهمة فيه.
order: 0
---

# توثيق موزون

مرحباً بك في مركز توثيق **موزون | طبقة الأمان الدلالي**. هذه الوثائق هي المصدر الرسمي
المعتمد لفهم معمارية النظام الدلالي، ونظام التصميم، وسير عمل التدقيق الشرعي، وقواعد المساهمة.

> محتوى هذا المجلد (`docs/`) هو **مصدر الحقيقة الوحيد** للتوثيق. يُعرض نفس المحتوى داخل
> التطبيق عبر مركز التوثيق على المسار [`/docs`](/docs)، ويُقرأ أيضاً مباشرة على GitHub.

## من أين أبدأ؟

| إن كنت… | فابدأ من |
| --- | --- |
| مطوّراً جديداً يشغّل المشروع أول مرة | [التركيب والتشغيل](/docs/getting-started/installation) |
| تبحث عن خريطة المجلدات والملفات | [بنية المشروع](/docs/getting-started/project-structure) |
| تريد معرفة الأوامر المتاحة | [الأوامر والسكربتات](/docs/getting-started/scripts) |
| مهتماً بمعمارية النظام الدلالي | [النظرة المعمارية العامة](/docs/architecture/overview) |
| تريد مراجعة نظام التصميم والرموز | [نظام التصميم](/docs/architecture/design-system) |
| تريد فهم التوجيه ومنطق المراحل | [التوجيه والمراحل](/docs/architecture/routing-and-stages) |
| تريد كتالوج المكوّنات وواجهاتها | [المكوّنات](/docs/architecture/components) |
| تريد توثيق صفحة جديدة أو فهم مركز التوثيق | [محرك التوثيق](/docs/architecture/docs-engine) |
| تريد فهم مسار التدقيق الستّي | [مسار التدقيق الدلالي](/docs/workflow/audit-pipeline) |
| تريد فلسفة الضبط الدلالي | [مبدأ الحماية الدلالية](/docs/workflow/semantic-guard) |
| تكتب كوداً وتريد الاصطلاحات الملزمة | [الاصطلاحات البرمجية](/docs/reference/conventions) |
| تبحث عن معنى مصطلح عربي/إنجليزي | [المسرد](/docs/reference/glossary) |

## أقسام التوثيق

- **البداية السريعة (`getting-started/`)** — [التركيب والتشغيل](/docs/getting-started/installation)،
  [بنية المشروع](/docs/getting-started/project-structure)، [الأوامر والسكربتات](/docs/getting-started/scripts).
- **المعمارية (`architecture/`)** — [النظرة العامة](/docs/architecture/overview)،
  [التوجيه والمراحل](/docs/architecture/routing-and-stages)، [نظام التصميم](/docs/architecture/design-system)،
  [المكوّنات](/docs/architecture/components)، [محرك التوثيق](/docs/architecture/docs-engine).
- **سير العمل (`workflow/`)** — [مسار التدقيق الدلالي](/docs/workflow/audit-pipeline)،
  و[مبدأ الحماية الدلالية](/docs/workflow/semantic-guard).
- **المراجع (`reference/`)** — [الاصطلاحات البرمجية](/docs/reference/conventions)،
  و[المسرد ثنائي اللغة](/docs/reference/glossary).
- **سجلات القرارات (`adr/`)** — [Bun حصراً](/docs/adr/0001-bun-only)،
  [RTL أولاً](/docs/adr/0002-rtl-first)، [رموز التصميم](/docs/adr/0003-design-tokens).

## قواعد إلزامية مختصرة

1. **مدير الحزم: Bun حصراً** — لا `npm`/`yarn`/`pnpm`. انظر [ADR-0001](/docs/adr/0001-bun-only).
2. **فرع `main` محمي** — كل تغيير غير توثيقي يبدأ من فرع مستقل.
3. **وسم وأرشفة قبل أي تعديل أو حذف** — راجع [الاصطلاحات](/docs/reference/conventions).

القواعد الكاملة والمُلزمة موجودة في [`AGENTS.md`](https://github.com/Asrar-7r/mawzun-project/blob/main/AGENTS.md).
