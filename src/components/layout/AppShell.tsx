"use client";

import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { ToastProvider } from "@/context/ToastContext";
import { WorkflowProvider } from "@/context/WorkflowContext";

/**
 * Persistent chrome shared by every stage: the stage Sidebar, the fixed TopBar
 * and the scrolling canvas, wrapped in Workflow & Toast providers.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <WorkflowProvider>
        <div className="min-h-screen bg-surface text-on-surface">
          <Sidebar />
          <div className="lg:mr-64">
            <TopBar />
            <main className="w-full min-h-screen bg-surface px-gutter pt-16 pb-margin">
              {children}
            </main>
          </div>
        </div>
      </WorkflowProvider>
    </ToastProvider>
  );
}