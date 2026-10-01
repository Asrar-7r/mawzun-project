import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic", "latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "موزون | طبقة الأمان الدلالي",
  description:
    "منصة حوكمة دلالية لتحليل المحتوى الإسلامي وضمان مطابقة مخرجات نماذج الذكاء الاصطناعي للقيود الشرعية المعتمدة.",
};

export default function RootLayout(props: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${plexArabic.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Material Symbols is an icon font, not available via next/font. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full">
        <AppShell>{props.children}</AppShell>
      </body>
    </html>
  );
}