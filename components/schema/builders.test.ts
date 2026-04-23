import { describe, it, expect } from "vitest";
import { buildAttorney, buildLocalBusiness, buildFAQPage, buildBreadcrumbList } from "./builders";
import { site } from "@/content/site";

describe("schema builders", () => {
  it("Attorney has required fields", () => {
    const s = buildAttorney({ baseUrl: "https://stavlaw.co.il" });
    expect(s["@type"]).toBe("Attorney");
    expect(s.name).toBeTruthy();
    expect(s.telephone).toBe(site.contact.phoneIntl);
    expect(s.address["@type"]).toBe("PostalAddress");
  });

  it("LocalBusiness has address + url", () => {
    const s = buildLocalBusiness({ baseUrl: "https://stavlaw.co.il" });
    expect(s.url).toBe("https://stavlaw.co.il");
    expect(s.address.addressLocality).toBe(site.contact.address.city);
  });

  it("FAQPage builds mainEntity from content", () => {
    const s = buildFAQPage();
    expect(s["@type"]).toBe("FAQPage");
    expect(Array.isArray(s.mainEntity)).toBe(true);
    expect(s.mainEntity.length).toBe(site.faq.length);
  });

  it("BreadcrumbList has a Home crumb", () => {
    const s = buildBreadcrumbList({ baseUrl: "https://stavlaw.co.il" });
    expect(s.itemListElement[0]?.name).toBe("בית");
  });
});
