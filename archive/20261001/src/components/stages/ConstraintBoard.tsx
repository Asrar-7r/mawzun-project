"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";

type Constraint = {
  id: string;
  title: string;
  body: string;
  icon: string;
  iconClass: string;
  idClass: string;
  kind: string;
  kindClass: string;
  dotClass: string;
  weight: string;
  weightClass: string;
};

const CONSTRAINTS: readonly Constraint[] = [
  {
    id: "#SEC-01",
    title: "الحفاظ على موضوع النية",
    body: "يجب أن يبقى النص مرتبطًا بمفهوم النية والقصد القلبي، مع منع تحويله لمفاهيم مادية بحتة أو مجرد أفعال ظاهرية منفصلة عن الباعث الإيماني.",
    icon: "adjust",
    iconClass: "bg-primary-fixed/40 text-primary",
    idClass: "text-primary",
    kind: "قيد دلالي رئيسي (Inviolable Core)",
    kindClass: "text-primary",
    dotClass: "bg-primary",
    weight: "1.0 (إلزامي)",
    weightClass: "text-on-surface",
  },
  {
    id: "#SEC-02",
    title: "الحفاظ على العلاقة بين العمل والنية",
    body: "لا يجب أن ينفصل معنى العمل عن النية في أي سياق بياني، ويُشترط التلازم السببي بينهما بحرف الباء للمصاحبة والسببية الشرعية.",
    icon: "link",
    iconClass: "bg-surface-container text-secondary",
    idClass: "text-secondary",
    kind: "قيد سببي وشرطي (Causal Bound)",
    kindClass: "text-primary",
    dotClass: "bg-primary-container",
    weight: "0.98 (حرج)",
    weightClass: "text-on-surface",
  },
  {
    id: "#SEC-03",
    title: "الحفاظ على معنى «لكل امرئ ما نوى»",
    body: "يجب الحفاظ على المبدأ الفردي للجزاء والمآل؛ أن كل شخص ينال عاقبة ما نواه وقصده فقط دون تعميم الجزاء أو إسناده لأطراف أخرى.",
    icon: "scale",
    iconClass: "bg-surface-container text-secondary",
    idClass: "text-secondary",
    kind: "قيد اختصاص ومآل (Attribution)",
    kindClass: "text-primary",
    dotClass: "bg-primary-container",
    weight: "0.95 (صارم)",
    weightClass: "text-on-surface",
  },
  {
    id: "#SEC-04",
    title: "عدم إضافة معنى جديد",
    body: "حظر إقحام أي أحكام فرعية أو تفريعات فقهية زائدة لم ينص عليها المنطوق الشريف في المتن، والتصدي لأي تمدد بياني غير موثق.",
    icon: "shield",
    iconClass: "bg-error-container text-on-error-container",
    idClass: "text-error",
    kind: "مانع الهلوسة والاستطراد (Hallucination Guard)",
    kindClass: "text-error",
    dotClass: "bg-error",
    weight: "1.0 (حظر تام)",
    weightClass: "text-error",
  },
];

const COMPLIANCE_METRICS = [
  { label: "تغطية المفردات الأساسية", value: "100%", percent: 100 },
  { label: "معامل حظر الهلوسة", value: "0.00 انحراف", percent: 100 },
  { label: "الربط الشرعي المباشر", value: "99.8%", percent: 99.8 },
  { label: "التوافق مع المعايير الفقهية", value: "مطابق قطعيًا", percent: 100 },
] as const;export function ConstraintBoard() {
  const [selected, setSelected] = useState<readonly string[]>(CONSTRAINTS.map((c) => c.id));

  const activeCount = selected.length;
  const allSelected = activeCount === CONSTRAINTS.length;

  function toggle(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
  }

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
              {CONSTRAINTS.length} محددات حتمية
            </span>
          </div>
          <p className={cx(t.body, "mt-1 text-on-surface-variant")}>
            حدود دلالية مشتقة آلياً لمنع الهلوسة الدلالية أو انحراف المعنى الشرعي أثناء المعالجة
            وتوجيه النموذج اللغوي.
          </p>
        </div>

        <div className="flex items-center gap-space-xs self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSelected(CONSTRAINTS.map((c) => c.id))}
            disabled={allSelected}
            className={cx(
              t.labelSm,
              "flex items-center gap-1 rounded-lg bg-surface-container px-space-sm py-1 text-on-surface transition-colors hover:bg-surface-container-high disabled:cursor-default disabled:opacity-50",
            )}
          >
            <Icon name="select_all" className="text-xs" />
            تحديد الكل
          </button>
          <button
            type="button"
            onClick={() => setSelected([])}
            disabled={activeCount === 0}
            className={cx(
              t.labelSm,
              "flex items-center gap-1 rounded-lg bg-surface-container px-space-sm py-1 text-on-surface transition-colors hover:bg-surface-container-high disabled:cursor-default disabled:opacity-50",
            )}
          >
            <Icon name="deselect" className="text-xs" />
            إلغاء التحديد
          </button>
        </div>
      </div>{/* Constraint cards */}
      <div className="grid grid-cols-1 gap-space-md lg:grid-cols-2">
        {CONSTRAINTS.map((constraint) => {
          const isActive = selected.includes(constraint.id);

          return (
            <article
              key={constraint.id}
              onClick={() => toggle(constraint.id)}
              role="checkbox"
              tabIndex={0}
              aria-checked={isActive}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggle(constraint.id);
                }
              }}
              className={cx(
                "group flex cursor-pointer flex-col justify-between rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm transition-all hover:shadow-md",
                !isActive && "opacity-60",
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
                        مقترح تلقائيًا
                      </span>
                    </span>
                  </div>

                  <span
                    className={cx(
                      "flex h-6 w-6 items-center justify-center rounded-lg shadow-sm",
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
              </div>{/* Constraint footer */}
              <div className="mt-space-md flex flex-wrap items-center justify-between gap-space-xs rounded-xl bg-surface-container-low/60 p-space-sm pt-space-sm">
                <span className="flex items-center gap-1.5">
                  <span className={cx("h-2 w-2 rounded-full", constraint.dotClass)} />
                  <span className={cx(t.labelSm, "font-semibold", constraint.kindClass)}>
                    {constraint.kind}
                  </span>
                </span>
                <span className={cx(t.code, "flex items-center gap-1 text-secondary")}>
                  الوزن:
                  <span
                    className={cx(
                      "rounded bg-surface-container-lowest px-1.5 py-0.5 font-bold",
                      constraint.weightClass,
                    )}
                  >
                    {constraint.weight}
                  </span>
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pre-flight compliance simulation */}
      <div className="rounded-2xl bg-surface-container-low p-space-lg shadow-sm">
        <div className="flex flex-col justify-between gap-space-sm pb-space-sm md:flex-row md:items-center">
          <span className="flex items-center gap-space-sm">
            <Icon name="analytics" className="text-xl text-primary" />
            <span className={cx(t.h3, "font-bold text-on-surface")}>
              محاكاة الامتثال المسبق للنموذج اللغوي
            </span>
          </span>
          <span
            className={cx(
              t.code,
              "rounded-lg bg-surface-container-lowest px-space-sm py-1 font-semibold text-primary",
            )}
          >
            Matrix Latency: 14ms | Strict Enforcement Active
          </span>
        </div>

        <div className="grid grid-cols-1 gap-space-sm pt-space-sm md:grid-cols-4">
          {COMPLIANCE_METRICS.map((metric) => (
            <div key={metric.label} className="rounded-xl bg-surface-container-lowest p-space-sm">
              <div className={cx(t.labelSm, "mb-1 text-secondary")}>{metric.label}</div>
              <div
                className={cx(
                  t.h3,
                  "font-bold",
                  metric.percent === 100 ? "text-on-surface" : "text-primary",
                )}
              >
                {metric.value}
              </div>
              <ProgressBar value={metric.percent} className="mt-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Human approval gate */}
      <div className="relative mb-space-lg overflow-hidden rounded-2xl bg-surface-container-lowest p-space-lg shadow-md">
        <span className="absolute inset-y-0 right-0 w-2 bg-primary" />
        <div className="flex flex-col justify-between gap-space-lg lg:flex-row lg:items-center">
          <div className="flex max-w-2xl items-start gap-space-md">
            <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-on-primary shadow-sm">
              <Icon name="shield_person" className="text-2xl" filled />
            </span>
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-space-xs">
                <h3 className={cx(t.h2, "font-bold text-on-surface")}>المراجعة والاعتماد البشري</h3>
                <span
                  className={cx(
                    "rounded-full bg-secondary-container px-2.5 py-0.5 font-semibold text-on-secondary-container",
                    t.labelSm,
                  )}
                >
                  بوابة الحوكمة الإلزامية
                </span>
              </div>
              <p className={cx(t.body, "leading-relaxed text-on-surface-variant")}>
                راجع القيود أعلاه وتأكد من شموليتها قبل بدء التحويل. بمجرد الاعتماد، يلتزم النموذج بهذه
                المعايير بنسبة 100% ولا يُسمح بأي توليد خارج أطرها.
              </p>
              <div className={cx("mt-space-sm flex flex-wrap items-center gap-space-md", t.label)}>
                <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                  <Icon name="check_circle" className="text-base" />
                  القيود المعتمدة: {activeCount} من {CONSTRAINTS.length}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-outline-variant" />
                <span className="inline-flex items-center gap-1 text-secondary">
                  <Icon name="verified_user" className="text-base text-primary" />
                  حالة الرقابة: جاهز للتفويض البشري
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-space-sm">
            <button
              type="button"
              className={cx(
                t.body,
                "flex items-center justify-center gap-1.5 rounded-lg bg-surface px-space-md py-2.5 font-semibold text-primary transition-colors hover:bg-surface-container",
              )}
            >
              <Icon name="add" className="text-lg" />
              إضافة قيد مخصص
            </button>
            <button
              type="button"
              className={cx(
                t.body,
                "flex items-center justify-center gap-1.5 rounded-lg bg-surface-container-low px-space-md py-2.5 font-medium text-on-surface transition-colors hover:bg-surface-container",
              )}
            >
              <Icon name="edit_note" className="text-lg text-secondary" />
              تعديل الصياغة
            </button>
          </div>
        </div>
      </div>
    </>
  );
}