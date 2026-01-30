"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, Circle } from "lucide-react"
import type { TeamView, PositionBreakdown, PositionStatus, StatusLabel, MinutesReliability, FixtureStress } from "@/lib/types"

interface TeamBreakdownProps {
  data: TeamView | null
}

const positionOrder = ["Goalkeeper", "Defender", "Midfielder", "Forward"] as const
type PositionKey = (typeof positionOrder)[number]

const positionStatusColors: Record<PositionStatus, { bg: string; text: string; border: string }> = {
  neutral: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/30" },
  concern: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  risk: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30" },
}

const statusLabelColors: Record<StatusLabel, string> = {
  "MUST-HAVE": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "STRONG-BUY": "bg-sky-500/20 text-sky-400 border-sky-500/30",
  "VALUE-PICK": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  "HOLD": "bg-slate-500/20 text-slate-400 border-slate-500/30",
  "MONITOR": "bg-amber-500/20 text-amber-400 border-amber-500/30",
}

const minutesColors: Record<MinutesReliability, string> = {
  high: "text-emerald-400",
  medium: "text-amber-400",
  low: "text-rose-400",
}

const fixtureColors: Record<FixtureStress, string> = {
  easy: "text-emerald-400",
  medium: "text-amber-400",
  hard: "text-rose-400",
}

function PositionPanel({ 
  position, 
  data, 
  isOpen, 
  onToggle 
}: { 
  position: PositionKey
  data: PositionBreakdown
  isOpen: boolean
  onToggle: () => void
}) {
  const status = data.status ?? "neutral"
  const statusStyle = positionStatusColors[status]
  const reason = data.reason ?? ""
  const players = data.players ?? []
  
  const starters = players.filter(p => p.is_starter)
  const bench = players.filter(p => !p.is_starter)

  return (
    <Card className={`bg-card/50 ${statusStyle.border} border`}>
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {isOpen ? (
            <ChevronDown className="size-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="size-4 text-muted-foreground" />
          )}
          <span className="font-medium">{position}</span>
          <Badge variant="outline" className={`${statusStyle.text} ${statusStyle.border} text-xs capitalize`}>
            {status}
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground">{players.length} players</span>
      </button>
      
      {isOpen && (
        <CardContent className="pt-0 pb-4 px-4">
          <p className="text-xs text-muted-foreground mb-4 pl-7">{reason}</p>
          
          {/* Starters */}
          {starters.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2 pl-7">Starters</p>
              <div className="space-y-1.5">
                {starters.map((player) => (
                  <PlayerRow key={player.id} player={player} />
                ))}
              </div>
            </div>
          )}
          
          {/* Bench */}
          {bench.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2 pl-7">Bench</p>
              <div className="space-y-1.5">
                {bench.map((player) => (
                  <PlayerRow key={player.id} player={player} isBench />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

function PlayerRow({ 
  player, 
  isBench = false 
}: { 
  player: TeamView["by_position"]["Goalkeeper"]["players"][number]
  isBench?: boolean 
}) {
  const statusLabel = player.status_label ?? "MONITOR"
  const minutesReliability = player.minutes_reliability ?? "medium"
  const fixtureStress = player.fixture_stress ?? "medium"

  return (
    <div className={`flex items-center justify-between py-1.5 px-3 rounded-md ${isBench ? "bg-muted/30" : "bg-muted/50"}`}>
      <div className="flex items-center gap-3">
        <span className={`text-sm ${isBench ? "text-muted-foreground" : "text-foreground"}`}>
          {player.name ?? "Unknown"}
        </span>
        <Badge variant="outline" className={`${statusLabelColors[statusLabel]} text-xs`}>
          {statusLabel}
        </Badge>
      </div>
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <Circle className={`size-2 fill-current ${minutesColors[minutesReliability]}`} />
          <span className="text-muted-foreground capitalize">{minutesReliability}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`capitalize ${fixtureColors[fixtureStress]}`}>{fixtureStress}</span>
        </div>
      </div>
    </div>
  )
}

export function TeamBreakdown({ data }: TeamBreakdownProps) {
  const [openPanels, setOpenPanels] = useState<Set<PositionKey>>(new Set(["Defender"]))

  if (!data) {
    return null
  }

  const byPosition = data.by_position ?? {}
  const structuralNotes = data.structural_notes ?? []
  const fixPriority = data.fix_priority ?? []

  const togglePanel = (position: PositionKey) => {
    setOpenPanels((prev) => {
      const next = new Set(prev)
      if (next.has(position)) {
        next.delete(position)
      } else {
        next.add(position)
      }
      return next
    })
  }

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Team Breakdown</h2>
        <p className="text-sm text-muted-foreground">Position-by-position diagnostic view of your squad</p>
      </div>

      {/* Position Panels */}
      <div className="space-y-3">
        {positionOrder.map((position) => {
          const positionData = byPosition[position]
          if (!positionData) return null
          
          return (
            <PositionPanel
              key={position}
              position={position}
              data={positionData}
              isOpen={openPanels.has(position)}
              onToggle={() => togglePanel(position)}
            />
          )
        })}
      </div>

      {/* Structural Notes */}
      {structuralNotes.length > 0 && (
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-3">Structural Notes</h3>
            <ul className="space-y-2">
              {structuralNotes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-muted-foreground/50 mt-0.5">-</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Fix Priorities */}
      {fixPriority.length > 0 && (
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-3">Key Structural Considerations</h3>
            <ol className="space-y-3">
              {fixPriority.map((item) => (
                <li key={item.priority} className="flex items-start gap-3">
                  <span className="flex items-center justify-center size-5 rounded-full bg-muted text-xs font-medium text-muted-foreground shrink-0">
                    {item.priority}
                  </span>
                  <div>
                    <p className="text-sm text-foreground">{item.issue ?? ""}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.context ?? ""}</p>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </section>
  )
}
