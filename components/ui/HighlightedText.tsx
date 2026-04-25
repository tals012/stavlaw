"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Section-level dwell trigger. Wrap a block of content with this and
 * after the user has been viewing it for `dwellMs` (default 3 s),
 * any <HighlightedText/> inside flips its **marked** phrases to bold.
 *
 * The timer pauses if the user scrolls the section out of view, and
 * resumes from zero on next entry. Once it fires, it stays on for the
 * rest of the page life.
 */
const DwellContext = createContext(false);

export function DwellHighlight({
  children,
  dwellMs = 3000,
  className,
}: {
  children: ReactNode;
  dwellMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setActive(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    let timeoutId: number | undefined;
    let activated = false;

    const isInView = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Consider "in view" when the block is at least 40% intersected.
      const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
      const ratio = rect.height > 0 ? visible / rect.height : 0;
      return ratio >= 0.4;
    };

    const startTimer = () => {
      if (activated || timeoutId !== undefined) return;
      timeoutId = window.setTimeout(() => {
        activated = true;
        setActive(true);
        cleanup();
      }, dwellMs);
    };
    const cancelTimer = () => {
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    const onScroll = () => {
      if (activated) return;
      if (isInView()) startTimer();
      else cancelTimer();
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) startTimer();
          else cancelTimer();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Kick once on mount in case we're already in view and the IO entry is lazy.
    if (isInView()) startTimer();

    function cleanup() {
      io.disconnect();
      cancelTimer();
      window.removeEventListener("scroll", onScroll);
    }

    return cleanup;
  }, [dwellMs]);

  return (
    <DwellContext.Provider value={active}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </DwellContext.Provider>
  );
}

/**
 * Renders a string that may contain `**marked**` segments. Each marked
 * segment becomes a Mark whose text animates to bold (color is
 * inherited from the surrounding paragraph) once the parent
 * <DwellHighlight/> has decided enough dwell time has passed.
 */
export function HighlightedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const segments = parseMarkers(text);
  let markIndex = 0;
  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.type === "text") return <span key={i}>{seg.value}</span>;
        const idx = markIndex++;
        return (
          <Mark key={i} delay={0.18 + idx * 0.22}>
            {seg.value}
          </Mark>
        );
      })}
    </span>
  );
}

function Mark({ children, delay }: { children: ReactNode; delay: number }) {
  const active = useContext(DwellContext);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(() => setShown(true), delay * 1000);
    return () => window.clearTimeout(t);
  }, [active, delay]);

  return (
    <span style={shown ? { fontWeight: 700 } : undefined}>
      {children}
    </span>
  );
}

type Segment = { type: "text" | "mark"; value: string };

function parseMarkers(input: string): Segment[] {
  const out: Segment[] = [];
  const re = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input)) !== null) {
    if (m.index > last) out.push({ type: "text", value: input.slice(last, m.index) });
    out.push({ type: "mark", value: m[1]! });
    last = re.lastIndex;
  }
  if (last < input.length) out.push({ type: "text", value: input.slice(last) });
  return out;
}
