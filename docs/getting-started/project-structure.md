---
title: بنية المشروع
description: خريطة المجلدات والملفات في موزون ومسؤولية كل جزء منها.
order: 2
---

# بنية المشروع

```text
mawzun-project/
├── docs/                     # ← هذا التوثيق (مصدر الحقيقة)
├── public/                   # الأصول الثابتة
├── scripts/
│   └── ensure-bun.mjs        # حارس يمنع npm/yarn/pnpm
├── src/
│   ├── app/                  # App Router: الصفحات والتنسيقات
│   │   ├── globals.css       # رموز التصميم (@theme) ونمط الجذر
│   │   ├── layout.tsx        # الجذر: RTL + الخطوط + AppShell
│   │   ├── page.tsx          # يحوّل تلقائياً إلى المرحلة 01
│   │   ├── 01-input/
│   │   ├── 02-analysis/
│   │   ├── 03-constraints/
│   │   ├── 04-transformation/
│   │   └── docs/             # ← مركز التوثيق داخل التطبيق
│   ├── components/
│   │   ├── layout/           # AppShell, Sidebar, TopBar
│   │   ├── stages/           # مكوّنات المراحل الوظيفية
│   │   ├── docs/             # مكوّنات مركز التوثيق
│   │   └── ui/               # مكوّنات واجهة أساسية قابلة لإعادة الاستخدام
│   └── lib/
│       ├── cx.ts             # دمج أسماء أصناف Tailwind
│       ├── stages.ts         # مصدر حقيقة المراحل والتنقّل
│       ├── typography.ts     # أدوار الطباعة
│       └── docs/             # محرّك التوثيق (قراءة/تحليل/فهرسة)
├── stitch_mawzun/            # مراجع التصميم الأصلية (Stitch) + DESIGN.md
├── archive/                  # نسخ ما قبل التعديل (وفق قواعد المشروع)
├── AGENTS.md                 # القواعد الإلزامية
└── bun.lock                  # ملف القفل المرجعي
```

## المجلدات المحورية

### `src/app/`
يعتمد على **App Router** في Next.js 16. كل مجلد يمثّل مساراً، وكل `page.tsx` يصدّر مكوّناً
افتراضياً. التنسيقات العامة ورموز التصميم في [globals.css](/docs/architecture/design-system).

### `src/components/`
- **`layout/`** — الهيكل الثابت المشترك بين كل الصفحات.
- **`stages/`** — المكوّنات المرتبطة بمنطق كل مرحلة تدقيق.
- **`ui/`** — عناصر أساسية محايدة (`Card`, `Badge`, `Icon`, `ProgressBar`, `PageShell`).

### `src/lib/`
منطق مشترك بلا واجهة. **`stages.ts`** هو مصدر الحقيقة الوحيد للمراحل، يستهلكه كل من
الشريط الجانبي ومسار التنقّل. راجع [التوجيه والمراحل](/docs/architecture/routing-and-stages).

### `stitch_mawzun/`
مراجع التصميم الأصلية المُصدَّرة من Stitch، وتحتوي `mawzun_semantic_guard/DESIGN.md`
الذي وُلدت منه رموز التصميم في التطبيق.

### `archive/`
لقطات الملفات قبل أي تعديل أو حذف، منظّمة بتاريخ `YYYYMMDD`. إلزامية وفق
[قواعد المشروع](/docs/reference/conventions#الوسوم-والأرشفة).

## ما ليس مضمّناً في Git

`node_modules/`, `.next/`, `out/`, `build/`, `.env*`, و`archive` مُستثنى من فحص ESLint.
راجع `.gitignore` لمزيد من التفصيل.
