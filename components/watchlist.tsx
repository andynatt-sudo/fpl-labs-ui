'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { PlayerLensSidebar } from "@/components/player-lens-sidebar"
import type { WatchlistPlayer, PlayerLens, PlayerProfile } from "@/lib/types"

interface WatchlistProps {
  watchlist: {
    Defender?: { budget: WatchlistPlayer[] }
    Forward?: { budget: WatchlistPlayer[] }
    Goalkeeper?: { budget: WatchlistPlayer[] }
    Midfielder?: { budget: WatchlistPlayer[] }
  } | null | undefined
  playerProfiles: PlayerProfile[]
  playerLensData: Array<{ player_id: number; lens: PlayerLens }>
}

const positionOrder = ["Goalkeeper", "Defender", "Midfielder", "Forward"] as const

export function Watchlist({ watchlist, playerProfiles, playerLensData }: WatchlistProps) {
  const [selectedProfile, setSelectedProfile] = useState<PlayerProfile | null>(null)
  const [selectedLens, setSelectedLens] = useState<PlayerLens | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handlePlayerClick = (playerId: number) => {
    const profile = playerProfiles.find(p => p.player_id === playerId)
    const lensEntry = playerLensData?.find(p => p.player_id === playerId)
    
    if (profile && lensEntry?.lens) {
      setSelectedProfile(profile)
      setSelectedLens(lensEntry.lens)
      setSidebarOpen(true)
    }
  }

  if (!watchlist) {
    return null
  }

  // Count total players across all positions
  const totalPlayers = Object.values(watchlist).reduce(
    (sum, pos) => sum + (pos?.budget?.length || 0),
    0
  )

  if (totalPlayers === 0) {
    return null
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <Eye className="size-5 text-muted-foreground" />
        <div>
          <h2 className="text-lg font-medium tracking-tight">Watchlist</h2>
          <p className="text-sm text-muted-foreground">
            {totalPlayers} players monitored for potential inclusion
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {positionOrder.map((position) => {
          const posData = watchlist[position]
          const players = posData?.budget || []

          if (players.length === 0) {
            return null
          }

          return (
            <Card key={position} className="bg-card/30">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">{position}</h3>
                <div className="space-y-2">
                  {players.map((player) => (
                    <div
                      key={player.id}
                      onClick={() => handlePlayerClick(player.id)}
                      className="flex items-start justify-between gap-3 p-2 rounded bg-background/50 hover:bg-background/80 cursor-pointer transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{player.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {player.explanation}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">
                        £{player.context.price}m
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <PlayerLensSidebar 
        profile={selectedProfile}
        lens={selectedLens}
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen} 
      />
    </section>
  )
}
