import type { ConversionProgress, ConversionResult } from "../types";
import { outputFilename } from "./file-validator";

export async function convertWordToPdf(file: File, onProgress: (progress: ConversionProgress) => void): Promise<ConversionResult> {
  const [{ renderAsync }, { default: html2canvas }, jspdfModule] = await Promise.all([import("docx-preview"), import("html2canvas"), import("jspdf")]);
  const jsPDF = jspdfModule.default;
  const host = document.createElement("div");
  host.className = "docx-render-host";
  host.setAttribute("aria-hidden", "true");
  document.body.appendChild(host);
  try {
    await renderAsync(await file.arrayBuffer(), host, undefined, { className: "docx-preview", inWrapper: true, ignoreWidth: false, breakPages: true });
    const pages = Array.from(host.querySelectorAll<HTMLElement>(".docx-preview, .docx")).filter((element) => element.scrollHeight > 0);
    const targets = pages.length ? pages : [host];
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    for (let index = 0; index < targets.length; index += 1) {
      onProgress({ current: index + 1, total: targets.length, percent: Math.round(((index + 1) / targets.length) * 100), label: `Creating PDF page ${index + 1} of ${targets.length}` });
      const canvas = await html2canvas(targets[index], { scale: 1.5, backgroundColor: "#ffffff", logging: false, useCORS: true });
      const image = canvas.toDataURL("image/jpeg", 0.92);
      const pageWidth = 210; const pageHeight = 297; const ratio = Math.min(pageWidth / (canvas.width || 1), pageHeight / (canvas.height || 1));
      const width = canvas.width * ratio; const height = canvas.height * ratio;
      if (index > 0) pdf.addPage();
      pdf.addImage(image, "JPEG", (pageWidth - width) / 2, 0, width, height, undefined, "FAST");
      canvas.width = 1; canvas.height = 1;
    }
    const blob = pdf.output("blob");
    return { blob, filename: outputFilename(file.name, "pdf"), mimeType: "application/pdf", size: blob.size };
  } finally { host.remove(); }
}
