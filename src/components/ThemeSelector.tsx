"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";
import { backgroundOptions, getTheme, themeIds, themes, type BackgroundId, type ThemeId } from "@/features/theme/themes";

type ThemeSelectorProps = {
  theme: ThemeId;
  background: BackgroundId;
  onChange: (theme: ThemeId) => void;
  onBackgroundChange: (background: BackgroundId) => void;
};

export default function ThemeSelector({ theme, background, onChange, onBackgroundChange }: ThemeSelectorProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeTheme = getTheme(theme);
  const activeBackground = backgroundOptions.find((option) => option.id === background)?.name ?? "ShapeWaves";

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        (containerRef.current?.querySelector("button") as HTMLButtonElement | null)?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    menuRef.current?.querySelector<HTMLButtonElement>("[aria-current='true']")?.focus();
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="theme-selector" ref={containerRef}>
      <button
        className="theme-trigger"
        type="button"
        aria-label={`Change theme. Current theme: ${activeTheme.name}. Background: ${activeBackground}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Palette size={16} aria-hidden="true" />
        <span>Theme</span>
      </button>
      {open && (
        <div className="theme-menu" role="dialog" aria-label="Choose a theme" ref={menuRef}>
          <div className="theme-menu-heading">
            <div>
              <strong>Choose a theme</strong>
              <span>Set the tone for your workspace</span>
            </div>
            <span className="theme-menu-current">{activeTheme.name}</span>
          </div>
          <ThemeSection label="Color theme" description="UI colors and accents">
            <div className="theme-options" role="listbox" aria-label="Available color themes">
              {themeIds.map((id) => {
                const option = themes[id];
                const selected = id === theme;
                return (
                  <button
                    className={`theme-option${selected ? " is-active" : ""}`}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    aria-current={selected ? "true" : undefined}
                    key={id}
                    onClick={() => { onChange(id); setOpen(false); }}
                  >
                    <span className="theme-swatch" aria-hidden="true"><i style={{ background: option.balatro.color1 }} /><i style={{ background: option.balatro.color2 }} /><i style={{ background: option.balatro.color3 }} /></span>
                    <span className="theme-option-copy"><strong>{option.name}</strong><small>{option.description}</small></span>
                    <span className="theme-check" aria-hidden="true">{selected && <Check size={15} strokeWidth={2.5} />}</span>
                  </button>
                );
              })}
            </div>
          </ThemeSection>
          <ThemeSection label="Animated background" description="Choose the visual layer">
            <div className="background-options" role="listbox" aria-label="Available animated backgrounds">
              {backgroundOptions.map((option) => {
                const selected = option.id === background;
                return (
                  <button
                    className={`background-option${selected ? " is-active" : ""}`}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    aria-current={selected ? "true" : undefined}
                    key={option.id}
                    onClick={() => { onBackgroundChange(option.id); setOpen(false); }}
                  >
                    <span className={`background-preview background-preview-${option.id}`} aria-hidden="true" />
                    <span className="theme-option-copy"><strong>{option.name}</strong><small>{option.description}</small></span>
                    <span className="theme-check" aria-hidden="true">{selected && <Check size={15} strokeWidth={2.5} />}</span>
                  </button>
                );
              })}
            </div>
          </ThemeSection>
        </div>
      )}
    </div>
  );
}

function ThemeSection({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return <section className="theme-section"><div className="theme-section-heading"><strong>{label}</strong><span>{description}</span></div>{children}</section>;
}
