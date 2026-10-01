"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";
import { useWorkflow } from "@/context/WorkflowContext";
import { useToast } from "@/context/ToastContext";
import { LANGUAGES, PRESET_TEXTS, TransformType } from "@/lib/semanticEngine";

const TRANSFORM_OPTIONS: readonly {
  type: TransformType;
  title: string;
  description: string;
  meta?: string;
}[] = [
  {
    type: "translate",
    title: "ترجمة دلالية",
    description: "نقل المعنى الدلالي والاصطلاحي للغات أخرى بأمانة تامة دون إسقاط المقاصد.",
    meta: "4 لغات معتمدة",
  },
  {
    type: "summarize",
    title: "تلخيص مقاصدي",
    description: "استخلاص المقاصد والمعاني الأساسية وتكثيف الفكرة مع الحفاظ على الأصل.",
  },
  {
    type: "paraphrase",
    title: "إعادة صياغة",
    description: "إعادة بناء الصياغة الدلالية مع تثبيت المعجم والمقاصد دون تمدد بياني.",
  },
];

export function TextInputWorkspace() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    text,
    setText,
    transform,
    setTransform,
    language,
    setLanguage,
    selectPreset,
    currentPreset,
  } = useWorkflow();

  const [isCopied, setIsCopied] = useState(false);

  const selectedLanguage = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  async function handleCopy() {
    if (!text.trim()) {
      toast({ title: "النص فارغ", variant: "warning" });
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast({
        title: "تم نسخ النص إلى الحافظة بنجاح",
        description: `${text.length} حرفاً جاهزة للاستخدام.`,
        variant: "success",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast({ title: "تعذر النسخ إلى الحافظة", variant: "error" });
    }
  }

  async function handlePaste() {
    try {
      const clipboard = await navigator.clipboard.readText();
      if (clipboard) {
        setText(clipboard);
        toast({
          title: "تم لصق النص",
          description: `تم استلام ${clipboard.length} حرفاً من الحافظة.`,
          variant: "info",
        });
      }
    } catch {
      toast({
        title: "لم نتمكن من الوصول إلى الحافظة",
        description: "يرجى منح الإذن للمتصفح أو استخدام اللصق اليدوي (Ctrl+V).",
        variant: "warning",
      });
    }
  }

  function handleClear() {
    if (!text) return;
    setText("");
    toast({ title: "تم مسح المحتوى", variant: "info" });
  }

  function handleStartAnalysis() {
    if (!text.trim()) {
      toast({
        title: "يرجى إدخال النص أولاً",
        description: "لا يمكن بدء التحليل الدلالي لمحتوى فارغ.",
        variant: "error",
      });
      return;
    }
    router.push("/02-analysis");
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col justify-between gap-space-md md:flex-row md:items-end">
        <div className="space-y-space-xs">
          <span
            className={cx(
              "inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 text-primary",
              t.labelSm,
            )}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            المرحلة 01 • استلام المدخلات ومطابقة المعاجم
          </span>
          <h1 className={cx(t.h1, "tracking-tight text-on-surface")}>أدخل المحتوى</h1>
        </div>

        <div className="flex items-center gap-3 self-start rounded-xl bg-surface-container-lowest p-3 shadow-sm md:self-auto">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-container text-primary">
            <Icon name="auto_fix_high" className="text-base" />
          </span>
          <span className={cx(t.label, "flex items-center gap-2 text-on-surface-variant")}>
            <span className="font-semibold text-on-surface">إدخال المحتوى</span>
            <Icon name="west" className="text-sm text-outline" />
            <span className="font-medium text-primary">التحليل الدلالي الفوري</span>
          </span>
          <span
            className={cx(
              t.code,
              "rounded bg-primary-fixed/50 px-2 py-0.5 text-on-primary-fixed-variant",
            )}
          >
            تلقائي
          </span>
        </div>
      </div>

      {/* Preset Quick Selection Bar */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl bg-surface-container-low/60 p-2.5">
        <span className={cx(t.labelSm, "flex items-center gap-1 text-on-surface-variant font-medium pl-1")}>
          <Icon name="bookmark" className="text-sm text-primary" />
          نماذج سريعة من المكنز:
        </span>
        {PRESET_TEXTS.map((preset) => {
          const isSelected = currentPreset.id === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => selectPreset(preset.id)}
              className={cx(
                "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs transition-all",
                t.labelSm,
                isSelected
                  ? "bg-primary text-on-primary font-semibold shadow-xs"
                  : "bg-surface-container-lowest text-secondary hover:text-on-surface hover:bg-surface-container",
              )}
            >
              {isSelected && <Icon name="check" className="text-xs" />}
              {preset.title.split("(")[0].trim()}
            </button>
          );
        })}
      </div>

      {/* Workspace */}
      <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
        <div className="flex flex-col gap-space-md lg:col-span-8">
          <Card className="flex flex-col p-space-md transition-all duration-200 focus-within:shadow-md">
            {/* Toolbar */}
            <div className="-mx-space-md -mt-space-md mb-space-sm flex flex-wrap items-center justify-between gap-space-sm rounded-t-xl bg-surface-container-low/40 px-space-md pt-space-md pb-space-sm">
              <span
                className={cx(
                  t.label,
                  "flex items-center gap-1.5 rounded-lg bg-surface-container-lowest px-2.5 py-1 font-medium text-on-surface shadow-sm",
                )}
              >
                <Icon name="translate" className="text-base text-primary" />
                اللغة: العربية (المصحوبة بالتشكيل / النصوص المرجعية)
              </span>

              <div className="flex items-center gap-space-sm">
                <span
                  className={cx(t.code, "rounded bg-surface-container px-2 py-1 text-secondary")}
                  aria-live="polite"
                >
                  {text.length} حرفاً
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  title="نسخ النص إلى الحافظة"
                  className={cx(
                    t.labelSm,
                    "flex items-center gap-1 rounded px-2 py-1 transition-colors",
                    isCopied
                      ? "bg-primary-fixed/50 text-primary font-bold"
                      : "text-secondary hover:bg-surface-container-high hover:text-primary",
                  )}
                >
                  <Icon name={isCopied ? "check" : "content_copy"} className="text-sm" />
                  {isCopied ? "تم النسخ" : "نسخ"}
                </button>
                <button
                  type="button"
                  onClick={handlePaste}
                  title="لصق من الحافظة"
                  className={cx(
                    t.labelSm,
                    "flex items-center gap-1 rounded px-2 py-1 text-secondary transition-colors hover:bg-surface-container-high hover:text-primary",
                  )}
                >
                  <Icon name="content_paste" className="text-sm" />
                  لصق
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  title="مسح النص"
                  className={cx(
                    t.labelSm,
                    "flex items-center gap-1 rounded px-2 py-1 text-secondary transition-colors hover:bg-error-container/40 hover:text-error",
                  )}
                >
                  <Icon name="backspace" className="text-sm" />
                  مسح
                </button>
              </div>
            </div>

            {/* Editor */}
            <div className="relative py-space-sm">
              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                dir="rtl"
                rows={6}
                aria-label="النص المراد تحليله"
                placeholder="اكتب أو ألصق النص القرآني، الحديث، أو العبارة الفقهية هنا..."
                className={cx(
                  t.h3,
                  "w-full resize-none bg-transparent leading-loose text-on-surface placeholder:text-outline-variant focus:outline-none font-medium",
                )}
              />
            </div>

            {/* Live semantic indicator */}
            <div className="-mx-space-md -mb-space-md mt-space-sm flex flex-wrap items-center justify-between gap-space-sm rounded-b-xl bg-surface-container-low/60 px-space-md pt-space-md pb-space-md">
              <span className="flex items-center gap-space-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className={cx(t.labelSm, "font-medium text-primary")}>
                  جاهز للتحليل الدلالي • {text.trim().split(/\s+/).filter(Boolean).length} كلمات
                </span>
              </span>
              <span className={cx(t.code, "text-outline")}>Mawzun-Core-v2.4 • Canonical Ready</span>
            </div>
          </Card>

          {/* Transform options */}
          <div className="flex flex-col gap-space-sm">
            {TRANSFORM_OPTIONS.map((option) => {
              const isActive = transform === option.type;

              return (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => {
                    setTransform(option.type);
                    toast({
                      title: `تم اختيار نمط المعالجة: ${option.title}`,
                      variant: "info",
                    });
                  }}
                  aria-pressed={isActive}
                  className={cx(
                    "flex w-full items-start gap-space-sm rounded-xl p-space-sm text-right shadow-sm transition-all duration-150 border",
                    isActive
                      ? "bg-primary-fixed/20 border-primary/30"
                      : "bg-surface-container-lowest border-transparent hover:bg-surface-container-low",
                  )}
                >
                  <span
                    className={cx(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                      isActive ? "bg-primary text-on-primary" : "bg-surface-container",
                    )}
                  >
                    {isActive ? (
                      <Icon name="check" className="text-xs font-bold" filled />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-outline" />
                    )}
                  </span>

                  <span className="flex flex-1 flex-col">
                    <span className="flex items-center justify-between gap-space-xs">
                      <span className={cx(t.label, "font-semibold text-on-surface")}>
                        {option.title}
                      </span>
                      {option.meta ? (
                        <span
                          className={cx(
                            t.code,
                            "rounded bg-surface-container px-1.5 py-0.5 text-[11px] text-secondary",
                          )}
                        >
                          {option.meta}
                        </span>
                      ) : isActive ? (
                        <span
                          className={cx(
                            t.code,
                            "rounded bg-primary px-1.5 py-0.5 text-[10px] text-on-primary",
                          )}
                        >
                          نشط
                        </span>
                      ) : null}
                    </span>
                    <span className={cx(t.bodySm, "mt-0.5 text-secondary")}>
                      {option.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Target language, only meaningful when translating */}
          {transform === "translate" ? (
            <Card className="flex flex-col gap-2 p-space-md border border-primary/10">
              <div className="flex items-center justify-between text-xs text-secondary">
                <span className={cx(t.labelSm, "flex items-center gap-1.5 font-semibold text-on-surface")}>
                  <Icon name="language" className="text-base text-primary" />
                  اللغة المستهدفة للترجمة:
                </span>
                <span className={cx(t.code, "font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded")}>
                  {selectedLanguage.name} ({selectedLanguage.code})
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {LANGUAGES.map((lang) => {
                  const isActive = lang.code === language;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        toast({
                          title: `تم تحديد لغة الهدف: ${lang.name}`,
                          variant: "info",
                        });
                      }}
                      aria-pressed={isActive}
                      className={cx(
                        "flex flex-col items-center justify-center rounded-xl border p-2.5 text-xs transition-all",
                        isActive
                          ? "border-primary bg-primary-fixed/40 font-bold text-primary shadow-xs"
                          : "border-transparent bg-surface-container text-on-surface-variant hover:bg-surface-container-high",
                      )}
                    >
                      <span className="flex items-center gap-1">
                        {isActive && <Icon name="check" className="text-xs text-primary" />}
                        {lang.name}
                      </span>
                      <span
                        className={cx(
                          t.code,
                          "text-[10px] mt-0.5",
                          isActive ? "text-primary font-bold" : "text-outline",
                        )}
                      >
                        {lang.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>
          ) : null}

          {/* Execute Button */}
          <div className="flex flex-col gap-space-xs pt-space-xs">
            <button
              type="button"
              onClick={handleStartAnalysis}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-space-md py-3.5 font-label font-semibold text-on-primary shadow-sm transition-all hover:bg-primary hover:shadow-md active:scale-[0.99]"
            >
              تحليل النص والبدء
              <Icon
                name="arrow_back"
                className="text-base transition-transform group-hover:-translate-x-1"
              />
            </button>
            <span className={cx(t.bodySm, "mt-1 flex items-center gap-1.5 px-1 text-secondary")}>
              <Icon name="check_circle" className="shrink-0 text-base text-primary" />
              لن تحتاج إلى تحديد القائل أو المعنى يدويًا. Mawzun يستخرج المعلومات الدلالية تلقائيًا.
            </span>
          </div>

          {/* Reference corpus benchmark */}
          <Card className="flex items-center gap-space-sm p-space-md">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-container text-primary">
              <Icon name="dataset" className="text-xl" />
            </span>
            <span className="flex flex-col">
              <span className="flex items-center gap-2">
                <span className={cx(t.label, "font-bold text-on-surface")}>المكنز المرجعي المفتوح</span>
                <span className={cx(t.code, "text-primary")}>v4.8</span>
              </span>
              <span className={cx(t.bodySm, "text-secondary")}>
                تمت مطابقة 1.4 مليون أثر وسياق نحوي دلالي لضبط مخرجات الذكاء الاصطناعي.
              </span>
            </span>
          </Card>
        </div>

        {/* Governance banner */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          <Card className="flex flex-col gap-4 p-space-md shadow-sm">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-fixed/40 text-primary">
                <Icon name="verified_user" className="text-lg" />
              </span>
              <div className="flex flex-col">
                <span className={cx(t.label, "font-bold text-on-surface")}>
                  ميثاق الحوكمة الدلالية لنماذج الذكاء الاصطناعي
                </span>
                <span className={cx(t.bodySm, "text-secondary mt-1")}>
                  حماية دلالية موثوقة • تدقيق سياقي فوري • حفظ الأمانة العلمية للمحتوى الإسلامي
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-xl bg-surface-container-low p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-secondary font-medium">معيار الأثر المعنوي:</span>
                <span className="font-bold text-primary flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  مطابق للمعجم المعتمد
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-secondary font-medium">الزمن التقديري:</span>
                <span className={cx(t.code, "text-on-surface")}>
                  &lt; {currentPreset.latencyMs}ms
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-secondary font-medium">المصدر الشرعي:</span>
                <span className="font-medium text-on-surface truncate max-w-[170px]" title={currentPreset.source}>
                  {currentPreset.source}
                </span>
              </div>
            </div>
          </Card>

          {/* Quick Guidance Card */}
          <Card className="flex flex-col gap-2 p-space-md bg-primary-fixed/10 border border-primary/20">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Icon name="info" className="text-base" />
              <span className={t.labelSm}>إرشادات الاستخدام الفعال</span>
            </div>
            <p className={cx(t.bodySm, "text-on-surface-variant leading-relaxed")}>
              يمكنك كتابة أي نص مخصص أو تجربة النصوص المأثورة. يمر النص بسلسلة تدقيق من 6 مراحل لضمان عدم حدوث أي انزياح فلسفي أو عقدي في مخرجات النماذج اللغوية.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}