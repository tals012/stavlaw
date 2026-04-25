"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { toast } from "sonner";
import type { QuizInput } from "@/lib/quiz-schema";

type Answers = Partial<Pick<QuizInput, "situation" | "hearing" | "tenure" | "issue">>;

type OptionGroup<K extends keyof Answers> = {
  key: K;
  title: string;
  options: ReadonlyArray<{ value: NonNullable<Answers[K]>; label: string }>;
};

const STEPS = [
  {
    key: "situation",
    title: "מה מצבך כרגע?",
    options: [
      { value: "fired_recent", label: "פוטרתי לאחרונה" },
      { value: "still_employed", label: "עדיין עובד, אבל יש בעיה" },
      { value: "hearing_scheduled", label: "זומנתי לשימוע" },
      { value: "unpaid", label: "לא קיבלתי תשלומים או זכויות" },
    ],
  },
  {
    key: "hearing",
    title: "האם נערך לך שימוע לפני פיטורים?",
    options: [
      { value: "yes", label: "כן, נערך לי שימוע" },
      { value: "no", label: "לא, פוטרתי ללא שימוע" },
      { value: "not_applicable", label: "עדיין לא פוטרתי" },
    ],
  },
  {
    key: "tenure",
    title: "כמה זמן אתה עובד במקום?",
    options: [
      { value: "under_1y", label: "פחות משנה" },
      { value: "1_3y", label: "שנה עד 3 שנים" },
      { value: "3_7y", label: "3 עד 7 שנים" },
      { value: "over_7y", label: "מעל 7 שנים" },
    ],
  },
  {
    key: "issue",
    title: "מה עיקר הבעיה?",
    options: [
      { value: "wages_overtime", label: "שעות נוספות / שכר לא מלא" },
      { value: "pension_benefits", label: "פנסיה / זכויות סוציאליות" },
      { value: "harassment", label: "הטרדה / התעמרות במקום העבודה" },
      { value: "wrongful_dismissal", label: "פיטורים שלא כדין" },
      { value: "other", label: "אחר" },
    ],
  },
] as const satisfies ReadonlyArray<OptionGroup<keyof Answers>>;

const TOTAL_STEPS = STEPS.length + 1;

export function QuizModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [consentLocation, setConsentLocation] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setAnswers({});
      setContact({ name: "", phone: "", email: "" });
      setConsentLocation(false);
      setConsentMarketing(false);
      setDone(false);
    }
  }, [open]);

  const isQuestionStep = step < STEPS.length;
  const progressPct = Math.min(100, ((step + (isQuestionStep ? 0 : 1)) / TOTAL_STEPS) * 100);

  const selectAnswer = <K extends keyof Answers>(key: K, value: NonNullable<Answers[K]>) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1)), 180);
  };

  const submit = async () => {
    if (!answers.situation || !answers.hearing || !answers.tenure || !answers.issue) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          situation: answers.situation,
          hearing: answers.hearing,
          tenure: answers.tenure,
          issue: answers.issue,
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          consentLocation,
          consentMarketing,
          honeypot,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setDone(true);
    } catch {
      toast.error("השליחה נכשלה - אפשר לפנות בוואטסאפ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="quiz-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="quiz-panel"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quiz-title"
            className="fixed inset-x-4 top-16 bottom-8 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-[10%] md:bottom-auto md:w-[560px] md:max-h-[80vh] z-[70] bg-navy rounded-[22px] border border-peach/30 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="relative px-6 pt-5 pb-3 border-b border-white/10">
              <button
                type="button"
                onClick={onClose}
                aria-label="סגירה"
                className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <p id="quiz-title" className="text-[13px] text-peach font-bold tracking-wide">שאלון חינם - 60 שניות</p>
              <h2 className="mt-1 text-[20px] font-bold text-white leading-tight">נבדוק אם יש לך תיק</h2>
              <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-peach"
                  initial={false}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {done ? (
                <SuccessView onClose={onClose} />
              ) : isQuestionStep && STEPS[step] ? (
                (() => {
                  const current = STEPS[step]!;
                  return (
                    <QuestionStep
                      step={current}
                      selected={answers[current.key]}
                      onSelect={(v) => selectAnswer(current.key, v as never)}
                    />
                  );
                })()
              ) : (
                <ContactStep
                  contact={contact}
                  setContact={setContact}
                  consentLocation={consentLocation}
                  setConsentLocation={setConsentLocation}
                  consentMarketing={consentMarketing}
                  setConsentMarketing={setConsentMarketing}
                  honeypot={honeypot}
                  setHoneypot={setHoneypot}
                  submitting={submitting}
                  onSubmit={submit}
                />
              )}
            </div>

            {!done && (
              <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 text-[14px] text-white/70 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                  חזרה
                </button>
                <p className="text-[13px] text-white/50">
                  שלב {Math.min(step + 1, TOTAL_STEPS)} מתוך {TOTAL_STEPS}
                </p>
                {isQuestionStep && STEPS[step] && answers[STEPS[step].key] ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1))}
                    className="inline-flex items-center gap-1.5 text-[14px] text-peach hover:text-peach-600 transition-colors"
                  >
                    המשך
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                ) : (
                  <span className="w-14" aria-hidden="true" />
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function QuestionStep({
  step,
  selected,
  onSelect,
}: {
  step: (typeof STEPS)[number];
  selected: string | undefined;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <h3 className="text-[20px] font-bold text-white leading-[1.3]">{step.title}</h3>
      <div className="mt-5 space-y-3">
        {step.options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className={`w-full text-start rounded-[14px] border-2 px-5 py-4 text-[16px] transition-colors ${
                isSelected
                  ? "border-peach bg-peach/10 text-white"
                  : "border-white/15 text-white/85 hover:border-peach/60 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span>{opt.label}</span>
                {isSelected && <Check className="h-5 w-5 text-peach shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ContactStep({
  contact,
  setContact,
  consentLocation,
  setConsentLocation,
  consentMarketing,
  setConsentMarketing,
  honeypot,
  setHoneypot,
  submitting,
  onSubmit,
}: {
  contact: { name: string; phone: string; email: string };
  setContact: (c: { name: string; phone: string; email: string }) => void;
  consentLocation: boolean;
  setConsentLocation: (v: boolean) => void;
  consentMarketing: boolean;
  setConsentMarketing: (v: boolean) => void;
  honeypot: string;
  setHoneypot: (s: string) => void;
  submitting: boolean;
  onSubmit: () => void;
}) {
  const canSubmit =
    contact.name.trim().length >= 2 &&
    /^[0-9+\-\s()]{7,20}$/.test(contact.phone) &&
    /.+@.+\..+/.test(contact.email) &&
    consentLocation;

  return (
    <div>
      <h3 className="text-[20px] font-bold text-white leading-[1.3]">
        התשובות שלך מצביעות על תיק רציני. איך ניצור איתך קשר?
      </h3>
      <p className="mt-2 text-[14px] text-white/70">
        נחזור אליך תוך יום עבודה עם הערכה ראשונית.
      </p>
      <div className="mt-5 space-y-3">
        <input
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <input
          type="text"
          value={contact.name}
          onChange={(e) => setContact({ ...contact, name: e.target.value })}
          placeholder="שם מלא*"
          aria-label="שם מלא"
          className="w-full bg-navy-mid border border-white/20 rounded-[14px] h-12 px-4 text-[15px] text-white placeholder-white/40 focus:outline-none focus:border-peach"
        />
        <input
          type="tel"
          inputMode="tel"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
          placeholder="טלפון*"
          aria-label="טלפון"
          className="w-full bg-navy-mid border border-white/20 rounded-[14px] h-12 px-4 text-[15px] text-white placeholder-white/40 focus:outline-none focus:border-peach"
        />
        <input
          type="email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          placeholder="אימייל*"
          aria-label="אימייל"
          className="w-full bg-navy-mid border border-white/20 rounded-[14px] h-12 px-4 text-[15px] text-white placeholder-white/40 focus:outline-none focus:border-peach"
        />
      </div>
      <div className="mt-5 space-y-2.5">
        <label className="flex items-start justify-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={consentLocation}
            onChange={(e) => setConsentLocation(e.target.checked)}
            className="mt-[3px] h-[18px] w-[18px] shrink-0 appearance-none rounded-[5px] border border-white/40 bg-transparent checked:bg-peach checked:border-peach focus:outline-none focus:ring-2 focus:ring-peach/40 cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-[12px] checked:after:font-bold checked:after:text-text-dark"
          />
          <span className="text-[13px] text-white/85 leading-snug">
            משרד עו״ד סתיו אליהו שוקרון ממוקם בבאר שבע. אני מאשר/ת שזה רלוונטי עבורי.
          </span>
        </label>
        <label className="flex items-start justify-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={consentMarketing}
            onChange={(e) => setConsentMarketing(e.target.checked)}
            className="mt-[3px] h-[18px] w-[18px] shrink-0 appearance-none rounded-[5px] border border-white/40 bg-transparent checked:bg-peach checked:border-peach focus:outline-none focus:ring-2 focus:ring-peach/40 cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-[12px] checked:after:font-bold checked:after:text-text-dark"
          />
          <span className="text-[13px] text-white/85 leading-snug">
            אני מאשר/ת קבלת דיוור ומידע פרסומי ואת תנאי השימוש ו־מדיניות הפרטיות באתר.
          </span>
        </label>
      </div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={!canSubmit || submitting}
        className="mt-6 w-full rounded-full bg-peach border-2 border-peach h-12 text-[16px] font-bold text-text-dark hover:bg-peach-600 hover:border-peach-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "שולח..." : "שליחה - נחזור אליך בקרוב"}
      </button>
    </div>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-6">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-peach/15">
        <Check className="h-7 w-7 text-peach" />
      </div>
      <h3 className="text-[22px] font-bold text-white leading-tight">תודה! קיבלנו את הפרטים</h3>
      <p className="mt-3 text-[15px] text-white/75 leading-relaxed">
        סקרנו את תשובותיך. עו״ד סתיו שוקרון תחזור אליך תוך יום עבודה עם הערכה ראשונית של התיק שלך.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-peach border-2 border-peach px-8 h-11 text-[15px] font-bold text-text-dark hover:bg-peach-600 hover:border-peach-600 transition-colors"
      >
        סגירה
      </button>
    </div>
  );
}
