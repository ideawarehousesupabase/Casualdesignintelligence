import { ReactNode } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, Activity, Bell, GitBranch, Boxes, Package,
  TrendingDown, ShieldCheck, Plug, WifiOff, FileText, LogOut, Brain,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/production", label: "Production", icon: Activity },
  { to: "/alerts", label: "Prescriptive Alerts", icon: Bell },
  { to: "/causal", label: "Causal Analysis", icon: GitBranch },
  { to: "/digital-twin", label: "Digital Twin", icon: Boxes },
  { to: "/inventory", label: "Inventory", icon: Package },
  { to: "/waste", label: "Waste Analytics", icon: TrendingDown },
  { to: "/esg", label: "ESG & Compliance", icon: ShieldCheck },
  { to: "/integrations", label: "Integrations", icon: Plug },
  { to: "/edge", label: "Edge Monitoring", icon: WifiOff },
  { to: "/reports", label: "Reports", icon: FileText },
];

export function AppLayout({ children, title }: { children: ReactNode; title: string }) {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
        <div className="flex items-center gap-2 px-5 h-16 border-b border-border">
          <div className="grid place-items-center w-9 h-9 rounded-md bg-primary text-primary-foreground">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold">CDI</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Causal Decision Intelligence</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {nav.map((n) => {
            const active = path === n.to;
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className="text-xs text-muted-foreground">Causal Decision Intelligence</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live · Edge AI online
            </div>
            <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-medium">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}