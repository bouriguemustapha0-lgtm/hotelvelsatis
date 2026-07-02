import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";
import logoAsset from "@/assets/velsatis-logo.png";

const LINKS = [
  { href: "#home", key: "nav.home" },
  { href: "#rooms", key: "nav.rooms" },
  { href: "#amenities", key: "nav.amenities" },
  { href: "#gallery", key: "nav.gallery" },
  { href: "#reviews", key: "nav.reviews" },
  { href: "#book", key: "nav.book" },
  { href: "#reserve", key: "nav.reserve" },
  { href: "#contact", key: "nav.contact" },
];

export function Navbar() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b hairline"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:py-5">
        <a href="#home" className="flex min-w-0 items-center group" aria-label="Velsatis Hotel & Resort">
          <img
            src={logoAsset}
            alt="Velsatis Hotel & Resort"
            className="h-10 md:h-12 w-auto object-contain transition-all"
          />
        </a>

        <ul className="hidden lg:flex items-center gap-7 xl:gap-9">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-[0.78rem] tracking-[0.18em] uppercase transition-colors relative after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 ${
                  scrolled ? "text-foreground/80 hover:text-foreground" : "text-cream/80 hover:text-cream"
                }`}
              >
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher scrolled={scrolled} />
          <a
            href="#book"
            className={`inline-flex items-center gap-2 border px-5 py-2.5 text-[0.7rem] tracking-luxe uppercase transition-all ${
              scrolled
                ? "border-foreground/20 text-foreground hover:bg-foreground hover:text-cream"
                : "border-cream/40 text-cream hover:bg-cream hover:text-ink"
            }`}
          >
            {t("nav.reserve")}
          </a>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher scrolled={scrolled} />
          <button
            onClick={() => setOpen((o) => !o)}
            className={`p-2 -mr-2 rounded-sm transition-colors active:bg-foreground/10 ${scrolled ? "text-foreground" : "text-cream"}`}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-background border-t hairline shadow-lg"
          >
            <ul className="px-6 py-6 space-y-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    onClick={() => setOpen(false)}
                    href={l.href}
                    className="block py-3 text-sm tracking-[0.2em] uppercase text-foreground/80 border-b border-foreground/5 transition-colors active:text-gold active:bg-foreground/[0.03]"
                  >
                    {t(l.key)}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href="#book"
                  onClick={() => setOpen(false)}
                  className="block text-center border border-foreground/30 px-5 py-3.5 text-xs tracking-luxe uppercase transition-colors active:bg-foreground active:text-cream"
                >
                  {t("nav.reserve")}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}
