"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { site } from "@/content/site";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { Script } from "@/components/ui/Script";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import Image from "next/image";
import aboutPortrait from "@/figma-assets/about-portrait.jpg";
import whatsappIcon from "@/figma-assets/whatsapp-icon.svg";
import mailIcon from "@/figma-assets/mail-icon.svg";

export function ContactForm() {
  const { dict } = useLocale();
  const c = dict.contact;
  const form = c.form;
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
      toast.success(form.successToast);
      reset();
    } catch {
      toast.error(form.errorToast);
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
        <Script className="text-[clamp(2.5rem,3.5vw,54px)] leading-none block mb-4">
          {c.eyebrow}
        </Script>

        {/* Heading */}
        <h2 className="text-[clamp(2rem,3vw,45px)] font-bold text-white leading-[1.173] text-center">
          {c.headingLine1}
          <br />
          {c.headingLine2}
        </h2>
        <p className="mt-4 text-[16px] text-white/80 text-center max-w-sm leading-[1.371]">
          {c.sub}
        </p>

        {/* Contact chips */}
        <div className="mt-6 flex items-center gap-4 flex-wrap justify-center">
          <a
            href={`https://wa.me/${site.contact.phoneIntl.replace("+", "")}?text=${encodeURIComponent(c.whatsappMessage)}`}
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
                placeholder={form.namePlaceholder}
                aria-label={form.namePlaceholder}
                aria-invalid={!!errors.name}
                className="w-full bg-[#222439] border border-white rounded-full h-[66px] px-6 text-[16px] text-white placeholder-white/40 focus:outline-none focus:border-[#e79c7d]"
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
            </div>
            <div>
              <input
                id="phone"
                inputMode="tel"
                {...register("phone")}
                placeholder={form.phonePlaceholder}
                aria-label={form.phonePlaceholder}
                aria-invalid={!!errors.phone}
                className="w-full bg-[#222439] border border-white rounded-full h-[66px] px-6 text-[16px] text-white placeholder-white/40 focus:outline-none focus:border-[#e79c7d]"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder={form.emailPlaceholder}
              aria-label={form.emailPlaceholder}
              aria-invalid={!!errors.email}
              className="w-full bg-[#222439] border border-white rounded-full h-[66px] px-6 text-[16px] text-white placeholder-white/40 focus:outline-none focus:border-[#e79c7d]"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
          </div>

          {/* Message */}
          <div>
            <textarea
              id="message"
              rows={5}
              {...register("message")}
              placeholder={form.messagePlaceholder}
              aria-label={form.messagePlaceholder}
              aria-invalid={!!errors.message}
              className="w-full bg-[#222439] border border-white rounded-[30px] px-6 py-4 text-[16px] text-white placeholder-white/40 focus:outline-none focus:border-[#e79c7d] resize-none"
            />
            {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
          </div>

          {/* Disclaimers - justify-start in RTL = visual right */}
          <div className="space-y-2.5">
            <label className="flex items-start justify-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("consentLocation")}
                aria-invalid={!!errors.consentLocation}
                className="mt-[3px] h-[18px] w-[18px] shrink-0 appearance-none rounded-[5px] border border-white bg-transparent checked:bg-[#e79c7d] checked:border-[#e79c7d] focus:outline-none focus:ring-2 focus:ring-[#e79c7d]/40 cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-[12px] checked:after:font-bold checked:after:text-[#30303b]"
              />
              <span className="text-[13px] text-white leading-snug">
                משרד עו״ד סתיו אליהו שוקרון ממוקם בבאר שבע. אני מאשר/ת שזה רלוונטי עבורי.
              </span>
            </label>
            <label className="flex items-start justify-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("consentMarketing")}
                aria-invalid={!!errors.consentMarketing}
                className="mt-[3px] h-[18px] w-[18px] shrink-0 appearance-none rounded-[5px] border border-white bg-transparent checked:bg-[#e79c7d] checked:border-[#e79c7d] focus:outline-none focus:ring-2 focus:ring-[#e79c7d]/40 cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-[12px] checked:after:font-bold checked:after:text-[#30303b]"
              />
              <span className="text-[13px] text-white leading-snug">
                אני מאשר/ת קבלת דיוור ומידע פרסומי ואת תנאי השימוש ו־מדיניות הפרטיות באתר.
              </span>
            </label>
            {errors.consentLocation && (
              <p className="text-sm text-red-400">יש לאשר את התנאי</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#e79c7d] border border-black rounded-[83px] h-[55px] px-10 text-[18px] font-bold text-[#30303b] hover:bg-[#d4845f] transition-colors disabled:opacity-50"
            >
              {submitting ? form.submitting : form.submit}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
