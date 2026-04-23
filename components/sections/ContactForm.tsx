"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { site } from "@/content/site";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import Image from "next/image";
import aboutPortrait from "@/figma-assets/about-portrait.jpg";
import whatsappIcon from "@/figma-assets/whatsapp-icon.svg";
import mailIcon from "@/figma-assets/mail-icon.svg";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast.success("תודה, ניצור איתך קשר בהקדם");
      reset();
    } catch {
      toast.error("שליחה נכשלה — אפשר ליצור קשר בוואטסאפ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={aboutPortrait}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(48,48,59,0.29)] backdrop-blur-[18px]" />
      </div>

      {/* Center dark panel */}
      <div className="relative mx-auto max-w-3xl bg-[#222439] py-16 px-10 min-h-[1060px] flex flex-col items-center justify-center">
        {/* Contact Me script */}
        <p
          className="font-['Angelic_Bonques_Script',cursive,serif] text-[50px] text-[#e79c7d] leading-[1.078] rotate-[-6.05deg] select-none mb-4"
          style={{ fontFamily: "'Angelic Bonques Script', cursive" }}
        >
          Contact Me
        </p>

        {/* Heading */}
        <h2 className="text-[45px] font-bold text-white leading-[1.173] text-center whitespace-pre-line">
          {`לשיחת ייעוץ\n השאירו פרטים עכשיו`}
        </h2>
        <p className="mt-4 text-[16px] text-white/80 text-center max-w-sm leading-[1.371]">
          {site.contact.sub}
        </p>

        {/* Contact chips */}
        <div className="mt-6 flex items-center gap-4 flex-wrap justify-center">
          <a
            href={`https://wa.me/${site.contact.phoneIntl.replace("+", "")}?text=${encodeURIComponent(site.contact.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#f4f0eb] text-[20px] hover:text-[#e79c7d] transition-colors"
          >
            <Image src={whatsappIcon} alt="WhatsApp" width={29} height={29} />
            <bdi>{site.contact.phoneDisplay}</bdi>
          </a>
          <div className="w-px h-6 bg-white/30" />
          <a
            href={`mailto:${site.contact.email}`}
            className="flex items-center gap-2 text-[#f4f0eb] text-[20px] hover:text-[#e79c7d] transition-colors"
          >
            <Image src={mailIcon} alt="Email" width={29} height={29} />
            <bdi>{site.contact.email}</bdi>
          </a>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full space-y-4">
          <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          {/* Name + Phone row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                id="name"
                {...register("name")}
                placeholder="שם מלא*"
                aria-invalid={!!errors.name}
                className="w-full bg-[#222439] border border-white rounded-full h-[66px] px-6 text-[16px] text-white placeholder-white/40 text-end focus:outline-none focus:border-[#e79c7d]"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400 text-end">{errors.name.message}</p>}
            </div>
            <div>
              <input
                id="phone"
                inputMode="tel"
                {...register("phone")}
                placeholder="טלפון*"
                aria-invalid={!!errors.phone}
                className="w-full bg-[#222439] border border-white rounded-full h-[66px] px-6 text-[16px] text-white placeholder-white/40 text-end focus:outline-none focus:border-[#e79c7d]"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-400 text-end">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="דואר אלקטרוני*"
              aria-invalid={!!errors.email}
              className="w-full bg-[#222439] border border-white rounded-full h-[66px] px-6 text-[16px] text-white placeholder-white/40 text-end focus:outline-none focus:border-[#e79c7d]"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400 text-end">{errors.email.message}</p>}
          </div>

          {/* Message */}
          <div>
            <textarea
              id="message"
              rows={5}
              {...register("message")}
              placeholder="*איך אני יכולה לעזור?"
              aria-invalid={!!errors.message}
              className="w-full bg-[#222439] border border-white rounded-[30px] px-6 py-4 text-[16px] text-white placeholder-white/40 text-end focus:outline-none focus:border-[#e79c7d] resize-none"
            />
            {errors.message && <p className="mt-1 text-sm text-red-400 text-end">{errors.message.message}</p>}
          </div>

          {/* Disclaimer checkbox */}
          <div className="flex items-center justify-end gap-2">
            <span className="text-[13px] text-white text-end">דיסקליימר</span>
            <div className="w-[20px] h-[20px] border border-white rounded-[5px] shrink-0" />
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#e79c7d] border border-black rounded-[83px] h-[55px] px-10 text-[18px] font-bold text-[#30303b] hover:bg-[#d4845f] transition-colors disabled:opacity-50"
            >
              {submitting ? "שולח..." : "שליחה"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
