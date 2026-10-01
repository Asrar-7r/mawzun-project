import { PageShell } from "@/components/ui/PageShell";
import { ResultsWorkspace } from "@/components/stages/ResultsWorkspace";

export const metadata = {
  title: "06 النتيجة | موزون",
  description: "النتيجة النهائية المعتمدة وشهادة الاعتماد الدلالي الرقمية لنماذج الذكاء الاصطناعي.",
};

export default function ResultsPage() {
  return (
    <PageShell width="7xl">
      <ResultsWorkspace />
    </PageShell>
  );
}
