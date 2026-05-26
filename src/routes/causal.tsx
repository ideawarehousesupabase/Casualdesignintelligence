import { createFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/Protected";
import { AppLayout } from "@/components/AppLayout";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { wasteDrivers } from "@/mock-data/operations";

export const Route = createFileRoute("/causal")({
  head: () => ({ meta: [{ title: "Causal Analysis — CDI" }] }),
  component: () => (<Protected><Page /></Protected>),
});

function Page() {
  return (
    <AppLayout title="Causal Analysis">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Root-cause waste drivers (%)</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={wasteDrivers} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis type="category" dataKey="cause" stroke="hsl(var(--muted-foreground))" fontSize={12} width={140} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="impact" fill="hsl(220 70% 55%)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Causal chain — Friday dinner waste</h3>
          <div className="space-y-3 text-sm">
            {[
              ["Over-ordering (Mon delivery)", "+18% surplus chicken stock"],
              ["Prep schedule unchanged", "Standard batch size held"],
              ["Demand shift (rain forecast)", "Footfall ↓ 22%"],
              ["Holding-time threshold exceeded", "Yield loss on 2 trays"],
              ["Disposal at end of service", "12.4 kg waste · £74 cost"],
            ].map(([k, v], i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs grid place-items-center">{i + 1}</div>
                  {i < 4 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="pb-3">
                  <div className="font-medium">{k}</div>
                  <div className="text-xs text-muted-foreground">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 mt-6">
        <h3 className="text-sm font-semibold mb-3">Counterfactual insight</h3>
        <p className="text-sm text-muted-foreground">
          If Monday's order had been reduced by 12% and the Friday prep cycle delayed by 30 minutes,
          projected waste for the week would have been <span className="text-emerald-500 font-medium">31% lower</span>,
          improving GP margin by an estimated <span className="text-emerald-500 font-medium">2.4 points</span>.
        </p>
      </div>
    </AppLayout>
  );
}