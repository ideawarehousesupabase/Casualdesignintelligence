import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Brain } from "lucide-react";
import { loginUser } from "@/services/userService";
import { useAuth } from "@/hooks/useAuth";
import { PasswordInput } from "@/components/PasswordInput";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — CDI" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!email.trim() || !password) { setErr("Email and password are required."); return; }
    setLoading(true);
    try {
      const u = await loginUser(email.trim().toLowerCase(), password);
      setUser({ id: u.id!, name: u.name, email: u.email });
      navigate({ to: "/dashboard" });
    } catch (e: any) {
      setErr(e?.message ?? "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-muted/40">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
        <div className="flex items-center gap-2">
          <Brain className="w-7 h-7" />
          <span className="font-semibold text-lg">CDI</span>
        </div>
        <div>
          <h2 className="text-4xl font-semibold leading-tight">Causal Decision Intelligence for smarter operations.</h2>
          <p className="mt-4 opacity-90 max-w-md">Data-driven insights, predictive analytics, and real-time decision support across your entire operation.</p>
        </div>
        <div className="text-xs opacity-75">© 2026 Causal Decision Intelligence</div>
      </div>

      <div className="flex items-center justify-center p-6 bg-muted/40">
        <form onSubmit={onSubmit} className="w-full max-w-sm space-y-5">
          <div>
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your operations console</p>
          </div>
          {err && <div className="text-sm rounded-md bg-destructive/10 text-destructive px-3 py-2">{err}</div>}
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-input bg-muted/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Password</label>
            <PasswordInput value={password} onChange={setPassword} autoComplete="current-password" />
          </div>
          <button disabled={loading} type="submit"
            className="w-full rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50">
            {loading ? "Signing in…" : "Sign in"}
          </button>
          <div className="text-sm text-muted-foreground text-center">
            No account? <Link to="/signup" className="text-primary font-medium">Create one</Link>
          </div>
        </form>
      </div>
    </div>
  );
}