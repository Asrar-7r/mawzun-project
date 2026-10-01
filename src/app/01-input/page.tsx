import { PageShell } from "@/components/ui/PageShell";
import { TextInputWorkspace } from "@/components/stages/TextInputWorkspace";

export const metadata = {
  title: "01 إدخال النص | موزون",
};

export default function TextInputPage() {
  return (
    <PageShell>
      <TextInputWorkspace />
    </PageShell>
  );
}