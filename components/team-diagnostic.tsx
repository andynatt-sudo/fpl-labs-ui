import { AlertCircle } from "lucide-react"
import type { TeamView } from "@/lib/types"

interface TeamDiagnosticProps {
  data: TeamView | null
}

export function TeamDiagnostic({ data }: TeamDiagnosticProps) {
  if (!data) {
    return null
  }

  const byPosition = data.by_position ?? {}
  
  // Collect risk indicators
  const riskCounts = {
    concern: 0,
    risk: 0
  }
  
  Object.values(byPosition).forEach((pos) => {
    if (pos.status === "concern") riskCounts.concern++
    else if (pos.status === "risk") riskCounts.risk++
  })
  
  // Determine if there are any risks
  const hasRisks = riskCounts.concern > 0 || riskCounts.risk > 0
  
  if (!hasRisks) {
    return (
      <div className="px-4 py-2.5 bg-muted/30 border-l-4 border-l-border rounded-md">
        <p className="text-sm text-muted-foreground">
          Squad state is stable with no immediate concerns.
        </p>
      </div>
    )
  }
  
  // Generate summary sentence
  let summary = ""
  if (riskCounts.risk > 0 && riskCounts.concern > 0) {
    summary = `${riskCounts.risk} position${riskCounts.risk > 1 ? 's' : ''} at elevated risk, ${riskCounts.concern} showing early concerns.`
  } else if (riskCounts.risk > 0) {
    summary = `${riskCounts.risk} position${riskCounts.risk > 1 ? 's' : ''} at elevated risk.`
  } else {
    summary = `${riskCounts.concern} position${riskCounts.concern > 1 ? 's' : ''} showing early concerns.`
  }
  
  return (
    <div className="px-4 py-2.5 bg-amber-500/5 border-l-4 border-l-amber-500 rounded-md">
      <div className="flex items-start gap-3">
        <AlertCircle className="size-4 text-amber-400 mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            {riskCounts.risk > 0 && (
              <span className="text-xs font-semibold text-rose-400">
                {riskCounts.risk} At Risk
              </span>
            )}
            {riskCounts.concern > 0 && (
              <span className="text-xs font-semibold text-amber-400">
                {riskCounts.concern} Concern
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {summary}
          </p>
        </div>
      </div>
    </div>
  )
}
