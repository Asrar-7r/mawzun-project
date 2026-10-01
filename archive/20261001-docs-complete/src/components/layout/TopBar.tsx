"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";
import { stageFromPath } from "@/lib/stages";
import { t } from "@/lib/typography";

function Crumb({ children }: { children: React.ReactNode }) {
  return <span className="hover:text-on-surface transition-colors">{children}</span>;
}

export function TopBar() {
  const pathname = usePathname();
  const current = stageFromPath(pathname);

  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex h-16 items-center justify-between bg-surface-container-lowest/90 px-gutter shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl lg:right-64">
      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-space-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-fixed/40 text-primary">
            <Icon name="verified_user" className="text-xl" filled />
          </span>
          <div className="flex flex-col pr-space-xs">
            <span className="flex items-center gap-space-xs">
              <span className={cx(t.h3, "font-bold tracking-tight text-primary")}>
                موزون
              </span>
              <span
                className={`${t.code} rounded bg-surface-container px-space-xs py-0.5 text-[10px] text-secondary`}
              >
                v2.4
              </span>
            </span>
            <span className={`${t.labelSm} font-normal text-on-surface-variant`}>
              طبقة الأمان الدلالي
            </span>
          </div>
        </div>

        <div className="hidden h-4 w-px bg-surface-container-high md:block" />

        <div
          className={`hidden items-center gap-space-xs ${t.label} text-on-surface-variant md:flex`}
        >
          <Crumb>موزون</Crumb>
          <Icon name="chevron_left" className="text-sm text-outline" />
          <Crumb>مساحة العمل</Crumb>
          <Icon name="chevron_left" className="text-sm text-outline" />
          <span className="font-semibold text-primary">
            {current.ordinal} {current.title}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-space-md">
        <div
          className={`hidden items-center gap-space-xs rounded-lg bg-surface-container-low px-space-sm py-1.5 text-on-surface-variant sm:flex ${t.bodySm}`}
        >
          <Icon name="search" className="text-base text-outline" />
          <span className="text-outline">بحث في القواعد والضوابط...</span>
          <kbd
            className={`${t.code} rounded bg-surface-container-lowest px-1 text-[10px] text-outline`}
          >
            ⌘K
          </kbd>
        </div>
        <button
          type="button"
          aria-label="الإشعارات"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high"
        >
          <Icon name="notifications" className="text-lg" />
          <span className="absolute top-2 left-2 h-2 w-2 rounded-full bg-tertiary-container ring-2 ring-surface-container-lowest" />
        </button>
        <button
          type="button"
          aria-label="الإعدادات"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high"
        >
          <Icon name="tune" className="text-lg" />
        </button>
      </div>
    </header>
  );
}