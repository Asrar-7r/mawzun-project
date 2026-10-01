import { redirect } from "next/navigation";
import { FIRST_STAGE, stageHref } from "@/lib/stages";

/** The workflow always starts at stage 01. */
export default function Home() {
  redirect(stageHref(FIRST_STAGE.slug));
}