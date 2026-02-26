'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import type { PlayerLens, PlayerProfile } from "@/lib/types"

export interface PlayerLensSidebarAvailability {
  tier: "critical" | "caution"
  reasons: Array<{ label: string; detail: string }>
}

interface PlayerLensSidebarProps {
  profile: PlayerProfile | null
  lens: PlayerLens | null
  availability: PlayerLensSidebarAvailability | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PlayerLensSidebar({ profile, lens, availability, open, onOpenChange }: PlayerLensSidebarProps) {
  if (!profile || !lens) return null

  const { intelligence, diagnostics, prediction } = lens

  // ── Tier 1: Primary classification — border-only, cool/neutral tones only
  // No red, orange, or amber. Those are reserved exclusively for availability risk.
  const statusColors: Record<string, string> = {
    "MUST-HAVE": "text-sky-300 border-sky-400/35",
    "HOLD":      "text-slate-300 border-slate-400/30",
    "WATCH":     "text-slate-400 border-slate-500/25",
    "NEUTRAL":   "text-slate-400 border-slate-500/25",
    "RISK":      "text-slate-400 border-slate-500/25",
  }

  // ── Tier 2a: Validation — border-only, neutral descending
  const validationColors: Record<string, string> = {
    "validated":   "text-slate-400 border-slate-500/20",
    "emerging":    "text-slate-400 border-slate-500/20",
    "unvalidated": "text-muted-foreground/70 border-border/35",
  }

  // ── Tier 2b: Trajectory — border-only, cool/neutral only
  // No warm tones: improving and declining use slate only
  const trajectoryColors: Record<string, string> = {
    "accelerating": "text-slate-300 border-slate-400/25",
    "improving":    "text-slate-400 border-slate-500/20",
    "stable":       "text-muted-foreground/70 border-border/30",
    "declining":    "text-slate-500 border-slate-600/15",
  }

  // ── Tier 3: Ceiling — neutral only, lowest intensity
  const ceilingColors: Record<string, string> = {
    "high":     "text-muted-foreground/55 border-border/25",
    "moderate": "text-muted-foreground/45 border-border/20",
    "low":      "text-muted-foreground/35 border-border/15",
  }

  // ── Outlook: fixture difficulty — neutral scale only, no warm tones
  const outlookColors: Record<string, string> = {
    "easy":    "text-slate-300",
    "neutral": "text-slate-400",
    "hard":    "text-slate-500",
    "blank":   "text-muted-foreground/50",
  }

  // Colour derived from the tier passed in from the grid — exact 1:1 match
  const availabilityValueColor = availability?.tier === "critical" ? "text-rose-400" : "text-orange-400"

  // Analytical risk rows (rotation, volatility) — neutral, not availability
  const analyticalRiskStyle = "font-medium capitalize text-foreground"

  const hasAnalyticalRisk =
    diagnostics.risk_profile.rotation_risk ||
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

          {/* ── 2. Availability — near top, 1:1 match with grid border colour ── */}
          {availability && (
            <div className={`rounded-md border px-3 py-3 space-y-1.5 ${
              availability.tier === "critical"
                ? "border-rose-500/40"
                : "border-orange-400/30"
            }`}>
              <h3 className={`text-xs font-semibold uppercase tracking-wide ${
                availability.tier === "critical" ? "text-rose-400" : "text-orange-400"
              }`}>
                Availability
              </h3>
              {availability.reasons.map((r, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className={`font-medium ${availabilityValueColor}`}>{r.detail}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── 3. Status — three-tier visual weight ── */}
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

          {/* ── 5. Analytical Risk — rotation, volatility, context — neutral tones ── */}
          {hasAnalyticalRisk && (
            <div className="space-y-2 pt-2 border-t border-border/50">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Risk</h3>
              <div className="space-y-1.5 text-sm">
                {diagnostics.risk_profile.rotation_risk && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rotation</span>
                    <span className={analyticalRiskStyle}>{diagnostics.risk_profile.rotation_risk}</span>
                  </div>
                )}
                {diagnostics.risk_profile.volatility && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Volatility</span>
                    <span className={analyticalRiskStyle}>{diagnostics.risk_profile.volatility}</span>
                  </div>
                )}
                {diagnostics.team_context_modifier && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team context</span>
                    <span className={analyticalRiskStyle}>{diagnostics.team_context_modifier}</span>
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
