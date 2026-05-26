import { createFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/Protected";
import { AppLayout } from "@/components/AppLayout";
import { Bell, ChevronRight } from "lucide-react";
import { alerts } from "@/mock-data/operations";

export const Route = createFileRoute("/alerts")({
  head: () => ({ meta: [{ title: "Prescriptive Alerts — CDI" }] }),
  component: () => (<Protected><Page /></Protected>),
});

const badge = (s: string) => s === "high"
  ? "bg-red-500/15 text-red-500"
  : s === "medium" ? "bg-amber-500/15 text-amber-500" : "bg-emerald-500/15 text-emerald-500";

function Page() {
  return (
    <AppLayout title="Prescriptive Alerts">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold">AI-generated production recommendations</h3>
        </div>
        <ul className="space-y-3">
          {alerts.map((a) => (
            <li key={a.id} className="rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${badge(a.severity)}`}>{a.severity}</span>
                    <h4 className="font-medium">{a.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{a.detail}</p>
                </div>
                <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                  Apply <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}