import { PageShell } from "@/components/ui/PageShell";
import { AuditWorkspace } from "@/components/stages/AuditWorkspace";

export const metadata = {
  title: "05 الفحص | موزون",
  description: "مقارنة المخرجات بالقيود المعتمدة لكشف الانزياح والهلوسة الدلالية وإصلاحها تلقائيًا.",
};

export default function AuditPage() {
  return (
    <PageShell width="7xl">
      <AuditWorkspace />
    </PageShell>
  );
}
