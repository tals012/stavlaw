import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-[#222439] py-6">
      <div className="mx-auto max-w-[1920px] px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[#f4f0eb] text-[18px]">
          {/* Right: brand name */}
          <span className="font-medium">{site.brand.name}</span>

          {/* Center: legal links */}
          <span className="font-medium">תקנון האתר | הצהרת פרטיות</span>

          {/* Left: copyright + rights */}
          <div className="flex items-center gap-6">
            <span className="font-medium">כל הזכויות שמורות | 2026</span>
            <span className="font-medium text-[16px] text-[#f4f0eb]/80">
              © {site.seo.siteName}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
