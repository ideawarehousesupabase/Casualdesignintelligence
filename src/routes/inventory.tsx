import { createFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/Protected";
import { AppLayout } from "@/components/AppLayout";
import { Kpi } from "@/components/Kpi";
import { Package, AlertTriangle, Snowflake } from "lucide-react";
import { inventory } from "@/mock-data/operations";

export const Route = createFileRoute("/inventory")({
  head: () => ({ meta: [{ title: "Inventory — CDI" }] }),
  component: () => (<Protected><Page /></Protected>),
});

const riskColor = (r: string) => r === "high"
  ? "bg-red-500/15 text-red-500"
  : r === "medium" ? "bg-amber-500/15 text-amber-500" : "bg-emerald-500/15 text-emerald-500";

function Page() {
  return (
    <AppLayout title="Inventory & Ingredient Tracking">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Kpi label="SKUs tracked" value="248" hint="Perishable + dry" icon={<Package />} />
        <Kpi label="Expiring ≤ 3 days" value="14" hint="Action required" accent="text-amber-500" icon={<AlertTriangle />} />
        <Kpi label="Cold-storage utilisation" value="78%" hint="Within range" icon={<Snowflake />} />
      </div>

      <div className="rounded-xl border border-border bg-card p-5 mt-6">
        <h3 className="text-sm font-semibold mb-4">Perishable inventory</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground uppercase">
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3">SKU</th>
                <th className="text-left py-2 px-3">Ingredient</th>
                <th className="text-left py-2 px-3">Quantity</th>
                <th className="text-left py-2 px-3">Expires</th>
                <th className="text-left py-2 px-3">Waste risk</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((i) => (
                <tr key={i.sku} className="border-b border-border/50">
                  <td className="py-2.5 px-3 font-mono text-xs">{i.sku}</td>
                  <td className="py-2.5 px-3">{i.name}</td>
                  <td className="py-2.5 px-3">{i.qty}</td>
                  <td className="py-2.5 px-3">{i.expiresIn}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-xs px-2 py-1 rounded-md ${riskColor(i.risk)}`}>{i.risk}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}