import { createFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/Protected";
import { AppLayout } from "@/components/AppLayout";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { digitalTwinStages } from "@/mock-data/operations";

export const Route = createFileRoute("/digital-twin")({
  head: () => ({ meta: [{ title: "Digital Twin — CDI" }] }),
  component: () => (<Protected><Page /></Protected>),
});

function Page() {
  return (
    <AppLayout title="Digital Twin — Ingredient Lifecycle">
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold mb-4">Stage-by-stage yield (%)</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={digitalTwinStages}>
              <defs>
                <linearGradient id="y" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(160 65% 45%)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(160 65% 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="stage" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Area type="monotone" dataKey="yield" stroke="hsl(160 65% 45%)" fill="url(#y)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-6 mt-6">
        {digitalTwinStages.map((s, i) => (
          <div key={s.stage} className="rounded-xl border border-border bg-card p-4">
            <div className="text-xs text-muted-foreground">Stage {i + 1}</div>
            <div className="font-semibold mt-1">{s.stage}</div>
            <div className="text-2xl font-semibold mt-2">{s.yield}%</div>
            <div className="text-xs text-red-500">-{s.loss}% leakage</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5 mt-6">
        <h3 className="text-sm font-semibold mb-3">Recipe-state workflow</h3>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {digitalTwinStages.map((s, i) => (
            <span key={s.stage} className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground">{s.stage}</span>
              {i < digitalTwinStages.length - 1 && <span className="text-muted-foreground">→</span>}
            </span>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}