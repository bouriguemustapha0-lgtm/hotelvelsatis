import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { HOTEL } from "@/lib/hotel-data";
import { useT } from "@/lib/i18n";

const PLATFORMS = [
  { name: "TripAdvisor", url: HOTEL.tripadvisor, color: "#00af87" },
  { name: "Booking.com", url: HOTEL.booking, color: "#003580" },
  { name: "Reserving.com", url: HOTEL.reserving, color: "#c7512c" },
  { name: "Expedia", url: HOTEL.expedia, color: "#ffc107" },
];

export function BookingPlatforms() {
  const t = useT();
  return (
    <section id="book" className="relative bg-ink py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20"
        >
          <p className="eyebrow flex items-center justify-center gap-3 text-cream/60">
            <span className="gold-rule" /> {t("booking.eyebrow")} <span className="gold-rule" />
          </p>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] text-cream">
            {t("booking.title1")} <em className="italic text-gold">{t("booking.titleEm")}</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PLATFORMS.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-cream/5 border border-cream/10 px-6 py-8 md:p-12 text-center hover:bg-cream/10 hover:border-gold/40 transition-all duration-500"
            >
              <div className="font-display text-2xl md:text-3xl text-cream mb-3">
                {p.name}
              </div>
              <div
                className="mx-auto mb-5 md:mb-8 h-px w-12 transition-all duration-500 group-hover:w-20"
                style={{ backgroundColor: p.color }}
              />
              <span className="block text-xs md:text-sm tracking-[0.12em] md:tracking-[0.15em] uppercase text-cream/70 group-hover:text-gold transition-colors break-words">
                {t(`booking.labels.${p.name}`)}
                <ExternalLink size={14} className="inline-block ml-1.5 align-middle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
