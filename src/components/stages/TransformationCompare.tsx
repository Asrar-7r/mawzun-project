"use client";

import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";
import { useWorkflow } from "@/context/WorkflowContext";
import { LANGUAGES, LanguageCode } from "@/lib/semanticEngine";
import { useToast } from "@/context/ToastContext";

export function TransformationCompare() {
  const { currentPreset, transform, language, setLanguage, computedCcr } = useWorkflow();
  const { toast } = useToast();

  const modeOutputs = currentPreset.outputs[transform] || currentPreset.outputs.translate;
  const output = modeOutputs[language] ?? modeOutputs["en-US"];

  const currentLangObj = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <div className="flex flex-col gap-space-lg w-full">
      {/* Language Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-container-lowest p-3 shadow-sm border border-outline-variant/20">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-fixed/40 text-primary">
            <Icon name="translate" className="text-base" />
          </span>
          <span className={cx(t.labelSm, "font-bold text-on-surface")}>
            معاينة لغة المخرج ({currentLangObj.name}):
          </span>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-lg">
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code as LanguageCode);
                  toast({
                    title: `تم تبديل لغة المعاينة إلى: ${lang.name}`,
                    variant: "info",
                  });
                }}
                className={cx(
                  "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs transition-all",
                  t.labelSm,
                  isActive
                    ? "bg-surface-container-lowest text-primary font-bold shadow-xs"
                    : "text-secondary hover:text-on-surface hover:bg-surface-container",
                )}
              >
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                {lang.name}
                <span className={cx(t.code, "text-[10px]", isActive ? "text-primary" : "text-outline")}>
                  {lang.short}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid w-full grid-cols-1 items-stretch gap-space-md lg:grid-cols-2">
        {/* Column 1: Canonical source */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm border border-outline-variant/20">
          <span className="absolute inset-x-0 top-0 h-1 bg-primary" />
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-sm">
              <span className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-fixed/40 text-primary">
                  <Icon name="verified" className="text-lg" filled />
                </span>
                <span className="flex flex-col">
                  <span className="flex items-center gap-2">
                    <span className={cx(t.h3, "font-bold text-on-surface")}>النص الأصلي</span>
                    <span
                      className={cx(
                        "rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary",
                        t.labelSm,
                      )}
                    >
                      المرجع الدلالي المعتمد
                    </span>
                  </span>
                  <span className={cx(t.bodySm, "text-outline")}>
                    {currentPreset.source} • اللغة العربية
                  </span>
                </span>
              </span>
              <Icon name="menu_book" className="text-2xl text-primary/40" />
            </div>

            <div className="flex flex-col gap-space-sm rounded-xl bg-surface-container-low/60 p-space-lg">
              <div className="flex items-center justify-between text-outline">
                <span className={t.code}>نص المتن الشرعي</span>
                <span className={t.labelSm}>{currentPreset.authenticity}</span>
              </div>
              <p
                dir="rtl"
                className={cx(
                  t.h2,
                  "select-all py-space-sm text-center font-bold leading-loose tracking-wide text-on-surface",
                )}
              >
                {currentPreset.text}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-space-xs">
                <span
                  className={cx(
                    "inline-flex items-center gap-1 rounded-full bg-primary-fixed/30 px-3 py-1 font-semibold text-primary",
                    t.label,
                  )}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  المجال: {currentPreset.category}
                </span>
                <span
                  className={cx(
                    "inline-flex items-center gap-1 rounded-full bg-surface-container px-2.5 py-1 text-secondary",
                    t.code,
                  )}
                >
                  مطابقة المكنز: 100%
                </span>
              </div>
            </div>

            <div className="space-y-space-xs pt-space-xs">
              <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-2.5 text-secondary text-xs">
                <span className="flex items-center gap-1.5 font-medium text-on-surface">
                  <Icon name="check_circle" className="text-sm text-primary" />
                  استخلاص المعالم الدلالية:
                </span>
                <span className={cx(t.code, "font-bold text-primary")}>مكتمل (4/4 محددات)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Unconstrained Raw LLM vs Mawzun Guarded */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm border border-outline-variant/20">
          <span className="absolute inset-x-0 top-0 h-1 bg-tertiary" />
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-sm">
              <span className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-tertiary-fixed text-tertiary">
                  <Icon name="warning" className="text-lg" filled />
                </span>
                <span className="flex flex-col">
                  <span className="flex items-center gap-2">
                    <span className={cx(t.h3, "font-bold text-on-surface")}>
                      مخرج النموذج غير المقيد
                    </span>
                    <span
                      className={cx(
                        "rounded-full bg-error-container px-2 py-0.5 font-semibold text-error",
                        t.labelSm,
                      )}
                    >
                      رُصد انزياح دلالي (Drift)
                    </span>
                  </span>
                  <span className={cx(t.bodySm, "text-outline")}>
                    Mawzun-LLM-v4.2 • خام بدون طبقة أمان
                  </span>
                </span>
              </span>
              <span className={cx(t.code, "rounded bg-surface-container px-2 py-1 text-xs text-error font-bold")}>
                CCR: {computedCcr.before}%
              </span>
            </div>

            {/* Drift Output Display */}
            <div className="flex flex-col gap-space-sm rounded-xl bg-surface-container-low/60 p-space-lg">
              <div className="flex items-center justify-between text-outline">
                <span className={t.code}>صياغة النموذج الخام</span>
                <span className={cx(t.labelSm, "text-error font-semibold")}>خطأ في التحديد المقاصدي</span>
              </div>
              <div
                dir={currentLangObj.dir}
                className={cx(
                  t.h3,
                  "py-space-sm text-center font-medium leading-relaxed tracking-wide text-on-surface",
                )}
              >
                <span>{output.prefix}</span>
                <span
                  className="bg-error-container text-on-error-container px-2 py-0.5 rounded font-bold line-through decoration-error decoration-2 mx-1"
                  title="انزياح دلالي: استبدال المقصد الشرعي بالظاهر المادي"
                >
                  {output.drift}
                </span>
                <span>{output.suffix}</span>
              </div>
              <div className="flex items-start gap-2 rounded-lg bg-error-container/40 p-2.5 text-xs text-on-error-container">
                <Icon name="error_outline" className="text-base shrink-0 mt-0.5 text-error" />
                <p className="leading-relaxed">
                  {output.explanation}
                </p>
              </div>
            </div>

            {/* Guarded Preview Callout */}
            <div className="flex flex-col gap-2 rounded-xl bg-primary-fixed/20 p-3.5 border border-primary/20">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-primary flex items-center gap-1.5">
                  <Icon name="verified_user" className="text-sm" />
                  الصياغة المحمية الجاهزة للمرحلة التالية:
                </span>
                <span className={cx(t.code, "text-primary font-bold")}>CCR {computedCcr.after}%</span>
              </div>
              <p dir={currentLangObj.dir} className="text-sm font-semibold text-on-surface leading-relaxed">
                &ldquo;{output.repaired}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}