import { Instagram, Facebook } from "lucide-react";
import { HOTEL } from "@/lib/hotel-data";
import { useT } from "@/lib/i18n";

const LINKS = [
  { href: "#home", key: "nav.home" },
  { href: "#rooms", key: "nav.rooms" },
  { href: "#amenities", key: "nav.amenities" },
  { href: "#gallery", key: "nav.gallery" },
  { href: "#reviews", key: "nav.reviews" },
  { href: "#contact", key: "nav.contact" },
];

export function Footer() {
  const t = useT();
  return (
    <footer className="bg-ink text-cream/80 border-t border-cream/10">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="font-display text-3xl text-cream">Velsatis</div>
            <p className="mt-2 text-[0.65rem] tracking-luxe uppercase text-cream/55">{t("footer.tagline")}</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/65">
              {t("footer.intro")}
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-cream/50 mb-4">{t("footer.navigate")}</p>
            <ul className="space-y-2.5 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-cream/75 hover:text-gold transition-colors">{t(l.key)}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="eyebrow text-cream/50 mb-4">{t("footer.contact")}</p>
            <ul className="space-y-2.5 text-sm text-cream/75">
              <li>{HOTEL.address}</li>
              <li><a href={`tel:${HOTEL.phone}`} className="hover:text-gold transition-colors">{HOTEL.phone}</a></li>
              <li><a href={`mailto:${HOTEL.email}`} className="hover:text-gold transition-colors">{HOTEL.email}</a></li>
            </ul>
            <div className="mt-5 flex items-center gap-4">
              <a href={HOTEL.instagram} target="_blank" rel="noreferrer" className="text-cream/65 hover:text-gold transition-colors" aria-label="Instagram"><Instagram size={18} /></a>
              <a href={HOTEL.facebook} target="_blank" rel="noreferrer" className="text-cream/65 hover:text-gold transition-colors" aria-label="Facebook"><Facebook size={18} /></a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-cream/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[0.65rem] tracking-luxe uppercase text-cream/50">
          <p>{t("footer.copyright", { year: new Date().getFullYear(), license: HOTEL.license })}</p>
          <p>{t("footer.crafted")}</p>
        </div>
      </div>
    </footer>
  );
}
