"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "stavlaw_cookie_consent_v1";

type Choice = "accepted" | "rejected";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mounted = true;
    try {
      const existing = window.localStorage.getItem(STORAGE_KEY);
      if (existing === "accepted" || existing === "rejected") return;
    } catch {
      // storage unavailable - still show banner
    }
    const t = window.setTimeout(() => {
      if (mounted) setVisible(true);
    }, 3000);
    return () => {
      mounted = false;
      window.clearTimeout(t);
    };
  }, []);

  const choose = (choice: Choice) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-[640px] rounded-2xl bg-navy-mid border border-peach/30 shadow-2xl px-5 py-4 md:px-6 md:py-5"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <p id="cookie-banner-title" className="text-[15px] font-bold text-white">
                שימוש בעוגיות
              </p>
              <p className="mt-1 text-[13px] text-white/75 leading-snug">
                אנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה ולנתח שימוש באתר. בלחיצה על &quot;אישור&quot; הינך מסכים/ה למדיניות הפרטיות ולתנאי השימוש.
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("rejected")}
                className="inline-flex h-10 items-center justify-center rounded-full border border-white/30 px-4 text-[13px] font-medium text-white/85 hover:bg-white/5 transition-colors"
              >
                דחייה
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="inline-flex h-10 items-center justify-center rounded-full bg-peach px-5 text-[13px] font-bold text-navy hover:bg-peach-600 transition-colors"
              >
                אישור
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
