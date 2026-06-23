import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { HOTEL, REVIEWS } from "@/lib/hotel-data";

export function Reviews() {
  return (
    <section id="reviews" className="relative bg-background py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-end mb-16 md:mb-20">
          <div className="md:col-span-7">
            <p className="eyebrow flex items-center gap-3">
              <span className="gold-rule" /> Guest Voices
            </p>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
              <em className="italic text-gold">{HOTEL.rating.toFixed(1)}</em> from {HOTEL.reviewsCount} travellers, in their own words.
            </h2>
          </div>
          <div className="md:col-span-5 grid grid-cols-3 gap-px bg-border self-stretch">
            {Object.entries(HOTEL.scores).slice(0, 3).map(([k, v]) => (
              <div key={k} className="bg-background p-5 text-center">
                <div className="font-display text-3xl text-foreground">{v.toFixed(1)}</div>
                <p className="mt-1 text-[0.6rem] tracking-luxe uppercase text-muted-foreground">{k}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="relative bg-secondary p-8 md:p-10 group hover:bg-ink hover:text-cream transition-colors duration-500"
            >
              <Quote size={28} className="text-gold/70 mb-6" />
              <blockquote className="font-display text-lg md:text-xl leading-snug italic">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-between pt-6 border-t border-foreground/15 group-hover:border-cream/20 transition-colors">
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-[0.65rem] tracking-luxe uppercase opacity-60 mt-1">{r.country}</div>
                </div>
                <div className="flex items-center gap-1.5 text-gold">
                  <Star size={14} fill="currentColor" />
                  <span className="font-display text-lg">{r.rating.toFixed(1)}</span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
