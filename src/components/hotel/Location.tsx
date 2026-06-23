import { motion } from "motion/react";
import { MapPin, Phone, Mail, Instagram, Facebook, Navigation, Star } from "lucide-react";
import { HOTEL } from "@/lib/hotel-data";
import { useT } from "@/lib/i18n";

const NEARBY_IDS = ["airport", "ouzoud", "kasbah", "springs"] as const;

export function Location() {
  const t = useT();
  const mapSrc = `https://maps.google.com/maps?q=${HOTEL.coords.lat},${HOTEL.coords.lng}&hl=en&z=17&output=embed`;
  return (
    <section id="contact" className="relative bg-ink text-cream py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="min-w-0 lg:col-span-5"
          >
            <p className="eyebrow text-cream/60 flex items-center gap-3">
              <span className="gold-rule" /> {t("location.eyebrow")}
            </p>
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              {t("location.title1")} <em className="italic text-gold">{t("location.titleEm")}</em>
            </h2>

            <div className="mt-8 flex items-center gap-1.5">
              {Array.from({ length: HOTEL.stars }).map((_, i) => (
                <Star key={i} size={14} className="fill-gold text-gold" />
              ))}
              <span className="ml-2 text-[0.65rem] tracking-luxe uppercase text-cream/50">
                {t("location.starHotel", { n: HOTEL.stars })}
              </span>
            </div>

            <div className="mt-10 space-y-6">
              <Row icon={<MapPin size={18} />} label={t("location.address")} value={HOTEL.address} />
              <Row icon={<Phone size={18} />} label={t("location.hotel")} value={HOTEL.phoneLocal} href={`tel:${HOTEL.phone.replace(/\s/g, "")}`} />
              <Row icon={<Phone size={18} />} label={t("location.restaurant")} value={HOTEL.restaurantPhoneLocal} href={`tel:${HOTEL.restaurantPhone.replace(/\s/g, "")}`} />
              <Row icon={<Mail size={18} />} label={t("location.email")} value={HOTEL.email} href={`mailto:${HOTEL.email}`} />
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`tel:${HOTEL.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 bg-gold text-ink px-6 py-3.5 text-[0.7rem] tracking-luxe uppercase hover:bg-cream transition-colors"
              >
                <Phone size={14} /> {t("location.callHotel")}
              </a>
              <a
                href={`tel:${HOTEL.restaurantPhone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 border border-cream/30 text-cream px-6 py-3.5 text-[0.7rem] tracking-luxe uppercase hover:bg-cream hover:text-ink transition-colors"
              >
                <Phone size={14} /> {t("location.callRestaurant")}
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-cream/15">
              <p className="eyebrow text-cream/60 mb-5">{t("location.nearby")}</p>
              <ul className="space-y-3">
                {NEARBY_IDS.map((id) => (
                  <li key={id} className="flex items-baseline justify-between gap-4 text-sm">
                    <span className="text-cream/90">{t(`location.nearbyItems.${id}.name`)}</span>
                    <span className="text-cream/50 text-[0.7rem] tracking-wider">{t(`location.nearbyItems.${id}.distance`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-8 border-t border-cream/15 flex items-center gap-5">
              <span className="text-[0.65rem] tracking-luxe uppercase text-cream/60">{t("location.follow")}</span>
              <a href={HOTEL.instagram} target="_blank" rel="noreferrer" className="text-cream/70 hover:text-gold transition-colors" aria-label="Instagram"><Instagram size={18} /></a>
              <a href={HOTEL.facebook} target="_blank" rel="noreferrer" className="text-cream/70 hover:text-gold transition-colors" aria-label="Facebook"><Facebook size={18} /></a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(HOTEL.address)}`}
                target="_blank" rel="noreferrer"
                className="ml-auto inline-flex items-center gap-2 text-[0.65rem] tracking-luxe uppercase text-cream/70 hover:text-gold transition-colors"
              >
                <Navigation size={14} /> {t("location.directions")}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="min-w-0 lg:col-span-7"
          >
            <div className="relative aspect-[4/5] md:aspect-[16/10] lg:aspect-[5/6] overflow-hidden border border-cream/15 group">
              <iframe
                title="Map of Hotel Velsatis, Beni Mellal"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${HOTEL.coords.lat},${HOTEL.coords.lng}`}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-ink/90 backdrop-blur-sm border border-cream/20 text-cream px-4 py-2 text-[0.65rem] tracking-luxe uppercase hover:bg-gold hover:text-ink hover:border-gold transition-colors"
              >
                <Navigation size={12} /> {t("location.openInMaps")}
              </a>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-px bg-cream/15">
              <Mini label={t("location.checkIn")} value={t("location.checkInValue")} />
              <Mini label={t("location.checkOut")} value={t("location.checkOutValue")} />
              <Mini label={t("location.license")} value={HOTEL.license} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Row({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const body = (
    <div className="flex items-start gap-4 group">
      <span className="mt-1 text-gold">{icon}</span>
      <div>
        <p className="text-[0.6rem] tracking-luxe uppercase text-cream/50">{label}</p>
        <p className="mt-1 text-base text-cream/95 group-hover:text-gold transition-colors">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{body}</a> : body;
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ink p-4 text-center">
      <p className="text-[0.6rem] tracking-luxe uppercase text-cream/50">{label}</p>
      <p className="mt-1.5 font-display text-lg text-cream">{value}</p>
    </div>
  );
}
