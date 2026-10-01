"use client";

import { PageShell } from "@/components/ui/PageShell";
import { StageNav } from "@/components/stages/StageNav";
import { ConstraintBoard } from "@/components/stages/ConstraintBoard";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";
import { useWorkflow } from "@/context/WorkflowContext";

const WORKFLOW_STEPS = [
  {
    stage: "المرحلة 01",
    badge: "مكتمل بنجاح",
    title: "توليد دلالي آلي",
    body: "استخراج الحدود والمحاور الشرعية قطعيًا",
    icon: "auto_awesome",
    state: "done",
  },
  {
    stage: "المرحلة 02 (الحالية)",
    badge: "قيد التدقيق",
    title: "مراجعة وتحكيم بشري",
    body: "المطابقة، الضبط والتثبيت الشرعي",
    icon: "fact_check",
    state: "active",
  },
  {
    stage: "المرحلة 03",
    badge: "بانتظار الاعتماد",
    title: "التحويل المقيد",
    body: "تطبيق القيود على مخرجات النموذج",
    icon: "lock",
    state: "pending",
  },
] as const;

export default function ConstraintsPage() {
  const { constraints, certifiedHash, computedCcr } = useWorkflow();

  const activeCount = constraints.filter((c) => c.isActive).length;
  const excludedCount = constraints.length - activeCount;

  return (
    <PageShell>
      {/* Status bar */}
      <div className="mb-space-md flex flex-wrap items-center justify-between gap-space-sm rounded-xl bg-surface-container-lowest p-space-sm shadow-sm border border-outline-variant/20">
        <div className="flex items-center gap-space-sm">
          <span className="flex items-center gap-1.5 rounded-lg bg-surface-container-low px-space-sm py-1">
            <span className="h-2 w-2 animate-ping rounded-full bg-primary" />
            <span className={cx(t.code, "font-semibold text-primary")}>Semantic Engine v2.4</span>
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-primary-fixed/30 px-space-sm py-1 text-primary">
            <Icon name="verified" className="text-sm" filled />
            <span className={cx(t.labelSm, "font-semibold")}>
              مستوى الأمان الدلالي: {activeCount >= 2 ? "100% صارم" : "تنبيه نقص القيود"}
            </span>
          </span>
        </div>
        <div className={cx(t.labelSm, "flex items-center gap-space-sm text-on-surface-variant")}>
          <span className="flex items-center gap-1">
            <Icon name="cloud_done" className="text-xs text-primary" />
            التزامن اللحظي نشط
          </span>
          <span className="h-1 w-1 rounded-full bg-outline-variant" />
          <span className={cx(t.code, "text-secondary")}>HASH: {certifiedHash.slice(0, 14)}</span>
        </div>
      </div>

      {/* Workflow banner */}
      <div className="mb-space-lg grid grid-cols-1 gap-space-sm md:grid-cols-3">
        {WORKFLOW_STEPS.map((step) => (
          <div
            key={step.title}
            className={cx(
              "flex items-center gap-space-sm rounded-xl p-space-md shadow-sm border",
              step.state === "active"
                ? "relative overflow-hidden bg-primary-container text-on-primary-container shadow-md border-primary"
                : step.state === "done"
                  ? "bg-surface-container-lowest border-outline-variant/20"
                  : "bg-surface-container-lowest/70 text-on-surface-variant opacity-85 border-outline-variant/20",
            )}
          >
            {step.state === "active" ? (
              <span className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-primary opacity-30" />
            ) : null}
            <span
              className={cx(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                step.state === "active"
                  ? "bg-surface-container-lowest text-primary shadow-sm"
                  : step.state === "done"
                    ? "bg-primary-fixed/40 text-primary"
                    : "bg-surface-container text-secondary",
              )}
            >
              <Icon name={step.icon} className="text-xl" filled={step.state !== "pending"} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span
                  className={cx(
                    t.labelSm,
                    "font-bold",
                    step.state === "active"
                      ? "text-primary-fixed"
                      : step.state === "done"
                        ? "text-primary"
                        : "text-secondary",
                  )}
                >
                  {step.stage}
                </span>
                <span
                  className={cx(
                    t.code,
                    "rounded px-1.5 py-0.5 text-[10px]",
                    step.state === "active"
                      ? "bg-primary-fixed text-primary font-bold"
                      : step.state === "done"
                        ? "bg-surface-container text-primary font-semibold"
                        : "bg-surface-container text-outline",
                  )}
                >
                  {step.badge}
                </span>
              </div>
              <h4 className={cx(t.label, "font-bold mt-0.5 truncate")}>{step.title}</h4>
              <p
                className={cx(
                  t.bodySm,
                  "truncate",
                  step.state === "active" ? "text-on-primary-container/80" : "text-on-surface-variant",
                )}
              >
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Page heading */}
      <div className="mb-space-lg flex flex-col justify-between gap-space-md md:flex-row md:items-end">
        <div>
          <span className="mb-1 block font-code-sm text-code-sm font-bold tracking-wide text-primary">
            الضوابط الصارمة لضبط الذكاء الاصطناعي
          </span>
          <h2 className={cx(t.h1, "font-bold text-on-surface")}>القيود الدلالية</h2>
          <p className={cx(t.bodyLg, "mt-1 max-w-3xl text-on-surface-variant")}>
            هذه هي المعلومات والمحددات المحورية التي يجب الحفاظ عليها قطعيًا أثناء التحويل والنقل
            الدلالي لمنع أي حيود فكري أو عقدي.
          </p>
        </div>
        <div className="flex items-center gap-space-sm self-start md:self-end">
          <div className="flex items-center gap-1.5 rounded-xl bg-surface-container-low px-space-md py-2 text-secondary">
            <Icon name="rule_folder" className="text-sm text-primary" />
            <span className={cx(t.bodySm, "font-semibold")}>مصفوفة القواعد:</span>
            <span className={cx(t.code, "font-bold text-primary")}>
              {activeCount} نشطة / {excludedCount} مستثناة
            </span>
          </div>
        </div>
      </div>

      <ConstraintBoard />

      <StageNav
        status={`تم اعتماد ${activeCount} قيود دلالية حاكمة • الصيانة المتوقعة ${computedCcr.after}%`}
        hint="المرحلة التالية: تطبيق القيود على مخرجات النموذج اللغوي."
        nextLabel="بدء التحويل المقيد"
      />
    </PageShell>
  );
}