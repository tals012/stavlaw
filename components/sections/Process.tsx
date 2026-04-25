"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Script } from "@/components/ui/Script";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { ProcessStepEntry } from "@/lib/i18n/types";

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
            {/* Dashed base line through the bubble column */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-[32px] bottom-[32px] start-[31px] w-0 border-s-2 border-dashed border-peach/35 lg:top-[46px] lg:bottom-[46px] lg:start-[41px]"
            />
            {/* Peach progress fill line - driven by scroll */}
            <motion.div
              aria-hidden
              style={{ height: lineHeight }}
              className="pointer-events-none absolute top-[32px] start-[30px] w-[3px] bg-peach rounded-full shadow-[0_0_14px_rgba(231,156,125,0.55)] lg:top-[46px] lg:start-[40px]"
            />

            <ol className="space-y-6 lg:space-y-8">
              {steps.map((step, idx) => (
                <StepRow
                  key={step.n}
                  step={step}
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
  progress,
  activation,
}: {
  step: ProcessStepEntry;
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
    [0.96, 1.04, 1],
  );
  // Number color flips from peach (on navy bg) to navy (on peach bg) at activation.
  const numberColor = useTransform(
    progress,
    [activation - span * 0.2, activation + span * 0.2],
    ["rgb(231,156,125)", "rgb(34,36,57)"],
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
        <motion.span
          style={{ color: numberColor }}
          className="font-[family-name:var(--font-playfair)] font-medium text-[26px] lg:text-[34px] leading-none tabular-nums tracking-tight"
        >
          {String(step.n).padStart(2, "0")}
        </motion.span>
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
