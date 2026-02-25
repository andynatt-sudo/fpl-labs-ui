import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TeamLensGovernance } from "@/lib/types-team-lens"

interface GovernanceBannerProps {
  governance: TeamLensGovernance
}

const healthBandColors: Record<string, string> = {
  OK: "bg-green-500/10 text-green-400 border-green-500/20",
  WARNING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  CRITICAL: "bg-rose-500/10 text-rose-400 border-rose-500/20",
}

const postureLabels: Record<string, string> = {
  roll_transfer: "HOLD",
  make_transfer: "ACT",
  monitor: "WATCH",
  protect: "PROTECT",
}

const performanceStateLabels: Record<string, string> = {
  above: "Above baseline",
  flat: "Neutral",
  below: "Below baseline",
}

const performanceDriverLabels: Record<string, string> = {
  POSITIVE_VARIANCE: "Variance-driven",
  FIXTURE_CLUSTER: "Fixture-driven",
  ROLE_SHIFT: "Role-driven",
}

const actionPressureLabels: Record<string, string> = {
  low: "Low pressure",
  medium: "Moderate pressure",
  high: "High pressure",
}

const actionPressurePostureStyle: Record<string, string> = {
  low: "text-foreground",
  medium: "text-amber-400",
  high: "text-rose-400",
}

export function GovernanceBanner({ governance }: GovernanceBannerProps) {
  const postureLabel = postureLabels[governance.recommended_posture] ?? governance.recommended_posture.replace(/_/g, " ").toUpperCase()
  const perfState = performanceStateLabels[governance.performance_state] ?? governance.performance_state
  const perfDriver = performanceDriverLabels[governance.performance_driver] ?? governance.performance_driver
  const pressure = actionPressureLabels[governance.action_pressure] ?? governance.action_pressure
  const secondaryLine = [perfState, perfDriver, pressure].filter(Boolean).join(" · ")
  const postureStyle = actionPressurePostureStyle[governance.action_pressure] ?? "text-foreground"

  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">

          {/* Left: Health Status */}
          <div className="flex flex-col items-start gap-2 min-w-[120px]">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Health Status</span>
            <Badge className={`text-sm px-3 py-1 ${healthBandColors[governance.health_band]}`}>
              {governance.health_band}
            </Badge>
            <span className="text-3xl font-bold leading-none">{governance.health_score}</span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px self-stretch bg-border" />

          {/* Right: Week Lens */}
          <div className="flex flex-col items-start gap-1.5">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Week Lens</span>
            <div className={`text-2xl font-bold leading-tight ${postureStyle}`}>
              Posture: {postureLabel}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {secondaryLine}
            </p>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}
