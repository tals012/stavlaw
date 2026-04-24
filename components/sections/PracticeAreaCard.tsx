"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import shieldIcon from "@/figma-assets/shield-icon.svg";

type Area = {
  slug: string;
  title: string;
  blurb: string;
  imageAlt: string;
};

export function PracticeAreaCard({ area, index }: { area: Area; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="group bg-navy-mid rounded-2xl p-7 border border-white/5 transition-colors duration-300 hover:border-peach/45 hover:bg-[color-mix(in_oklab,var(--color-navy-mid),var(--color-peach)_6%)]"
    >
      <div className="w-[52px] h-[52px] border border-peach rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-peach/10 group-hover:scale-105">
        <Image src={shieldIcon} alt="" width={22} height={22} />
      </div>

      <h3 className="mt-6 text-[22px] font-bold text-white leading-[1.2]">{area.title}</h3>
      <p className="mt-3 text-[15px] text-white/70 leading-relaxed">{area.blurb}</p>
    </motion.article>
  );
}
