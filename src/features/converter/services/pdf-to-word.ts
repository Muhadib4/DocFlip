import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import type { ConversionProgress, ConversionResult } from "../types";
import { outputFilename } from "./file-validator";

interface ExtractedTextItem { str: string; transform: number[]; width: number; height: number; }

export async function convertPdfToWord(file: File, onProgress: (progress: ConversionProgress) => void): Promise<ConversionResult> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/legacy/build/pdf.worker.mjs", import.meta.url).toString();
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data }).promise;
  const sections: Paragraph[][] = [];
  let extracted = 0;
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    onProgress({ current: pageNumber, total: pdf.numPages, percent: Math.round((pageNumber / pdf.numPages) * 100), label: `Processing page ${pageNumber} of ${pdf.numPages}` });
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const items = content.items.filter((item) => "str" in item && "transform" in item) as unknown as ExtractedTextItem[];
    extracted += items.reduce((sum, item) => sum + item.str.trim().length, 0);
    const lines: { y: number; items: ExtractedTextItem[] }[] = [];
    [...items].sort((a, b) => (b.transform[5] ?? 0) - (a.transform[5] ?? 0) || (a.transform[4] ?? 0) - (b.transform[4] ?? 0)).forEach((item) => {
      const y = item.transform[5] ?? 0;
      const line = lines.find((candidate) => Math.abs(candidate.y - y) < Math.max(3, item.height * 0.45));
      if (line) line.items.push(item); else lines.push({ y, items: [item] });
    });
    const paragraphs = lines.map((line) => {
      const text = line.items.sort((a, b) => (a.transform[4] ?? 0) - (b.transform[4] ?? 0)).map((item, index, all) => `${index > 0 && (item.transform[4] - (all[index - 1].transform[4] + all[index - 1].width) > 2) ? " " : ""}${item.str}`).join("").trim();
      const size = Math.max(...line.items.map((item) => item.height || 11));
      return new Paragraph({ children: [new TextRun({ text, size: Math.round(size * 1.5) })], heading: size > 20 ? HeadingLevel.HEADING_2 : undefined, spacing: { after: 100 } });
    });
    sections.push(paragraphs.length ? paragraphs : [new Paragraph("")]);
  }
  if (extracted < 12) throw new Error("SCANNED_PDF");
  const document = new Document({ sections: sections.map((children) => ({ properties: {}, children })) });
  const blob = await Packer.toBlob(document);
  return { blob, filename: outputFilename(file.name, "docx"), mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", size: blob.size };
}
