import { createFileRoute } from "@tanstack/react-router";
import { Protected } from "@/components/Protected";
import { AppLayout } from "@/components/AppLayout";
import { ShieldCheck, FileCheck, Stethoscope, Lock } from "lucide-react";
import { compliance } from "@/mock-data/operations";

export const Route = createFileRoute("/esg")({
  head: () => ({ meta: [{ title: "ESG & Compliance — CDI" }] }),
  component: () => (<Protected><Page /></Protected>),
});

function Page() {
  return (
    <AppLayout title="ESG & Compliance">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {compliance.map((c) => (
          <div key={c.name} className="rounded-xl border border-border bg-card p-5">
            <div className="text-xs text-muted-foreground">{c.name}</div>
            <div className="text-3xl font-semibold mt-2">{c.score}</div>
            <div className="text-xs text-emerald-500 mt-1">{c.status}</div>
            <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${c.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mt-6">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <FileCheck className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-semibold">UK Waste Regulation reporting</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Auto-generated weekly submissions covering food waste segregation, disposal routes and
            Scope 3 emissions accounting. Next report: <span className="text-foreground font-medium">May 28, 2026</span>.
          </p>
          <button className="mt-4 text-sm rounded-md bg-primary text-primary-foreground px-3 py-2">Generate this week's report</button>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-semibold">HACCP compliance</h3>
          </div>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>✓ Temperature logs verified · 24h</li>
            <li>✓ Cross-contamination controls passed</li>
            <li>✓ Critical control points audited</li>
            <li>⚠ 1 minor non-conformance pending review</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Stethoscope className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">NHS DTAC readiness</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            81% complete · Clinical safety review and accessibility (WCAG 2.2) attestations in progress.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-semibold">GDPR compliance</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Data processing register up to date · DPIA approved · Sub-processor list current.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}