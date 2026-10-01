import { PageShell } from "@/components/ui/PageShell";
import { StudioWorkspace } from "@/components/studio/StudioWorkspace";

export const metadata = {
  title: "استوديو موزون الدلالي | Cloudflare Gemma 4 & RAG",
  description:
    "استوديو موحد ورشيق للحوكمة الدلالية والأمان المقاصدي لنماذج الذكاء الاصطناعي التوليدي عبر Cloudflare Workers AI.",
};

export default function StudioPage() {
  return (
    <PageShell width="7xl">
      <StudioWorkspace />
    </PageShell>
  );
}
