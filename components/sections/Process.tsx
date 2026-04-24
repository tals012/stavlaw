"use client";

import { useRef, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import type { LottieRefCurrentProps } from "lottie-react";
import { Script } from "@/components/ui/Script";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { ProcessStepEntry } from "@/lib/i18n/types";

import calendarIcon from "@/public/lottie/process/step-3-calendar.json";
import assignmentIcon from "@/public/lottie/process/step-1-assignment.json";
import articleIcon from "@/public/lottie/process/step-2-article.json";
import groupsIcon from "@/public/lottie/process/step-4-groups.json";
import verifiedIcon from "@/public/lottie/process/step-5-verified.json";

// Preload the lottie-react chunk at module evaluation so it's ready
// before the user scrolls into the Process section.
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => null,
});

const NAVY_RGB: [number, number, number] = [34 / 255, 36 / 255, 57 / 255];

// Re-tint a lordicon-style Lottie to our navy palette by overwriting the
// primary color token embedded throughout the JSON.
function tintLottie<T>(data: T): T {
  const str = JSON.stringify(data);
  const [r, g, b] = NAVY_RGB;
  const fmt = (n: number) => Number(n.toFixed(3));
  const tinted = str.replace(
    /\[0\.067,0\.039,0\.361,1\]/g,
    `[${fmt(r)},${fmt(g)},${fmt(b)},1]`,
  );
  return JSON.parse(tinted) as T;
}

// Step 1 (פגישת ייעוץ ראשונית) → calendar, then intake, strategy, negotiation, verdict
const ICONS = [calendarIcon, assignmentIcon, articleIcon, groupsIcon, verifiedIcon];

export function Process() {
  const { dict } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "end 65%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  const steps = dict.process.steps;

  return (
    <section id="process" className="bg-cream-100 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0 lg:items-start">
          {/* Heading - col 1 (visual-right in RTL); sticky on desktop so it scrolls with the stepper */}
          <div className="lg:pt-4 lg:order-1 lg:sticky lg:top-24 lg:self-start">
            <Script className="text-[clamp(2.5rem,4vw,60px)] leading-none block mb-2">
              {dict.process.eyebrow}
            </Script>
            <h2 className="text-[clamp(2rem,3.5vw,50px)] font-bold text-navy leading-[1.12]">
              {dict.process.heading}
            </h2>
            <p className="mt-5 text-[15px] text-navy/75 leading-[1.75] max-w-md">
              {dict.process.sub}
            </p>
          </div>

          {/* Stepper - col 2 (visual-left in RTL) */}
          <div ref={containerRef} className="relative lg:order-2">
            {/* Dashed base line at the bubble column */}
            <div
              aria-hidden
              className="hidden lg:block pointer-events-none absolute top-[46px] bottom-[46px] start-[41px] w-0 border-s-2 border-dashed border-peach/35"
            />
            {/* Peach progress fill line - driven by scroll */}
            <motion.div
              aria-hidden
              style={{ height: lineHeight }}
              className="hidden lg:block pointer-events-none absolute top-[46px] start-[40px] w-[3px] bg-peach rounded-full shadow-[0_0_14px_rgba(231,156,125,0.55)]"
            />

            <ol className="space-y-6 lg:space-y-8">
              {steps.map((step, idx) => (
                <StepRow
                  key={step.n}
                  step={step}
                  icon={ICONS[idx]}
                  progress={smoothProgress}
                  activation={(idx + 0.5) / steps.length}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepRow({
  step,
  icon,
  progress,
  activation,
}: {
  step: ProcessStepEntry;
  icon: unknown;
  progress: MotionValue<number>;
  activation: number;
}) {
  const span = 0.12;
  const start = Math.max(0, activation - span);
  const end = Math.min(1, activation + span);

  const bubbleBg = useTransform(
    progress,
    [start, end],
    ["rgb(34,36,57)", "rgb(231,156,125)"],
  );
  const bubbleBorder = useTransform(
    progress,
    [start, end],
    ["rgba(231,156,125,0.45)", "rgba(231,156,125,1)"],
  );
  const bubbleScale = useTransform(
    progress,
    [start, activation, end],
    [0.92, 1.08, 1],
  );
  // Number is visible before activation, hides once active.
  const numberOpacity = useTransform(
    progress,
    [start + span * 0.55, activation],
    [1, 0],
  );
  // Icon fades in right as activation point is crossed.
  const iconOpacity = useTransform(
    progress,
    [activation - span * 0.1, activation + span * 0.4],
    [0, 1],
  );
  const iconScale = useTransform(
    progress,
    [activation - span * 0.1, activation + span * 0.4],
    [0.6, 1],
  );
  const cardOpacity = useTransform(progress, [start, end], [0.55, 1]);
  const cardY = useTransform(progress, [start, end], [14, 0]);

  // Connector: grows from bubble toward the card just before activation.
  const connectorScale = useTransform(
    progress,
    [start + span * 0.2, activation - span * 0.1],
    [0, 1],
  );
  // Card border fills with peach as the connector finishes.
  const cardBorderColor = useTransform(
    progress,
    [activation - span * 0.1, activation + span * 0.3],
    ["rgba(231,156,125,0)", "rgba(231,156,125,1)"],
  );

  const tintedIcon = useMemo(() => tintLottie(icon), [icon]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [triggered, setTriggered] = useState(false);

  useMotionValueEvent(iconOpacity, "change", (value) => {
    if (value > 0.25 && !triggered) {
      setTriggered(true);
      // Play from frame 0 now that the Lottie is already mounted & loaded.
      lottieRef.current?.goToAndPlay(0, true);
    }
  });

  return (
    <li className="relative flex items-center">
      {/* Bubble */}
      <motion.div
        style={{
          backgroundColor: bubbleBg,
          borderColor: bubbleBorder,
          scale: bubbleScale,
        }}
        className="relative shrink-0 flex items-center justify-center w-[64px] h-[64px] lg:w-[88px] lg:h-[88px] rounded-2xl lg:rounded-[20px] border-2 shadow-lg z-10 overflow-hidden"
      >
        {/* Number - shown when inactive */}
        <motion.span
          style={{ opacity: numberOpacity }}
          className="absolute font-[family-name:var(--font-playfair)] font-medium text-[26px] lg:text-[34px] leading-none text-peach tabular-nums tracking-tight"
        >
          {String(step.n).padStart(2, "0")}
        </motion.span>

        {/* Lottie icon - mounted immediately; scroll reveals via opacity/scale.
            Playback is triggered programmatically via lottieRef when the
            activation threshold is crossed, so there's no chunk-load delay. */}
        <motion.div
          style={{ opacity: iconOpacity, scale: iconScale }}
          className="absolute w-[44px] h-[44px] lg:w-[56px] lg:h-[56px] pointer-events-none"
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={tintedIcon}
            loop={false}
            autoplay={false}
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
        </motion.div>
      </motion.div>

      {/* Connector - short horizontal line that fills from bubble to card */}
      <div
        aria-hidden
        className="relative shrink-0 w-5 lg:w-7 h-[2px] bg-peach/15 overflow-hidden"
      >
        <motion.div
          style={{ scaleX: connectorScale, transformOrigin: "right center" }}
          className="absolute inset-0 bg-peach"
        />
      </div>

      {/* Card */}
      <motion.div
        style={{
          opacity: cardOpacity,
          y: cardY,
          borderColor: cardBorderColor,
        }}
        className="flex-1 bg-navy rounded-[22px] p-6 lg:p-7 border-2"
      >
        <h3 className="text-[20px] lg:text-[22px] font-bold text-white leading-[1.2]">
          {step.title}
        </h3>
        <p className="mt-2 text-[15px] lg:text-[16px] text-white/75 leading-relaxed">
          {step.blurb}
        </p>
      </motion.div>
    </li>
  );
}
