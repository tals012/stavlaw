"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Accessibility, X, Plus, Minus, Contrast, Link2, RotateCcw, Pause } from "lucide-react";

type AxSettings = {
  fontScale: number;
  highContrast: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
  highlightHeadings: boolean;
};

const DEFAULTS: AxSettings = {
  fontScale: 100,
  highContrast: false,
  underlineLinks: false,
  reduceMotion: false,
  highlightHeadings: false,
};

const STORAGE_KEY = "stavlaw.ax";
const MIN_SCALE = 80;
const MAX_SCALE = 160;
const STEP = 10;

function applySettings(s: AxSettings) {
  const root = document.documentElement;
  root.style.setProperty("--ax-font-scale", String(s.fontScale / 100));
  root.classList.toggle("ax-high-contrast", s.highContrast);
  root.classList.toggle("ax-underline-links", s.underlineLinks);
  root.classList.toggle("ax-reduce-motion", s.reduceMotion);
  root.classList.toggle("ax-highlight-headings", s.highlightHeadings);
}

const LABELS: Record<string, Record<string, string>> = {
  he: {
    button: "נגישות",
    title: "הגדרות נגישות",
    close: "סגור",
    textSize: "גודל טקסט",
    increase: "הגדל טקסט",
    decrease: "הקטן טקסט",
    contrast: "ניגודיות גבוהה",
    links: "הדגשת קישורים",
    motion: "הפחתת תנועה",
    headings: "הדגשת כותרות",
    reset: "איפוס",
  },
  en: {
    button: "Accessibility",
    title: "Accessibility Settings",
    close: "Close",
    textSize: "Text size",
    increase: "Increase text",
    decrease: "Decrease text",
    contrast: "High contrast",
    links: "Underline links",
    motion: "Reduce motion",
    headings: "Highlight headings",
    reset: "Reset",
  },
  ru: {
    button: "Доступность",
    title: "Настройки доступности",
    close: "Закрыть",
    textSize: "Размер текста",
    increase: "Увеличить текст",
    decrease: "Уменьшить текст",
    contrast: "Высокая контрастность",
    links: "Подчёркивать ссылки",
    motion: "Уменьшить движение",
    headings: "Выделять заголовки",
    reset: "Сбросить",
  },
  ar: {
    button: "إمكانية الوصول",
    title: "إعدادات إمكانية الوصول",
    close: "إغلاق",
    textSize: "حجم النص",
    increase: "تكبير النص",
    decrease: "تصغير النص",
    contrast: "تباين عالٍ",
    links: "تسطير الروابط",
    motion: "تقليل الحركة",
    headings: "إبراز العناوين",
    reset: "إعادة تعيين",
  },
};

function getLabels(): Record<string, string> {
  if (typeof document === "undefined") return LABELS.he!;
  const lang = document.documentElement.lang;
  return LABELS[lang] ?? LABELS.he!;
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<AxSettings>(DEFAULTS);
  const [labels, setLabels] = useState<Record<string, string>>(LABELS.he!);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AxSettings>;
        const merged = { ...DEFAULTS, ...parsed };
        setSettings(merged);
        applySettings(merged);
      } else {
        applySettings(DEFAULTS);
      }
    } catch {
      applySettings(DEFAULTS);
    }
    setLabels(getLabels());

    const obs = new MutationObserver(() => setLabels(getLabels()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => obs.disconnect();
  }, []);

  const update = useCallback((patch: Partial<AxSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      applySettings(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={labels.button}
        aria-expanded={open}
        className="fixed bottom-24 start-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-xl transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-peach focus-visible:ring-offset-2"
      >
        <Accessibility className="h-7 w-7" aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={labels.title}
          className="fixed bottom-24 start-24 z-50 w-[320px] max-w-[calc(100vw-3rem)] rounded-2xl bg-white shadow-2xl border border-navy/10 overflow-hidden"
        >
          <div className="flex items-center justify-between bg-navy text-white px-5 py-4">
            <h3 className="text-[15px] font-bold">{labels.title}</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={labels.close}
              className="rounded-full p-1 hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] font-medium text-navy">{labels.textSize}</span>
                <span className="text-[13px] text-navy/60 tabular-nums">{settings.fontScale}%</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => update({ fontScale: Math.max(MIN_SCALE, settings.fontScale - STEP) })}
                  disabled={settings.fontScale <= MIN_SCALE}
                  aria-label={labels.decrease}
                  className="flex-1 h-10 flex items-center justify-center rounded-lg border border-navy/15 text-navy hover:bg-navy hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => update({ fontScale: Math.min(MAX_SCALE, settings.fontScale + STEP) })}
                  disabled={settings.fontScale >= MAX_SCALE}
                  aria-label={labels.increase}
                  className="flex-1 h-10 flex items-center justify-center rounded-lg border border-navy/15 text-navy hover:bg-navy hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <ToggleRow
              icon={<Contrast className="h-4 w-4" />}
              label={labels.contrast!}
              active={settings.highContrast}
              onClick={() => update({ highContrast: !settings.highContrast })}
            />
            <ToggleRow
              icon={<Link2 className="h-4 w-4" />}
              label={labels.links!}
              active={settings.underlineLinks}
              onClick={() => update({ underlineLinks: !settings.underlineLinks })}
            />
            <ToggleRow
              icon={<Pause className="h-4 w-4" />}
              label={labels.motion!}
              active={settings.reduceMotion}
              onClick={() => update({ reduceMotion: !settings.reduceMotion })}
            />
            <ToggleRow
              icon={<Accessibility className="h-4 w-4" />}
              label={labels.headings!}
              active={settings.highlightHeadings}
              onClick={() => update({ highlightHeadings: !settings.highlightHeadings })}
            />

            <button
              type="button"
              onClick={() => {
                setSettings(DEFAULTS);
                applySettings(DEFAULTS);
                try {
                  window.localStorage.removeItem(STORAGE_KEY);
                } catch {}
              }}
              className="w-full h-10 flex items-center justify-center gap-2 rounded-lg border border-navy/15 text-navy hover:bg-navy hover:text-white transition-colors text-[14px] font-medium"
            >
              <RotateCcw className="h-4 w-4" />
              {labels.reset}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function ToggleRow({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="switch"
      aria-checked={active}
      className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border transition-colors ${
        active
          ? "bg-peach/15 border-peach text-navy"
          : "bg-white border-navy/15 text-navy hover:bg-navy/5"
      }`}
    >
      <span className="flex items-center gap-2.5 text-[14px] font-medium text-start">
        {icon}
        {label}
      </span>
      <span
        className={`relative inline-block w-9 h-5 rounded-full transition-colors ${
          active ? "bg-peach" : "bg-navy/20"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
            active ? "start-[18px]" : "start-0.5"
          }`}
        />
      </span>
    </button>
  );
}
