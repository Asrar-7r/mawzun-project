import { PageShell } from "@/components/ui/PageShell";
import { StudioWorkspace } from "@/components/studio/StudioWorkspace";

export const metadata = {
  title: "موزون | استوديو الحوكمة والأمان الدلالي (Gemma 4 & RAG)",
  description:
    "منصة الحوكمة الدلالية لنماذج الذكاء الاصطناعي التوليدي عبر Cloudflare Workers AI و RAG الشرعي.",
};

export default function Home() {
  return (
    <PageShell width="7xl">
      <StudioWorkspace />
    </PageShell>
  );
}