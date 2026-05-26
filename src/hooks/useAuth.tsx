import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Local session shape stored in localStorage.
export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

interface AuthCtx {
  user: SessionUser | null;
  loading: boolean;
  setUser: (u: SessionUser | null) => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | undefined>(undefined);
const KEY = "cdi_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setUserState(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const setUser = (u: SessionUser | null) => {
    setUserState(u);
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem(KEY, JSON.stringify(u));
      else localStorage.removeItem(KEY);
    }
  };

  const logout = () => setUser(null);

  return <Ctx.Provider value={{ user, loading, setUser, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}