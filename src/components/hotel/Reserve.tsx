import { useMemo, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { CalendarDays, Users, BedDouble, Mail, ArrowRight } from "lucide-react";
import { HOTEL, ROOMS } from "@/lib/hotel-data";

const todayISO = () => new Date().toISOString().split("T")[0];
const plusDaysISO = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
};

export function Reserve() {
  const [checkIn, setCheckIn] = useState(todayISO());
  const [checkOut, setCheckOut] = useState(plusDaysISO(2));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomId, setRoomId] = useState(ROOMS[1]?.id ?? ROOMS[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const nights = useMemo(() => {
    const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.round(ms / 86400000));
  }, [checkIn, checkOut]);

  const room = ROOMS.find((r) => r.id === roomId) ?? ROOMS[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = `Reservation enquiry — ${room.name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Room: ${room.name}`,
      `Check-in: ${checkIn}`,
      `Check-out: ${checkOut}`,
      `Nights: ${nights}`,
      `Guests: ${adults} adult(s), ${children} child(ren)`,
      "",
      "Notes:",
      notes || "—",
    ].join("\n");
    window.location.href = `mailto:${HOTEL.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="reserve" className="relative bg-cream py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="eyebrow flex items-center justify-center gap-3 text-ink/60">
            <span className="gold-rule" /> Reservation <span className="gold-rule" />
          </p>
          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] text-ink">
            Reserve <em className="italic text-gold">your stay</em>
          </h2>
          <p className="mt-5 mx-auto max-w-xl text-ink/70">
            Send us your dates and we'll confirm availability within a few hours.
            Prefer a platform?{" "}
            <a href="#book" className="underline underline-offset-4 hover:text-gold">
              Book through one of our partners
            </a>
            .
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 bg-background border hairline p-6 md:p-10"
        >
          {/* Fields */}
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Check-in" icon={<CalendarDays size={16} />}>
              <input
                type="date"
                value={checkIn}
                min={todayISO()}
                onChange={(e) => setCheckIn(e.target.value)}
                className="input"
                required
              />
            </Field>
            <Field label="Check-out" icon={<CalendarDays size={16} />}>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="input"
                required
              />
            </Field>
            <Field label="Adults" icon={<Users size={16} />}>
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="input"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Children" icon={<Users size={16} />}>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="input"
              >
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Room" icon={<BedDouble size={16} />} className="sm:col-span-2">
              <select
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="input"
              >
                {ROOMS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — from {r.price} MAD / night
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Full name">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="Your name"
                required
              />
            </Field>
            <Field label="Email" icon={<Mail size={16} />}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@email.com"
                required
              />
            </Field>
            <Field label="Special requests" className="sm:col-span-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="input resize-none"
                placeholder="Early check-in, dietary preferences, occasion…"
              />
            </Field>
          </div>

          {/* Summary */}
          <aside className="bg-ink text-cream p-8 flex flex-col justify-between">
            <div>
              <p className="eyebrow text-cream/60 mb-6">Your Stay</p>
              <div className="space-y-4 text-sm">
                <Row label="Room" value={room.name} />
                <Row label="Check-in" value={checkIn} />
                <Row label="Check-out" value={checkOut} />
                <Row label="Nights" value={String(nights)} />
                <Row label="Guests" value={`${adults} + ${children}`} />
              </div>
              <div className="mt-8 pt-6 border-t border-cream/15">
                <div className="flex items-baseline justify-between">
                  <span className="text-cream/60 text-xs tracking-luxe uppercase">Estimate</span>
                  <span className="font-display text-3xl text-gold">
                    {estimate.toLocaleString()} MAD
                  </span>
                </div>
                <p className="mt-2 text-xs text-cream/50">
                  Indicative total, taxes included. Final rate confirmed by our team.
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 inline-flex items-center justify-center gap-2 bg-gold text-ink px-6 py-4 text-xs tracking-luxe uppercase hover:bg-cream transition-colors"
            >
              Send Enquiry <ArrowRight size={14} />
            </button>
          </aside>
        </motion.form>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: 1px solid rgb(0 0 0 / 0.14);
          padding: 0.75rem 0.9rem;
          font-size: 0.9rem;
          color: hsl(var(--foreground, 0 0% 10%));
          transition: border-color .2s;
        }
        .input:focus { outline: none; border-color: hsl(var(--gold, 40 60% 50%)); }
      `}</style>
    </section>
  );
}

function Field({
  label,
  icon,
  children,
  className = "",
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="flex items-center gap-2 text-[0.68rem] tracking-luxe uppercase text-ink/60 mb-2">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-cream/60">{label}</span>
      <span className="text-cream text-right truncate">{value}</span>
    </div>
  );
}
