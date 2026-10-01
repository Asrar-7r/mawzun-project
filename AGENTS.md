<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# قواعد العمل في هذا المستودع (Project Rules)

> هذه القواعد إلزامية لكل من يعمل على هذا المستودع (بشراً أو وكلاء). الكتلة أعلاه `nextjs-agent-rules` تُعاد كتابتها تلقائياً بواسطة `next dev` — لا تحذفها، والتزم بها عند الالتزام بالتغييرات.

## 1) مدير الحزم: bun فقط

- مدير الحزم المعتمد هو **bun** حصراً. يُمنع استخدام `npm` أو `yarn` أو `pnpm` في أي أمر (تثبيت، إضافة، حذف، تشغيل سكربتات، أو تنفيذ أدوات).
- استخدم دائماً:
  - تثبيت التبعيات: `bun install`
  - إضافة حزمة: `bun add <pkg>` (و `bun add -d <pkg>` لتبعيات التطوير)
  - حذف حزمة: `bun remove <pkg>`
  - تشغيل السكربتات: `bun run <script>` أو مباشرةً `bun dev`, `bun build`, `bun lint`
  - تنفيذ أدوات: `bunx <tool>` بدل `npx`
- ملف القفل المرجعي هو `bun.lock` (أو `bun.lockb` عند الحاجة). لا تُنشئ أو تُحدّث `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml`.
- يوجد حالياً `package-lock.json` قديم من npm: عند أول مهمة تمس التبعيات، أنشئ وسم (tag) وأرشف الملف ثم أزله، وأعد التثبيت عبر `bun install` لإنتاج `bun.lock`.

## 2) الفروع وفرع main

- **يُمنع منعاً باتاً** التعديل أو الحذف المباشر على فرع `main` في أي ملف برمجي أو إعدادات أو تبعيات.
- الاستثناء الوحيد: **تحديث ملفات التوثيق (docs) فقط** مسموح على `main` مباشرةً **وبدون إنشاء فرع**. المقصود بملفات التوثيق هي ملفات Markdown مثل `README.md` ومحتويات `docs/**` و `AGENTS.md` (توثيق فقط، وليس كوداً أو إعدادات تشغيل).
- أي تعديل آخر يبدأ إلزامياً على **فرع منفصل**:
  ```bash
  git switch -c <type>/<short-description>
  # مثال:
  git switch -c feat/add-analysis-stage
  ```
- نمط تسمية الفروع: `<type>/<kebab-case-description>` حيث `type` أحد: `feat`, `fix`, `chore`, `refactor`, `docs`.

## 3) الوسوم (Tags) والأرشفة قبل أي تعديل أو حذف

قبل تعديل أو حذف **أي** ملف، نفّذ بالترتيب:

1. **إنشاء وسم (tag)** يوثّق الحالة قبل التعديل، ويُعتبر هو المرجع الرسمي عند الحاجة للرجوع أو المقارنة:
   ```bash
   git tag -a pre-<scope>-<YYYY-MM-DD> -m "snapshot before <description>"
   ```
2. **أرشفة الملف/الملفات** قبل التعديل، بنسخها إلى مجلد الأرشيف مع الحفاظ على المسار والطابع الزمني:
   ```bash
   mkdir -p archive/$(date +%Y%m%d)
   cp --parents src/path/to/file.tsx archive/$(date +%Y%m%d)/
   ```
   - يُمنع الحذف النهائي لأي ملف دون وجود نسخة مؤرشفة مسبقاً.
3. ثمَّ العمل على فرع منفصل (انظر القسم 2).

- الوسم (tag) هو **المرجع** عند الحاجة للرجوع إلى الحالة السابقة:
  - المقارنة: `git diff <tag>..HEAD`
  - الاستعادة الجزئية لملف: `git checkout <tag> -- <path>`
  - الاستعادة الكاملة: `git switch --detach <tag>`
- التزم بتسمية واضحة للوسوم (مثال: `pre-refactor-2026-01-01`).

## 4) تسلسل العمل الإلزامي (Workflow)

1. تأكد من نظافة الشجرة: `git status`.
2. أنشئ الوسم (tag) — القسم 3.
3. أرشف الملفات المتأثرة — القسم 3.
4. أنشئ فرعاً منفصلاً — القسم 2 (يُستثنى منه تحديث docs على `main`).
5. نفّذ التعديل باستخدام **bun** فقط.
6. تحقق من صحة العمل: `bun run lint` ثم `bun run build` عند الاقتضاء.
7. التزم بالتغييرات وارفع الفرع.
- لا تخلط تعديلات غير مترابطة في نفس الفرع أو نفس الالتزام (commit).
