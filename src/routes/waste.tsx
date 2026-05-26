import { createFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/Protected";
import { AppLayout } from "@/components/AppLayout";
import { Kpi } from "@/components/Kpi";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { wasteTrend, tripleCost, wasteDrivers, digitalTwinStages } from "@/mock-data/operations";
import { Trash2, PoundSterling, Zap } from "lucide-react";

export const Route = createFileRoute("/waste")({
  head: () => ({ meta: [{ title: "Waste Analytics — CDI" }] }),
  component: () => (<Protected><Page /></Protected>),
});

function Page() {
  return (
    <AppLayout title="Waste Analytics">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Kpi label="Food cost (week)" value="£17,600" hint="▼ 4% vs avg" accent="text-emerald-500" icon={<PoundSterling />} />
        <Kpi label="Labour cost (week)" value="£12,600" hint="Stable" icon={<Trash2 />} />
        <Kpi label="Utilities cost (week)" value="£4,040" hint="▲ 6%" accent="text-amber-500" icon={<Zap />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Waste trend (kg)</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={wasteTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Line dataKey="waste" stroke="hsl(0 70% 55%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Triple cost breakdown (£)</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={tripleCost}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="food" fill="hsl(220 70% 55%)" />
                <Bar dataKey="labour" fill="hsl(160 65% 45%)" />
                <Bar dataKey="utilities" fill="hsl(35 90% 55%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Waste by category</h3>
          <ul className="space-y-2">
            {wasteDrivers.map((d) => (
              <li key={d.cause} className="flex items-center justify-between text-sm">
                <span>{d.cause}</span>
                <div className="flex items-center gap-2 w-1/2">
                  <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${d.impact * 2.5}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">{d.impact}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Stage-specific waste (% leakage)</h3>
          <ul className="space-y-2 text-sm">
            {digitalTwinStages.map((s) => (
              <li key={s.stage} className="flex justify-between border-b border-border/50 py-2">
                <span>{s.stage}</span>
                <span className={s.loss > 5 ? "text-red-500" : "text-muted-foreground"}>{s.loss}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}