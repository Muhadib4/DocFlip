import type { AppError, DocumentFormat } from "../types";

export const MAX_FILE_SIZE = 25 * 1024 * 1024;

export function friendlyError(code: AppError["code"]): AppError {
  const messages: Record<AppError["code"], string> = {
    UNSUPPORTED_FILE: "This file type isn't supported. Choose a PDF or DOCX file.",
    FILE_TOO_LARGE: "This file is larger than the 25 MB limit.", EMPTY_FILE: "This file is empty.", INVALID_PDF: "We couldn't read this PDF. It may be damaged.", INVALID_DOCX: "We couldn't read this Word document. It may be damaged.", SCANNED_PDF: "This looks like a scanned PDF. Text recognition (OCR) isn't available in this version yet.", CONVERSION_FAILED: "We couldn't convert this document. Please try another file.", OUT_OF_MEMORY: "This document is too large or complex to process in your browser.",
  };
  return { code, message: messages[code] };
}

export function detectFormat(file: File): DocumentFormat | null {
  const extension = file.name.toLowerCase().split(".").pop();
  if (extension === "pdf" || file.type === "application/pdf") return "pdf";
  if (extension === "docx" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return "docx";
  return null;
}

export function validateFile(file: File): { format: DocumentFormat } | { error: AppError } {
  if (file.size === 0) return { error: friendlyError("EMPTY_FILE") };
  if (file.size > MAX_FILE_SIZE) return { error: friendlyError("FILE_TOO_LARGE") };
  if (file.name.toLowerCase().endsWith(".doc")) return { error: { code: "UNSUPPORTED_FILE", message: "Older .doc files aren't supported yet. Please save the file as .docx first." } };
  const format = detectFormat(file);
  return format ? { format } : { error: friendlyError("UNSUPPORTED_FILE") };
}

export function outputFilename(name: string, extension: "docx" | "pdf"): string {
  const base = name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9 _-]/g, "").trim() || "converted-document";
  return `${base}.${extension}`;
}
