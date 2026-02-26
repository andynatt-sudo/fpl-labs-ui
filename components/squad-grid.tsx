'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { PlayerLensSidebar, type PlayerLensSidebarAvailability } from "@/components/player-lens-sidebar"
import type { TeamLensSquad, TeamLensFlag } from "@/lib/types-team-lens"
import type { PlayerLens, PlayerProfile } from "@/lib/types"

interface SquadGridProps {
  squad: TeamLensSquad
  flags: TeamLensFlag[]
  playerProfiles: PlayerProfile[]
  playerLensData: Array<{ player_id: number; lens: PlayerLens }>
}

export type RiskTier = "critical" | "caution" | null

export interface AvailabilityInfo {
  tier: RiskTier
  // Explicit labelled reasons — each is a { label, detail } pair shown in the panel
  reasons: Array<{ label: string; detail: string }>
}

/**
 * Single source of truth for availability tier + reasons.
 * Used by both the grid (border colour) and the sidebar (Availability section).
 */
export function getAvailabilityInfo(
  playerId: number,
  minutesOk: boolean,
  flags: TeamLensFlag[],
  profiles: PlayerProfile[]
): AvailabilityInfo {
  const profile = profiles.find(p => p.player_id === playerId)
  const injuryState = profile?.injury?.state
  const playerFlags = flags.filter(f => f.player_ids.includes(playerId))
  const reasons: Array<{ label: string; detail: string }> = []
  let tier: RiskTier = null

  // Critical: confirmed absence
  if (injuryState === "INJURED") {
    tier = "critical"
    reasons.push({ label: "Injury", detail: "Confirmed" })
  } else if (injuryState === "SUSPENDED") {
    tier = "critical"
    reasons.push({ label: "Suspension", detail: "Confirmed" })
  } else if (playerFlags.some(f => f.severity === "HIGH")) {
    tier = "critical"
    reasons.push({ label: "Flag", detail: "High severity" })
  }

  // Caution: doubtful, minutes risk, or lower-severity flag
  if (injuryState === "DOUBTFUL") {
    if (!tier) tier = "caution"
    reasons.push({ label: "Injury", detail: "Doubtful" })
  }
  if (!minutesOk) {
    if (!tier) tier = "caution"
    reasons.push({ label: "Minutes Risk", detail: "Elevated" })
  }
  if (playerFlags.length > 0 && !playerFlags.some(f => f.severity === "HIGH")) {
    if (!tier) tier = "caution"
    reasons.push({ label: "Flag", detail: playerFlags[0].severity === "MEDIUM" ? "Medium severity" : "Low severity" })
  }

  // Attach injury news if present and relevant
  if (profile?.injury?.news && tier) {
    reasons.push({ label: "Note", detail: profile.injury.news })
  }

  return { tier, reasons }
}

// Border-only per risk tier — single indicator, no dot, no background
const riskBorderClass: Record<string, string> = {
  critical: "border-rose-500/40 hover:border-rose-500/55",
  caution:  "border-orange-400/30 hover:border-orange-400/45",
}

export function SquadGrid({ squad, flags, playerProfiles, playerLensData }: SquadGridProps) {
  const [selectedProfile, setSelectedProfile] = useState<PlayerProfile | null>(null)
  const [selectedLens, setSelectedLens] = useState<PlayerLens | null>(null)
  const [selectedAvailability, setSelectedAvailability] = useState<PlayerLensSidebarAvailability | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handlePlayerClick = (playerId: number, minutesOk: boolean) => {
    const profile = playerProfiles.find(p => p.player_id === playerId)
    const lensEntry = playerLensData?.find(p => p.player_id === playerId)
    if (profile && lensEntry?.lens) {
      const { tier, reasons } = getAvailabilityInfo(playerId, minutesOk, flags, playerProfiles)
      setSelectedProfile(profile)
      setSelectedLens(lensEntry.lens)
      setSelectedAvailability(tier ? { tier, reasons } : null)
      setSidebarOpen(true)
    }
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Squad</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {squad.starters.length} starters · {squad.bench.length} bench
        </p>
      </div>

      {/* Starters Grid */}
      <Card className="bg-card/50">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Starting XI
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {squad.starters.map((player) => {
              const { tier } = getAvailabilityInfo(player.player_id, player.minutes_ok, flags, playerProfiles)
              return (
                <div
                  key={player.player_id}
                  onClick={() => handlePlayerClick(player.player_id, player.minutes_ok)}
                  className={`flex flex-col gap-1.5 p-3 rounded-lg bg-background/80 border transition-colors cursor-pointer ${
                    tier
                      ? riskBorderClass[tier]
                      : "border-border/40 hover:border-border hover:bg-background"
                  }`}
                >
                  {/* Row 1: Name + captain + risk dot */}
                  <div className="flex items-center justify-between gap-1 min-w-0">
                    <span className="font-semibold text-sm truncate text-foreground">
                      {player.name}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      {player.is_captain && (
                        <span className="text-[10px] font-bold text-slate-300 leading-none">C</span>
                      )}
                      {player.is_vice_captain && (
                        <span className="text-[10px] font-bold text-slate-500 leading-none">V</span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Position */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">{player.position}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bench */}
      <Card className="bg-card/30">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Bench
          </h3>
          <div className="flex flex-wrap gap-2">
            {squad.bench.map((player) => {
              const { tier } = getAvailabilityInfo(player.player_id, player.minutes_ok, flags, playerProfiles)
              return (
                <div
                  key={player.player_id}
                  onClick={() => handlePlayerClick(player.player_id, player.minutes_ok)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md bg-background/60 border cursor-pointer transition-colors ${
                    tier
                      ? riskBorderClass[tier]
                      : "border-border/30 hover:bg-background/80"
                  }`}
                >
                  <span className="text-sm font-medium text-foreground">{player.name}</span>
                  <span className="text-xs text-muted-foreground">{player.position}</span>
                  {player.is_captain && (
                    <span className="text-[10px] font-bold text-slate-300 leading-none">C</span>
                  )}
                  {player.is_vice_captain && (
                    <span className="text-[10px] font-bold text-slate-500 leading-none">V</span>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <PlayerLensSidebar
        profile={selectedProfile}
        lens={selectedLens}
        availability={selectedAvailability}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />
    </section>
  )
}
