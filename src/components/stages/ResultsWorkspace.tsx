"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";
import { useWorkflow } from "@/context/WorkflowContext";
import { useToast } from "@/context/ToastContext";
import { LANGUAGES, LanguageCode } from "@/lib/semanticEngine";

export function ResultsWorkspace() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    currentPreset,
    transform,
    language,
    setLanguage,
    computedCcr,
    certifiedHash,
    exportJson,
    resetWorkflow,
  } = useWorkflow();

  const [isCopiedText, setIsCopiedText] = useState(false);
  const [isCopiedHash, setIsCopiedHash] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const modeOutputs = currentPreset.outputs[transform] || currentPreset.outputs.translate;
  const output = modeOutputs[language] ?? modeOutputs["en-US"];
  const currentLangObj = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  const modeTitle =
    transform === "translate"
      ? "الترجمة النهائية المعتمدة"
      : transform === "summarize"
        ? "التلخيص المقاصدي المعتمد"
        : "إعادة الصياغة المعتمدة";

  async function handleCopyHash() {
    try {
      await navigator.clipboard.writeText(certifiedHash);
      setIsCopiedHash(true);
      toast({
        title: "تم نسخ المعرف المشفر (HASH)",
        description: certifiedHash,
        variant: "success",
      });
      setTimeout(() => setIsCopiedHash(false), 2000);
    } catch {
      toast({ title: "تعذر نسخ المعرف المشفر", variant: "error" });
    }
  }

  async function handleCopyOutput() {
    try {
      await navigator.clipboard.writeText(output.repaired);
      setIsCopiedText(true);
      toast({
        title: "تم نسخ المخرج النهائي المعتمد",
        description: "جاهز للتضمين في أنظمتك وتطبيقات الذكاء الاصطناعي.",
        variant: "success",
      });
      setTimeout(() => setIsCopiedText(false), 2000);
    } catch {
      toast({ title: "تعذر نسخ النص", variant: "error" });
    }
  }

  function handleSpeak() {
    if (!("speechSynthesis" in window)) {
      toast({
        title: "خاصية القراءة الصوتية غير مدعومة",
        description: "متصفحك لا يدعم واجهة تركيب الكلام Web Speech API.",
        variant: "warning",
      });
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(output.repaired);
    utterance.lang = language;
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);

    toast({
      title: "بدء القراءة الصوتية",
      description: `اللغة: ${currentLangObj.nativeName}`,
      variant: "info",
    });
  }

  function handleStartNewAnalysis() {
    resetWorkflow();
    router.push("/01-input");
  }

  return (
    <div className="flex flex-col gap-space-lg w-full">
      {/* Top Bar & Verified Seal */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
            <span>موزون</span>
            <Icon name="chevron_left" className="text-xs text-outline" />
            <span>مساحة العمل</span>
            <Icon name="chevron_left" className="text-xs text-outline" />
            <span className="text-primary font-semibold">المرحلة 06 • النتيجة النهائية</span>
          </div>
          <div className="flex items-baseline gap-space-md mt-1">
            <h1 className={cx(t.h1, "text-on-surface tracking-tight font-bold")}>
              النتيجة النهائية المعتمدة
            </h1>
            <span className="font-code-sm text-xs px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold shadow-xs">
              PASS {computedCcr.after}%
            </span>
          </div>
          <p className={cx(t.body, "text-on-surface-variant leading-relaxed")}>
            تم تحويل المحتوى وإعادة فحص القيود الدلالية المقاصدية وضمان الحوكمة بنجاح تام.
          </p>
        </div>

        {/* Verified Semantic Guard Seal */}
        <div className="flex items-center gap-space-md bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-outline-variant/20 self-start lg:self-auto">
          <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container shrink-0">
            <Icon name="verified_user" className="text-2xl" filled />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className={cx(t.label, "font-bold text-on-surface")}>
                موثق دلالياً بواسطة Mawzun Guard
              </span>
              <span className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <div className="flex items-center gap-space-xs mt-0.5">
              <span className={cx(t.code, "text-outline text-xs")}>HASH:</span>
              <span className={cx(t.code, "text-on-surface-variant text-xs")}>{certifiedHash}</span>
              <button
                type="button"
                onClick={handleCopyHash}
                className="text-outline hover:text-primary transition-colors p-1"
                title="نسخ المعرف المشفر"
              >
                <Icon name={isCopiedHash ? "check" : "content_copy"} className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* End-to-End Pipeline Summary Bar */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-outline-variant/20 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[880px] relative px-2">
          {/* Track line behind */}
          <div className="absolute top-1/2 left-6 right-6 h-1 bg-surface-container -translate-y-1/2 z-0" />

          {/* Stage 1 */}
          <div className="flex flex-col items-center gap-1.5 relative z-10 bg-surface-container-lowest px-2">
            <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center shadow-xs">
              <Icon name="input" className="text-base" />
            </div>
            <span className={cx(t.labelSm, "font-semibold text-on-surface")}>1. إدخال النص</span>
            <span className={cx(t.code, "text-[11px] text-outline")}>0.12s</span>
          </div>

          <Icon name="arrow_back" className="text-outline-variant text-sm relative z-10" />

          {/* Stage 2 */}
          <div className="flex flex-col items-center gap-1.5 relative z-10 bg-surface-container-lowest px-2">
            <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center shadow-xs">
              <Icon name="psychology" className="text-base" />
            </div>
            <span className={cx(t.labelSm, "font-semibold text-on-surface")}>2. الفهم الدلالي</span>
            <span className={cx(t.code, "text-[11px] text-outline")}>0.35s</span>
          </div>

          <Icon name="arrow_back" className="text-outline-variant text-sm relative z-10" />

          {/* Stage 3 */}
          <div className="flex flex-col items-center gap-1.5 relative z-10 bg-surface-container-lowest px-2">
            <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center shadow-xs">
              <Icon name="rule" className="text-base" />
            </div>
            <span className={cx(t.labelSm, "font-semibold text-on-surface")}>3. صياغة القيود</span>
            <span className={cx(t.code, "text-[11px] text-outline")}>0.18s</span>
          </div>

          <Icon name="arrow_back" className="text-outline-variant text-sm relative z-10" />

          {/* Stage 4 */}
          <div className="flex flex-col items-center gap-1.5 relative z-10 bg-surface-container-lowest px-2">
            <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center shadow-xs">
              <Icon name="neurology" className="text-base" />
            </div>
            <span className={cx(t.labelSm, "font-semibold text-on-surface")}>4. توليد LLM</span>
            <span className={cx(t.code, "text-[11px] text-outline")}>0.65s</span>
          </div>

          <Icon name="arrow_back" className="text-outline-variant text-sm relative z-10" />

          {/* Stage 5 */}
          <div className="flex flex-col items-center gap-1.5 relative z-10 bg-surface-container-lowest px-2">
            <div className="w-8 h-8 rounded-full bg-error-container text-error flex items-center justify-center shadow-xs">
              <Icon name="warning" className="text-base" />
            </div>
            <span className={cx(t.labelSm, "font-semibold text-error")}>5. كشف انحراف</span>
            <span className={cx(t.code, "text-[11px] text-error font-medium")}>CCR {computedCcr.before}%</span>
          </div>

          <Icon name="arrow_back" className="text-outline-variant text-sm relative z-10" />

          {/* Stage 6 */}
          <div className="flex flex-col items-center gap-1.5 relative z-10 bg-surface-container-lowest px-2">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center shadow-xs">
              <Icon name="build_circle" className="text-base" />
            </div>
            <span className={cx(t.labelSm, "font-semibold text-on-surface")}>6. إصلاح دلالي</span>
            <span className={cx(t.code, "text-[11px] text-outline")}>0.42s</span>
          </div>

          <Icon name="arrow_back" className="text-outline-variant text-sm relative z-10" />

          {/* Stage 7 */}
          <div className="flex flex-col items-center gap-1.5 relative z-10 bg-surface-container-lowest px-2">
            <div className="w-8 h-8 rounded-full bg-primary-fixed-dim text-primary-container flex items-center justify-center shadow-xs">
              <Icon name="fact_check" className="text-base" />
            </div>
            <span className={cx(t.labelSm, "font-semibold text-on-surface")}>7. إعادة فحص</span>
            <span className={cx(t.code, "text-[11px] text-primary font-bold")}>CCR {computedCcr.after}%</span>
          </div>

          <Icon name="arrow_back" className="text-outline-variant text-sm relative z-10" />

          {/* Stage 8 */}
          <div className="flex flex-col items-center gap-1.5 relative z-10 bg-surface-container-lowest px-2">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
              <Icon name="verified" className="text-base" filled />
            </div>
            <span className={cx(t.labelSm, "font-bold text-primary-container")}>8. اعتماد موثق</span>
            <span className={cx(t.code, "text-[11px] text-primary-container font-semibold")}>مكتمل</span>
          </div>
        </div>
      </div>

      {/* Primary Layout Grid: Output Card + Metric Spotlight */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg">
        {/* Left Column -> Large Final Output Card (7 cols) */}
        <div className="xl:col-span-7 flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg relative overflow-hidden border border-outline-variant/20">
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none" />

          {/* Card Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-md z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-primary-fixed/40 text-primary-container px-3 py-1 rounded-full text-xs font-semibold">
                <Icon name="shield_with_heart" className="text-base" filled />
                {modeTitle}
              </span>

              {/* Language Switcher Tabs */}
              <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg border border-outline-variant/30">
                {LANGUAGES.map((lang) => {
                  const isActive = lang.code === language;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setLanguage(lang.code as LanguageCode)}
                      className={cx(
                        "flex items-center gap-1 px-2.5 py-1 rounded-md text-xs transition-colors",
                        isActive
                          ? "bg-surface-container-lowest text-primary font-bold shadow-xs"
                          : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60",
                      )}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      <span>{lang.name}</span>
                      <span className="text-[10px] text-secondary font-code">{lang.short}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions toolbar */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopyOutput}
                title="نسخ المخرج النهائي"
                className={cx(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                  isCopiedText
                    ? "bg-primary text-on-primary"
                    : "text-secondary hover:text-primary hover:bg-surface-container",
                )}
              >
                <Icon name={isCopiedText ? "check" : "content_copy"} className="text-lg" />
              </button>

              <button
                type="button"
                onClick={handleSpeak}
                title={isSpeaking ? "إيقاف القراءة الصوتية" : "استماع النطق الصوتي"}
                className={cx(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                  isSpeaking
                    ? "bg-primary text-on-primary animate-pulse"
                    : "text-secondary hover:text-primary hover:bg-surface-container",
                )}
              >
                <Icon name={isSpeaking ? "volume_off" : "volume_up"} className="text-lg" />
              </button>

              <button
                type="button"
                onClick={exportJson}
                title="تصدير بصيغة JSON"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:text-primary hover:bg-surface-container transition-colors"
              >
                <Icon name="data_object" className="text-lg" />
              </button>
            </div>
          </div>

          {/* Source Canonical Text Box */}
          <div className="bg-surface-container-low p-space-md rounded-xl mb-space-md z-10">
            <div className="flex items-center justify-between text-outline text-xs mb-1.5">
              <span className="flex items-center gap-1 font-semibold text-on-surface-variant">
                <Icon name="menu_book" className="text-sm text-primary" />
                النص الشرعي المرجعي (الأصل):
              </span>
              <span className={cx(t.code, "text-secondary")}>{currentPreset.source}</span>
            </div>
            <p className={cx(t.h2, "text-on-surface leading-loose font-bold")} dir="rtl">
              {currentPreset.text}
            </p>
          </div>

          {/* Certified Target Text Prominent Display */}
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-xs mb-space-md flex-1 flex flex-col justify-center z-10 border border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-primary-container font-bold tracking-wide uppercase">
                Balanced &amp; Certified Semantic Output
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-code text-primary-container bg-primary-fixed/30 px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
                Canonical Rigor
              </span>
            </div>

            <blockquote
              dir={currentLangObj.dir}
              className={cx(
                t.h2,
                "text-on-surface font-semibold leading-relaxed tracking-normal text-left font-['IBM_Plex_Sans']",
              )}
            >
              &ldquo;{output.repaired}&rdquo;
            </blockquote>
          </div>

          {/* Semantic Diff Resolution Explanation Chip */}
          <div className="bg-surface-container-high/60 p-space-sm rounded-xl flex items-center gap-space-sm z-10">
            <Icon name="published_with_changes" className="text-primary text-xl shrink-0" filled />
            <p className={cx(t.bodySm, "text-on-surface-variant leading-relaxed")}>
              <span className="font-bold text-on-surface">الإصلاح الدلالي الذاتي: </span>
              {output.explanation}
            </p>
          </div>
        </div>

        {/* Right Column -> Metric Spotlight & Certificate (5 cols) */}
        <div className="xl:col-span-5 flex flex-col gap-space-md">
          {/* Spotlight Hero Card */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-lg border border-outline-variant/20 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className={cx(t.label, "font-bold text-on-surface")}>مؤشر الحفظ المقاصدي</span>
              <span className={cx(t.code, "text-xs rounded bg-primary/10 px-2 py-0.5 text-primary font-bold")}>
                PASS CERTIFIED
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-primary/10 p-space-md">
              <div className="flex flex-col">
                <span className={cx(t.labelSm, "text-secondary")}>نسبة المطابقة النهائية (CCR)</span>
                <span className="text-[44px] font-bold text-primary font-headline leading-tight">
                  {computedCcr.after}%
                </span>
                <span className={cx(t.labelSm, "text-primary font-semibold")}>
                  أمان دلالي تام • صفر انحراف
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-md">
                <Icon name="verified" className="text-3xl" filled />
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-0.5">
                <span className={cx(t.code, "text-[11px] text-secondary")}>معامل الهلوسة</span>
                <span className={cx(t.h3, "text-primary font-bold")}>0.00% (منعدمة)</span>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-0.5">
                <span className={cx(t.code, "text-[11px] text-secondary")}>التوافق الفقهي</span>
                <span className={cx(t.h3, "text-primary font-bold")}>100% (مطابق)</span>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-0.5">
                <span className={cx(t.code, "text-[11px] text-secondary")}>الزمن الإجمالي</span>
                <span className={cx(t.h3, "text-on-surface font-bold")}>
                  {currentPreset.latencyMs + 45}ms
                </span>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl flex flex-col gap-0.5">
                <span className={cx(t.code, "text-[11px] text-secondary")}>حالة المخرج</span>
                <span className={cx(t.h3, "text-primary font-bold")}>معتمد للنشر</span>
              </div>
            </div>
          </div>

          {/* Certificate Card & Action */}
          <div className="bg-gradient-to-br from-surface-container-lowest to-surface-container-low rounded-2xl shadow-sm p-space-lg border border-primary/20 flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-sm">
                  <Icon name="workspace_premium" className="text-2xl" />
                </span>
                <div className="flex flex-col">
                  <span className={cx(t.label, "font-bold text-on-surface")}>
                    شهادة الاعتماد الدلالي الرقمية
                  </span>
                  <span className={cx(t.code, "text-[11px] text-secondary")}>
                    Mawzun Verification Certificate
                  </span>
                </div>
              </div>
              <span className={cx(t.code, "text-xs font-bold text-primary bg-primary-fixed/40 px-2 py-0.5 rounded")}>
                سارية وموثقة
              </span>
            </div>

            <p className={cx(t.bodySm, "text-on-surface-variant leading-relaxed")}>
              تمنح هذه الوثيقة ترخيصاً دلالياً يؤكد أن المحتوى المعالج خضع لجميع فحوصات الأمان الدلالي،
              وأن الناتج متطابق مع الأصول الشرعية والمعاجم المعتمدة دون أي هلوسة أو تحريف مقاصدي.
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCertModalOpen(true)}
                className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-primary-container font-label-md text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Icon name="visibility" className="text-base" />
                معاينة شهادة الاعتماد الرسمية
              </button>
              <button
                type="button"
                onClick={exportJson}
                className="py-2.5 px-3 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-xs font-semibold transition-colors flex items-center gap-1"
                title="تصدير حزمة JSON"
              >
                <Icon name="download" className="text-base" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Floating Bottom Action Bar */}
      <div className="sticky bottom-4 z-30 w-full mt-space-md">
        <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl shadow-xl p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md border border-outline-variant/20">
          {/* Status text */}
          <div className="flex items-center gap-space-sm">
            <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <div className="flex flex-col">
              <span className={cx(t.label, "text-on-surface font-bold")}>
                المحتوى معتمد ومطابق للحوكمة الدلالية بنسبة {computedCcr.after}% • جاهز للنشر
              </span>
              <span className={cx(t.bodySm, "text-on-surface-variant")}>
                تمت صيانة جميع المقاصد والضوابط المعتمدة عبر المعاجم المرجعية الموثقة.
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={exportJson}
              className="px-space-md py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Icon name="file_download" className="text-base" />
              تصدير حزمة الاعتماد (JSON)
            </button>

            <button
              type="button"
              onClick={handleStartNewAnalysis}
              className="px-space-lg py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs font-bold transition-all shadow-sm hover:shadow flex items-center gap-space-xs"
            >
              <Icon name="refresh" className="text-base" />
              بدء تحليل جديد
            </button>
          </div>
        </div>
      </div>

      {/* Official Certificate Modal */}
      {isCertModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/50 backdrop-blur-sm"
          onClick={() => setIsCertModalOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-3xl bg-surface-container-lowest p-8 shadow-2xl border-4 border-primary/20 flex flex-col gap-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <Icon name="verified_user" className="text-[280px] text-primary" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between border-b border-surface-container pb-4 z-10">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-md">
                  <Icon name="verified" className="text-3xl" filled />
                </span>
                <div>
                  <h3 className={cx(t.h2, "font-bold text-primary")}>وثيقة الاعتماد الدلالي</h3>
                  <span className={cx(t.code, "text-xs text-secondary")}>
                    Mawzun Canonical Governance Seal
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCertModalOpen(false)}
                className="text-outline hover:text-on-surface p-1 rounded-lg"
              >
                <Icon name="close" className="text-xl" />
              </button>
            </div>

            {/* Certificate Details */}
            <div className="flex flex-col gap-4 text-right z-10">
              <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-2">
                <span className={cx(t.labelSm, "text-secondary")}>النص الأصلي المُعالج:</span>
                <p className={cx(t.h3, "text-on-surface font-bold leading-relaxed")}>
                  {currentPreset.text}
                </p>
                <span className={cx(t.code, "text-xs text-outline")}>المصدر: {currentPreset.source}</span>
              </div>

              <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl flex flex-col gap-2">
                <span className={cx(t.labelSm, "text-primary font-bold")}>
                  المخرج الدلالي المعتمد ({currentLangObj.name}):
                </span>
                <p dir={currentLangObj.dir} className="text-base font-semibold text-on-surface leading-relaxed">
                  &ldquo;{output.repaired}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-surface-container-low p-2.5 rounded-lg flex flex-col">
                  <span className="text-secondary">نسبة صيانة المعنى (CCR):</span>
                  <span className="font-bold text-primary text-sm">{computedCcr.after}% (PASS)</span>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-lg flex flex-col">
                  <span className="text-secondary">المعرف المشفر (Immutable Hash):</span>
                  <span className="font-code font-bold text-on-surface text-[11px] truncate">
                    {certifiedHash}
                  </span>
                </div>
              </div>
            </div>

            {/* Certificate Footer */}
            <div className="flex items-center justify-between border-t border-surface-container pt-4 z-10 text-xs">
              <span className="text-secondary">تاريخ التوثيق: {new Date().toLocaleDateString("ar-SA")}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-semibold transition-colors flex items-center gap-1"
                >
                  <Icon name="print" className="text-sm" />
                  طباعة
                </button>
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary-container transition-colors shadow-sm"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
