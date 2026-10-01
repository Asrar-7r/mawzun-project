"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { t } from "@/lib/typography";

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  type: "alert" | "success" | "info";
  description: string;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "رصد انزياح دلالي في النموذج v4.2",
    time: "منذ 4 دقائق",
    type: "alert",
    description: "تم كشف انحدار في نسبة صيانة القيد #SEC-01 (موضوع النية) إلى 12% قبل تطبيق الحوكمة.",
  },
  {
    id: "notif-2",
    title: "تحديث المكنز المرجعي المفتوح v4.8",
    time: "منذ ساعة",
    type: "info",
    description: "تمت مزامنة 1.4 مليون أثر وسياق نحوي دلالي لضبط مخرجات الذكاء الاصطناعي.",
  },
  {
    id: "notif-3",
    title: "اكتمال اعتماد حزمة التدقيق بنجاح",
    time: "منذ ساعتين",
    type: "success",
    description: "تم توثيق المعرف المشفر 0x9d4e…f82a_verified بنسبة توافق 92%.",
  },
];

export function NotificationsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-inverse-surface/20 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-surface-container-lowest p-4 shadow-2xl border border-outline-variant/30 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-surface-container pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-fixed/40 text-primary">
              <Icon name="notifications" className="text-base" />
            </span>
            <span className={cx(t.label, "font-bold text-on-surface")}>مركز الإشعارات الدلالية</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded-md"
            aria-label="إغلاق الإشعارات"
          >
            <Icon name="close" className="text-base" />
          </button>
        </div>

        <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto">
          {NOTIFICATIONS.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-xl p-3 bg-surface-container-low/50 hover:bg-surface-container-low transition-colors"
            >
              <span
                className={cx(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5",
                  item.type === "alert"
                    ? "bg-error-container text-error"
                    : item.type === "success"
                      ? "bg-primary-fixed text-primary"
                      : "bg-surface-container text-secondary",
                )}
              >
                <Icon
                  name={item.type === "alert" ? "warning" : item.type === "success" ? "verified" : "info"}
                  className="text-sm"
                  filled
                />
              </span>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className={cx(t.labelSm, "font-bold text-on-surface truncate")}>
                    {item.title}
                  </span>
                  <span className={cx(t.code, "text-[10px] text-outline shrink-0")}>{item.time}</span>
                </div>
                <p className={cx(t.bodySm, "text-on-surface-variant mt-0.5 leading-relaxed")}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-surface-container text-center">
          <span className={cx(t.labelSm, "text-primary font-medium cursor-pointer hover:underline")}>
            تعليم كافة التنبيهات كمقروءة
          </span>
        </div>
      </div>
    </div>
  );
}
