import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { KnowFirsthand } from "@/components/sections/KnowFirsthand";
import { AboutBrief } from "@/components/sections/AboutBrief";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { Process } from "@/components/sections/Process";
import { LawyerSpotlight } from "@/components/sections/LawyerSpotlight";
import { WhyMe } from "@/components/sections/WhyMe";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
import { FadeInSection } from "@/components/ui/FadeInSection";
import { JsonLd } from "@/components/schema/JsonLd";
import {
  buildAttorney,
  buildLegalService,
  buildLocalBusiness,
  buildPerson,
  buildFAQPage,
  buildBreadcrumbList,
} from "@/components/schema/builders";
import { baseUrl, landingMetadata } from "@/lib/seo";

export const metadata: Metadata = landingMetadata();

export default function Home() {
  const ctx = { baseUrl: baseUrl() };
  return (
    <>
      <JsonLd data={buildAttorney(ctx)} />
      <JsonLd data={buildLegalService(ctx)} />
      <JsonLd data={buildLocalBusiness(ctx)} />
      <JsonLd data={buildPerson(ctx)} />
      <JsonLd data={buildFAQPage()} />
      <JsonLd data={buildBreadcrumbList(ctx)} />
      <Nav />
      <main>
        <Hero />
        <FadeInSection><KnowFirsthand /></FadeInSection>
        <FadeInSection><AboutBrief /></FadeInSection>
        <FadeInSection><PracticeAreas /></FadeInSection>
        <FadeInSection><Process /></FadeInSection>
        <FadeInSection><LawyerSpotlight /></FadeInSection>
        <FadeInSection><WhyMe /></FadeInSection>
        <FadeInSection><Testimonials /></FadeInSection>
        <FadeInSection><FAQ /></FadeInSection>
        <FadeInSection><ContactForm /></FadeInSection>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
