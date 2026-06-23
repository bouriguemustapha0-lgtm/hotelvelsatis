import { useEffect, useRef, useState } from "react";
import { Languages, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/translations";

export function LanguageSwitcher({ scrolled }: { scrolled: boolean }) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1.5 text-[0.7rem] tracking-luxe uppercase transition-colors px-2 py-1.5 rounded-sm ${
          scrolled ? "text-foreground/80 hover:text-gold" : "text-cream/80 hover:text-gold"
        }`}
        aria-label="Change language"
        aria-expanded={open}
      >
        <Languages size={14} />
        <span>{LOCALE_META[locale].short}</span>
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 min-w-[160px] bg-background border hairline shadow-lg overflow-hidden z-50">
          {LOCALES.map((l) => (
            <li key={l}>
              <button
                onClick={() => { setLocale(l as Locale); setOpen(false); }}
                className={`w-full text-left flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-secondary ${
                  l === locale ? "text-gold" : "text-foreground/85"
                }`}
              >
                <span>{LOCALE_META[l as Locale].label}</span>
                {l === locale && <Check size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
