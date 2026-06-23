import { motion } from "motion/react";
import { HOTEL } from "@/lib/hotel-data";

const stats = [
  { value: "12+", label: "Years of Hospitality" },
  { value: "50", label: "Considered Rooms" },
  { value: "5000+", label: "Guests Welcomed" },
  { value: HOTEL.rating.toFixed(1), label: "Guest Rating" },
];

export function Overview() {
  return (
    <section className="relative bg-background py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5"
          >
            <p className="eyebrow flex items-center gap-3">
              <span className="gold-rule" /> Our Story
            </p>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
              A house of <em className="italic text-gold">warm hospitality</em> at the foot of the Atlas.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:col-span-7 md:pt-4 space-y-6 text-base md:text-lg leading-relaxed text-foreground/75"
          >
            <p>
              Set on Boulevard Mohamed V in the heart of Beni Mellal,
              Velsatis was conceived as a quiet counterpoint to the city's
              rhythm — a place where Moroccan craft, considered service and
              an unhurried café culture come together under one roof.
            </p>
            <p>
              Our philosophy is simple. Spaces should breathe. Light should be
              respected. Guests should be remembered. Whether you arrive for a
              single night between Marrakech and Fès, or stay a week to explore
              the cascades d'Ouzoud and the Middle Atlas, we keep things
              generous, warm, and personal.
            </p>
            <p className="text-foreground/55 italic font-display text-xl">
              "Luxury, here, is the absence of friction."
            </p>
          </motion.div>
        </div>

        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
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
