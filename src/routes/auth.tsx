import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  ssr: false,
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Admin sign in — Hotel Velsatis" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  const onSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setInfo(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    navigate({ to: "/admin", replace: true });
  };

  const onForgot = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setInfo(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) return setError(error.message);
    setInfo("If an account exists for this email, a reset link has been sent.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6 py-12">
      <div className="w-full max-w-md bg-background border hairline p-8 md:p-10">
        <div className="text-center mb-8">
          <p className="eyebrow text-ink/60">Hotel Velsatis</p>
          <h1 className="mt-3 font-display text-3xl text-ink">
            {mode === "signin" ? "Admin Sign In" : "Reset password"}
          </h1>
        </div>

        <form onSubmit={mode === "signin" ? onSignIn : onForgot} className="space-y-4">
          <label className="block">
            <span className="text-[0.68rem] tracking-luxe uppercase text-ink/60">Email</span>
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-ink/15 px-3 py-2.5 bg-transparent focus:outline-none focus:border-gold"
              autoComplete="email"
            />
          </label>

          {mode === "signin" && (
            <label className="block">
              <span className="text-[0.68rem] tracking-luxe uppercase text-ink/60">Password</span>
              <input
                type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border border-ink/15 px-3 py-2.5 bg-transparent focus:outline-none focus:border-gold"
                autoComplete="current-password"
              />
            </label>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
          {info && <p className="text-sm text-emerald-700">{info}</p>}

          <button
            type="submit" disabled={loading}
            className="w-full bg-ink text-cream py-3 text-xs tracking-luxe uppercase hover:bg-gold hover:text-ink transition-colors disabled:opacity-60"
          >
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Send reset link"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-xs text-ink/60">
          {mode === "signin" ? (
            <button type="button" onClick={() => { setMode("forgot"); setError(null); setInfo(null); }} className="hover:text-gold underline underline-offset-4">
              Forgot password?
            </button>
          ) : (
            <button type="button" onClick={() => { setMode("signin"); setError(null); setInfo(null); }} className="hover:text-gold underline underline-offset-4">
              Back to sign in
            </button>
          )}
          <Link to="/" className="hover:text-gold">← Back to site</Link>
        </div>
      </div>
    </div>
  );
}
