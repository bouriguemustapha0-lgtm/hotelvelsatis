import { motion } from "motion/react";
import { Star, MapPin, Users } from "lucide-react";
import { HOTEL, IMAGES } from "@/lib/hotel-data";
import { useT } from "@/lib/i18n";

export function Hero() {
  const t = useT();
  return (
    <section id="home" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={IMAGES.heroNight}
          alt="Velsatis hotel illuminated at night in Beni Mellal"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/80" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex-1 mx-auto flex w-full max-w-7xl flex-col justify-end px-6 pt-28 md:pt-32 pb-16 md:pb-20 lg:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-cream/80 text-xs md:text-sm tracking-luxe uppercase flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold" />
            {HOTEL.tagline} · {t("hero.eyebrowSuffix")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 max-w-4xl font-display text-cream text-[3.2rem] leading-[1.02] tracking-tight md:text-[5rem] lg:text-[6.5rem]"
          >
            {t("hero.title1")}
            <br />
            <em className="italic text-gold-soft">{t("hero.title2")}</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="mt-8 max-w-xl text-cream/80 text-base md:text-lg leading-relaxed"
          >
            {t("hero.body")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#rooms"
              className="inline-flex items-center gap-3 bg-cream text-ink px-7 py-4 text-xs tracking-luxe uppercase hover:bg-gold transition-colors"
            >
              {t("hero.exploreRooms")}
              <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-cream/50 text-cream px-7 py-4 text-xs tracking-luxe uppercase hover:bg-cream hover:text-ink transition-colors"
            >
              {t("hero.contactHotel")}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.25 }}
            className="mt-12 md:mt-14 grid grid-cols-3 gap-5 md:gap-8 lg:gap-12 max-w-2xl border-t border-cream/20 pt-8"
          >
            <Stat icon={<Star size={14} />} value={HOTEL.rating.toFixed(1)} label={t("hero.statReviewsLabel", { count: HOTEL.reviewsCount })} />
            <Stat icon={<Users size={14} />} value="5000+" label={t("hero.statGuests")} />
            <Stat icon={<MapPin size={14} />} value="Beni Mellal" label={t("hero.statLocationLabel")} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.65rem] tracking-luxe uppercase text-cream/55"
          >
            <span>{t("hero.reserveVia")}</span>
            <a href={HOTEL.booking} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">Booking.com</a>
            <span className="opacity-40">·</span>
            <a href={HOTEL.tripadvisor} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">Tripadvisor</a>
            <span className="opacity-40">·</span>
            <a href={HOTEL.reserving} target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">Reserving.com</a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/60"
      >
        <span className="text-[0.6rem] tracking-luxe uppercase">{t("hero.scroll")}</span>
        <div className="h-10 w-px bg-cream/40 origin-top animate-[pulse_2.5s_ease-in-out_infinite]" />
      </motion.div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-gold">{icon}<span className="font-display text-2xl md:text-3xl text-cream">{value}</span></div>
      <p className="mt-1 text-[0.65rem] tracking-luxe uppercase text-cream/60">{label}</p>
    </div>
  );
}
