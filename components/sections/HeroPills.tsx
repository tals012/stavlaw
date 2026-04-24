"use client";

import { motion } from "framer-motion";

type Pill = {
  label: string;
  position: "name" | "top" | "mid" | "bottom";
};

const POSITION_CLASS: Record<Pill["position"], string> = {
  name: "top-[6%] end-[4%]",
  top: "top-[22%] start-[18%]",
  mid: "top-[52%] end-[4%]",
  bottom: "bottom-[12%] start-[22%]",
};

export function HeroPills({ pills }: { pills: Pill[] }) {
  return (
    <>
      {pills.map((pill, i) => (
        <motion.div
          key={`${pill.position}-${i}`}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.45 + i * 0.35,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`absolute ${POSITION_CLASS[pill.position]} bg-navy rounded-full ps-3 pe-4 py-2 flex items-center gap-2 shadow-md`}
        >
          <span className="w-[7px] h-[7px] rounded-full bg-peach shrink-0" />
          <span className="text-white text-[13px] font-medium whitespace-nowrap">
            {pill.label}
          </span>
        </motion.div>
      ))}
    </>
  );
}
