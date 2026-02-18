import { Badge } from "@/components/ui/badge"
import type { TeamView } from "@/lib/types"

interface TeamDiagnosticProps {
  data: TeamView | null
}

export function TeamDiagnostic({ data }: TeamDiagnosticProps) {
  if (!data || !data.team_diagnostic) {
    return null
  }

  const diagnostic = data.team_diagnostic
  
  // Format labels for display
  const performanceLabel = diagnostic.recent_performance.replace(/_/g, " ")
  const driverLabel = diagnostic.primary_driver.replace(/_/g, " ")
  const pressureLabel = diagnostic.action_pressure
  const postureLabel = diagnostic.recommended_posture

  // Determine pressure color
  const pressureColor = 
    pressureLabel === "high" ? "text-rose-400" :
    pressureLabel === "medium" ? "text-amber-400" :
    "text-emerald-400"

  return (
    <div className="px-4 py-3 bg-muted/20 border-l-[3px] border-l-border rounded-md">
      {/* Scan-level diagnostic labels - compact and glanceable */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Badge variant="outline" className="text-xs font-medium">
          {performanceLabel}
        </Badge>
        <span className="text-xs text-muted-foreground">·</span>
        <Badge variant="outline" className="text-xs font-medium">
          {driverLabel}
        </Badge>
        <span className="text-xs text-muted-foreground">·</span>
        <Badge variant="outline" className={`text-xs font-semibold ${pressureColor}`}>
          {pressureLabel} pressure
        </Badge>
        <span className="text-xs text-muted-foreground">·</span>
        <span className="text-xs font-medium text-foreground">
          {postureLabel}
        </span>
      </div>
      
      {/* Read-level explanatory context - secondary */}
      {diagnostic.capital_efficiency?.summary && (
        <p className="text-xs text-muted-foreground/80 leading-relaxed">
          {diagnostic.capital_efficiency.summary}
        </p>
      )}
    </div>
  )
}
