import { createFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/Protected";
import { AppLayout } from "@/components/AppLayout";
import { Download, FileText } from "lucide-react";
import { reports } from "@/mock-data/operations";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — CDI" }] }),
  component: () => (<Protected><Page /></Protected>),
});

function Page() {
  return (
    <AppLayout title="Reports">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <div key={r.name} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-md bg-secondary grid place-items-center text-secondary-foreground">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.category}</span>
            </div>
            <div className="mt-4 font-semibold">{r.name}</div>
            <div className="text-xs text-muted-foreground mt-1">{r.size} · {r.date}</div>
            <button className="mt-4 w-full flex items-center justify-center gap-2 text-sm rounded-md bg-primary text-primary-foreground py-2 hover:opacity-90">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}