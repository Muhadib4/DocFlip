import type { ToolDefinition } from "../converter/types";
export const tools: ToolDefinition[] = [
  { id: "pdf-to-word", name: "PDF to Word", inputFormat: "pdf", outputFormat: "docx", description: "Turn PDF text into an editable Word document." },
  { id: "word-to-pdf", name: "Word to PDF", inputFormat: "docx", outputFormat: "pdf", description: "Turn a Word document into a PDF." },
];
export const futureTools = ["Merge PDF", "Split PDF", "Compress PDF", "PDF to Image", "Image to PDF"];
