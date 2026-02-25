'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { PlayerLensSidebar } from "@/components/player-lens-sidebar"
import type { TeamLensSquad, TeamLensFlag } from "@/lib/types-team-lens"
import type { PlayerLens, PlayerProfile } from "@/lib/types"

interface SquadGridProps {
  squad: TeamLensSquad
  flags: TeamLensFlag[]
  playerProfiles: PlayerProfile[]
  playerLensData: Array<{ player_id: number; lens: PlayerLens }>
}

export function SquadGrid({ squad, flags, playerProfiles, playerLensData }: SquadGridProps) {
  const [selectedProfile, setSelectedProfile] = useState<PlayerProfile | null>(null)
  const [selectedLens, setSelectedLens] = useState<PlayerLens | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const flaggedPlayerIds = new Set(flags.flatMap(f => f.player_ids))

  const handlePlayerClick = (playerId: number) => {
    const profile = playerProfiles.find(p => p.player_id === playerId)
    const lensEntry = playerLensData?.find(p => p.player_id === playerId)
    if (profile && lensEntry?.lens) {
      setSelectedProfile(profile)
      setSelectedLens(lensEntry.lens)
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
              const isFlagged = flaggedPlayerIds.has(player.player_id)
              return (
                <div
                  key={player.player_id}
                  onClick={() => handlePlayerClick(player.player_id)}
                  className={`flex flex-col gap-1.5 p-3 rounded-lg bg-background/80 border transition-colors cursor-pointer ${
                    isFlagged
                      ? "border-rose-500/40 hover:border-rose-500/60"
                      : "border-border/40 hover:border-border hover:bg-background"
                  }`}
                >
                  {/* Row 1: Name + captain badge */}
                  <div className="flex items-center justify-between gap-1 min-w-0">
                    <span className="font-semibold text-sm truncate text-foreground">
                      {player.name}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                      {player.is_captain && (
                        <span className="text-[10px] font-bold text-amber-400 leading-none">C</span>
                      )}
                      {player.is_vice_captain && (
                        <span className="text-[10px] font-bold text-slate-400 leading-none">V</span>
                      )}
                      {isFlagged && (
                        <span className="size-1.5 rounded-full bg-rose-500 shrink-0" aria-label="Availability risk" />
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
              const isFlagged = flaggedPlayerIds.has(player.player_id)
              return (
                <div
                  key={player.player_id}
                  onClick={() => handlePlayerClick(player.player_id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md bg-background/60 border cursor-pointer transition-colors ${
                    isFlagged
                      ? "border-rose-500/40 hover:border-rose-500/60"
                      : "border-border/30 hover:bg-background/80"
                  }`}
                >
                  <span className="text-sm font-medium text-foreground">{player.name}</span>
                  <span className="text-xs text-muted-foreground">{player.position}</span>
                  {player.is_captain && (
                    <span className="text-[10px] font-bold text-amber-400 leading-none">C</span>
                  )}
                  {player.is_vice_captain && (
                    <span className="text-[10px] font-bold text-slate-400 leading-none">V</span>
                  )}
                  {isFlagged && (
                    <span className="size-1.5 rounded-full bg-rose-500 shrink-0" aria-label="Availability risk" />
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
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />
    </section>
  )
}
