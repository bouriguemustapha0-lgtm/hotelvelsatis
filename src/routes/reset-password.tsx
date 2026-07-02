import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  component: ResetPasswordPage,
  head: () => ({
    meta: [
      { title: "Set a new password — Hotel Velsatis" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Supabase auto-handles the token from the URL hash and fires PASSWORD_RECOVERY / SIGNED_IN.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true); });
    return () => sub.subscription.unsubscribe();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords don't match.");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return setError(error.message);
    navigate({ to: "/admin", replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6 py-12">
      <div className="w-full max-w-md bg-background border hairline p-8 md:p-10">
        <div className="text-center mb-8">
          <p className="eyebrow text-ink/60">Hotel Velsatis</p>
          <h1 className="mt-3 font-display text-3xl text-ink">Set your password</h1>
          {!ready && <p className="mt-3 text-sm text-ink/60">Verifying reset link…</p>}
        </div>

        {ready && (
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-[0.68rem] tracking-luxe uppercase text-ink/60">New password</span>
              <input
                type="password" required minLength={8} value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border border-ink/15 px-3 py-2.5 bg-transparent focus:outline-none focus:border-gold"
                autoComplete="new-password"
              />
            </label>
            <label className="block">
              <span className="text-[0.68rem] tracking-luxe uppercase text-ink/60">Confirm</span>
              <input
                type="password" required minLength={8} value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-2 w-full border border-ink/15 px-3 py-2.5 bg-transparent focus:outline-none focus:border-gold"
                autoComplete="new-password"
              />
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit" disabled={loading}
              className="w-full bg-ink text-cream py-3 text-xs tracking-luxe uppercase hover:bg-gold hover:text-ink transition-colors disabled:opacity-60"
            >
              {loading ? "Saving…" : "Save password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
