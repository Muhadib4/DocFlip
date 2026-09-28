import type { HistoryEntry } from "../types";
const KEY = "docflip-history";

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function readHistory(): HistoryEntry[] { try { return JSON.parse(localStorage.getItem(KEY) ?? "[]") as HistoryEntry[]; } catch { return []; } }
export function addHistory(entry: HistoryEntry): void { localStorage.setItem(KEY, JSON.stringify([entry, ...readHistory()].slice(0, 20))); }
export function clearHistory(): void { localStorage.removeItem(KEY); }
