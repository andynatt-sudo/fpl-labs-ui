import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"

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

interface ProtectedAssetsProps {
  profiles: PlayerProfile[]
}

export function ProtectedAssets({ profiles }: ProtectedAssetsProps) {
  const holdPlayers = profiles.filter(p => p.narrative.startsWith("HOLD:"))

  if (holdPlayers.length === 0) {
    return null
  }

  return (
    <Card className="bg-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Shield className="size-4 text-emerald-400" />
          <CardTitle className="text-base">Protected Assets</CardTitle>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {holdPlayers.length} players
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {holdPlayers.map((player) => {
          const reason = player.narrative.replace("HOLD: ", "")
          return (
            <div key={player.player_id} className="flex items-start justify-between gap-3 py-2 border-b border-border last:border-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{player.web_name}</span>
                  {player.labels.map((label, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs text-emerald-400 border-emerald-500/30">
                      {label}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{reason}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
