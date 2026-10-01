"use client";

import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";
import { useWorkflow } from "@/context/WorkflowContext";
import { StageNav } from "@/components/stages/StageNav";
import { LANGUAGES } from "@/lib/semanticEngine";

export function AuditWorkspace() {
  const {
    currentPreset,
    transform,
    language,
    constraints,
    computedCcr,
    runRecheck,
    isRechecking,
  } = useWorkflow();

  const modeOutputs = currentPreset.outputs[transform] || currentPreset.outputs.translate;
  const output = modeOutputs[language] ?? modeOutputs["en-US"];
  const currentLangObj = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  const activeConstraints = constraints.filter((c) => c.isActive);

  return (
    <div className="flex flex-col gap-space-lg w-full">
      {/* Editorial Header */}
      <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs max-w-3xl">
          <div className="flex items-center gap-space-sm">
            <span className={cx(t.h1, "text-on-surface tracking-tight font-bold")}>فحص المعنى</span>
            <span className={cx(t.code, "bg-surface-container-high text-secondary px-2.5 py-0.5 rounded font-medium")}>
              المرحلة 05 / 06
            </span>
          </div>
          <p className={cx(t.bodyLg, "text-on-surface-variant leading-relaxed")}>
            يقارن Mawzun الناتج بالقيود التي تم اعتمادها لكشف أي انزياح أو هلوسة دلالية، وضمان صيانة
            المقاصد الشرعية واللغوية دون إخلال.
          </p>
        </div>

        {/* Status Chips */}
        <div className="flex flex-wrap items-center gap-space-sm self-stretch lg:self-auto justify-start lg:justify-end">
          <div className="flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-lowest shadow-sm rounded-lg border border-outline-variant/20">
            <Icon name="terminal" className="text-base text-primary" />
            <span className={cx(t.code, "text-on-surface text-xs")}>محرك التدقيق: Mawzun-Inspector v2.4</span>
          </div>
          <div className="flex items-center gap-space-xs px-space-md py-space-xs bg-error-container text-on-error-container rounded-lg font-semibold text-xs">
            <span className="w-2 h-2 rounded-full bg-error animate-ping" />
            <span>حالة الفحص: تم رصد انحرافات دلالية حرجة</span>
          </div>
        </div>
      </section>

      {/* Hero Metric Card (CCR Impact) */}
      <section className="w-full">
        <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg relative overflow-hidden border border-outline-variant/20">
          {/* Subtle ambient gradient */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-error-container/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-tertiary-fixed/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            {/* Score & Visual Gauge */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-right gap-space-md">
              <div className="flex items-center gap-space-xs">
                <Icon name="gpp_maybe" className="text-error" />
                <span className={cx(t.labelSm, "text-on-surface-variant font-semibold")}>
                  نسبة الحفاظ على القيود الدلالية
                </span>
              </div>
              <div className="flex items-center gap-space-md">
                <span className="text-[64px] leading-none font-bold text-error tracking-tight font-headline">
                  {computedCcr.before}%
                </span>
                <div className="flex flex-col items-start gap-1">
                  <span className={cx(t.code, "text-error bg-error-container px-2 py-0.5 rounded font-semibold text-xs")}>
                    CCR Baseline
                  </span>
                  <span className={cx(t.labelSm, "text-on-surface-variant")}>انحدار خطير في المعنى</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-space-xs bg-error-container/80 text-on-error-container px-space-sm py-1.5 rounded-lg font-semibold text-xs">
                <Icon name="emergency_home" className="text-base" />
                <span>مستوى خطورة مرتفع • خرق للقيود الجوهرية</span>
              </div>
            </div>

            {/* Gauge & Visual Conservation Breakdown */}
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              <div className="flex items-center justify-between text-on-surface font-label-md text-label-md">
                <span className="font-semibold">توزيع الصيانة مقابل الانزياح الفلسفي</span>
                <span className={cx(t.code, "text-on-surface-variant")}>
                  {activeConstraints.length}/{constraints.length} تم فحصها
                </span>
              </div>

              {/* Dual-Tone Progress Track */}
              <div className="w-full h-5 bg-surface-container-high rounded-full overflow-hidden flex p-0.5">
                <div
                  className="h-full bg-primary rounded-r-full transition-all duration-700"
                  style={{ width: `${computedCcr.preservedPercent}%` }}
                  title={`القيود المحفوظة: ${computedCcr.preservedPercent}%`}
                />
                <div
                  className="h-full bg-error rounded-l-full transition-all duration-700"
                  style={{ width: `${computedCcr.driftPercent}%` }}
                  title={`الانزياح الدلالي والخرق: ${computedCcr.driftPercent}%`}
                />
              </div>

              {/* Legend Bar */}
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className={cx(t.bodySm, "text-on-surface")}>المحفوظ جزئياً</span>
                  </div>
                  <span className={cx(t.code, "text-primary font-bold")}>{computedCcr.preservedPercent}%</span>
                </div>
                <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-error" />
                    <span className={cx(t.bodySm, "text-on-surface")}>الانزياح الدلالي (Drift)</span>
                  </div>
                  <span className={cx(t.code, "text-error font-bold")}>{computedCcr.driftPercent}%</span>
                </div>
              </div>
            </div>

            {/* Inline Visual Stat Matrix */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-space-sm bg-surface-container-low p-space-md rounded-xl">
              <div className="flex flex-col gap-0.5">
                <span className={cx(t.code, "text-[11px] text-on-surface-variant")}>القيود المفحوصة</span>
                <span className={cx(t.h3, "text-on-surface font-bold")}>{constraints.length} قيود</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className={cx(t.code, "text-[11px] text-on-surface-variant")}>المطابقة التامة</span>
                <span className={cx(t.h3, "text-error font-bold")}>0 قيود</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className={cx(t.code, "text-[11px] text-on-surface-variant")}>القيود المنتهكة</span>
                <span className={cx(t.h3, "text-tertiary-container font-bold")}>{activeConstraints.length} متأثرة</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className={cx(t.code, "text-[11px] text-on-surface-variant")}>مؤشر الانزياح</span>
                <span className={cx(t.h3, "text-error font-bold")}>{computedCcr.driftPercent}% Drift</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Detected Semantic Violations */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="flex items-center justify-center w-7 h-7 rounded bg-error-container text-on-error-container font-bold">
              <Icon name="report_problem" className="text-base" />
            </span>
            <h2 className={cx(t.h2, "text-on-surface font-bold")}>المشكلات المكتشفة</h2>
            <span className={cx(t.code, "bg-error-container text-on-error-container px-2 py-0.5 rounded-full font-semibold text-xs mr-2")}>
              {activeConstraints.length} انحرافات
            </span>
          </div>
          <div className="flex items-center gap-space-xs text-on-surface-variant text-xs">
            <span className="w-2 h-2 rounded-full bg-error" />
            <span>يتطلب معالجة فورية قبل النشر أو الاعتماد</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {activeConstraints.map((c) => (
            <div
              key={c.id}
              className="bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-md transition-shadow p-space-md flex flex-col justify-between gap-space-md border border-outline-variant/20"
            >
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-start justify-between gap-space-sm">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-7 h-7 rounded-lg bg-error-container text-on-error-container flex items-center justify-center font-bold text-sm">
                      ✕
                    </span>
                    <div className="flex flex-col">
                      <span className={cx(t.labelSm, "text-on-surface-variant font-semibold")}>
                        {c.id}
                      </span>
                      <h3 className={cx(t.h3, "text-on-surface font-bold")}>{c.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-semibold text-xs">
                      حرج (Critical)
                    </span>
                    <span className={cx(t.code, "bg-surface-container text-on-surface px-1.5 py-0.5 rounded text-xs")}>
                      {c.matchScore}% مطابقة
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-low p-space-sm rounded-lg">
                  <p className={cx(t.labelSm, "text-error font-semibold mb-1")}>
                    «تغير المعنى الأساسي»: {c.violationReason || "انزياح عن المقصد الشرعي."}
                  </p>
                  <p className={cx(t.bodySm, "text-on-surface-variant leading-relaxed")}>
                    {c.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Proposed Repair & Semantic Comparison */}
      <section className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="flex items-center justify-center w-7 h-7 rounded bg-primary text-on-primary">
              <Icon name="auto_fix" className="text-base" />
            </span>
            <h2 className={cx(t.h2, "text-on-surface font-bold")}>الإصلاح المقترح والمقارنة الدلالية</h2>
          </div>
          <span className={cx(t.code, "text-primary font-semibold bg-primary-fixed/50 px-2 py-1 rounded text-xs")}>
            محقون بواسطة محرك القواعد المقاصدية Mawzun
          </span>
        </div>

        <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/20">
          <div className="grid grid-cols-1 lg:grid-cols-11 items-stretch">
            {/* BEFORE Pane */}
            <div className="lg:col-span-5 p-space-lg flex flex-col justify-between gap-space-md bg-surface-container-low/40">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-error-container bg-error-container px-2 py-1 rounded-md font-semibold">
                    الناتج المشوه من النموذج السابق (قبل الإصلاح)
                  </span>
                  <span className={cx(t.code, "text-on-surface-variant text-xs")}>LLM Raw Output</span>
                </div>

                <div
                  className="p-space-md bg-surface-container-lowest rounded-lg shadow-xs leading-loose font-medium text-left font-['IBM_Plex_Sans'] text-base"
                  dir={currentLangObj.dir}
                >
                  <span className="text-secondary">{output.prefix}</span>
                  <span
                    className="bg-error-container text-on-error-container px-2 py-0.5 rounded line-through decoration-error decoration-2 font-bold cursor-help mx-1"
                    title="انزياح دلالي: استبدال النية بالنتائج"
                  >
                    {output.drift}
                  </span>
                  <span className="text-secondary">{output.suffix}</span>
                </div>

                <div className="flex items-start gap-space-xs p-space-sm bg-error-container/40 rounded-lg">
                  <Icon name="error_outline" className="text-error text-base shrink-0 mt-0.5" />
                  <p className={cx(t.bodySm, "text-on-error-container leading-relaxed")}>
                    {output.explanation}
                  </p>
                </div>
              </div>

              <div className={cx(t.code, "flex items-center gap-space-xs text-on-surface-variant text-xs pt-space-xs")}>
                <Icon name="close" className="text-sm text-error" />
                <span>CCR النتيجة السابقة: {computedCcr.before}% • نسبة المخاطرة: حرجة</span>
              </div>
            </div>

            {/* Bridge in Middle */}
            <div className="lg:col-span-1 bg-surface-container-high/60 flex flex-col items-center justify-center p-space-sm gap-2">
              <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
                <Icon name="sync_alt" className="text-lg" />
              </div>
              <span className="text-[11px] text-primary font-bold text-center leading-tight">
                تطبيق موجهات القيود المقاصدية
              </span>
            </div>

            {/* AFTER Pane */}
            <div className="lg:col-span-5 p-space-lg flex flex-col justify-between gap-space-md bg-primary-container/5">
              <div className="flex flex-col gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-primary font-bold bg-primary-fixed px-2 py-1 rounded-md">
                    الناتج الموزون بعد فرض القيود الدلالية (المقترح)
                  </span>
                  <span className={cx(t.code, "text-primary font-semibold text-xs")}>Mawzun Balanced</span>
                </div>

                <div
                  className="p-space-md bg-surface-container-lowest rounded-lg shadow-xs leading-loose font-medium text-left font-['IBM_Plex_Sans'] text-base"
                  dir={currentLangObj.dir}
                >
                  <p className="text-on-surface font-semibold">&ldquo;{output.repaired}&rdquo;</p>
                </div>

                <div className="flex items-start gap-space-xs p-space-sm bg-primary/10 rounded-lg">
                  <Icon name="verified" className="text-primary text-base shrink-0 mt-0.5" />
                  <p className={cx(t.bodySm, "text-primary font-medium leading-relaxed")}>
                    تمت صيانة كامل القيود الدلالية المعتمدة واستعادة السلامة الاصطلاحية وفق المعاجم الشرعية.
                  </p>
                </div>
              </div>

              <div className={cx(t.code, "flex items-center gap-space-xs text-primary text-xs pt-space-xs")}>
                <Icon name="check_circle" className="text-sm" />
                <span className="font-semibold">CCR النتيجة المقترحة: {computedCcr.after}% • متوافق مع المعتمد</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Re-check Benchmark & Improvement Metrics */}
      <section className="w-full">
        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg border border-outline-variant/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
            {/* Title & Action */}
            <div className="md:col-span-4 flex flex-col gap-2">
              <div className="flex items-center gap-space-xs">
                <Icon name="fact_check" className="text-primary text-xl" />
                <h3 className={cx(t.h3, "text-on-surface font-bold")}>إعادة الفحص الدلالي التلقائي</h3>
              </div>
              <span className={cx(t.code, "text-on-surface-variant text-xs")}>Re-check Evaluation Benchmark</span>
              <p className={cx(t.bodySm, "text-on-surface-variant leading-relaxed")}>
                تمت إعادة تشغيل نموذج التحقق الدلالي فور تطبيق الإصلاح ومطابقة المعاجم والمحددات الأصولية.
              </p>
              <button
                type="button"
                onClick={runRecheck}
                disabled={isRechecking}
                className={cx(
                  "mt-2 flex items-center justify-center gap-2 rounded-lg bg-surface-container px-4 py-2.5 font-label-md text-xs font-bold text-on-surface transition-all hover:bg-surface-container-high",
                  isRechecking && "opacity-50 cursor-wait",
                )}
              >
                <Icon name={isRechecking ? "hourglass_empty" : "refresh"} className={cx("text-base", isRechecking && "animate-spin")} />
                {isRechecking ? "جاري إعادة التدقيق..." : "إعادة تشغيل الفحص الآن"}
              </button>
            </div>

            {/* Metric 1: New CCR */}
            <div className="md:col-span-3 bg-surface-container-low rounded-xl p-space-md flex items-center justify-between">
              <div className="flex flex-col">
                <span className={cx(t.code, "text-[11px] text-on-surface-variant font-medium")}>
                  نسبة الحفظ الدلالي (CCR)
                </span>
                <span className="text-[36px] text-primary font-bold font-headline leading-tight">
                  {computedCcr.after}%
                </span>
                <span className={cx(t.labelSm, "text-primary font-semibold")}>ممتاز • متوافق شرعياً ودلالياً</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <Icon name="verified" className="text-2xl" filled />
              </div>
            </div>

            {/* Metric 2: Delta Leap */}
            <div className="md:col-span-2 bg-surface-container-low rounded-xl p-space-md flex flex-col justify-center">
              <span className={cx(t.code, "text-[11px] text-on-surface-variant font-medium")}>
                معدل التحسن (Delta)
              </span>
              <div className="flex items-center gap-1 my-1">
                <Icon name="trending_up" className="text-primary text-xl font-bold" />
                <span className={cx(t.h3, "text-primary font-bold")}>Repair Δ +{computedCcr.delta}%</span>
              </div>
              <span className={cx(t.labelSm, "text-secondary font-medium")}>قفزة نوعية في سلامة المعنى</span>
            </div>

            {/* Status Highlights */}
            <div className="md:col-span-3 bg-primary/10 rounded-xl p-space-md flex flex-col gap-space-xs justify-center">
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className={cx(t.labelSm, "text-primary font-bold")}>
                  حالة القيود: مستردة كاملة ({activeConstraints.length}/{activeConstraints.length})
                </span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className={cx(t.labelSm, "text-on-surface font-medium")}>الطلاقة اللغوية والاتساق: 99%</span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className={cx(t.labelSm, "text-on-surface font-medium")}>خلو تام من الهلوسة الدلالية</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Floating Bottom Navigation */}
      <StageNav
        status={`تم التحقق من مطابقة الإصلاح المقترح بنسبة ${computedCcr.after}% • جاهز للاعتماد`}
        hint="المرحلة التالية: تصدير شهادة التدقيق واستعراض المخرج النهائي الموزون."
        nextLabel="عرض النتيجة النهائية"
      />
    </div>
  );
}
