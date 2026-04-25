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

    let timeoutId: number | undefined;
    let activated = false;

    const isInView = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
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
 * segment animates word-by-word from its surrounding weight to bold,
 * via a per-word crossfade (since CSS can't smoothly animate
 * font-weight on non-variable fonts). The result is a "filling in"
 * sweep across the phrase once the dwell threshold has passed.
 */
export function HighlightedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const segments = parseMarkers(text);
  let wordOffset = 0;
  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.type === "text") return <span key={i}>{seg.value}</span>;
        const start = wordOffset;
        const words = seg.value.split(" ").filter(Boolean);
        wordOffset += words.length;
        return <Mark key={i} words={words} startIndex={start} />;
      })}
    </span>
  );
}

function Mark({ words, startIndex }: { words: string[]; startIndex: number }) {
  const active = useContext(DwellContext);
  return (
    <>
      {words.map((word, i) => (
        <WordSwap
          key={`${startIndex}-${i}`}
          word={word}
          active={active}
          delay={(startIndex + i) * 0.06}
          isLast={i === words.length - 1}
        />
      ))}
    </>
  );
}

function WordSwap({
  word,
  active,
  delay,
  isLast,
}: {
  word: string;
  active: boolean;
  delay: number;
  isLast: boolean;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(() => setShown(true), delay * 1000);
    return () => window.clearTimeout(t);
  }, [active, delay]);

  return (
    <>
      <span className="relative inline-block whitespace-nowrap align-baseline">
        {/* Sizing layer: bold (always present so the box stays bold-wide) */}
        <span
          className="font-bold"
          aria-hidden={!shown}
          style={{
            opacity: shown ? 1 : 0,
            transition: "opacity 550ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {word}
        </span>
        {/* Regular layer: fades out as bold reveals */}
        <span
          aria-hidden={shown}
          className="absolute inset-0"
          style={{
            opacity: shown ? 0 : 1,
            transition: "opacity 550ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {word}
        </span>
      </span>
      {!isLast && " "}
    </>
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
