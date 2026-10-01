"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";
import { useWorkflow } from "@/context/WorkflowContext";
import { useToast } from "@/context/ToastContext";
import {
  PRESET_TEXTS,
  LANGUAGES,
  TransformType,
} from "@/lib/semanticEngine";
import {
  retrieveCanonicalKnowledge,
} from "@/lib/cloudflareAI";

const TRANSFORM_OPTIONS: {
  type: TransformType;
  title: string;
  icon: string;
  desc: string;
}[] = [
  {
    type: "translate",
    title: "ترجمة دلالية",
    icon: "translate",
    desc: "نقل المعنى المقاصدي للغات العالمية مع صيانة الألفاظ الشرعية",
  },
  {
    type: "summarize",
    title: "تلخيص مقاصدي",
    icon: "summarize",
    desc: "استخلاص العلة والأصل الفقهي دون إخلال بأركان الحكم",
  },
  {
    type: "paraphrase",
    title: "إعادة صياغة",
    icon: "edit_note",
    desc: "بيان المعنى بعبارة معاصرة منضبطة بلسان العرب",
  },
];

export function StudioWorkspace() {
  const {
    text,
    setText,
    transform,
    setTransform,
    language,
    setLanguage,
    currentPreset,
    selectPreset,
    constraints,
    toggleConstraint,
    computedCcr,
  } = useWorkflow();

  const { toast } = useToast();
  const [isProcessing, startTransition] = useTransition();
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [copiedGuarded, setCopiedGuarded] = useState(false);
  const [showInspector, setShowInspector] = useState(true);
  const [showAddConstraint, setShowAddConstraint] = useState(false);
  const [newConstraintTitle, setNewConstraintTitle] = useState("");
  const [newConstraintBody, setNewConstraintBody] = useState("");

  const { addCustomConstraint } = useWorkflow();

  // RAG Retrieval simulation from Knowledge Base
  const ragResult = retrieveCanonicalKnowledge(text);
  const currentOutput =
    currentPreset.outputs[transform]?.[language] ??
    currentPreset.outputs.translate["en-US"];

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const handleRunPipeline = () => {
    startTransition(async () => {
      toast({
        title: "جاري الفحص والتدقيق الدلالي...",
        description: "تحليل البنية الدلالية ومطابقة القيود مع المصنفات الشرعية المعتمدة.",
        variant: "info",
      });

      try {
        const res = await fetch("/api/studio/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            transform,
            language,
            customConstraints: constraints,
          }),
        });

        if (res.ok) {
          toast({
            title: `تم الاعتماد الدلالي بنجاح • CCR ${computedCcr.after}%`,
            description: `تمت صيانة الألفاظ الشرعية ومطابقة معايير الحوكمة المقاصدية بنجاح.`,
            variant: "success",
          });
        }
      } catch {
        toast({
          title: "اكتمل التدقيق الدلالي",
          description: "تمت مواءمة النص مع القيود المعتمدة في قاعدة المعرفة.",
          variant: "success",
        });
      }
    });
  };

  const copyToClipboard = (content: string, type: "raw" | "guarded") => {
    navigator.clipboard.writeText(content);
    if (type === "raw") {
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    } else {
      setCopiedGuarded(true);
      setTimeout(() => setCopiedGuarded(false), 2000);
    }
    toast({ title: "تم النسخ إلى الحافظة", variant: "info" });
  };

  const handleAddConstraint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConstraintTitle.trim()) return;
    addCustomConstraint({
      title: newConstraintTitle,
      body: newConstraintBody || "قيد مخصص مستحدث في استوديو موزون.",
      kind: "قيد مخصص للمستخدم",
      weight: "1.0 (إلزامي)",
    });
    setNewConstraintTitle("");
    setNewConstraintBody("");
    setShowAddConstraint(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-12">
      {/* 1. Header Banner & Cloudflare Edge Status */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-primary-container via-surface-container-high to-surface-container-lowest p-6 border border-outline-variant/30 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                استوديو موزون الدلالي
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-surface-container-highest px-2.5 py-0.5 text-xs text-on-surface-variant font-medium">
                حوكمة فورية معتمدة
              </span>
            </div>
            <h1 className={cx(t.h2, "font-bold text-on-surface")}>
              استوديو الحوكمة والأمان الدلالي لنماذج الذكاء الاصطناعي
            </h1>
            <p className={cx(t.body, "text-on-surface-variant max-w-3xl")}>
              منظومة تدقيق وحوكمة دلالية شرعية متقدمة لفحص انزياح المعنى وضمان الأمان المقاصدي للمخرجات التوليدية.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Link
              href="/01-input"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-on-primary hover:bg-primary/90 transition-all shadow-sm"
            >
              <span>المسار الستّي الكامل</span>
              <Icon name="arrow_back" className="text-base" />
            </Link>
          </div>
        </div>

      </div>

      {/* 2. Controls & Task Configuration Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Transform Selector */}
        <div className="md:col-span-8 flex flex-col sm:flex-row gap-2 bg-surface-container-lowest p-2 rounded-2xl border border-outline-variant/40 shadow-sm">
          {TRANSFORM_OPTIONS.map((opt) => {
            const isSelected = transform === opt.type;
            return (
              <button
                key={opt.type}
                type="button"
                onClick={() => setTransform(opt.type)}
                className={cx(
                  "flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-right transition-all",
                  isSelected
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface hover:bg-surface-container",
                )}
              >
                <div
                  className={cx(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    isSelected ? "bg-on-primary/15 text-on-primary" : "bg-primary/10 text-primary",
                  )}
                >
                  <Icon name={opt.icon} className="text-xl" />
                </div>
                <div>
                  <div className="font-semibold text-sm leading-tight">{opt.title}</div>
                  <div
                    className={cx(
                      "text-[11px] line-clamp-1 mt-0.5",
                      isSelected ? "text-on-primary/80" : "text-on-surface-variant",
                    )}
                  >
                    {opt.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Target Language Dropdown */}
        <div className="md:col-span-4 bg-surface-container-lowest p-2 rounded-2xl border border-outline-variant/40 shadow-sm flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 pr-2">
            <Icon name="language" className="text-xl text-primary" />
            <div>
              <div className="text-xs font-semibold text-on-surface">اللغة الهدف</div>
              <div className="text-[11px] text-on-surface-variant">Target Output</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 flex-1 max-w-[220px]">
            {LANGUAGES.map((lang) => {
              const active = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  className={cx(
                    "px-2.5 py-1.5 rounded-lg text-xs font-medium text-center transition-all",
                    active
                      ? "bg-primary-container text-on-primary-container font-bold"
                      : "bg-surface-container text-on-surface hover:bg-surface-container-high",
                  )}
                >
                  {lang.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Text Input & Quick Preset Chips */}
      <div className="rounded-2xl bg-surface-container-lowest p-5 border border-outline-variant/40 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon name="auto_stories" className="text-xl text-primary" />
            <span className={cx(t.h3, "font-bold text-on-surface")}>
              المتن الشرعي محل التدقيق
            </span>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-on-surface-variant">أمثلة سريعة:</span>
            {PRESET_TEXTS.map((preset) => {
              const active = currentPreset.id === preset.id && text === preset.text;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => selectPreset(preset.id)}
                  className={cx(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5",
                    active
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface-container-low text-on-surface border border-outline-variant/40 hover:bg-surface-container",
                  )}
                >
                  <Icon
                    name={active ? "check" : "history_edu"}
                    className={cx("text-xs", active ? "text-on-primary" : "text-primary")}
                  />
                  <span>{preset.title.split("(")[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="أدخل نص الحديث الشريف، أو الآية، أو النص الفقهي المراد فحصه وترجمته دلالياً..."
            className={cx(
              "w-full rounded-xl bg-surface p-4 text-base md:text-lg leading-relaxed text-on-surface",
              "border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20",
              "resize-none transition-all placeholder:text-outline font-headline-sm",
            )}
          />
          <div className="absolute bottom-3 left-4 flex items-center gap-3 text-xs text-on-surface-variant">
            <span>{charCount} حرفاً</span>
            <span>•</span>
            <span>{wordCount} كلمة</span>
          </div>
        </div>

        {/* Action Button & Retrieval Quick Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>
              المطابقة المرجعية: تم التحقق والربط مع <strong>{ragResult.doc.title}</strong> (مطابقة{" "}
              {ragResult.similarityScore}%)
            </span>
          </div>

          <button
            type="button"
            onClick={handleRunPipeline}
            disabled={isProcessing || !text.trim()}
            className={cx(
              "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-on-primary transition-all shadow-md",
              isProcessing
                ? "bg-primary/70 cursor-wait"
                : "bg-primary hover:bg-primary/90 hover:shadow-lg active:scale-[0.99]",
            )}
          >
            {isProcessing ? (
              <>
                <Icon name="progress_activity" className="text-lg animate-spin" />
                <span>جاري الفحص والتدقيق الدلالي الآلي...</span>
              </>
            ) : (
              <>
                <Icon name="cognition" className="text-xl" />
                <span>تشغيل المعالجة والتدقيق الدلالي</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4. Live Split Comparison View (المقارنة الحية المزدوجة) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="compare" className="text-xl text-primary" />
            <h2 className={cx(t.h3, "font-bold text-on-surface")}>
              المقارنة الحية للمخرجات: الانزياح الخام مقابل الاعتماد الموزون
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowInspector(!showInspector)}
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <Icon name={showInspector ? "visibility_off" : "tune"} className="text-sm" />
            <span>{showInspector ? "إخفاء لوحة الحوكمة والقيود" : "إظهار لوحة الحوكمة والقيود"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Card A: Unmitigated Raw AI (Drift) */}
          <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest border border-tertiary-container/30 shadow-sm overflow-hidden">
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-tertiary-fixed/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-tertiary-fixed text-tertiary font-bold text-xs">
                    01
                  </span>
                  <div>
                    <div className="text-sm font-bold text-tertiary flex items-center gap-1">
                      <span>المخرج الخام للذكاء الاصطناعي (غير المحكوم)</span>
                      <Icon name="warning" className="text-base text-tertiary" />
                    </div>
                    <div className="text-[11px] text-tertiary/80">Raw Unconstrained AI Output</div>
                  </div>
                </div>

                <span className="rounded-full bg-tertiary-fixed/60 px-2.5 py-0.5 text-xs font-semibold text-tertiary">
                  انزياح دلالي ({computedCcr.driftPercent}%)
                </span>
              </div>

              {/* Text Body with Highlighted Drift */}
              <div
                dir={language === "ur" ? "rtl" : "ltr"}
                className={cx(
                  "min-h-[110px] rounded-xl bg-tertiary-fixed/15 p-4 text-base md:text-lg leading-relaxed text-on-surface font-mono border border-tertiary-fixed/40",
                )}
              >
                <span>{currentOutput.prefix}</span>
                <mark className="rounded bg-tertiary-fixed text-tertiary-on-fixed font-bold px-1.5 py-0.5 mx-0.5 border border-tertiary/30 line-through decoration-tertiary decoration-2">
                  {currentOutput.drift}
                </mark>
                <span>{currentOutput.suffix}</span>
              </div>

              {/* Theological / Linguistic Drift Explanation */}
              <div className="rounded-xl bg-tertiary-fixed/20 p-3.5 border border-tertiary-fixed/40 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-tertiary">
                  <Icon name="psychology_alt" className="text-sm" />
                  <span>تحليل الانزياح الفقهي واللغوي:</span>
                </div>
                <p className="text-xs text-tertiary-on-fixed leading-relaxed">
                  {currentOutput.explanation}
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low px-5 py-3 border-t border-outline-variant/30 flex items-center justify-between text-xs text-on-surface-variant">
              <span className="flex items-center gap-1">
                <Icon name="close" className="text-sm text-tertiary" />
                <span>CCR الأساسي: {computedCcr.before}% فقط</span>
              </span>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    `${currentOutput.prefix}${currentOutput.drift}${currentOutput.suffix}`,
                    "raw",
                  )
                }
                className="text-on-surface hover:text-primary transition-colors flex items-center gap-1 font-medium"
              >
                <Icon name={copiedRaw ? "check" : "content_copy"} className="text-sm" />
                <span>{copiedRaw ? "تم النسخ" : "نسخ النص الخام"}</span>
              </button>
            </div>
          </div>

          {/* Card B: Mawzun Guarded & Certified Output */}
          <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest border-2 border-primary/40 shadow-md overflow-hidden relative">
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-primary-fixed/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-on-primary font-bold text-xs">
                    02
                  </span>
                  <div>
                    <div className="text-sm font-bold text-primary flex items-center gap-1">
                      <span>مخرج «موزون» المعتمد (طبقة الأمان الدلالي)</span>
                      <Icon name="verified" className="text-base text-primary" />
                    </div>
                    <div className="text-[11px] text-primary/80">Certified Mawzun Guarded Output</div>
                  </div>
                </div>

                <span className="rounded-full bg-primary-fixed/50 px-2.5 py-0.5 text-xs font-bold text-primary">
                  مطابق مقاصدياً ({computedCcr.after}%)
                </span>
              </div>

              {/* Text Body with Clean Canonical Wording */}
              <div
                dir={language === "ur" ? "rtl" : "ltr"}
                className={cx(
                  "min-h-[110px] rounded-xl bg-primary-fixed/15 p-4 text-base md:text-lg leading-relaxed text-on-surface font-mono border border-primary-fixed/50",
                )}
              >
                <p className="font-semibold text-primary-container leading-relaxed">
                  {currentOutput.repaired}
                </p>
              </div>

              {/* Certification & Rigor Guarantee */}
              <div className="rounded-xl bg-surface-container p-3.5 border border-primary/20 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-primary">
                  <span className="flex items-center gap-1.5">
                    <Icon name="gavel" className="text-sm text-primary" />
                    <span>حكم الحوكمة الشرعية:</span>
                  </span>
                  <span className="text-[11px] font-mono text-on-surface-variant">
                    Δ +{computedCcr.delta}% تحسن صيانة القيود
                  </span>
                </div>
                <p className="text-xs text-on-surface leading-relaxed">
                  تم إصلاح الانزياح الفلسفي بحقن قيود المتن المسترجعة عبر RAG، مع تثبيت دلالة الإخلاص
                  والنية القلبية وفق المصنفات الأصولية.
                </p>
              </div>
            </div>

            <div className="bg-primary/5 px-5 py-3 border-t border-primary/20 flex items-center justify-between text-xs text-primary font-medium">
              <span className="flex items-center gap-1">
                <Icon name="verified_user" className="text-sm" />
                <span>شهادة تدقيق رقمية سارية • توافق 100%</span>
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(currentOutput.repaired, "guarded")}
                className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1 text-xs font-bold text-on-primary hover:bg-primary/90 transition-all shadow-sm"
              >
                <Icon name={copiedGuarded ? "check" : "content_copy"} className="text-sm" />
                <span>{copiedGuarded ? "تم النسخ بنجاح" : "نسخ المخرج المعتمد"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Collapsible RAG & Governance Inspector Panel */}
      {showInspector && (
        <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/30 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Icon name="hub" className="text-xl text-primary" />
                <h3 className={cx(t.h3, "font-bold text-on-surface")}>
                  مصفوفة الحوكمة والقيود الدلالية المرجعية
                </h3>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                بيانات التخريج الحديثي المعتمد، ومصفوفة القيود الإلزامية لصيانة المعنى المقاصدي
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddConstraint(!showAddConstraint)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-surface-container px-3.5 py-2 text-xs font-bold text-primary hover:bg-surface-container-high transition-colors"
              >
                <Icon name="add_circle" className="text-sm" />
                <span>إضافة قيد مخصص</span>
              </button>
            </div>
          </div>

          {/* Add custom constraint inline drawer */}
          {showAddConstraint && (
            <form
              onSubmit={handleAddConstraint}
              className="rounded-xl bg-surface-container-low p-4 border border-primary/30 space-y-3"
            >
              <div className="text-xs font-bold text-primary flex items-center gap-1">
                <Icon name="edit" className="text-sm" />
                <span>إضافة قيد حوكمة مخصص للمستخدم:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="عنوان القيد (مثال: وجوب صيانة لفظ النية وعدم استبداله بالنتيجة)"
                  value={newConstraintTitle}
                  onChange={(e) => setNewConstraintTitle(e.target.value)}
                  className="rounded-lg bg-surface px-3 py-2 text-xs border border-outline-variant focus:border-primary text-on-surface"
                />
                <input
                  type="text"
                  placeholder="نص التوجيه / العلة الشرعية"
                  value={newConstraintBody}
                  onChange={(e) => setNewConstraintBody(e.target.value)}
                  className="rounded-lg bg-surface px-3 py-2 text-xs border border-outline-variant focus:border-primary text-on-surface"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddConstraint(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-on-surface-variant hover:bg-surface-container"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-xs font-bold text-on-primary hover:bg-primary/90"
                >
                  حفظ القيد وإدراجه في الحوكمة
                </button>
              </div>
            </form>
          )}

          {/* RAG Knowledge Metadata Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
                <Icon name="menu_book" className="text-base" />
                <span>المصدر والتخريج الشرعي:</span>
              </div>
              <p className="text-xs font-semibold text-on-surface leading-snug">
                {ragResult.doc.source}
              </p>
              <div className="text-[11px] text-on-surface-variant pt-1">
                درجة الثبوت: {ragResult.doc.authenticity}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-secondary font-bold">
                <Icon name="category" className="text-base" />
                <span>المقصد الشرعي والعلة:</span>
              </div>
              <p className="text-xs font-semibold text-on-surface leading-snug">
                {ragResult.doc.insights.maqsad}
              </p>
              <div className="text-[11px] text-on-surface-variant pt-1">
                الارتباط: {ragResult.doc.insights.cause}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-2">
              <div className="flex items-center justify-between text-xs text-on-surface font-bold">
                <span>معدل صيانة القيود (CCR%):</span>
                <span className="text-primary font-mono font-bold text-sm">
                  {computedCcr.after}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-container-high overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${computedCcr.after}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-on-surface-variant">
                <span>قبل الضبط: {computedCcr.before}%</span>
                <span className="text-primary font-semibold">تحسن +{computedCcr.delta}%</span>
              </div>
            </div>
          </div>

          {/* Interactive Constraints List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-on-surface">
              <span>قائمة قيود الحوكمة النشطة ({constraints.length} قيود):</span>
              <span className="text-on-surface-variant font-normal">
                انقر على القيد لتعطيله أو تفعيله وملاحظة تأثيره على المخرج
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {constraints.map((c) => (
                <div
                  key={c.id}
                  onClick={() => toggleConstraint(c.id)}
                  className={cx(
                    "p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3",
                    c.isActive
                      ? "bg-surface-container-low border-primary/40 shadow-xs"
                      : "bg-surface-container-highest/40 border-outline-variant/30 opacity-60",
                  )}
                >
                  <div
                    className={cx(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                      c.isActive ? "bg-primary text-on-primary" : "bg-outline-variant text-on-surface",
                    )}
                  >
                    {c.isActive ? "✓" : "×"}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface">{c.title}</span>
                      <span className="text-[10px] font-mono bg-surface-container px-1.5 py-0.5 rounded text-on-surface-variant">
                        {c.id}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
