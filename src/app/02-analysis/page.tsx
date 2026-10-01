import { PageShell } from "@/components/ui/PageShell";
import { StageNav } from "@/components/stages/StageNav";
import { SemanticGraphCard } from "@/components/stages/SemanticGraphCard";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";

export const metadata = {
  title: "02 التحليل | موزون",
};

const INSIGHT_CARDS = [
  {
    eyebrow: "تصنيف المتن والوعاء",
    title: "نوع المحتوى",
    icon: "menu_book",
    iconClass: "bg-primary-fixed/40 text-primary",
    value: "حديث نبوي شريف",
    valueClass: "text-primary",
    body: "تمت مطابقة السند والمتن مع صحيح البخاري، الحديث الأول في باب بدء الوحي، برواية أمير المؤمنين عمر بن الخطاب.",
    footerIcon: "verified_user",
    footer: "مدقق آليًا ومطابق للمصنفات الحديثية",
    footerClass: "text-primary",
  },
  {
    eyebrow: "المجال المقاصدي والفقهي",
    title: "الموضوع",
    icon: "category",
    iconClass: "bg-secondary-container text-secondary",
    value: "النِّيَّة (الإخلاص والقصد)",
    valueClass: "text-primary",
    body: "يقع في أصل أبواب الفقه الإسلامي: تمييز العبادات عن العادات، وتمييز رتب العبادات بعضها عن بعض، وقاعدة الأمور بمقاصدها.",
    footerIcon: "hub",
    footer: "تصنيف مقاصدي فقهي (العبادات والمعاملات)",
    footerClass: "text-secondary",
  },
  {
    eyebrow: "الارتباط المنطقي والسببي",
    title: "الفكرة الأساسية",
    icon: "link",
    iconClass: "bg-surface-container-high text-primary-container",
    value: "الأعمال مرتبطة بالنيات صحةً وقبولاً",
    valueClass: "text-on-surface",
    body: "تحديد حصر جنس العمل المعتبر شرعًا بوجود نيته وقصده، بحيث لا يترتب ثواب أو حكم استحقاقي بغير عزم الإرادة القلبية.",
    footerIcon: "balance",
    footer: "رابط العلة بالمعلول ومقصد العمل الشرعي",
    footerClass: "text-primary",
  },
  {
    eyebrow: "الاستحقاق والأثر التشريعي",
    title: "المعنى الأساسي والأثر",
    icon: "account_balance_wallet",
    iconClass: "bg-tertiary-fixed text-tertiary",
    value: "لكل شخص ما نواه في الجزاء والمآل",
    valueClass: "text-on-surface",
    body: "دلالة فردية المسؤولية وتعين الأثر الأخروي والدنيوي على وفق النية الحقيقية الباطنة، وليس فقط القالب الصوري الظاهر للعمل.",
    footerIcon: "flag",
    footer: "دلالة الأثر والجزاء الأخروي والدنيوي الفردي",
    footerClass: "text-tertiary",
  },
] as const;

const PIPELINE = [
  { icon: "format_quote", label: "النص المدخل", className: "bg-surface-container-low", textClass: "text-on-surface", trailing: "✓" },
  { icon: "psychology", label: "الفهم الدلالي التلقائي", className: "bg-primary-fixed/30 ring-1 ring-primary/20", textClass: "text-primary font-bold", trailing: null },
  { icon: "account_tree", label: "كائن المعرفة الموزون (Knowledge Object)", className: "bg-surface-container-low", textClass: "text-on-surface-variant", trailing: "03" },
] as const;export default function AnalysisPage() {
  return (
    <PageShell>
      {/* Flow pill and editorial header */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex flex-wrap items-center gap-space-sm">
          <span
            className={cx(
              "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-primary",
              t.labelSm,
              "font-semibold",
            )}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            المرحلة 02 • التحليل الدلالي واستخلاص البنية
          </span>
          <span className={cx(t.code, "rounded bg-surface-container-low px-2 py-0.5 text-secondary")}>
            Semantic Engine v2.4
          </span>
        </div>

        <div className="mt-space-xs flex flex-col justify-between gap-space-md md:flex-row md:items-end">
          <div>
            <h1 className={cx(t.h1, "font-bold tracking-tight text-on-surface")}>تحليل المحتوى</h1>
            <p className={cx(t.bodyLg, "mt-1 text-on-surface-variant")}>
              يحلل Mawzun النص تلقائيًا ويستخرج العناصر الدلالية التأسيسية تمهيدًا لصياغة القيود.
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-xl bg-surface-container-lowest px-space-md py-space-sm shadow-sm lg:flex">
            <span className={cx(t.labelSm, "text-on-surface-variant")}>مستوى التوافق العقدي:</span>
            <span className={cx(t.code, "font-semibold text-primary")}>100% (معتمد)</span>
          </div>
        </div>
      </div>

      {/* Pipeline track */}
      <div className="mt-space-md flex flex-col items-center justify-between gap-space-sm rounded-xl bg-surface-container-lowest p-space-sm shadow-sm md:flex-row">
        {PIPELINE.map((step, index) => (
          <div key={step.label} className="contents">
            {index > 0 ? (
              <span className="flex w-full items-center justify-center text-outline-variant md:w-auto">
                <Icon name="arrow_back" className="hidden text-sm md:inline" />
                <Icon name="arrow_downward" className="text-sm md:hidden" />
              </span>
            ) : null}
            <div
              className={cx(
                "flex w-full items-center gap-space-sm rounded-lg px-space-sm py-1.5 md:w-auto",
                step.className,
              )}
            >
              <Icon name={step.icon} className="text-base text-primary" />
              <span className={cx(t.labelSm, "font-medium", step.textClass)}>{step.label}</span>
              {step.trailing ? (
                <span className={cx(t.code, "md:mr-1", step.trailing === "✓" ? "font-semibold text-primary" : "text-outline")}>
                  {step.trailing}
                </span>
              ) : (
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-primary md:mr-1" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Source text + knowledge graph */}
      <div className="mb-space-lg grid grid-cols-1 gap-gutter lg:grid-cols-12">
        <div className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-space-lg shadow-sm lg:col-span-7">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md">
              <span className="flex items-center gap-space-xs">
                <Icon name="verified" className="text-lg text-primary" />
                <span className={cx(t.label, "font-bold text-on-surface")}>النص الأصلي المُعالج</span>
              </span>
              <span
                className={cx(
                  "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-primary",
                  t.labelSm,
                  "font-semibold",
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                مكتمل التحقق • مطابق للمتن المعتمد
              </span>
            </div>

            <div className="relative my-space-xs overflow-hidden rounded-xl bg-surface px-space-md py-space-lg">
              <span className="pointer-events-none absolute -top-6 -left-6 select-none text-surface-container opacity-50">
                <Icon name="format_quote" className="text-9xl" />
              </span>
              <p className={cx(t.h2, "relative z-10 text-right font-semibold leading-relaxed tracking-tight text-on-surface")}>
                «إنَّما الأعمالُ بالنِّيّاتِ، وإنَّما لِكُلِّ امرِئٍ ما نَوى.»
              </p>
            </div>
          </div>

          <div className="mt-space-md flex flex-wrap items-center justify-between gap-space-sm rounded-lg bg-surface-container-low/40 p-space-sm pt-space-md text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <Icon name="menu_book" className="text-sm text-outline" />
              <span className={t.labelSm}>
                <span className="font-medium text-on-surface">المصدر:</span> صحيح البخاري (حديث 1)
              </span>
            </span>
            <span className="hidden h-3 w-px bg-outline-variant sm:block" />
            <span className="flex items-center gap-1.5">
              <Icon name="shield" className="text-sm text-outline" />
              <span className={cx(t.labelSm, "font-medium text-on-surface")}>درجة الدلالة:</span>
              <span className={cx(t.labelSm, "font-semibold text-primary")}>قطعية الثبوت والدلالة</span>
            </span>
            <span className="hidden h-3 w-px bg-outline-variant sm:block" />
            <span className={cx(t.code, "text-secondary")}>140ms</span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <SemanticGraphCard />
        </div>
      </div>{/* Extracted semantic structure */}
      <div className="flex flex-col gap-space-md">
        <div className="flex flex-col justify-between gap-space-xs sm:flex-row sm:items-center">
          <div>
            <h2 className={cx(t.h3, "font-bold text-on-surface")}>ما استخرجه Mawzun</h2>
            <p className={cx(t.body, "text-on-surface-variant")}>
              تحليل لغوي ودلالي عميق مبني على أصول المعاجم وضوابط المحتوى الإسلامي المعتمد.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={cx(
                t.label,
                "inline-flex items-center gap-1.5 rounded-lg bg-surface-container-low px-3 py-1.5 text-secondary transition-colors hover:text-on-surface",
              )}
            >
              <Icon name="filter_list" className="text-sm" />
              تصفية العناصر
            </button>
            <button
              type="button"
              className={cx(
                t.label,
                "inline-flex items-center gap-1.5 rounded-lg bg-surface-container-low px-3 py-1.5 text-secondary transition-colors hover:text-on-surface",
              )}
            >
              <Icon name="code" className="text-sm" />
              تصدير JSON-LD
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          {INSIGHT_CARDS.map((card) => (
            <article
              key={card.title}
              className="group relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-space-sm flex items-start justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm">
                  <span
                    className={cx(
                      "flex h-10 w-10 items-center justify-center rounded-lg",
                      card.iconClass,
                    )}
                  >
                    <Icon name={card.icon} className="text-xl" />
                  </span>
                  <span>
                    <span className="block font-label-sm text-label-sm text-outline font-medium">
                      {card.eyebrow}
                    </span>
                    <h3 className={cx(t.h3, "font-bold text-on-surface")}>{card.title}</h3>
                  </span>
                </div>
                <span
                  className={cx(
                    "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary",
                    t.labelSm,
                    "font-semibold",
                  )}
                >
                  <Icon name="auto_awesome" className="text-xs" />
                  مستخرج تلقائيًا
                </span>
              </div>

              <div className="my-space-md rounded-lg bg-surface-container-low p-space-md">
                <span className={cx(t.h2, "font-bold", card.valueClass)}>{card.value}</span>
                <p className={cx(t.bodySm, "mt-1 text-on-surface-variant")}>{card.body}</p>
              </div>

              <div className={cx(t.labelSm, "flex items-center justify-between pt-space-xs text-on-surface-variant")}>
                <span className={cx("flex items-center gap-1.5", card.footerClass)}>
                  <Icon name={card.footerIcon} className="text-sm" />
                  {card.footer}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Readiness insight */}
      <div className="flex flex-col items-center justify-between gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-sm md:flex-row">
        <div className="flex items-center gap-space-md">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon name="policy" className="text-2xl" />
          </span>
          <div>
            <h4 className={cx(t.h3, "font-bold text-on-surface")}>
              جاهزية التضمين والتحويل إلى قيود حوكمة
            </h4>
            <p className={cx(t.bodySm, "text-on-surface-variant")}>
              استكمل النظام استخراج محددات الدلالة دون أي تناقض مع المصادر التأسيسية. يمكنك الآن نقل كائن
              المعرفة إلى المرحلة الثالثة لبناء محددات الأمان التوليدي (Semantic Guardrails).
            </p>
          </div>
        </div>
      </div>

      <StageNav
        status="تم استخراج 4 عناصر دلالية بدقة 0.998 • جاهز لبناء القيود"
        hint="المرحلة التالية: صياغة واعتماد القيود الدلالية الحاكمة."
        nextLabel="انتقال إلى القيود"
      />
    </PageShell>
  );
}