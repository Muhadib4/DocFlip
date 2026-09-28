export type DocumentFormat = "pdf" | "docx";
export type ConversionType = "pdf-to-word" | "word-to-pdf";
export type ConversionStatus = "idle" | "dragging" | "selected" | "validating" | "ready" | "processing" | "completed" | "failed";
export type AppErrorCode = "UNSUPPORTED_FILE" | "FILE_TOO_LARGE" | "EMPTY_FILE" | "INVALID_PDF" | "INVALID_DOCX" | "SCANNED_PDF" | "CONVERSION_FAILED" | "OUT_OF_MEMORY";

export interface AppError { code: AppErrorCode; message: string; }
export interface ConversionProgress { current?: number; total?: number; label: string; percent?: number; }
export interface ConversionResult { blob: Blob; filename: string; mimeType: string; size: number; }
export interface HistoryEntry { id: string; originalFilename: string; outputFilename: string; conversionType: ConversionType; timestamp: number; status: "completed" | "failed"; }
export interface ToolDefinition { id: ConversionType; name: string; inputFormat: DocumentFormat; outputFormat: DocumentFormat; description: string; }
