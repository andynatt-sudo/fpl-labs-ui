import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TeamLensGovernance } from "@/lib/types-team-lens"

interface GovernanceBannerProps {
  governance: TeamLensGovernance
}

// Subtler badge styles — Health should feel stable and backgrounded
const healthBandColors: Record<string, string> = {
  OK: "bg-muted text-muted-foreground border-border",
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

// Posture text + subtle underline tint — scales with urgency
const postureTextStyle: Record<string, string> = {
  low: "text-foreground border-b-2 border-primary/30 pb-0.5",
  medium: "text-amber-400 border-b-2 border-amber-400/40 pb-0.5",
  high: "text-rose-400 border-b-2 border-rose-400/50 pb-0.5",
}

export function GovernanceBanner({ governance }: GovernanceBannerProps) {
  const postureLabel = postureLabels[governance.recommended_posture] ?? governance.recommended_posture.replace(/_/g, " ").toUpperCase()
  const perfState = performanceStateLabels[governance.performance_state] ?? governance.performance_state
  const perfDriver = performanceDriverLabels[governance.performance_driver] ?? governance.performance_driver
  const pressure = actionPressureLabels[governance.action_pressure] ?? governance.action_pressure
  const secondaryLine = [perfState, perfDriver, pressure].filter(Boolean).join(" · ")
  const postureStyle = postureTextStyle[governance.action_pressure] ?? "text-foreground border-b-2 border-primary/30 pb-0.5"

  return (
    <Card className="border">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">

          {/* Left: Health Status — backgrounded, structural context */}
          <div className="flex flex-col items-start gap-2 min-w-[110px]">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Health</span>
            <Badge className={`text-xs px-2.5 py-0.5 ${healthBandColors[governance.health_band]}`}>
              {governance.health_band}
            </Badge>
            <span className="text-xl font-semibold text-muted-foreground leading-none">{governance.health_score}</span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px self-stretch bg-border/60" />

          {/* Right: Week Lens — primary state */}
          <div className="flex flex-col items-start gap-1.5">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">Week Lens</span>
            <div className={`text-2xl font-bold leading-tight inline-block ${postureStyle}`}>
              {postureLabel}
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
