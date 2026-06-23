import { motion } from "motion/react";
import { HOTEL } from "@/lib/hotel-data";
import { useT } from "@/lib/i18n";

export function Overview() {
  const t = useT();
  const stats = [
    { value: "12+", label: t("overview.stats.years") },
    { value: "50", label: t("overview.stats.rooms") },
    { value: "5000+", label: t("overview.stats.guests") },
    { value: HOTEL.rating.toFixed(1), label: t("overview.stats.rating") },
  ];
  return (
    <section className="relative bg-background py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="min-w-0 lg:col-span-5"
          >
            <p className="eyebrow flex items-center gap-3">
              <span className="gold-rule" /> {t("overview.eyebrow")}
            </p>
            <h2 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              {t("overview.title1")} <em className="italic text-gold">{t("overview.titleEm")}</em> {t("overview.title2")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="min-w-0 lg:col-span-7 lg:pt-4 space-y-6 text-base md:text-lg leading-relaxed text-foreground/75"
          >
            <p>{t("overview.p1")}</p>
            <p>{t("overview.p2")}</p>
            <p className="text-foreground/55 italic font-display text-xl">
              "{t("overview.quote")}"
            </p>
          </motion.div>
        </div>

        <div className="mt-16 md:mt-20 lg:mt-28 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-background p-8 md:p-10 group"
            >
              <div className="font-display text-5xl md:text-6xl text-foreground group-hover:text-gold transition-colors">
                {s.value}
              </div>
              <p className="mt-3 text-[0.7rem] tracking-luxe uppercase text-muted-foreground">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
