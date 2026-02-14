'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import type { PlayerLens } from "@/lib/types"

interface PlayerLensSidebarProps {
  player: PlayerLens | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PlayerLensSidebar({ player, open, onOpenChange }: PlayerLensSidebarProps) {
  if (!player) return null

  const { intelligence, diagnostics, prediction } = player

  // Badge color mappings
  const statusColors: Record<string, string> = {
    "MUST-HAVE": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "HOLD": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "WATCH": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  }

  const validationColors: Record<string, string> = {
    "validated": "bg-emerald-500/10 text-emerald-400 border-emerald-500/40",
    "emerging": "bg-violet-500/10 text-violet-400 border-violet-500/40",
  }

  const trajectoryColors: Record<string, string> = {
    "accelerating": "bg-green-500/20 text-green-400 border-green-500/30",
    "stable": "bg-gray-500/20 text-gray-400 border-gray-500/30",
    "declining": "bg-red-500/20 text-red-400 border-red-500/30",
  }

  const ceilingColors: Record<string, string> = {
    "high": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    "moderate": "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }

  const outlookColors: Record<string, string> = {
    "easy": "text-green-400",
    "neutral": "text-gray-400",
    "hard": "text-red-400",
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[30%] sm:max-w-none overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">{intelligence.identity.name}</SheetTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{intelligence.identity.position}</span>
            <span>•</span>
            <span>{intelligence.identity.team}</span>
          </div>
          <div className="flex items-center gap-3 mt-2 text-sm">
            <span className="font-semibold">£{intelligence.identity.price}m</span>
            <span className="text-muted-foreground">{intelligence.identity.ownership}% owned</span>
          </div>
        </SheetHeader>

        <div className="space-y-6 mt-6 px-4 pb-6">
          {/* Status Badges */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={statusColors[diagnostics.cpp_status]}>
                {diagnostics.cpp_status}
              </Badge>
              <Badge variant="outline" className={validationColors[diagnostics.validation_state]}>
                {diagnostics.validation_state}
              </Badge>
              {diagnostics.form_trajectory && (
                <Badge variant="outline" className={trajectoryColors[diagnostics.form_trajectory]}>
                  {diagnostics.form_trajectory}
                </Badge>
              )}
              {prediction.ceiling_indicator && (
                <Badge variant="outline" className={ceilingColors[prediction.ceiling_indicator]}>
                  {prediction.ceiling_indicator} ceiling
                </Badge>
              )}
            </div>
          </div>

          {/* Forward Outlook */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Forward Outlook</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fixture Outlook:</span>
                <span className={`font-medium capitalize ${outlookColors[prediction.fixture_outlook]}`}>
                  {prediction.fixture_outlook}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">EP Trend:</span>
                <span className={`font-medium capitalize ${outlookColors[prediction.ep_trend_alignment]}`}>
                  {prediction.ep_trend_alignment}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Snapshot */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Performance Snapshot</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted/30 p-3">
                <div className="text-xs text-muted-foreground">PPG</div>
                <div className="text-lg font-semibold">
                  {intelligence.analysis_gameweek_data.points_per_game.toFixed(1)}
                </div>
              </div>
              <div className="rounded-lg bg-muted/30 p-3">
                <div className="text-xs text-muted-foreground">Value Form</div>
                <div className="text-lg font-semibold">
                  {intelligence.analysis_gameweek_data.value_form.toFixed(1)}
                </div>
              </div>
              <div className="rounded-lg bg-muted/30 p-3">
                <div className="text-xs text-muted-foreground">EP This GW</div>
                <div className="text-lg font-semibold">
                  {intelligence.current_gameweek_data.ep_this.toFixed(1)}
                </div>
              </div>
              <div className="rounded-lg bg-muted/30 p-3">
                <div className="text-xs text-muted-foreground">EP Next GW</div>
                <div className="text-lg font-semibold">
                  {intelligence.current_gameweek_data.ep_next.toFixed(1)}
                </div>
              </div>
              <div className="rounded-lg bg-muted/30 p-3">
                <div className="text-xs text-muted-foreground">Opponent</div>
                <div className="text-lg font-semibold">
                  {intelligence.current_gameweek_data.fixtures.opponent_team_code}
                </div>
              </div>
              <div className="rounded-lg bg-muted/30 p-3">
                <div className="text-xs text-muted-foreground">Venue</div>
                <div className="text-lg font-semibold">
                  {intelligence.current_gameweek_data.fixtures.was_home ? "Home" : "Away"}
                </div>
              </div>
              <div className="rounded-lg bg-muted/30 p-3 col-span-2">
                <div className="text-xs text-muted-foreground">FDR (Next N)</div>
                <div className="text-lg font-semibold">
                  {intelligence.current_gameweek_data.fixtures.fdr_next_n.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
