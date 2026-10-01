"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";
import { useToast } from "@/context/ToastContext";
import { useWorkflow } from "@/context/WorkflowContext";

export function SettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const { resetWorkflow } = useWorkflow();

  const [strictness, setStrictness] = useState<"strict" | "standard" | "permissive">("strict");
  const [autoRepair, setAutoRepair] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-inverse-surface/20 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-surface-container-lowest p-5 shadow-2xl border border-outline-variant/30 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-surface-container pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-container text-primary">
              <Icon name="tune" className="text-base" />
            </span>
            <span className={cx(t.label, "font-bold text-on-surface")}>إعدادات محرك الحوكمة</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded-md"
            aria-label="إغلاق الإعدادات"
          >
            <Icon name="close" className="text-base" />
          </button>
        </div>

        {/* Strictness Level */}
        <div className="flex flex-col gap-2">
          <span className={cx(t.labelSm, "font-semibold text-on-surface")}>
            مستوى صرامة التدقيق الشرعي (Guardrail Rigor)
          </span>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-surface-container-low rounded-xl">
            {(
              [
                { id: "strict", label: "صارم 100%", sub: "حظر أدنى انزياح" },
                { id: "standard", label: "معياري 90%", sub: "تنبيه مع إجازة" },
                { id: "permissive", label: "مرن", sub: "حوكمة إرشادية" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setStrictness(opt.id);
                  toast({
                    title: `تم ضبط مستوى الصرامة: ${opt.label}`,
                    variant: "info",
                  });
                }}
                className={cx(
                  "flex flex-col items-center justify-center py-2 px-1 rounded-lg text-center transition-all",
                  strictness === opt.id
                    ? "bg-surface-container-lowest text-primary font-bold shadow-xs"
                    : "text-secondary hover:text-on-surface",
                )}
              >
                <span className={cx(t.labelSm, "text-xs")}>{opt.label}</span>
                <span className="text-[9px] text-outline mt-0.5">{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Auto-Repair Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low/50">
          <div className="flex flex-col">
            <span className={cx(t.labelSm, "font-semibold text-on-surface")}>
              الإصلاح الدلالي الذاتي التلقائي
            </span>
            <span className={cx(t.bodySm, "text-outline text-xs mt-0.5")}>
              حقن موجهات المعاجم فور اكتشاف أي انحراف
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setAutoRepair(!autoRepair);
              toast({
                title: !autoRepair ? "تم تفعيل الإصلاح الذاتي" : "تم تعطيل الإصلاح الذاتي",
                variant: "info",
              });
            }}
            className={cx(
              "w-11 h-6 flex items-center rounded-full p-1 transition-colors",
              autoRepair ? "bg-primary justify-end" : "bg-surface-container-high justify-start",
            )}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-md" />
          </button>
        </div>

        {/* Audio feedback */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low/50">
          <div className="flex flex-col">
            <span className={cx(t.labelSm, "font-semibold text-on-surface")}>
              النطق الصوتي والتعليق
            </span>
            <span className={cx(t.bodySm, "text-outline text-xs mt-0.5")}>
              تشغيل القراءة الصوتية عند استعراض المخرجات
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={cx(
              "w-11 h-6 flex items-center rounded-full p-1 transition-colors",
              soundEnabled ? "bg-primary justify-end" : "bg-surface-container-high justify-start",
            )}
          >
            <span className="w-4 h-4 rounded-full bg-white shadow-md" />
          </button>
        </div>

        {/* Danger zone / Reset */}
        <div className="pt-2 border-t border-surface-container">
          <button
            type="button"
            onClick={() => {
              resetWorkflow();
              onClose();
            }}
            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-error hover:bg-error-container/40 transition-colors font-label-sm text-xs font-semibold"
          >
            <Icon name="restart_alt" className="text-sm" />
            استعادة ضبط المصنع ومسح البيانات المؤقتة
          </button>
        </div>
      </div>
    </div>
  );
}
