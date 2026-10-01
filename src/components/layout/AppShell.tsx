import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

/**
 * Persistent chrome shared by every stage: the stage Sidebar, the fixed TopBar
 * and the scrolling canvas.
 *
 * The document is `dir="rtl"`, so the sidebar sits on the right edge and the
 * canvas is offset with a physical right margin to match the Stitch export.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Sidebar />
      <div className="lg:mr-64">
        <TopBar />
        <main className="w-full min-h-screen bg-surface px-gutter pt-16 pb-margin">
          {children}
        </main>
      </div>
    </div>
  );
}