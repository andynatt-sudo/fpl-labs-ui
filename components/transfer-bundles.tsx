import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { TransferBundles, BundleGovernanceAfter } from "@/lib/types"

interface TransferBundlesProps {
  data: TransferBundles | null
}

// pressure → traffic light colour
const pressureColors: Record<BundleGovernanceAfter["pressure"], string> = {
  low:    "bg-emerald-500",
  medium: "bg-amber-400",
  high:   "bg-rose-500",
}

const pressureLabels: Record<BundleGovernanceAfter["pressure"], string> = {
  low:    "Low pressure",
  medium: "Medium pressure",
  high:   "High pressure",
}

// capital_state tooltip copy
const capitalTooltips: Record<BundleGovernanceAfter["capital_state"], string> = {
  stable:       "Squad value is evenly distributed across positions.",
  fragmented:   "Capital is spread thinly; limited room for premium upgrades.",
  concentrated: "Heavy spend in one position, reducing flexibility elsewhere.",
}

export function TransferBundlesSection({ data }: TransferBundlesProps) {
  if (!data || !data.bundles || data.bundles.length === 0) {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Transfer Bundles</h2>
          <p className="text-sm text-muted-foreground">Strategic upgrade scenarios ranked by 2GW outlook</p>
        </div>
        <Card className="bg-card/50">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">No bundle scenarios available.</p>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Transfer Bundles</h2>
        <p className="text-sm text-muted-foreground">
          Medium-term structural upgrade scenarios (2GW horizon) — GW{data.meta.gameweek}
        </p>
      </div>

      {/* Preserve backend order exactly — no re-sort */}
      <div className="grid gap-4 md:grid-cols-2">
        {data.bundles.map((bundle) => {
          const gov = bundle.governance_after
          const hasCaptainBoost = bundle.impact.captain_gain > 0
          const gainNextPositive = bundle.impact.gain_next_gw >= 0
          const gainTwoPositive = bundle.impact.gain_two_gw >= 0

          return (
            <Card key={bundle.rank} className="bg-card/50">
              <CardContent className="p-5 space-y-4">

                {/* Header: rank + structural score */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground/60 uppercase tracking-wide">
                    #{bundle.rank}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Structural Score</span>
                    <Badge className="bg-slate-800/60 text-slate-200 border border-slate-500/30 text-sm font-semibold px-2.5 py-0.5">
                      {bundle.score.toFixed(2)}
                    </Badge>
                  </div>
                </div>

                {/* Impact — 2GW primary, Next GW secondary */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Impact</p>
                  <div className="flex items-end gap-3">
                    {/* 2GW — dominant metric */}
                    <div className="rounded-md bg-muted/25 border border-border/50 px-4 py-2.5 text-center flex-1">
                      <div className="text-[10px] text-muted-foreground mb-0.5">2GW Gain</div>
                      <div className={`text-xl font-bold tracking-tight ${gainTwoPositive ? "text-emerald-400" : "text-rose-400"}`}>
                        {gainTwoPositive ? "+" : ""}{bundle.impact.gain_two_gw.toFixed(1)}
                      </div>
                    </div>
                    {/* Next GW — subordinate metric */}
                    <div className="rounded-md bg-muted/10 border border-border/30 px-3 py-2 text-center">
                      <div className="text-[10px] text-muted-foreground/70 mb-0.5">Next GW</div>
                      <div className={`text-sm font-medium ${gainNextPositive ? "text-emerald-500/70" : "text-rose-500/70"}`}>
                        {gainNextPositive ? "+" : ""}{bundle.impact.gain_next_gw.toFixed(1)}
                      </div>
                    </div>
                  </div>
                  {hasCaptainBoost && (
                    <Badge className="bg-sky-950/60 text-sky-200 border border-sky-500/30 text-xs">
                      Captain Boost +{bundle.impact.captain_gain.toFixed(1)}
                    </Badge>
                  )}
                </div>

                {/* Transfers — subordinate to impact, visually quiet */}
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wide">Transfers</p>
                  <div className="space-y-1">
                    {bundle.transfers.map((leg, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-muted-foreground/80 px-1"
                      >
                        <span className="truncate flex-1">{leg.out_name}</span>
                        <ArrowRight className="size-3 text-muted-foreground/30 shrink-0" />
                        <span className="font-medium truncate flex-1 text-right text-foreground/70">{leg.in_name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Post-Bundle Governance */}
                <div className="space-y-2 pt-1 border-t border-border/40">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Post-Bundle Governance</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm">

                    {/* health_score */}
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-16 rounded-full bg-muted/40 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-slate-400/60"
                          style={{ width: `${gov.health_score}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{gov.health_score}</span>
                    </div>

                    {/* pressure — traffic light dot */}
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-block size-2 rounded-full ${pressureColors[gov.pressure]}`} />
                      <span className="text-xs text-muted-foreground">{pressureLabels[gov.pressure]}</span>
                    </div>

                    {/* capital_state — subtle label with title tooltip */}
                    <span
                      className="text-xs text-muted-foreground/70 italic cursor-help"
                      title={capitalTooltips[gov.capital_state]}
                    >
                      {gov.capital_state}
                    </span>
                  </div>
                </div>

              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
