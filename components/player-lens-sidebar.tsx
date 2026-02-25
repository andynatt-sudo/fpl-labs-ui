'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import type { PlayerLens, PlayerProfile } from "@/lib/types"

interface PlayerLensSidebarProps {
  profile: PlayerProfile | null
  lens: PlayerLens | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PlayerLensSidebar({ profile, lens, open, onOpenChange }: PlayerLensSidebarProps) {
  if (!profile || !lens) return null

  const { intelligence, diagnostics, prediction } = lens

  // ── Primary classification — dominant via size + solid background
  // No red: red is reserved for availability risk only
  const statusColors: Record<string, string> = {
    "MUST-HAVE": "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    "HOLD":      "bg-sky-500/15 text-sky-300 border-sky-500/25",
    "WATCH":     "bg-amber-500/15 text-amber-300 border-amber-500/25",
    "RISK":      "bg-orange-500/15 text-orange-300 border-orange-500/25",
  }

  // ── Secondary signals — same hue family but half the opacity + lighter text
  const validationColors: Record<string, string> = {
    "validated": "text-emerald-400/70 border-emerald-500/20",
    "emerging":  "text-sky-400/70 border-sky-500/20",
    "unvalidated": "text-muted-foreground border-border/50",
  }

  // ── Trajectory — neutral palette only, no red
  const trajectoryColors: Record<string, string> = {
    "accelerating": "text-emerald-400/60 border-emerald-500/15",
    "stable":       "text-muted-foreground/70 border-border/40",
    "declining":    "text-amber-400/60 border-amber-500/15",
    "improving":    "text-sky-400/60 border-sky-500/15",
  }

  // ── Ceiling — smallest, most muted, plain outline only
  const ceilingColors: Record<string, string> = {
    "high":     "text-muted-foreground/60 border-border/30",
    "moderate": "text-muted-foreground/50 border-border/25",
    "low":      "text-muted-foreground/40 border-border/20",
  }

  const outlookColors: Record<string, string> = {
    "easy": "text-green-400",
    "neutral": "text-gray-400",
    "hard": "text-red-400",
  }

  const hasRisk =
    diagnostics.risk_profile.rotation_risk ||
    diagnostics.risk_profile.injury_risk ||
    diagnostics.risk_profile.volatility ||
    diagnostics.team_context_modifier

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[30%] sm:max-w-none overflow-y-auto">

        {/* ── 1. Identity ── */}
        <SheetHeader className="px-4 pt-6 pb-0">
          <SheetTitle className="text-2xl leading-tight">{profile.web_name}</SheetTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
            <span>{profile.position}</span>
            <span>·</span>
            <span>{profile.team}</span>
          </div>
          <div className="flex items-center gap-3 mt-2 text-sm">
            <span className="font-semibold">£{profile.price}m</span>
            <span className="text-muted-foreground">{profile.ownership}% owned</span>
          </div>
        </SheetHeader>

        <div className="mt-6 px-4 pb-8 space-y-6">

          {/* ── 2. Status — three-tier visual weight ── */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</h3>

            {/* Tier 1: Primary classification — largest, most prominent */}
            <Badge className={`text-sm font-semibold px-3 py-1 ${statusColors[diagnostics.cpp_status]}`}>
              {diagnostics.cpp_status}
            </Badge>

            {/* Tier 2: Secondary signals — smaller text, lower opacity styling */}
            <div className="flex flex-wrap items-center gap-1.5">
              {diagnostics.validation_state && (
                <Badge variant="outline" className={`text-[11px] font-normal px-2 py-0 ${validationColors[diagnostics.validation_state]}`}>
                  {diagnostics.validation_state}
                </Badge>
              )}
              {diagnostics.form_trajectory && (
                <Badge variant="outline" className={`text-[11px] font-normal px-2 py-0 ${trajectoryColors[diagnostics.form_trajectory]}`}>
                  {diagnostics.form_trajectory}
                </Badge>
              )}
            </div>

            {/* Tier 3: Ceiling tag — smallest, plainest */}
            {prediction.ceiling_indicator && (
              <div>
                <Badge variant="outline" className={`text-[10px] font-normal px-1.5 py-0 ${ceilingColors[prediction.ceiling_indicator]}`}>
                  {prediction.ceiling_indicator} ceiling
                </Badge>
              </div>
            )}
          </div>

          {/* ── 3. Outlook — short-term context ── */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Outlook</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fixture</span>
                <span className={`font-medium capitalize ${outlookColors[prediction.fixture_outlook]}`}>
                  {prediction.fixture_outlook}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">EP Trend</span>
                <span className={`font-medium capitalize ${outlookColors[prediction.ep_trend_alignment]}`}>
                  {prediction.ep_trend_alignment}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Opponent</span>
                <span className="font-medium">{intelligence.current_gameweek_data.fixtures.opponent_team_code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Venue</span>
                <span className="font-medium">
                  {intelligence.current_gameweek_data.fixtures.was_home ? "Home" : "Away"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">FDR (Next N)</span>
                <span className="font-medium">{intelligence.current_gameweek_data.fixtures.fdr_next_n.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* ── 4. Performance Snapshot — evidence layer, visually secondary ── */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Performance Snapshot</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md bg-muted/20 border border-border/40 px-3 py-2.5">
                <div className="text-xs text-muted-foreground">PPG</div>
                <div className="text-base font-medium mt-0.5">
                  {intelligence.analysis_gameweek_data.points_per_game.toFixed(1)}
                </div>
              </div>
              <div className="rounded-md bg-muted/20 border border-border/40 px-3 py-2.5">
                <div className="text-xs text-muted-foreground">Value Form</div>
                <div className="text-base font-medium mt-0.5">
                  {intelligence.analysis_gameweek_data.value_form.toFixed(1)}
                </div>
              </div>
              <div className="rounded-md bg-muted/20 border border-border/40 px-3 py-2.5">
                <div className="text-xs text-muted-foreground">EP This GW</div>
                <div className="text-base font-medium mt-0.5">
                  {intelligence.current_gameweek_data.ep_this.toFixed(1)}
                </div>
              </div>
              <div className="rounded-md bg-muted/20 border border-border/40 px-3 py-2.5">
                <div className="text-xs text-muted-foreground">EP Next GW</div>
                <div className="text-base font-medium mt-0.5">
                  {intelligence.current_gameweek_data.ep_next.toFixed(1)}
                </div>
              </div>
            </div>
          </div>

          {/* ── 5. Risk Explanation — conditional, clearly separated ── */}
          {hasRisk && (
            <div className="space-y-2 pt-2 border-t border-border/50">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Risk</h3>
              <div className="space-y-1.5 text-sm">
                {diagnostics.risk_profile.rotation_risk && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rotation</span>
                    <span className="font-medium capitalize">{diagnostics.risk_profile.rotation_risk}</span>
                  </div>
                )}
                {diagnostics.risk_profile.injury_risk && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Injury</span>
                    <span className="font-medium capitalize">{diagnostics.risk_profile.injury_risk}</span>
                  </div>
                )}
                {diagnostics.risk_profile.volatility && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volatility</span>
                    <span className="font-medium capitalize">{diagnostics.risk_profile.volatility}</span>
                  </div>
                )}
                {diagnostics.team_context_modifier && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team Context</span>
                    <span className="font-medium capitalize">{diagnostics.team_context_modifier}</span>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </SheetContent>
    </Sheet>
  )
}
