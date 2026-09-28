# DocFlip

**Flip your documents.** DocFlip is a privacy-first browser utility for converting PDF to Word and Word to PDF without accounts, uploads, or a conversion backend.

## Features

- PDF → editable `.docx` with PDF.js text extraction and page-aware layout grouping.
- DOCX → `.pdf` using browser rendering, canvas capture, and jsPDF.
- Drag-and-drop and accessible file picker with local validation.
- Real progress reporting, downloadable Blob outputs, reset flow, and friendly errors.
- Local metadata history (file names, direction, timestamps); document contents are never stored.
- Light, dark, and system themes; responsive and keyboard-friendly UI.

## Browser-only architecture

All conversion runs in client-side JavaScript. There is no API route, backend, database, server action, conversion API, or uploaded document. The app is configured with `output: "export"` for static hosting and can be deployed to Vercel as a normal frontend application.

## Supported formats and limitations

Supported inputs are `.pdf` and `.docx`. Legacy `.doc` files are intentionally rejected with a clear message. Scanned PDFs are detected when little extractable text is present; OCR is not included. Browser conversion prioritizes readable text, basic structure, headings, images, and common layout, but complex layouts may look slightly different after conversion. The file-size limit is 25 MB and is configured in `src/features/converter/services/file-validator.ts`.

## Tech stack

Next.js, React, TypeScript, CSS, Lucide React, PDF.js, docx, docx-preview, html2canvas, and jsPDF. No environment variables are required for the current version.

## Installation and development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

```bash
npm run lint
npm run build
npm start
```

The production build creates a static `out/` directory. Deploy the repository to Vercel with the default Next.js settings; no backend or environment variables are needed.

## Project structure

- `src/app/page.tsx` — interactive homepage and conversion state flow.
- `src/app/globals.css` — design tokens and responsive UI.
- `src/features/converter/services/file-validator.ts` — file detection, validation, and output names.
- `src/features/converter/services/pdf-to-word.ts` — PDF.js extraction and DOCX generation.
- `src/features/converter/services/word-to-pdf.ts` — DOCX rendering and PDF export.
- `src/features/converter/services/browser-storage.ts` — Blob downloads and metadata history.
- `src/features/tools/registry.ts` — active and future tool definitions.

## Adding a future converter

Add a typed tool to `src/features/tools/registry.ts`, implement a browser-only service returning `ConversionResult`, and connect it through the existing detected-format flow. Keep File, Blob, Canvas, and IndexedDB access inside client-side code.

> DocFlip currently performs document processing locally in the browser and does not require a conversion backend.
