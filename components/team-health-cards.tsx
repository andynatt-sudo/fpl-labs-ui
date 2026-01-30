import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, UserX } from "lucide-react"
import type { TeamHealth, FlagSeverity, Player } from "@/lib/types"

interface TeamHealthCardsProps {
  data: TeamHealth | null
  players: Player[]
}

const healthBandColors: Record<string, { bg: string; text: string; border: string }> = {
  EXCELLENT: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  OK: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/30" },
  FRAGILE: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  "AT RISK": { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30" },
}

const severityColors: Record<FlagSeverity, string> = {
  HIGH: "text-rose-400",
  MEDIUM: "text-amber-400",
  LOW: "text-sky-400",
}

export function TeamHealthCards({ data, players }: TeamHealthCardsProps) {
  if (!data) {
    return null
  }

  const healthBand = data.health_band ?? "OK"
  const bandStyle = healthBandColors[healthBand] ?? healthBandColors.OK
  const healthScore = data.health_score ?? 0
  const summary = data.summary ?? "No summary available"
  const flags = data.flags ?? []
  const missingMustHaves = data.missing_must_haves ?? []

  // Calculate severity breakdown
  const severityBreakdown = flags.reduce(
    (acc, flag) => {
      const severity = flag.severity ?? "LOW"
      acc[severity] = (acc[severity] ?? 0) + (flag.count ?? 0)
      return acc
    },
    { HIGH: 0, MEDIUM: 0, LOW: 0 } as Record<FlagSeverity, number>
  )

  const totalFlags = flags.reduce((sum, f) => sum + (f.count ?? 0), 0)

  // Create a map for quick player lookup
  const playerMap = new Map(players.map(p => [p.player_id, p]))
  
  // Get player details for missing must-haves
  const missingPlayersWithDetails = missingMustHaves.map(m => {
    const player = playerMap.get(m.player_id)
    return {
      ...m,
      name: player?.web_name ?? player?.name ?? `Player #${m.player_id}`,
      team: player?.team ?? "",
      position: player?.position ?? ""
    }
  })

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Card 1: Team Health Score */}
      <Card className={`bg-card/50 ${bandStyle.border} border`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className={`flex items-center justify-center size-12 rounded-lg ${bandStyle.bg}`}>
              <Activity className={`size-6 ${bandStyle.text}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-bold tracking-tight ${bandStyle.text}`}>
                  {healthScore}
                </span>
                <Badge variant="outline" className={`${bandStyle.text} ${bandStyle.border} text-xs`}>
                  {healthBand}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{summary}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Risk Flags */}
      <Card className="bg-card/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center size-12 rounded-lg bg-amber-500/10">
              <AlertTriangle className="size-6 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Risk Flags</p>
              <p className="text-2xl font-semibold tracking-tight">{totalFlags}</p>
              <div className="flex gap-3 mt-1 text-xs">
                {severityBreakdown.HIGH > 0 && (
                  <span className={severityColors.HIGH}>{severityBreakdown.HIGH} High</span>
                )}
                {severityBreakdown.MEDIUM > 0 && (
                  <span className={severityColors.MEDIUM}>{severityBreakdown.MEDIUM} Med</span>
                )}
                {severityBreakdown.LOW > 0 && (
                  <span className={severityColors.LOW}>{severityBreakdown.LOW} Low</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Missing Must-Haves */}
      <Card className="bg-card/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center size-12 rounded-lg bg-rose-500/10">
              <UserX className="size-6 text-rose-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Missing Must-Haves</p>
              <p className="text-2xl font-semibold tracking-tight">{missingMustHaves.length}</p>
              {missingPlayersWithDetails.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {missingPlayersWithDetails.slice(0, 5).map((player) => (
                    <Badge 
                      key={player.player_id} 
                      variant="outline" 
                      className="text-xs text-rose-400 border-rose-500/30"
                    >
                      {player.name}
                    </Badge>
                  ))}
                  {missingPlayersWithDetails.length > 5 && (
                    <Badge 
                      variant="outline" 
                      className="text-xs text-muted-foreground border-muted"
                    >
                      +{missingPlayersWithDetails.length - 5} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
