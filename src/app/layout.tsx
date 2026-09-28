import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DocFlip — PDF to Word & Word to PDF Converter",
  description: "Convert PDF to Word and Word to PDF directly in your browser with DocFlip.",
  keywords: ["PDF to Word", "Word to PDF", "document converter", "browser converter"],
  openGraph: {
    title: "DocFlip — Flip your documents.",
    description: "Private, browser-only document conversion.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
