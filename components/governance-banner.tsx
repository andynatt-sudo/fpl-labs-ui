import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, TrendingUp, Shield } from "lucide-react"
import type { TeamLensGovernance } from "@/lib/types-team-lens"

interface GovernanceBannerProps {
  governance: TeamLensGovernance
}

const healthBandColors = {
  OK: "bg-green-500/10 text-green-400 border-green-500/20",
  WARNING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  CRITICAL: "bg-rose-500/10 text-rose-400 border-rose-500/20",
}

const actionPressureColors = {
  low: "text-muted-foreground",
  medium: "text-amber-400",
  high: "text-rose-400",
}

export function GovernanceBanner({ governance }: GovernanceBannerProps) {
  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Health Band - Large */}
          <div className="md:col-span-1 flex flex-col items-start gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Health Status</span>
            <Badge className={`text-lg px-4 py-2 ${healthBandColors[governance.health_band]}`}>
              {governance.health_band}
            </Badge>
            <span className="text-2xl font-bold">{governance.health_score}</span>
          </div>

          {/* Performance State */}
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <TrendingUp className="size-3.5" />
              Performance
            </span>
            <span className="text-sm font-medium">{governance.performance_state}</span>
            <span className="text-xs text-muted-foreground">{governance.performance_driver}</span>
          </div>

          {/* Action Pressure */}
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <AlertCircle className="size-3.5" />
              Action Pressure
            </span>
            <Badge 
              variant="outline" 
              className={`font-semibold uppercase ${actionPressureColors[governance.action_pressure]}`}
            >
              {governance.action_pressure}
            </Badge>
          </div>

          {/* Recommended Posture */}
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Shield className="size-3.5" />
              Recommended
            </span>
            <span className="text-sm font-medium">{governance.recommended_posture.replace(/_/g, ' ')}</span>
            <span className="text-xs text-muted-foreground">{governance.capital_efficiency_state}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
