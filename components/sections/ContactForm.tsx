"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/content/site";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

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
    <section id="contact" className="bg-cream-100 py-20">
      <div className="mx-auto max-w-xl px-5">
        <div className="text-center">
          <h2 className="text-3xl font-black text-navy-ink md:text-4xl">{site.contact.heading}</h2>
          <p className="mt-3 text-navy-ink/75">{site.contact.sub}</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-4">
          <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div>
            <Label htmlFor="name">שם מלא</Label>
            <Input id="name" {...register("name")} aria-invalid={!!errors.name} />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="phone">טלפון</Label>
            <Input id="phone" inputMode="tel" {...register("phone")} aria-invalid={!!errors.phone} />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">אימייל</Label>
            <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="message">הודעה</Label>
            <Textarea id="message" rows={5} {...register("message")} aria-invalid={!!errors.message} />
            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
          </div>
          <Button type="submit" disabled={submitting} className="w-full bg-peach text-white hover:bg-peach-600">
            {submitting ? "שולח..." : "שליחה"}
          </Button>
        </form>
      </div>
    </section>
  );
}
