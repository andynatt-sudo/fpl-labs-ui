import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, UserX } from "lucide-react"
import type { TeamHealth, FlagSeverity, TransferContext, Player } from "@/lib/types"

interface DiagnosticBannerProps {
  health: TeamHealth | null
  context: TransferContext | null
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

export function DiagnosticBanner({ health, context, players }: DiagnosticBannerProps) {
  if (!health) {
    return null
  }

  const healthBand = health.health_band ?? "OK"
  const bandStyle = healthBandColors[healthBand] ?? healthBandColors.OK
  const healthScore = health.health_score ?? 0
  const summary = health.summary ?? "No summary available"
  const flags = health.flags ?? []
  const missingMustHaves = context?.missing_must_haves ?? []

  const severityBreakdown = flags.reduce(
    (acc, flag) => {
      const severity = flag.severity ?? "LOW"
      acc[severity] = (acc[severity] ?? 0) + (flag.count ?? 0)
      return acc
    },
    { HIGH: 0, MEDIUM: 0, LOW: 0 } as Record<FlagSeverity, number>
  )

  const totalFlags = flags.reduce((sum, f) => sum + (f.count ?? 0), 0)

  return (
    <div className={`${bandStyle.bg} ${bandStyle.border} border rounded-lg p-4`}>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Health Score */}
        <div className="flex items-center gap-3">
          <Activity className={`size-5 ${bandStyle.text}`} />
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-semibold tracking-tight ${bandStyle.text}`}>
              {healthScore}
            </span>
            <Badge variant="outline" className={`${bandStyle.text} ${bandStyle.border} text-xs`}>
              {healthBand}
            </Badge>
          </div>
        </div>

        {/* Summary */}
        <div className="flex-1 text-sm text-muted-foreground">
          {summary}
        </div>

        {/* Risk Flags */}
        <div className="flex items-center gap-3">
          <AlertTriangle className="size-4 text-amber-400" />
          <div className="text-sm">
            <span className="font-medium">{totalFlags}</span>
            <span className="text-muted-foreground"> flags</span>
            {(severityBreakdown.HIGH > 0 || severityBreakdown.MEDIUM > 0 || severityBreakdown.LOW > 0) && (
              <span className="ml-2 text-xs">
                {severityBreakdown.HIGH > 0 && (
                  <span className={severityColors.HIGH}>{severityBreakdown.HIGH}H </span>
                )}
                {severityBreakdown.MEDIUM > 0 && (
                  <span className={severityColors.MEDIUM}>{severityBreakdown.MEDIUM}M </span>
                )}
                {severityBreakdown.LOW > 0 && (
                  <span className={severityColors.LOW}>{severityBreakdown.LOW}L</span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Missing Must-Haves */}
        {missingMustHaves.length > 0 && (
          <div className="flex items-center gap-3">
            <UserX className="size-4 text-rose-400" />
            <div className="text-sm">
              <span className="font-medium">{missingMustHaves.length}</span>
              <span className="text-muted-foreground"> missing</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
