import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Brain } from "lucide-react";
import { createUser } from "@/services/userService";
import { useAuth } from "@/hooks/useAuth";
import { PasswordInput } from "@/components/PasswordInput";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — CDI" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!name.trim() || !email.trim() || !password) { setErr("All fields are required."); return; }
    if (password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setErr("Passwords do not match."); return; }
    setLoading(true);
    try {
      const u = await createUser({ name: name.trim(), email: email.trim().toLowerCase(), password });
      setUser({ id: u.id!, name: u.name, email: u.email });
      navigate({ to: "/dashboard" });
    } catch (e: any) {
      setErr(e?.message ?? "Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
        <div className="flex items-center gap-2">
          <Brain className="w-7 h-7" />
          <span className="font-semibold text-lg">CDI</span>
        </div>
        <div>
          <h2 className="text-4xl font-semibold leading-tight">Causal Decision Intelligence for smarter operations.</h2>
          <p className="mt-4 opacity-90 max-w-md">Start your CDI workspace and connect your operations in minutes.</p>
        </div>
        <div className="text-xs opacity-75">© 2026 Causal Decision Intelligence</div>
      </div>

      <div className="flex items-center justify-center p-6">
        <form onSubmit={onSubmit} autoComplete="off" className="w-full max-w-sm space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">Create your account</h1>
            <p className="text-sm text-muted-foreground">Operations team workspace</p>
          </div>
          {err && <div className="text-sm rounded-md bg-destructive/10 text-destructive px-3 py-2">{err}</div>}
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="off"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Password</label>
            <PasswordInput value={password} onChange={setPassword} autoComplete="new-password" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Confirm password</label>
            <PasswordInput value={confirm} onChange={setConfirm} autoComplete="new-password" />
          </div>
          <button disabled={loading} type="submit"
            className="w-full rounded-md bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50">
            {loading ? "Creating…" : "Create account"}
          </button>
          <div className="text-sm text-muted-foreground text-center">
            Already have an account? <Link to="/login" className="text-primary font-medium">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}