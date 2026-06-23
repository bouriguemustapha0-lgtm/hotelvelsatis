import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { HOTEL } from "@/lib/hotel-data";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#rooms", label: "Rooms" },
  { href: "#amenities", label: "Amenities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#book", label: "Book" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
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
        <a href="#home" className="flex min-w-0 items-baseline gap-2 group">
          <span
            className={`font-display text-2xl md:text-[1.65rem] tracking-tight transition-colors ${
              scrolled ? "text-foreground" : "text-cream"
            }`}
          >
            Velsatis
          </span>
          <span
            className={`hidden lg:inline whitespace-nowrap text-[0.65rem] tracking-luxe uppercase transition-colors ${
              scrolled ? "text-muted-foreground" : "text-cream/70"
            }`}
          >
            Beni Mellal
          </span>
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
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#book"
          className={`hidden lg:inline-flex items-center gap-2 border px-5 py-2.5 text-[0.7rem] tracking-luxe uppercase transition-all ${
            scrolled
              ? "border-foreground/20 text-foreground hover:bg-foreground hover:text-cream"
              : "border-cream/40 text-cream hover:bg-cream hover:text-ink"
          }`}
        >
          Reserve
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-cream"}`}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="md:hidden overflow-hidden bg-background border-t hairline"
          >
            <ul className="px-6 py-6 space-y-5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    onClick={() => setOpen(false)}
                    href={l.href}
                    className="block text-sm tracking-[0.2em] uppercase text-foreground/80"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#book"
                  onClick={() => setOpen(false)}
                  className="inline-block border border-foreground/30 px-5 py-2.5 text-xs tracking-luxe uppercase"
                >
                  Reserve
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
