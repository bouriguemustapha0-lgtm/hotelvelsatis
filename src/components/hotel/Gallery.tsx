import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY, CATEGORIES } from "@/lib/hotel-data";
import { useT } from "@/lib/i18n";

export function Gallery() {
  const t = useT();
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.category === filter)),
    [filter]
  );

  const spans = [
    "md:col-span-2 md:row-span-2",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-2",
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-1",
  ];

  return (
    <section id="gallery" className="relative bg-secondary py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">
          <div>
            <p className="eyebrow flex items-center gap-3">
              <span className="gold-rule" /> {t("gallery.eyebrow")}
            </p>
            <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
              {t("gallery.title1")} <em className="italic text-gold">{t("gallery.titleEm")}</em>
            </h2>
          </div>
          <ul className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <button
                  onClick={() => setFilter(c)}
                  className={`px-4 py-2 text-[0.7rem] tracking-luxe uppercase border transition-colors ${
                    filter === c
                      ? "bg-ink text-cream border-ink"
                      : "border-foreground/20 text-foreground/70 hover:border-gold hover:text-gold"
                  }`}
                >
                  {t(`gallery.categories.${c}`)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.button
                layout
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                onClick={() => setLightbox(i)}
                className={`relative overflow-hidden group ${spans[i % spans.length]}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[0.6rem] tracking-luxe uppercase text-cream/80">{t(`gallery.categories.${img.category}`)}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={filtered}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onNav={(i) => setLightbox(i)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({
  images, index, onClose, onNav,
}: {
  images: typeof GALLERY;
  index: number;
  onClose: () => void;
  onNav: (i: number) => void;
}) {
  const t = useT();
  const img = images[index];
  const prev = () => onNav((index - 1 + images.length) % images.length);
  const next = () => onNav((index + 1) % images.length);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-5 right-5 text-cream/80 hover:text-gold transition-colors p-2" aria-label="Close">
        <X size={24} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-8 text-cream/80 hover:text-gold transition-colors p-2" aria-label="Previous">
        <ChevronLeft size={32} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 text-cream/80 hover:text-gold transition-colors p-2" aria-label="Next">
        <ChevronRight size={32} />
      </button>
      <motion.figure
        key={img.src}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={img.src} alt={img.alt} className="w-full max-h-[80vh] object-contain" />
        <figcaption className="mt-4 text-center text-[0.7rem] tracking-luxe uppercase text-cream/70">
          {t(`gallery.categories.${img.category}`)} · {index + 1} / {images.length}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
