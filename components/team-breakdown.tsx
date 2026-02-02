import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRightLeft, Wallet } from "lucide-react"
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

  return (
    <section className="space-y-4">
      {/* Section Header with Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">My Squad</h2>
          <p className="text-sm text-muted-foreground">Starting XI and bench breakdown</p>
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

      {/* Squad Grid */}
      <Card className="bg-card/50">
        <CardContent className="p-4">
          <div className="space-y-1">
            {/* Header Row */}
            <div className="grid grid-cols-[60px_1fr_80px] gap-2 px-2 py-1 text-xs text-muted-foreground uppercase tracking-wide">
              <span>Pos</span>
              <span>Players</span>
              <span className="text-right">Bench</span>
            </div>
            
            {/* Position Rows */}
            {positionOrder.map((position) => {
              const posData = byPosition[position] as PositionBreakdown | undefined
              if (!posData) return null
              
              const starters = posData.starters ?? []
              const bench = posData.bench ?? []
              const status = posData.status ?? "neutral"
              
              return (
                <div 
                  key={position} 
                  className={`grid grid-cols-[60px_1fr_80px] gap-2 px-2 py-2 rounded-md bg-muted/30 border-l-2 ${positionStatusBorder[status]}`}
                >
                  {/* Position Label */}
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-muted-foreground">
                      {positionShort[position]}
                    </span>
                  </div>
                  
                  {/* Starters */}
                  <div className="flex flex-wrap gap-2">
                    {starters.map((player) => (
                      <div 
                        key={player.player_id} 
                        className="flex items-center gap-1.5 bg-background/50 rounded px-2 py-1"
                      >
                        <span className={`text-sm font-medium ${statusColors[player.status]}`}>
                          {player.name}
                        </span>
                        <span 
                          className={`size-1.5 rounded-full ${fixtureIndicator[player.fixture_stress].color}`}
                          title={`${player.fixture_stress} fixture`}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Bench */}
                  <div className="flex items-center justify-end">
                    {bench.map((player) => (
                      <span 
                        key={player.player_id} 
                        className="text-xs text-muted-foreground"
                      >
                        {player.name}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border text-xs text-muted-foreground">
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
        </CardContent>
      </Card>

      {/* Structural Insights */}
      {structuralNotes.length > 0 && (
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Squad Notes</h3>
            <ul className="space-y-1.5">
              {structuralNotes.map((note, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-muted-foreground/40 mt-px">-</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </section>
  )
}
