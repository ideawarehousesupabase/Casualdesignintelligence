import { createFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/Protected";
import { AppLayout } from "@/components/AppLayout";
import { Plug, Check, Plus } from "lucide-react";
import { integrations } from "@/mock-data/operations";

export const Route = createFileRoute("/integrations")({
  head: () => ({ meta: [{ title: "Integrations — CDI" }] }),
  component: () => (<Protected><Page /></Protected>),
});

function Page() {
  return (
    <AppLayout title="Integrations">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((i) => (
          <div key={i.name} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-md bg-secondary grid place-items-center text-secondary-foreground">
                <Plug className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{i.type}</span>
            </div>
            <div className="mt-4 font-semibold">{i.name}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {i.type === "POS" ? "Point-of-sale syncing" : i.type === "ERP" ? "Enterprise resource planning" : "Custom integration endpoint"}
            </div>
            <button className={`mt-4 w-full flex items-center justify-center gap-2 text-sm rounded-md py-2 ${
              i.status === "Connected"
                ? "bg-emerald-500/15 text-emerald-500"
                : "bg-primary text-primary-foreground"
            }`}>
              {i.status === "Connected" ? <><Check className="w-4 h-4" /> Connected</> : <><Plus className="w-4 h-4" /> Connect</>}
            </button>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}