import { ReactNode } from "react";
import { motion } from "framer-motion";

export function Kpi({
  label, value, hint, icon, accent,
}: { label: string; value: string; hint?: string; icon?: ReactNode; accent?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 text-2xl font-semibold">{value}</div>
          {hint && <div className={`mt-1 text-xs ${accent ?? "text-muted-foreground"}`}>{hint}</div>}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
    </motion.div>
  );
}