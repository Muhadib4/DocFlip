export type ThemeId =
  | "default"
  | "midnight"
  | "ocean"
  | "crimson"
  | "sakura"
  | "emerald"
  | "cyber"
  | "monochrome";

export type BalatroConfig = {
  color1: string;
  color2: string;
  color3: string;
  contrast: number;
  lighting: number;
  spinAmount: number;
  pixelFilter: number;
};

export type ThemeConfig = {
  id: ThemeId;
  name: string;
  description: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  border: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentSoft: string;
  danger: string;
  success: string;
  successSoft: string;
  shadow: string;
  uploadBorder: string;
  balatro: BalatroConfig;
};

export const themeIds: ThemeId[] = [
  "default",
  "midnight",
  "ocean",
  "crimson",
  "sakura",
  "emerald",
  "cyber",
  "monochrome",
];

export const themes: Record<ThemeId, ThemeConfig> = {
  default: {
    id: "default",
    name: "Default",
    description: "DocFlip indigo",
    background: "#0b1020",
    foreground: "#f5f7ff",
    card: "#111827",
    cardForeground: "#f5f7ff",
    border: "#293449",
    primary: "#5b5bd6",
    primaryForeground: "#ffffff",
    secondary: "#3b82f6",
    muted: "#151d2f",
    mutedForeground: "#94a3b8",
    accent: "#818cf8",
    accentSoft: "#202653",
    danger: "#f87171",
    success: "#34d399",
    successSoft: "#123b35",
    shadow: "0 24px 70px rgba(2, 6, 23, .38)",
    uploadBorder: "#52617a",
    balatro: { color1: "#5B5BD6", color2: "#3B82F6", color3: "#111827", contrast: 3.5, lighting: 0.4, spinAmount: 0.25, pixelFilter: 700 },
  },
  midnight: {
    id: "midnight",
    name: "Midnight",
    description: "Premium violet",
    background: "#080615",
    foreground: "#f4f1ff",
    card: "#120d25",
    cardForeground: "#f4f1ff",
    border: "#332650",
    primary: "#8b5cf6",
    primaryForeground: "#ffffff",
    secondary: "#7c3aed",
    muted: "#1b1233",
    mutedForeground: "#aa9fc4",
    accent: "#a78bfa",
    accentSoft: "#2b1b55",
    danger: "#fb7185",
    success: "#6ee7b7",
    successSoft: "#123b35",
    shadow: "0 24px 70px rgba(3, 0, 20, .48)",
    uploadBorder: "#66538f",
    balatro: { color1: "#312E81", color2: "#7C3AED", color3: "#020617", contrast: 3.8, lighting: 0.32, spinAmount: 0.28, pixelFilter: 720 },
  },
  ocean: {
    id: "ocean",
    name: "Ocean",
    description: "Clean cyan blue",
    background: "#06131f",
    foreground: "#effcff",
    card: "#0b2030",
    cardForeground: "#effcff",
    border: "#19445a",
    primary: "#22d3ee",
    primaryForeground: "#04202b",
    secondary: "#0369a1",
    muted: "#0d2a3c",
    mutedForeground: "#8eb7c8",
    accent: "#67e8f9",
    accentSoft: "#103d4d",
    danger: "#fb7185",
    success: "#34d399",
    successSoft: "#0e3c3d",
    shadow: "0 24px 70px rgba(1, 18, 30, .45)",
    uploadBorder: "#39758b",
    balatro: { color1: "#0369A1", color2: "#06B6D4", color3: "#082F49", contrast: 3.6, lighting: 0.38, spinAmount: 0.25, pixelFilter: 720 },
  },
  crimson: {
    id: "crimson",
    name: "Crimson",
    description: "Bold red accent",
    background: "#160b10",
    foreground: "#fff5f5",
    card: "#241016",
    cardForeground: "#fff5f5",
    border: "#4d222b",
    primary: "#ef4444",
    primaryForeground: "#ffffff",
    secondary: "#991b1b",
    muted: "#31151d",
    mutedForeground: "#c49ba3",
    accent: "#fb7185",
    accentSoft: "#4a1e2b",
    danger: "#fca5a5",
    success: "#6ee7b7",
    successSoft: "#173c36",
    shadow: "0 24px 70px rgba(30, 3, 8, .42)",
    uploadBorder: "#7d4551",
    balatro: { color1: "#991B1B", color2: "#EF4444", color3: "#1C0A0A", contrast: 3.7, lighting: 0.36, spinAmount: 0.28, pixelFilter: 690 },
  },
  sakura: {
    id: "sakura",
    name: "Sakura",
    description: "Soft pink violet",
    background: "#180e20",
    foreground: "#fff5fc",
    card: "#28152f",
    cardForeground: "#fff5fc",
    border: "#55305e",
    primary: "#f472b6",
    primaryForeground: "#2b0b23",
    secondary: "#c084fc",
    muted: "#351c3d",
    mutedForeground: "#c9a9c8",
    accent: "#f9a8d4",
    accentSoft: "#512441",
    danger: "#fb7185",
    success: "#86efac",
    successSoft: "#183d35",
    shadow: "0 24px 70px rgba(30, 5, 28, .43)",
    uploadBorder: "#87527e",
    balatro: { color1: "#DB2777", color2: "#C084FC", color3: "#2E1065", contrast: 3.3, lighting: 0.45, spinAmount: 0.22, pixelFilter: 730 },
  },
  emerald: {
    id: "emerald",
    name: "Emerald",
    description: "Natural green",
    background: "#061711",
    foreground: "#effff8",
    card: "#0d261d",
    cardForeground: "#effff8",
    border: "#1c513c",
    primary: "#34d399",
    primaryForeground: "#04251a",
    secondary: "#047857",
    muted: "#123524",
    mutedForeground: "#9bc5b3",
    accent: "#6ee7b7",
    accentSoft: "#164b38",
    danger: "#fb7185",
    success: "#86efac",
    successSoft: "#164b38",
    shadow: "0 24px 70px rgba(0, 22, 12, .43)",
    uploadBorder: "#3d8065",
    balatro: { color1: "#047857", color2: "#10B981", color3: "#022C22", contrast: 3.5, lighting: 0.38, spinAmount: 0.25, pixelFilter: 710 },
  },
  cyber: {
    id: "cyber",
    name: "Cyber",
    description: "Technical cyan violet",
    background: "#050817",
    foreground: "#f0f7ff",
    card: "#0c1228",
    cardForeground: "#f0f7ff",
    border: "#26365e",
    primary: "#22d3ee",
    primaryForeground: "#031a24",
    secondary: "#a855f7",
    muted: "#111a35",
    mutedForeground: "#93a8c9",
    accent: "#67e8f9",
    accentSoft: "#123951",
    danger: "#fb7185",
    success: "#5eead4",
    successSoft: "#103c3d",
    shadow: "0 24px 70px rgba(1, 6, 28, .5)",
    uploadBorder: "#46648a",
    balatro: { color1: "#7C3AED", color2: "#06B6D4", color3: "#020617", contrast: 4.0, lighting: 0.45, spinAmount: 0.32, pixelFilter: 650 },
  },
  monochrome: {
    id: "monochrome",
    name: "Monochrome",
    description: "Editorial grayscale",
    background: "#09090b",
    foreground: "#fafafa",
    card: "#18181b",
    cardForeground: "#fafafa",
    border: "#3f3f46",
    primary: "#d4d4d8",
    primaryForeground: "#18181b",
    secondary: "#6b7280",
    muted: "#242428",
    mutedForeground: "#a1a1aa",
    accent: "#e4e4e7",
    accentSoft: "#3f3f46",
    danger: "#fca5a5",
    success: "#a7f3d0",
    successSoft: "#24403a",
    shadow: "0 24px 70px rgba(0, 0, 0, .48)",
    uploadBorder: "#71717a",
    balatro: { color1: "#E5E7EB", color2: "#6B7280", color3: "#09090B", contrast: 4.2, lighting: 0.25, spinAmount: 0.2, pixelFilter: 760 },
  },
};

export function isThemeId(value: string | null): value is ThemeId {
  return value !== null && themeIds.includes(value as ThemeId);
}

export function getTheme(id: ThemeId): ThemeConfig {
  return themes[id];
}

export type BackgroundId = "none" | "prism" | "balatro" | "shape-waves";

export const backgroundOptions: { id: BackgroundId; name: string; description: string }[] = [
  { id: "shape-waves", name: "ShapeWaves", description: "Interactive flowing grid" },
  { id: "balatro", name: "Balatro", description: "Pixelated color field" },
  { id: "prism", name: "Prism", description: "Soft 3D light prism" },
  { id: "none", name: "None", description: "Clean, quiet background" },
];

export function isBackgroundId(value: string | null): value is BackgroundId {
  return value !== null && backgroundOptions.some((option) => option.id === value);
}
