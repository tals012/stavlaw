import { site } from "@/content/site";

export function WhatsAppFloat() {
  if (!site.features.whatsappFloat) return null;
  const href = `https://wa.me/${site.contact.phoneIntl.replace("+", "")}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="פנייה בוואטסאפ"
      className="fixed bottom-6 start-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.85 11.85 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.83c0 2.08.54 4.12 1.58 5.91L0 24l6.42-1.69a11.84 11.84 0 0 0 5.62 1.43h.01c6.54 0 11.85-5.3 11.85-11.83 0-3.16-1.23-6.13-3.38-8.43M12.05 21.42h-.01a9.6 9.6 0 0 1-4.9-1.34l-.35-.21-3.81 1 1.02-3.72-.23-.38a9.57 9.57 0 0 1-1.47-5.1c0-5.29 4.31-9.6 9.62-9.6 2.57 0 4.98 1 6.8 2.82a9.53 9.53 0 0 1 2.82 6.79c0 5.29-4.32 9.6-9.62 9.6"/>
      </svg>
    </a>
  );
}
