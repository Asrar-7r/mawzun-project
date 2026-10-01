import { NextRequest, NextResponse } from "next/server";
import { runMawzunStudioPipeline, StudioProcessRequest } from "@/lib/cloudflareAI";

export async function POST(req: NextRequest) {
  try {
    const body: StudioProcessRequest = await req.json();

    if (!body || !body.text || !body.text.trim()) {
      return NextResponse.json(
        { success: false, error: "يجب تقديم نص لإجراء التدقيق والمعالجة." },
        { status: 400 },
      );
    }

    const result = await runMawzunStudioPipeline({
      text: body.text,
      transform: body.transform || "translate",
      language: body.language || "en-US",
      customConstraints: body.customConstraints,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Studio Process API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "حدث خطأ أثناء معالجة النص عبر محرك الذكاء الاصطناعي.",
      },
      { status: 500 },
    );
  }
}
