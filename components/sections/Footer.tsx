import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-[#1a1c2d] py-4">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-cream-100/80 text-[14px]">
          {/* Right (RTL source start): brand */}
          <span className="font-medium">{site.brand.name}</span>

          {/* Center: legal links */}
          <span>תקנון האתר | הצהרת פרטיות</span>

          {/* Left (RTL source end): copyright + attribution */}
          <div className="flex items-center gap-4">
            <span>כל הזכויות שמורות | 2026</span>
            <span className="text-cream-100/50">|</span>
            <span>על ידי UC Digital | בנייה עיצוב מיתוג</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
