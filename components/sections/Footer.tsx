import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-navy-ink py-10 text-cream-100/80">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-cream-100">{site.brand.name}</h3>
            <p className="mt-2 text-sm">{site.seo.tagline}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase text-cream-100">יצירת קשר</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href={`tel:${site.contact.phoneIntl}`} className="hover:text-peach"><bdi>{site.contact.phoneDisplay}</bdi></a></li>
              <li><a href={`mailto:${site.contact.email}`} className="hover:text-peach"><bdi>{site.contact.email}</bdi></a></li>
              <li>{site.contact.address.street}, {site.contact.address.city}</li>
              <li>{site.contact.hours}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase text-cream-100">מידע</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="#practice-areas" className="hover:text-peach">תחומי התמחות</a></li>
              <li><a href="#faq" className="hover:text-peach">שאלות נפוצות</a></li>
              <li><a href="#contact" className="hover:text-peach">צור קשר</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-cream-100/10 pt-5 text-center text-xs">
          © {new Date().getFullYear()} {site.seo.siteName}. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
