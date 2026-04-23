import type { Metadata } from "next";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { AboutBrief } from "@/components/sections/AboutBrief";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { Process } from "@/components/sections/Process";
import { LawyerSpotlight } from "@/components/sections/LawyerSpotlight";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFloat } from "@/components/sections/WhatsAppFloat";
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
        <AboutBrief />
        <PracticeAreas />
        <Process />
        <LawyerSpotlight />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
