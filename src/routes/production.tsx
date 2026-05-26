import { createFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/Protected";
import { AppLayout } from "@/components/AppLayout";
import { Kpi } from "@/components/Kpi";
import { Activity, Timer } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { efficiency, productionBatches } from "@/mock-data/operations";

export const Route = createFileRoute("/production")({
  head: () => ({ meta: [{ title: "Production Monitoring — CDI" }] }),
  component: () => (<Protected><Page /></Protected>),
});

function Page() {
  return (
    <AppLayout title="Real-Time Production Monitoring">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Kpi label="Active batches" value="12" hint="3 in cooking · 4 holding" icon={<Activity />} />
        <Kpi label="Avg prep time" value="14m" hint="▼ 2m vs target" accent="text-emerald-500" icon={<Timer />} />
        <Kpi label="Production variance" value="-3%" hint="Within tolerance" accent="text-emerald-500" icon={<Activity />} />
      </div>

      <div className="rounded-xl border border-border bg-card p-5 mt-6">
        <h3 className="text-sm font-semibold mb-4">Live operational efficiency (%)</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={efficiency}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Line type="monotone" dataKey="value" stroke="hsl(160 65% 45%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 mt-6">
        <h3 className="text-sm font-semibold mb-4">Batch monitoring</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase">
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3">Batch</th>
                <th className="text-left py-2 px-3">Item</th>
                <th className="text-left py-2 px-3">Qty</th>
                <th className="text-left py-2 px-3">Status</th>
                <th className="text-left py-2 px-3">Variance</th>
              </tr>
            </thead>
            <tbody>
              {productionBatches.map((b) => (
                <tr key={b.id} className="border-b border-border/50">
                  <td className="py-2.5 px-3 font-mono text-xs">{b.id}</td>
                  <td className="py-2.5 px-3">{b.item}</td>
                  <td className="py-2.5 px-3">{b.qty}</td>
                  <td className="py-2.5 px-3">
                    <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">{b.status}</span>
                  </td>
                  <td className={`py-2.5 px-3 font-medium ${b.variance < 0 ? "text-red-500" : b.variance > 0 ? "text-emerald-500" : "text-muted-foreground"}`}>
                    {b.variance > 0 ? "+" : ""}{b.variance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 mt-6">
        <h3 className="text-sm font-semibold mb-4">Production timeline</h3>
        <ol className="relative border-l border-border pl-6 space-y-4">
          {["08:00 — Delivery received", "09:15 — Prep cycle started", "11:00 — Cooking station 1 active",
            "12:30 — Service line ready", "14:00 — Mid-shift holding refresh", "18:00 — Dinner prep cycle"].map((t, i) => (
            <li key={i} className="text-sm">
              <span className="absolute -left-1.5 w-3 h-3 rounded-full bg-primary" />
              {t}
            </li>
          ))}
        </ol>
      </div>
    </AppLayout>
  );
}