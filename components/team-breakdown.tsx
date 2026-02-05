import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRightLeft, Wallet } from "lucide-react"
import { TeamDiagnostic } from "@/components/team-diagnostic"
import type { TeamView, PositionBreakdown, StatusLabel, FixtureStress, PositionStatus } from "@/lib/types"

interface TeamBreakdownProps {
  data: TeamView | null
}

const positionOrder = ["Goalkeeper", "Defender", "Midfielder", "Forward"] as const
const positionShort: Record<string, string> = {
  Goalkeeper: "GK",
  Defender: "DEF",
  Midfielder: "MID",
  Forward: "FWD",
}

type PositionKey = (typeof positionOrder)[number]

const statusColors: Record<StatusLabel, string> = {
  "MUST-HAVE": "text-emerald-400",
  "STRONG-BUY": "text-sky-400",
  "VALUE-PICK": "text-violet-400",
  "HOLD": "text-slate-400",
  "MONITOR": "text-amber-400",
}

const fixtureIndicator: Record<FixtureStress, { color: string; label: string }> = {
  easy: { color: "bg-emerald-500", label: "E" },
  medium: { color: "bg-amber-500", label: "M" },
  hard: { color: "bg-rose-500", label: "H" },
}

const positionStatusBorder: Record<PositionStatus, string> = {
  neutral: "border-l-slate-500/50",
  concern: "border-l-amber-500/50",
  risk: "border-l-rose-500/50",
}

export function TeamBreakdown({ data }: TeamBreakdownProps) {
  if (!data) {
    return null
  }

  const summary = data.summary ?? { starter_minutes_risk: 0, availability_risk: 0, free_transfers: 0, bank: 0 }
  const byPosition = data.by_position ?? {}
  const structuralNotes = data.structural_notes ?? []

  // Calculate squad state summary
  let stableCount = 0
  let concernCount = 0
  let riskCount = 0

  Object.values(byPosition).forEach((pos) => {
    if (pos.status === "neutral") stableCount++
    else if (pos.status === "concern") concernCount++
    else if (pos.status === "risk") riskCount++
  })

  return (
    <section className="space-y-4">
      {/* Section Header with Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">My Squad</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <span>{stableCount} stable</span>
            {concernCount > 0 && <span className="text-amber-400">{concernCount} concern</span>}
            {riskCount > 0 && <span className="text-rose-400">{riskCount} at risk</span>}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <ArrowRightLeft className="size-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{summary.free_transfers}</span>
            <span className="text-muted-foreground">FT</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wallet className="size-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{summary.bank.toFixed(1)}</span>
            <span className="text-muted-foreground">ITB</span>
          </div>
        </div>
      </div>

      {/* Team Diagnostic */}
      <TeamDiagnostic data={data} />

      {/* Squad Grid */}
      <Card className="bg-card/50">
        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Position Rows */}
            {positionOrder.map((position) => {
              const posData = byPosition[position] as PositionBreakdown | undefined
              if (!posData) return null
              
              const starters = posData.starters ?? []
              const bench = posData.bench ?? []
              const status = posData.status ?? "neutral"
              const statusLabel = status === "neutral" ? "" : status === "concern" ? "Concern" : "At Risk"
              
              return (
                <div 
                  key={position} 
                  className={`grid grid-cols-[90px_1fr] gap-4 px-4 py-3 rounded-lg ${
                    status === "neutral" 
                      ? "bg-muted/20 border-l-[6px] border-l-border" 
                      : status === "concern"
                      ? "bg-amber-500/5 border-l-[6px] border-l-amber-500"
                      : "bg-rose-500/5 border-l-[6px] border-l-rose-500"
                  }`}
                >
                  {/* Position Label with Status */}
                  <div className="flex flex-col justify-center gap-0.5">
                    <span className="text-sm font-bold text-foreground">
                      {positionShort[position]}
                    </span>
                    {statusLabel && (
                      <span className={`text-[11px] font-semibold ${status === "concern" ? "text-amber-400" : "text-rose-400"}`}>
                        {statusLabel}
                      </span>
                    )}
                  </div>
                  
                  {/* All Players (Starters + Bench) */}
                  <div className="flex flex-wrap gap-2.5 items-center">
                    {[...starters, ...bench].map((player) => (
                      <div 
                        key={player.player_id} 
                        className="flex items-center gap-2 bg-background/80 rounded-md px-3 py-2 border border-border/40"
                      >
                        <span className={`text-sm font-semibold ${statusColors[player.status]}`}>
                          {player.name}
                        </span>
                        <span 
                          className={`size-2 rounded-full ${fixtureIndicator[player.fixture_stress].color}`}
                          title={`${player.fixture_stress} fixture`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Footer: Legend + Squad Notes side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-3 border-t border-border">
            {/* Legend */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Fixture:</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Easy
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-amber-500" />
                  Medium
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-rose-500" />
                  Hard
                </span>
              </div>
            </div>
            
            {/* Squad Notes */}
            {structuralNotes.length > 0 && (
              <div className="md:border-l md:border-border md:pl-4">
                <h4 className="text-xs font-medium text-muted-foreground mb-1.5">Notes</h4>
                <ul className="space-y-1">
                  {structuralNotes.map((note, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground/80 flex items-start gap-1.5">
                      <span className="text-muted-foreground/40 mt-px">-</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
