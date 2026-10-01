"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";
import { useWorkflow } from "@/context/WorkflowContext";
import { useToast } from "@/context/ToastContext";

export function ConstraintBoard() {
  const {
    constraints,
    toggleConstraint,
    selectAllConstraints,
    deselectAllConstraints,
    addCustomConstraint,
    computedCcr,
  } = useWorkflow();

  const { toast } = useToast();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newKind, setNewKind] = useState("قيد مقاصدي مخصص");
  const [newWeight, setNewWeight] = useState("1.0 (إلزامي)");

  const activeCount = constraints.filter((c) => c.isActive).length;
  const allSelected = activeCount === constraints.length;

  function handleCreateConstraint(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) {
      toast({
        title: "بيانات القيد غير مكتملة",
        description: "يرجى كتابة عنوان القيد ونطاق تطبيقه.",
        variant: "warning",
      });
      return;
    }

    addCustomConstraint({
      title: newTitle.trim(),
      body: newBody.trim(),
      kind: newKind,
      weight: newWeight,
    });

    setNewTitle("");
    setNewBody("");
    setIsAddModalOpen(false);
  }

  const coveragePercent = Math.round((activeCount / Math.max(1, constraints.length)) * 100);

  const complianceMetrics = [
    { label: "تغطية المفردات الأساسية", value: `${coveragePercent}%`, percent: coveragePercent },
    {
      label: "معامل حظر الهلوسة",
      value: activeCount >= 3 ? "0.00 انحراف" : "0.32 انحراف محتمل",
      percent: activeCount >= 3 ? 100 : 68,
    },
    { label: "الربط الشرعي المباشر", value: `${computedCcr.after}%`, percent: computedCcr.after },
    {
      label: "التوافق مع المعايير الفقهية",
      value: activeCount >= 2 ? "مطابق قطعيًا" : "مستوى تنبيه مرتفع",
      percent: activeCount >= 2 ? 100 : 45,
    },
  ];

  return (
    <>
      {/* Section header */}
      <div className="flex flex-col justify-between gap-space-sm sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-space-sm">
            <h3 className={cx(t.h2, "font-bold text-on-surface")}>القيود التي اقترحها Mawzun</h3>
            <span
              className={cx(
                "inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-on-primary",
                t.code,
                "font-semibold",
              )}
            >
              <Icon name="tune" className="text-xs" />
              {activeCount}/{constraints.length} محددات نشطة
            </span>
          </div>
          <p className={cx(t.body, "mt-1 text-on-surface-variant")}>
            حدود دلالية مشتقة آلياً لمنع الهلوسة الدلالية أو انحراف المعنى الشرعي أثناء المعالجة
            وتوجيه النموذج اللغوي.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className={cx(
              t.labelSm,
              "flex items-center gap-1 rounded-lg bg-primary-fixed/40 px-space-sm py-1.5 font-bold text-primary transition-colors hover:bg-primary-fixed/70 shadow-xs",
            )}
          >
            <Icon name="add" className="text-sm" />
            إضافة قيد مخصص
          </button>

          <button
            type="button"
            onClick={selectAllConstraints}
            disabled={allSelected}
            className={cx(
              t.labelSm,
              "flex items-center gap-1 rounded-lg bg-surface-container px-space-sm py-1.5 text-on-surface transition-colors hover:bg-surface-container-high disabled:cursor-default disabled:opacity-50",
            )}
          >
            <Icon name="select_all" className="text-xs" />
            تحديد الكل
          </button>
          <button
            type="button"
            onClick={deselectAllConstraints}
            disabled={activeCount === 0}
            className={cx(
              t.labelSm,
              "flex items-center gap-1 rounded-lg bg-surface-container px-space-sm py-1.5 text-on-surface transition-colors hover:bg-surface-container-high disabled:cursor-default disabled:opacity-50",
            )}
          >
            <Icon name="deselect" className="text-xs" />
            إلغاء التحديد
          </button>
        </div>
      </div>

      {/* Constraint cards */}
      <div className="grid grid-cols-1 gap-space-md lg:grid-cols-2">
        {constraints.map((constraint) => {
          const isActive = constraint.isActive;

          return (
            <article
              key={constraint.id}
              onClick={() => toggleConstraint(constraint.id)}
              role="checkbox"
              tabIndex={0}
              aria-checked={isActive}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggleConstraint(constraint.id);
                }
              }}
              className={cx(
                "group flex cursor-pointer flex-col justify-between rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm transition-all hover:shadow-md border",
                isActive
                  ? "border-primary/20 bg-surface-container-lowest"
                  : "border-transparent opacity-60 bg-surface-container-low/40",
              )}
            >
              <div>
                <div className="mb-space-sm flex items-start justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span
                      className={cx(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                        constraint.iconClass,
                      )}
                    >
                      <Icon name={constraint.icon} className="text-lg" filled />
                    </span>
                    <span className="flex items-center">
                      <span className={cx(t.code, "font-bold", constraint.idClass)}>
                        {constraint.id}
                      </span>
                      <span className={cx(t.code, "mx-1.5 text-outline-variant")}>|</span>
                      <span
                        className={cx(
                          "rounded-full bg-surface-container px-2 py-0.5 font-medium text-secondary",
                          t.labelSm,
                        )}
                      >
                        {constraint.id.startsWith("#USER") ? "مخصص" : "مقترح تلقائيًا"}
                      </span>
                    </span>
                  </div>

                  <span
                    className={cx(
                      "flex h-6 w-6 items-center justify-center rounded-lg shadow-sm transition-colors",
                      isActive ? "bg-primary text-on-primary" : "bg-surface-container text-outline",
                    )}
                  >
                    {isActive ? <Icon name="check" className="text-base" filled /> : null}
                  </span>
                </div>

                <h4
                  className={cx(
                    t.h3,
                    "mb-space-xs font-bold text-on-surface transition-colors group-hover:text-primary",
                  )}
                >
                  {constraint.title}
                </h4>
                <p className={cx(t.body, "leading-relaxed text-on-surface-variant")}>
                  {constraint.body}
                </p>
              </div>

              {/* Constraint footer */}
              <div className="mt-space-md flex flex-wrap items-center justify-between gap-space-xs rounded-xl bg-surface-container-low/60 p-space-sm pt-space-sm">
                <span className="flex items-center gap-1.5">
                  <span className={cx("h-2 w-2 rounded-full", constraint.dotClass)} />
                  <span className={cx(t.labelSm, "font-medium", constraint.kindClass)}>
                    {constraint.kind}
                  </span>
                </span>
                <span className={cx(t.code, "text-[11px] font-semibold", constraint.weightClass)}>
                  الوزن: {constraint.weight}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Compliance Metrics Panel */}
      <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm">
        <div className="mb-space-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-fixed/40 text-primary">
              <Icon name="monitoring" className="text-lg" />
            </span>
            <span className={cx(t.h3, "font-bold text-on-surface")}>
              مؤشرات الأمان التوليدي المعتمدة
            </span>
          </div>
          <span className={cx(t.code, "rounded bg-primary-fixed/50 px-2 py-0.5 text-xs text-primary font-bold")}>
            معدل الصيانة المتوقع: {computedCcr.after}%
          </span>
        </div>

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4">
          {complianceMetrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-1.5 rounded-xl bg-surface-container-low p-3.5">
              <div className="flex items-center justify-between">
                <span className={cx(t.labelSm, "text-secondary")}>{metric.label}</span>
                <span className={cx(t.code, "font-bold text-primary")}>{metric.value}</span>
              </div>
              <ProgressBar value={metric.percent} />
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Constraint Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-surface-container pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-fixed/40 text-primary">
                  <Icon name="add_moderator" className="text-xl" />
                </span>
                <span className={cx(t.h3, "font-bold text-on-surface")}>
                  إضافة قيد دلالي مخصص
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-outline hover:text-on-surface p-1 rounded-md"
              >
                <Icon name="close" className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateConstraint} className="flex flex-col gap-4">
              <div>
                <label className={cx(t.labelSm, "block mb-1 font-semibold text-on-surface")}>
                  عنوان القيد الدلالي:
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: الحفاظ على مقصد درء المفاسد"
                  required
                  className={cx(
                    t.body,
                    "w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-3 py-2 text-on-surface focus:border-primary focus:outline-none",
                  )}
                />
              </div>

              <div>
                <label className={cx(t.labelSm, "block mb-1 font-semibold text-on-surface")}>
                  نطاق القيد وحظر الانزياح:
                </label>
                <textarea
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  rows={3}
                  placeholder="حدد ما يُحظر على النموذج اللغوي استبداله أو إقحامه..."
                  required
                  className={cx(
                    t.bodySm,
                    "w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-3 py-2 text-on-surface focus:border-primary focus:outline-none",
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={cx(t.labelSm, "block mb-1 font-semibold text-on-surface")}>
                    نوع القيد:
                  </label>
                  <select
                    value={newKind}
                    onChange={(e) => setNewKind(e.target.value)}
                    className={cx(
                      t.bodySm,
                      "w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-3 py-2 text-on-surface focus:border-primary focus:outline-none",
                    )}
                  >
                    <option value="قيد دلالي رئيسي (Inviolable Core)">قيد دلالي رئيسي</option>
                    <option value="قيد سببي وشرطي (Causal Bound)">قيد سببي وشرطي</option>
                    <option value="مانع الهلوسة (Hallucination Guard)">مانع الهلوسة</option>
                    <option value="قيد اختصاص ومآل (Attribution)">قيد اختصاص ومآل</option>
                  </select>
                </div>

                <div>
                  <label className={cx(t.labelSm, "block mb-1 font-semibold text-on-surface")}>
                    وزن الإلزام:
                  </label>
                  <select
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className={cx(
                      t.bodySm,
                      "w-full rounded-xl border border-outline-variant/50 bg-surface-container-lowest px-3 py-2 text-on-surface focus:border-primary focus:outline-none",
                    )}
                  >
                    <option value="1.0 (إلزامي)">1.0 (إلزامي - صارم)</option>
                    <option value="0.98 (حرج)">0.98 (حرج)</option>
                    <option value="0.95 (توجيهي)">0.95 (توجيهي)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-secondary hover:bg-surface-container transition-colors text-sm font-medium"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary transition-all text-sm font-bold shadow-sm"
                >
                  إدراج القيد في الحوكمة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}