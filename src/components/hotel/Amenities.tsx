import { motion } from "motion/react";
import {
  Wifi, UtensilsCrossed, Coffee, Croissant, ConciergeBell,
  Car, Wind, Plane,
} from "lucide-react";
import { AMENITIES } from "@/lib/hotel-data";
import { useT } from "@/lib/i18n";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  wifi: Wifi,
  utensils: UtensilsCrossed,
  coffee: Coffee,
  croissant: Croissant,
  concierge: ConciergeBell,
  car: Car,
  wind: Wind,
  plane: Plane,
};

export function Amenities() {
  const t = useT();
  return (
    <section id="amenities" className="relative bg-background py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="gold-rule" /> {t("amenities.eyebrow")}
          </p>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
            {t("amenities.title1")} <em className="italic text-gold">{t("amenities.titleEm")}</em>
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed">
            {t("amenities.intro")}
          </p>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {AMENITIES.map((a, i) => {
            const Icon = ICONS[a.icon] ?? Wifi;
            return (
              <motion.div
                key={a.icon}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-background p-7 md:p-9 group hover:bg-secondary transition-colors duration-500"
              >
                <Icon size={28} className="text-gold transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-6 font-display text-xl md:text-2xl">{t(`amenities.items.${a.icon}.name`)}</h3>
                <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{t(`amenities.items.${a.icon}.desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
