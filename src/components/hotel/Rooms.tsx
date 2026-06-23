import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Users, Check } from "lucide-react";
import { ROOMS } from "@/lib/hotel-data";

type Room = typeof ROOMS[number];

export function Rooms() {
  const [active, setActive] = useState<Room | null>(null);

  return (
    <section id="rooms" className="relative bg-secondary py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-20">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="gold-rule" /> Accommodation
            </p>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] max-w-2xl">
              Rooms shaped by <em className="italic text-gold">light and linen.</em>
            </h2>
          </div>
          <p className="md:max-w-sm text-foreground/70 leading-relaxed">
            Every room opens onto a private balcony or terrace — framed views
            of the boulevard, the city or the Middle Atlas beyond.
          </p>
        </div>

        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          {ROOMS.map((room, i) => (
            <motion.article
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
              className="group bg-background"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-5 left-5 bg-cream/95 backdrop-blur px-3 py-1.5 text-[0.65rem] tracking-luxe uppercase text-ink">
                  {room.bed}
                </div>
              </div>

              <div className="p-7 md:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl md:text-3xl">{room.name}</h3>
                  <div className="text-right shrink-0">
                    <div className="font-display text-2xl text-gold">{room.price}<span className="text-base text-foreground/60"> MAD</span></div>
                    <p className="text-[0.6rem] tracking-luxe uppercase text-muted-foreground">per night · from</p>
                  </div>
                </div>

                <p className="mt-4 text-foreground/70 leading-relaxed text-[0.95rem]">
                  {room.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t hairline pt-5">
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Users size={15} className="text-gold" />
                    Sleeps {room.capacity}
                  </div>
                  <button
                    onClick={() => setActive(room)}
                    className="text-[0.7rem] tracking-luxe uppercase border-b border-foreground/40 pb-0.5 hover:border-gold hover:text-gold transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-background max-w-4xl w-full max-h-[90vh] overflow-y-auto grid md:grid-cols-2"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-cream/95 hover:bg-gold transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <div className="aspect-[4/5] md:aspect-auto md:h-full">
                <img src={active.image} alt={active.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-8 md:p-10">
                <p className="eyebrow">{active.bed}</p>
                <h3 className="mt-3 font-display text-3xl md:text-4xl">{active.name}</h3>
                <p className="mt-4 text-foreground/75 leading-relaxed">{active.description}</p>

                <div className="mt-6">
                  <p className="eyebrow mb-4">In Every Room</p>
                  <ul className="space-y-2.5">
                    {active.amenities.map((a) => (
                      <li key={a} className="flex items-center gap-3 text-sm text-foreground/80">
                        <Check size={14} className="text-gold shrink-0" /> {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex items-end justify-between border-t hairline pt-6">
                  <div>
                    <div className="font-display text-3xl text-gold">{active.price} <span className="text-base text-foreground/60">MAD</span></div>
                    <p className="text-[0.65rem] tracking-luxe uppercase text-muted-foreground">per night · from</p>
                  </div>
                  <a
                    href="#contact"
                    onClick={() => setActive(null)}
                    className="inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 text-[0.7rem] tracking-luxe uppercase hover:bg-gold hover:text-ink transition-colors"
                  >
                    Enquire
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
