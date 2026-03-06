import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { StructuralBundles, StructuralBundle } from "@/lib/types"

interface TransferBundlesProps {
  data: StructuralBundles | null
}

const warningBadgeStyle: Record<string, string> = {
  normal:   "bg-emerald-950/60 text-emerald-300 border-emerald-500/30",
  watch:    "bg-amber-950/60 text-amber-300 border-amber-500/30",
  alert:    "bg-orange-950/60 text-orange-300 border-orange-500/30",
  critical: "bg-rose-950/60 text-rose-300 border-rose-500/30",
}

function BundleCard({ bundle }: { bundle: StructuralBundle }) {
  const twoGwPositive = bundle.impact.gain_two_gw >= 0
  const nextGwPositive = bundle.impact.gain_next_gw >= 0

  return (
    <Card className="bg-card/50">
      <CardContent className="p-5 space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Structural Plan #{bundle.rank}
          </span>
          <span className="text-[10px] text-muted-foreground/50 tabular-nums">
            {bundle.score.toFixed(2)}
          </span>
        </div>

        {/* Transfers — listed clearly, but visually subordinate to impact */}
        <div className="space-y-1.5">
          {bundle.transfers.map((leg, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground/70 truncate flex-1">{leg.out_name}</span>
              <ArrowRight className="size-3.5 text-muted-foreground/30 shrink-0" />
              <span className="font-medium truncate flex-1 text-right text-foreground/80">{leg.in_name}</span>
            </div>
          ))}
        </div>

        {/* Impact — 2GW dominant, Next GW secondary */}
        <div className="pt-1 border-t border-border/40 space-y-2">
          {/* 2GW — primary */}
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold tracking-tight ${twoGwPositive ? "text-emerald-400" : "text-rose-400"}`}>
              {twoGwPositive ? "+" : ""}{bundle.impact.gain_two_gw.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">over next 2 GWs</span>
          </div>

          {/* Next GW — secondary */}
          <div className="flex items-baseline gap-2">
            <span className={`text-sm font-medium ${nextGwPositive ? "text-emerald-500/70" : "text-rose-500/70"}`}>
              {nextGwPositive ? "+" : ""}{bundle.impact.gain_next_gw.toFixed(1)}
            </span>
            <span className="text-[11px] text-muted-foreground/60">next GW</span>
          </div>
        </div>

        {/* Governance After — team state badge */}
        <div className="pt-1 border-t border-border/40 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Team State After Plan
          </p>
          <Badge
            className={`capitalize border text-xs font-medium ${warningBadgeStyle[bundle.governance_after.warning_level] ?? "bg-muted/40 text-muted-foreground border-border/40"}`}
          >
            {bundle.governance_after.warning_level}
          </Badge>
          <p className="text-[10px] text-muted-foreground/60">
            Health Score: {bundle.governance_after.health_score}
          </p>
        </div>

      </CardContent>
    </Card>
  )
}

export function TransferBundlesSection({ data }: TransferBundlesProps) {
  if (!data || !data.items || data.items.length === 0) {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Structural Plans</h2>
          <p className="text-sm text-muted-foreground">Medium-term structural upgrade scenarios (2GW horizon)</p>
        </div>
        <Card className="bg-card/50">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">No structural plans available.</p>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Structural Plans</h2>
        <p className="text-sm text-muted-foreground">
          Medium-term structural upgrade scenarios (2GW horizon) — {data.items.length} plans evaluated
        </p>
      </div>

      {/* Preserve backend order exactly — no re-sort */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((bundle) => (
          <BundleCard key={bundle.rank} bundle={bundle} />
        ))}
      </div>
    </section>
  )
}
