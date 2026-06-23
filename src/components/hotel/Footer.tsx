import { Instagram, Facebook } from "lucide-react";
import { HOTEL } from "@/lib/hotel-data";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#rooms", label: "Rooms" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream/80 border-t border-cream/10">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="font-display text-3xl text-cream">Velsatis</div>
            <p className="mt-2 text-[0.65rem] tracking-luxe uppercase text-cream/55">Hôtel · Café · Restaurant</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/65">
              A boutique address in Beni Mellal — quiet luxury at the foot of the Middle Atlas, since 2012.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-cream/50 mb-4">Navigate</p>
            <ul className="space-y-2.5 text-sm">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-cream/75 hover:text-gold transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="eyebrow text-cream/50 mb-4">Contact</p>
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
          <p>© {new Date().getFullYear()} Hotel Velsatis · License {HOTEL.license}</p>
          <p>Crafted in Beni Mellal, Morocco</p>
        </div>
      </div>
    </footer>
  );
}
