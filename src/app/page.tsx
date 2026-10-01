import { PageShell } from "@/components/ui/PageShell";
import { StudioWorkspace } from "@/components/studio/StudioWorkspace";

export const metadata = {
  title: "موزون | استوديو الحوكمة والأمان الدلالي",
  description:
    "منظومة الحوكمة والأمان الدلالي لنماذج الذكاء الاصطناعي التوليدي عند التعامل مع المحتوى الإسلامي.",
};

export default function Home() {
  return (
    <PageShell width="7xl">
      <StudioWorkspace />
    </PageShell>
  );
}