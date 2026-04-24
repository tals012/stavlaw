"use client";

import { motion } from "framer-motion";

type Props = {
  targetId: string;
  ariaLabel?: string;
  className?: string;
};

export function ScrollIndicator({ targetId, ariaLabel = "Scroll down", className = "" }: Props) {
  const onClick = () => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center text-peach/80 hover:text-peach transition-colors cursor-pointer ${className}`}
    >
      <svg width="26" height="50" viewBox="0 0 26 50" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect
          x="0.5"
          y="0.5"
          width="24.4253"
          height="48.0833"
          rx="12.2126"
          stroke="currentColor"
        />
        <motion.circle
          cx="12.71"
          cy="10"
          r="2"
          fill="currentColor"
          initial={{ cy: 10, opacity: 0 }}
          animate={{ cy: [10, 32, 10], opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </button>
  );
}
