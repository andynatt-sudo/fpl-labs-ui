import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

export interface PlayerProfile {
  player_id: number
  web_name: string
  profile: {
    role: string
    minutes: string
    scoring: string
    reliability: string
  }
  labels: string[]
  narrative: string
}

interface MonitoringWatchlistProps {
  profiles: PlayerProfile[]
}

const positionMap: Record<string, string> = {
  defensive_return: "DEF",
  shot_volume: "MID/FWD",
}

export function MonitoringWatchlist({ profiles }: MonitoringWatchlistProps) {
  const watchPlayers = profiles.filter(p => p.narrative.startsWith("WATCH:"))

  // Group by position/role
  const grouped = watchPlayers.reduce((acc, player) => {
    const pos = positionMap[player.profile.role] || player.profile.role
    if (!acc[pos]) acc[pos] = []
    acc[pos].push(player)
    return acc
  }, {} as Record<string, PlayerProfile[]>)

  if (watchPlayers.length === 0) {
    return null
  }

  return (
    <Card className="bg-card/50 border-muted/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Eye className="size-4 text-sky-400" />
          <CardTitle className="text-base text-muted-foreground">Monitoring</CardTitle>
          <Badge variant="outline" className="text-xs text-muted-foreground border-muted">
            {watchPlayers.length} players
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(grouped).map(([position, players]) => (
            <div key={position}>
              <h4 className="text-xs font-medium text-muted-foreground mb-2">{position}</h4>
              <div className="space-y-2">
                {players.map((player) => {
                  const reason = player.narrative.replace("WATCH: ", "")
                  return (
                    <div key={player.player_id} className="py-1.5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-muted-foreground">{player.web_name}</span>
                        {player.labels.length > 0 && (
                          player.labels.map((label, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs text-muted-foreground border-muted/50">
                              {label}
                            </Badge>
                          ))
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground/70">{reason}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
