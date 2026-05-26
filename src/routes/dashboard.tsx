import { createFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/Protected";
import { AppLayout } from "@/components/AppLayout";
import { Kpi } from "@/components/Kpi";
import { Trash2, AlertTriangle, Activity, Leaf, ShieldCheck, PoundSterling } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { wasteTrend, tripleCost, ingredientUsage, alerts, compliance } from "@/mock-data/operations";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — CDI" }] }),
  component: () => (<Protected><Dashboard /></Protected>),
});

const PIE = ["hsl(220 70% 55%)", "hsl(160 65% 45%)", "hsl(35 90% 55%)", "hsl(290 60% 55%)", "hsl(0 70% 55%)"];

function Dashboard() {
  return (
    <AppLayout title="Operations Overview">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        <Kpi label="Total waste today" value="38 kg" hint="▼ 12% vs yesterday" accent="text-emerald-500" icon={<Trash2 />} />
        <Kpi label="Predicted waste risk" value="High" hint="Soup & curry stations" accent="text-amber-500" icon={<AlertTriangle />} />
        <Kpi label="Active alerts" value="5" hint="2 high · 2 medium · 1 low" icon={<AlertTriangle />} />
        <Kpi label="Operational efficiency" value="84%" hint="▲ 6 pts this week" accent="text-emerald-500" icon={<Activity />} />
        <Kpi label="GP margin snapshot" value="62.4%" hint="Target 60%" accent="text-emerald-500" icon={<PoundSterling />} />
        <Kpi label="ESG compliance" value="94/100" hint="UK Waste · HACCP · GDPR" accent="text-emerald-500" icon={<ShieldCheck />} />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 mt-6">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Waste trend vs prediction (kg)</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={wasteTrend}>
                <defs>
                  <linearGradient id="w" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(220 70% 55%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(220 70% 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Area type="monotone" dataKey="waste" stroke="hsl(220 70% 55%)" fill="url(#w)" />
                <Area type="monotone" dataKey="predicted" stroke="hsl(35 90% 55%)" fill="transparent" strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Ingredient usage</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={ingredientUsage} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80}>
                  {ingredientUsage.map((_, i) => <Cell key={i} fill={PIE[i % PIE.length]} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 mt-6">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Triple cost (£) — last 4 weeks</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={tripleCost}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="food" stackId="a" fill="hsl(220 70% 55%)" />
                <Bar dataKey="labour" stackId="a" fill="hsl(160 65% 45%)" />
                <Bar dataKey="utilities" stackId="a" fill="hsl(35 90% 55%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Active production alerts</h3>
          <ul className="space-y-3">
            {alerts.slice(0, 4).map((a) => (
              <li key={a.id} className="flex gap-3 text-sm">
                <span className={`mt-1.5 w-2 h-2 rounded-full ${
                  a.severity === "high" ? "bg-red-500" : a.severity === "medium" ? "bg-amber-500" : "bg-emerald-500"
                }`} />
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-semibold">ESG compliance summary</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {compliance.map((c) => (
            <div key={c.name} className="rounded-lg border border-border p-3">
              <div className="text-xs text-muted-foreground">{c.name}</div>
              <div className="text-lg font-semibold mt-1">{c.score}</div>
              <div className="text-[11px] text-emerald-500">{c.status}</div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}