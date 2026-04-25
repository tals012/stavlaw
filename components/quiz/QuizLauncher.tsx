"use client";

import { useState } from "react";
import { QuizModal } from "./QuizModal";

export function QuizLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="quiz" className="bg-navy py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-peach text-[14px] font-bold tracking-[0.18em]">שאלון מהיר</p>
          <h2 className="mt-3 text-[clamp(1.75rem,3vw,42px)] font-bold text-white leading-[1.2]">
            לא בטוח אם יש לך תיק?
          </h2>
          <p className="mt-4 text-[16px] text-white/80 leading-relaxed max-w-xl mx-auto">
            ענה על 4 שאלות קצרות ונחזור אליך עם הערכה ראשונית - בלי התחייבות.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="quiz-cta-pulse relative mt-7 inline-flex items-center justify-center rounded-full bg-peach border-2 border-peach px-10 py-4 text-[18px] font-bold text-text-dark hover:bg-peach-600 hover:border-peach-600 transition-colors hover:[animation-play-state:paused]"
          >
            <span className="pointer-events-none absolute inset-0 rounded-full quiz-cta-ring" aria-hidden />
            <span className="relative">התחלת שאלון</span>
          </button>
        </div>
      </section>
      <QuizModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
