import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import type { TeamLensFlag } from "@/lib/types-team-lens"

interface FlagsSectionProps {
  flags: TeamLensFlag[]
}

const severityColors = {
  HIGH: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  MEDIUM: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  LOW: "bg-blue-500/10 text-blue-400 border-blue-500/30",
}

export function FlagsSection({ flags }: FlagsSectionProps) {
  if (!flags || flags.length === 0) {
    return null
  }

  return (
    <Card className="border-l-4 border-l-amber-500">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="size-5 text-amber-400 mt-0.5 shrink-0" />
          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-sm">Team Flags</h3>
            <div className="flex flex-wrap gap-2">
              {flags.map((flag, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className={`${severityColors[flag.severity]} font-medium`}
                >
                  {flag.severity} — {flag.code} ({flag.player_ids.length} players)
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
