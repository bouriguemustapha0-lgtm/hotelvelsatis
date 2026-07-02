import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  getMe,
  listBookings,
  updateBookingStatus,
  deleteBooking,
  listManagers,
  inviteManager,
  removeManager,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminDashboard,
  head: () => ({
    meta: [
      { title: "Admin — Hotel Velsatis" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

const STATUSES = ["new", "contacted", "confirmed", "declined", "archived"] as const;

function AdminDashboard() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"bookings" | "staff">("bookings");

  const fetchMe = useServerFn(getMe);
  const meQ = useQuery({ queryKey: ["me"], queryFn: () => fetchMe() });

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (meQ.isLoading) return <Center>Loading…</Center>;
  if (meQ.error) return <Center>Access error: {(meQ.error as Error).message}</Center>;
  const me = meQ.data!;
  if (!me.isStaff) {
    return (
      <Center>
        <p>Your account has no admin access.</p>
        <button onClick={signOut} className="mt-4 underline">Sign out</button>
      </Center>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b hairline bg-background">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow text-ink/60">Hotel Velsatis</p>
            <h1 className="font-display text-2xl text-ink">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-ink/60 hidden sm:block">
              {me.email} · <span className="text-gold uppercase tracking-wider text-xs">{me.isOwner ? "Owner" : "Manager"}</span>
            </span>
            <button onClick={signOut} className="border border-ink/20 px-4 py-2 text-xs tracking-luxe uppercase hover:bg-ink hover:text-cream transition-colors">
              Sign out
            </button>
          </div>
        </div>
        <nav className="mx-auto max-w-7xl px-6 flex gap-6">
          {(["bookings", ...(me.isOwner ? (["staff"] as const) : [])] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 text-xs tracking-luxe uppercase border-b-2 transition-colors ${
                tab === t ? "border-gold text-ink" : "border-transparent text-ink/50 hover:text-ink"
              }`}
            >
              {t === "bookings" ? "Bookings" : "Staff"}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {tab === "bookings" ? <BookingsTab /> : <StaffTab currentUserId={me.userId} />}
      </main>
    </div>
  );
}

function BookingsTab() {
  const qc = useQueryClient();
  const fetchList = useServerFn(listBookings);
  const updateFn = useServerFn(updateBookingStatus);
  const deleteFn = useServerFn(deleteBooking);

  const q = useQuery({ queryKey: ["bookings"], queryFn: () => fetchList() });

  const upd = useMutation({
    mutationFn: (v: { id: string; status: (typeof STATUSES)[number] }) => updateFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
  const del = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });

  if (q.isLoading) return <p>Loading bookings…</p>;
  if (q.error) return <p className="text-red-600">Error: {(q.error as Error).message}</p>;
  const rows = q.data ?? [];
  if (rows.length === 0)
    return <p className="text-ink/60">No booking requests yet. Submissions from the site's Reserve form will appear here.</p>;

  return (
    <div className="space-y-4">
      {rows.map((b: any) => (
        <div key={b.id} className="bg-background border hairline p-5 grid md:grid-cols-[1fr_auto] gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="font-display text-xl">{b.guest_name}</h3>
              <a href={`mailto:${b.guest_email}`} className="text-sm text-ink/60 hover:text-gold underline">{b.guest_email}</a>
              <span className={`text-[0.65rem] tracking-luxe uppercase px-2 py-0.5 border ${statusColor(b.status)}`}>{b.status}</span>
            </div>
            <p className="text-sm text-ink/80">
              <strong>{b.room_name}</strong> · {b.check_in} → {b.check_out} · {b.nights} night{b.nights > 1 ? "s" : ""} · {b.adults} adult{b.adults > 1 ? "s" : ""}
              {b.children > 0 ? `, ${b.children} child${b.children > 1 ? "ren" : ""}` : ""}
            </p>
            {b.notes && <p className="text-sm text-ink/60 italic">"{b.notes}"</p>}
            <p className="text-xs text-ink/40">Received {new Date(b.created_at).toLocaleString()}</p>
          </div>
          <div className="flex md:flex-col gap-2 items-start">
            <select
              value={b.status}
              onChange={(e) => upd.mutate({ id: b.id, status: e.target.value as any })}
              className="border border-ink/15 px-2 py-1.5 text-xs bg-transparent"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
              onClick={() => { if (confirm("Delete this booking request?")) del.mutate(b.id); }}
              className="text-xs text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function statusColor(s: string) {
  switch (s) {
    case "new": return "border-gold text-gold";
    case "contacted": return "border-blue-500 text-blue-600";
    case "confirmed": return "border-emerald-600 text-emerald-700";
    case "declined": return "border-red-500 text-red-600";
    default: return "border-ink/30 text-ink/60";
  }
}

function StaffTab({ currentUserId }: { currentUserId: string }) {
  const qc = useQueryClient();
  const fetchList = useServerFn(listManagers);
  const inviteFn = useServerFn(inviteManager);
  const removeFn = useServerFn(removeManager);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const q = useQuery({ queryKey: ["staff"], queryFn: () => fetchList() });
  const invite = useMutation({
    mutationFn: (e: string) => inviteFn({ data: { email: e } }),
    onSuccess: (_d, v) => { setEmail(""); setMsg({ kind: "ok", text: `Invitation sent to ${v}.` }); qc.invalidateQueries({ queryKey: ["staff"] }); },
    onError: (e: any) => setMsg({ kind: "err", text: e.message ?? "Invite failed" }),
  });
  const remove = useMutation({
    mutationFn: (userId: string) => removeFn({ data: { userId } }),
    onSuccess: () => { setMsg({ kind: "ok", text: "Manager removed." }); qc.invalidateQueries({ queryKey: ["staff"] }); },
    onError: (e: any) => setMsg({ kind: "err", text: e.message ?? "Remove failed" }),
  });

  const onInvite = (e: FormEvent) => {
    e.preventDefault();
    setMsg(null);
    invite.mutate(email.trim());
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="font-display text-xl mb-3">Invite a manager</h2>
        <p className="text-sm text-ink/60 mb-4">
          They will receive an email invitation. When they click the link they'll set their own password and gain manager access.
        </p>
        <form onSubmit={onInvite} className="flex flex-wrap gap-3">
          <input
            type="email" required placeholder="manager@example.com"
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-[240px] border border-ink/15 px-3 py-2.5 bg-transparent focus:outline-none focus:border-gold"
          />
          <button
            type="submit" disabled={invite.isPending}
            className="bg-ink text-cream px-5 py-2.5 text-xs tracking-luxe uppercase hover:bg-gold hover:text-ink transition-colors disabled:opacity-60"
          >
            {invite.isPending ? "Sending…" : "Send invitation"}
          </button>
        </form>
        {msg && <p className={`mt-3 text-sm ${msg.kind === "ok" ? "text-emerald-700" : "text-red-600"}`}>{msg.text}</p>}
      </section>

      <section>
        <h2 className="font-display text-xl mb-3">Team</h2>
        {q.isLoading ? <p>Loading…</p> : q.error ? <p className="text-red-600">{(q.error as Error).message}</p> : (
          <div className="bg-background border hairline divide-y divide-ink/5">
            {(q.data ?? []).map((u: any) => (
              <div key={u.id + u.role} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm">{u.email}</p>
                  <p className="text-[0.65rem] tracking-luxe uppercase text-gold">{u.role}</p>
                </div>
                {u.role !== "owner" && u.id !== currentUserId && (
                  <button
                    onClick={() => { if (confirm(`Remove ${u.email}?`)) remove.mutate(u.id); }}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex items-center justify-center bg-cream text-ink/70">{children}</div>;
}
