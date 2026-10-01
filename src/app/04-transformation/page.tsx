import { PageShell } from "@/components/ui/PageShell";
import { StageNav } from "@/components/stages/StageNav";
import { TransformationCompare } from "@/components/stages/TransformationCompare";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";

export const metadata = {
  title: "04 التحويل | موزون",
};

const STEPS = [
  { label: "01. تحليل", status: "مكتمل", state: "done" },
  { label: "02. قيود", status: "مكتمل", state: "done" },
  { label: "03. مراجعة", status: "مكتمل", state: "done" },
  { label: "04. تحويل", status: "جاري التنفيذ", state: "active" },
  { label: "05. فحص", status: "الخطوة القادمة", state: "pending" },
] as const;

export default function TransformationPage() {
  return (
    <PageShell width="7xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-space-md pb-space-sm md:flex-row md:items-center">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-space-sm">
            <span className={cx(t.code, "font-semibold tracking-wider text-primary")}>المرحلة 04</span>
            <span className="h-1.5 w-1.5 rounded-full bg-outline-variant" />
            <span className={cx(t.label, "text-secondary")}>التحويل الدلالي والنمذجة</span>
            <span
              className={cx(
                "inline-flex items-center gap-1.5 rounded-full bg-tertiary-container/15 px-2.5 py-0.5 font-semibold text-tertiary",
                t.labelSm,
              )}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tertiary" />
              التحويل قيد الفحص الدلالي
            </span>
          </div>
          <h1 className={cx(t.h1, "font-bold tracking-tight text-on-surface")}>التحويل</h1>
          <p className={cx(t.bodyLg, "text-secondary")}>
            يقوم الذكاء الاصطناعي بتحويل النص مع الحفاظ على القيود المعتمدة.
          </p>
        </div>

        <div className="flex items-center gap-space-md self-start rounded-xl bg-surface-container-lowest p-space-sm shadow-sm md:self-auto">
          <div className="flex items-center gap-space-xs rounded-lg bg-surface-container-low px-space-sm py-1">
            <Icon name="neurology" className="text-base text-primary" />
            <div className="flex flex-col text-right">
              <span className={cx(t.labelSm, "text-outline")}>محرك النمذجة</span>
              <span className={cx(t.code, "font-semibold text-on-surface")}>Mawzun-LLM-v4.2</span>
            </div>
          </div>
          <div className="h-7 w-px bg-surface-container" />
          <div className="flex items-center gap-2 px-space-xs">
            <div className="flex flex-col text-right">
              <span className={cx(t.labelSm, "text-outline")}>زمن التوليد</span>
              <span className={cx(t.code, "font-semibold text-primary")}>182ms</span>
            </div>
            <Icon name="bolt" className="text-base text-primary" />
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="w-full rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
        <div className="relative flex items-center justify-between overflow-x-auto pb-2 md:pb-0">
          {STEPS.map((step, index) => (
            <div key={step.label} className="flex items-center">
              {index > 0 ? (
                <span
                  className={cx(
                    "mx-space-sm h-0.5 min-w-[24px] flex-1",
                    step.state === "pending" ? "bg-surface-container" : "bg-primary/30",
                  )}
                />
              ) : null}
              <span className="flex min-w-fit items-center gap-space-sm">
                <span
                  className={cx(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    step.state === "done"
                      ? "bg-primary/10 text-primary"
                      : step.state === "active"
                        ? "bg-tertiary-container/15 text-tertiary"
                        : "bg-surface-container text-outline",
                  )}
                >
                  <Icon name={step.state === "pending" ? "lock" : "check"} className="text-base font-bold" filled={step.state !== "pending"} />
                </span>
                <span className="flex flex-col">
                  <span className={cx(t.label, "font-semibold", step.state === "pending" ? "text-secondary" : "text-on-surface")}>
                    {step.label}
                  </span>
                  <span
                    className={cx(
                      t.labelSm,
                      "font-medium",
                      step.state === "done"
                        ? "text-primary"
                        : step.state === "active"
                          ? "text-tertiary"
                          : "text-outline",
                    )}
                  >
                    {step.status}
                  </span>
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>{/* Drift alert */}
      <div className="flex flex-col items-start justify-between gap-space-md rounded-xl bg-gradient-to-l from-surface-container-lowest via-surface-container-low to-surface-container-lowest p-space-md shadow-sm md:flex-row md:items-center">
        <div className="flex items-start gap-space-sm">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tertiary-container/15 text-tertiary">
            <Icon name="psychology_alt" className="text-xl" />
          </span>
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className={cx(t.h3, "font-semibold text-on-surface")}>
                تنبيه الرقابة: الطلاقة اللفظية لا تعني السلامة الدلالية
              </span>
              <span className={cx(t.code, "rounded bg-tertiary-container/15 px-2 py-0.5 font-semibold text-tertiary")}>
                Semantic Drift Alert
              </span>
            </div>
            <p className={cx(t.body, "mt-0.5 leading-relaxed text-secondary")}>
              النموذج اللغوي قد ينتج صياغة إنجليزية سليمة وبليغة من حيث القواعد، لكنها تُحدث انحرافاً
              جوهرياً عن المفهوم المقاصدي الشرعي عند استبدال الغايات بالأسباب.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className={cx(t.code, "rounded bg-surface-container-high px-2 py-1 text-secondary")}>
            Drift Delta: +41.8%
          </span>
        </div>
      </div>

      <TransformationCompare />

      <StageNav
        status="اكتمل التحويل بعد التطبيق — 4 انحرافات دلالية مكتشفة"
        hint="المرحلة التالية: إعادة فحص القيود وإصدار حكم التدقيق."
        nextLabel="انتقال إلى الفحص"
      />
    </PageShell>
  );
}