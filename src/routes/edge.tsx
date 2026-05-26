import { createFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/Protected";
import { AppLayout } from "@/components/AppLayout";
import { Kpi } from "@/components/Kpi";
import { Wifi, WifiOff, Cpu, HardDrive } from "lucide-react";
import { edgeNodes } from "@/mock-data/operations";

export const Route = createFileRoute("/edge")({
  head: () => ({ meta: [{ title: "Edge Monitoring — CDI" }] }),
  component: () => (<Protected><Page /></Protected>),
});

function Page() {
  return (
    <AppLayout title="Offline & Edge Monitoring">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Kpi label="Edge nodes online" value="3 / 4" hint="1 in local cache mode" accent="text-amber-500" icon={<Cpu />} />
        <Kpi label="Average latency" value="13 ms" hint="Edge AI inference" accent="text-emerald-500" icon={<Wifi />} />
        <Kpi label="Local processing" value="92%" hint="Offline-resilient" icon={<HardDrive />} />
      </div>

      <div className="rounded-xl border border-border bg-card p-5 mt-6">
        <h3 className="text-sm font-semibold mb-4">Edge node health</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3">Node</th>
                <th className="text-left py-2 px-3">Site</th>
                <th className="text-left py-2 px-3">Status</th>
                <th className="text-left py-2 px-3">Latency</th>
                <th className="text-left py-2 px-3">Mode</th>
              </tr>
            </thead>
            <tbody>
              {edgeNodes.map((n) => (
                <tr key={n.id} className="border-b border-border/50">
                  <td className="py-2.5 px-3 font-mono text-xs">{n.id}</td>
                  <td className="py-2.5 px-3">{n.site}</td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs ${n.status === "Online" ? "text-emerald-500" : "text-red-500"}`}>
                      {n.status === "Online" ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                      {n.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">{n.latency}</td>
                  <td className="py-2.5 px-3 text-muted-foreground">{n.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}