"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";

const TARGET_LANGUAGES = [
  { id: "en", label: "الإنجليزية (EN)", short: "EN" },
  { id: "fr", label: "الفرنسية (FR)", short: "FR" },
  { id: "id", label: "الإندونيسية (ID)", short: "ID" },
  { id: "ur", label: "الأردو (UR)", short: "UR" },
] as const;

/**
 * Per-language model output. In every case the fluent surface form drifts from
 * the intended maqasid, which is the whole point of the audit screen.
 */
const OUTPUTS: Record<string, { prefix: string; drift: string; suffix: string; match: number }> = {
  en: { prefix: "Actions are judged by their", drift: "results.", suffix: "", match: 14 },
  fr: { prefix: "Les actes sont jugés selon leurs", drift: "résultats.", suffix: "", match: 11 },
  id: { prefix: "Amalan dinilai berdasarkan", drift: "hasilnya.", suffix: "", match: 9 },
  ur: { prefix: "کام اس نتائج کے لحاظ سے جائزے جاتے ہیں", drift: "۔", suffix: "", match: 13 },
};

export function TransformationCompare() {
  const [language, setLanguage] = useState<string>("en");
  const output = OUTPUTS[language] ?? OUTPUTS.en;

  return (
    <div className="grid w-full grid-cols-1 items-stretch gap-space-md lg:grid-cols-2">
      {/* ------------------------------------------------------- */}
      {/* Column 1: canonical source                             */}
      {/* ------------------------------------------------------- */}
      <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm transition-shadow hover:shadow-md">
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
                  صحيح البخاري • المعنى المقاصدي الأصيل • اللغة العربية
                </span>
              </span>
            </span>
            <Icon name="menu_book" className="text-2xl text-primary/40" />
          </div>

          <div className="flex flex-col gap-space-sm rounded-xl bg-surface-container-low/60 p-space-lg">
            <div className="flex items-center justify-between text-outline">
              <span className={t.code}>نص الحديث الشريف</span>
              <span className={t.labelSm}>الرواية المتفق عليها</span>
            </div>
            <p
              dir="rtl"
              className={cx(
                t.h2,
                "select-all py-space-sm text-center font-bold leading-loose tracking-wide text-on-surface",
              )}
            >
              «إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى.»
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-space-xs">
              <span
                className={cx(
                  "inline-flex items-center gap-1 rounded-full bg-primary-fixed/30 px-3 py-1 font-semibold text-primary",
                  t.label,
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                المحور الأساسي: القصد والنية القلبية (Intention / Niyyah)
              </span>
              <span
                className={cx(
                  "inline-flex items-center gap-1 rounded-full bg-surface-container px-2.5 py-1 text-secondary",
                  t.code,
                )}
              >
                وزن المعيار: 100%
              </span>
            </div>
          </div>

          <div className="space-y-space-xs pt-space-xs">
            <div className="flex items-center justify-between rounded-lg bg-surface-container-lowest p-2 text-secondary">
              <span className="flex items-center gap-1.5">
                <Icon name="format_quote" className="text-base text-primary" />
                الدلالة الوضعية لـ &quot;الأعمال بالنيات&quot;
              </span>
              <span className="font-semibold text-on-surface">صحة العمل وقبوله معلق بالباعث القلبي</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-surface-container-lowest p-2 text-secondary">
              <span className="flex items-center gap-1.5">
                <Icon name="gavel" className="text-base text-primary" />
                المحدد الدلالي الصارم
              </span>
              <span className="font-semibold text-on-surface">
                عدم المساواة بين مآل العمل الدنيوي وقصد فاعله
              </span>
            </div>
          </div>
        </div>

        <div className="-mx-space-lg -mb-space-lg mt-space-md flex items-center justify-between bg-surface-container-low/40 px-space-lg py-space-sm pt-space-md">
          <span className={cx(t.code, "flex items-center gap-1 text-secondary")}>
            <Icon name="lock" className="text-sm text-primary" />
            سلسلة التوثيق: معتمدة ومقفلة
          </span>
        </div>
      </div>{/* ------------------------------------------------------- */}
      {/* Column 2: model output                              */}
      {/* ------------------------------------------------------- */}
      <div className="relative flex flex-col justify-between overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-sm transition-shadow hover:shadow-md">
        <span className="absolute inset-x-0 top-0 h-1 bg-tertiary" />
        <div className="flex flex-col gap-space-md">
          <div className="flex items-center justify-between pb-space-sm">
            <span className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-secondary-container text-secondary">
                <Icon name="smart_toy" className="text-lg" />
              </span>
              <span className="flex flex-col">
                <span className="flex items-center gap-2">
                  <span className={cx(t.h3, "font-bold text-on-surface")}>الناتج من الذكاء الاصطناعي</span>
                  <span
                    className={cx(
                      t.code,
                      "rounded bg-surface-container-high px-2 py-0.5 font-medium text-secondary",
                    )}
                  >
                    LLM Translation v4.2
                  </span>
                </span>
                <span className="mt-1 flex items-center gap-1.5">
                  <span className={cx(t.labelSm, "ml-1 text-outline")}>اللغة الهدف:</span>
                  <span className="flex items-center gap-1 overflow-x-auto">
                    {TARGET_LANGUAGES.map((lang) => {
                      const isActive = lang.id === language;
                      return (
                        <button
                          key={lang.id}
                          type="button"
                          onClick={() => setLanguage(lang.id)}
                          aria-pressed={isActive}
                          className={cx(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] transition-colors",
                            isActive
                              ? "bg-primary font-semibold text-on-primary shadow-sm"
                              : "bg-surface-container text-secondary hover:bg-surface-container-high hover:text-on-surface",
                          )}
                        >
                          <span
                            className={cx(
                              "h-1.5 w-1.5 rounded-full",
                              isActive ? "bg-on-primary" : "bg-outline-variant",
                            )}
                          />
                          {lang.label}
                        </button>
                      );
                    })}
                  </span>
                </span>
              </span>
            </span>
          </div>

          <div className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-tertiary-container/15 px-3 py-1.5 text-tertiary">
            <Icon name="warning" className="animate-bounce text-base font-bold" />
            <span className={cx(t.labelSm, "font-bold")}>قد يحتوي على تغير دلالي</span>
          </div>{/* Generated output with drift highlighted */}
          <div className="relative flex flex-col gap-space-sm rounded-xl bg-surface-container-low/70 p-space-lg">
            <div className="flex items-center justify-between">
              <span className={cx(t.code, "text-outline")}>Generated Output</span>
              <span className={cx(t.labelSm, "flex items-center gap-1 font-semibold text-tertiary")}>
                <span className="h-2 w-2 rounded-full bg-tertiary" />
                شبهة انزياح فلسفي
              </span>
            </div>

            <div dir="ltr" className="select-all py-space-md text-left">
              <p className={cx(t.h2, "font-semibold tracking-tight text-on-surface")}>
                &quot;{output.prefix}{" "}
                <span className="relative mx-1 inline-block rounded bg-tertiary-container/20 px-2 py-0.5 font-bold text-tertiary">
                  {output.drift}
                  <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-tertiary" />
                </span>
                {output.suffix}&quot;
              </p>
            </div>

            <div dir="rtl" className="flex items-center justify-between pt-1 text-secondary">
              <span className={cx(t.code, "text-outline")}>الطلاقة النحوية: 98% (Fluent)</span>
              <span
                className={cx(
                  t.code,
                  "rounded bg-tertiary-container/10 px-2 py-0.5 font-bold text-tertiary",
                )}
              >
                المطابقة المقاصدية: {output.match}% (شديد الانحراف)
              </span>
            </div>
          </div>

          {/* Semantic inspector insight */}
          <div className="flex flex-col gap-2 rounded-xl bg-tertiary-container/10 p-space-md">
            <div className="flex items-center gap-2 font-semibold text-tertiary">
              <Icon name="policy" className="text-lg" />
              <span className={t.label}>ملاحظة الرقابة الدلالية الفورية</span>
            </div>
            <p className={cx(t.body, "leading-relaxed text-on-surface")}>
              استبدل النموذج اللغوي مفهوم <strong className="font-bold text-primary">«النيات»</strong> بـ{" "}
              <strong className="font-bold text-tertiary">«النتائج (Results)»</strong> مما يحيل المعنى إلى{" "}
              <span className="font-medium underline decoration-tertiary">البراغماتية ومذهب المنفعة الدنيوية</span>{" "}
              بدلاً من قصد الإخلاص والتعبد القلبي الباطن.
            </p>
          </div>
        </div>

        <div className="-mx-space-lg -mb-space-lg mt-space-md flex items-center justify-between bg-surface-container-low/40 px-space-lg py-space-sm pt-space-md">
          <span className={cx(t.code, "flex items-center gap-1 text-secondary")}>
            <Icon name="rule" className="text-sm text-tertiary" />
            محرّك التوليد: Mawzun-LLM-v4.2
          </span>
        </div>
      </div>
    </div>
  );
}