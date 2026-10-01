import { PageShell } from "@/components/ui/PageShell";
import { StudioWorkspace } from "@/components/studio/StudioWorkspace";

export const metadata = {
  title: "استوديو موزون الدلالي | الحوكمة الشرعية",
  description:
    "استوديو موحد ورشيق للحوكمة الدلالية والأمان المقاصدي لنماذج الذكاء الاصطناعي التوليدي.",
};

export default function StudioPage() {
  return (
    <PageShell width="7xl">
      <StudioWorkspace />
    </PageShell>
  );
}
