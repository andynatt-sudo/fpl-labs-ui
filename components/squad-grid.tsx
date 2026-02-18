'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { PlayerLensSidebar } from "@/components/player-lens-sidebar"
import type { TeamLensSquad, TeamLensFlag } from "@/lib/types-team-lens"
import type { PlayerLens, PlayerProfile } from "@/lib/types"

interface SquadGridProps {
  squad: TeamLensSquad
  flags: TeamLensFlag[]
  playerProfiles: PlayerProfile[]
  playerLensData: Array<{ player_id: number; lens: PlayerLens }>
}

const statusColors = {
  "MUST-HAVE": "text-emerald-400",
  "HOLD": "text-blue-400",
  "WATCH": "text-amber-400",
}

const ceilingColors = {
  HIGH: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  MEDIUM: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  LOW: "bg-slate-500/20 text-slate-400 border-slate-500/30",
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
          {squad.starters.length} starters • {squad.bench.length} bench
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
                <Tooltip key={player.player_id}>
                  <TooltipTrigger asChild>
                    <div 
                      onClick={() => handlePlayerClick(player.player_id)}
                      className={`flex flex-col gap-2 p-3 rounded-lg bg-background/80 border transition-colors cursor-pointer ${
                        isFlagged 
                          ? "border-rose-500/50 bg-rose-500/5 hover:bg-rose-500/10" 
                          : "border-border/40 hover:border-border hover:bg-background"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold text-sm truncate ${statusColors[player.status]}`}>
                            {player.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{player.position}</div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] py-0 px-1.5 ${ceilingColors[player.cpp.ceiling_class]}`}
                        >
                          {player.cpp.ceiling_class}
                        </Badge>
                      </div>
                      {!player.minutes_ok && (
                        <div className="text-[10px] text-amber-400 font-medium">Minutes risk</div>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[200px]">
                    <div className="space-y-1">
                      <div className="font-semibold">{player.name}</div>
                      <div className="space-y-0.5 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className={statusColors[player.status]}>{player.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CPP:</span>
                          <span>{player.cpp.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Minutes:</span>
                          <span>{player.minutes_ok ? "Secure" : "At Risk"}</span>
                        </div>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
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
                    isFlagged ? "border-rose-500/50 hover:bg-rose-500/5" : "border-border/30 hover:bg-background/80"
                  }`}
                >
                  <span className={`text-sm font-medium ${statusColors[player.status]}`}>
                    {player.name}
                  </span>
                  <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                    {player.cpp.ceiling_class}
                  </Badge>
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
