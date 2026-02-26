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
  playerProfiles: PlayerProfile[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

// ── Colour maps — cool/neutral only. Red/orange reserved for availability. ──

const cppStatusColors: Record<string, string> = {
  "MUST-HAVE": "text-sky-300 border-sky-400/35",
  "HOLD":      "text-slate-300 border-slate-400/30",
  "WATCH":     "text-slate-400 border-slate-500/25",
  "NEUTRAL":   "text-slate-400 border-slate-500/25",
  "RISK":      "text-slate-400 border-slate-500/25",
}

const validationColors: Record<string, string> = {
  "validated":   "text-slate-400 border-slate-500/20",
  "emerging":    "text-slate-400 border-slate-500/20",
  "unvalidated": "text-muted-foreground/70 border-border/35",
}

const trajectoryColors: Record<string, string> = {
  "accelerating": "text-slate-300 border-slate-400/25",
  "improving":    "text-slate-400 border-slate-500/20",
  "stable":       "text-muted-foreground/70 border-border/30",
  "declining":    "text-slate-500 border-slate-600/15",
}

const ceilingColors: Record<string, string> = {
  "high":     "text-muted-foreground/55 border-border/25",
  "moderate": "text-muted-foreground/45 border-border/20",
  "low":      "text-muted-foreground/35 border-border/15",
}

const outlookColors: Record<string, string> = {
  "easy":    "text-slate-300",
  "neutral": "text-slate-400",
  "hard":    "text-slate-500",
}

// ── Section header ──
function SectionHeader({ label }: { label: string }) {
  return (
    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
      {label}
    </h3>
  )
}

// ── Key/value row ──
function Row({ label, value, valueClass }: { label: string; value: React.ReactNode; valueClass?: string }) {
  return (
    <div className="flex justify-between items-baseline text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium capitalize ${valueClass ?? "text-foreground"}`}>{value}</span>
    </div>
  )
}

export function PlayerLensSidebar({ profile, lens, availability, playerProfiles, open, onOpenChange }: PlayerLensSidebarProps) {
  if (!profile) return null

  const diagnostics  = lens?.diagnostics  ?? null
  const prediction   = lens?.prediction   ?? null
  const intelligence = lens?.intelligence ?? null
  const transfers    = lens?.transfers    ?? null

  // Resolve target player name from profiles list
  const resolvePlayer = (id: number) =>
    playerProfiles.find(p => p.player_id === id)?.web_name ?? `#${id}`

  const availabilityValueColor = availability?.tier === "critical" ? "text-rose-400" : "text-orange-400"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[30%] sm:max-w-none overflow-y-auto">

        {/* ── Pillar 1: Identity (player_profiles.json) ── */}
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

          {/* ── Availability — derived from profile + flags, shown above diagnostics ── */}
          {availability && (
            <div className={`rounded-md border px-3 py-3 space-y-1.5 ${
              availability.tier === "critical" ? "border-rose-500/40" : "border-orange-400/30"
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

          {/* ── Pillar 2: Diagnostics (lens.diagnostics) ── */}
          {diagnostics && (
            <div className="space-y-3">
              <SectionHeader label="Diagnostics" />

              {/* cpp_status — primary classification */}
              <Badge
                className={`text-sm font-semibold px-3 py-1 ${cppStatusColors[diagnostics.cpp_status] ?? "text-slate-400 border-slate-500/25"}`}
              >
                {diagnostics.cpp_status}
              </Badge>

              {/* validation_state + form_trajectory — secondary signals */}
              <div className="flex flex-wrap gap-1.5">
                {diagnostics.validation_state && (
                  <Badge variant="outline" className={`text-[11px] font-normal px-2 py-0 ${validationColors[diagnostics.validation_state] ?? ""}`}>
                    {diagnostics.validation_state}
                  </Badge>
                )}
                {diagnostics.form_trajectory && (
                  <Badge variant="outline" className={`text-[11px] font-normal px-2 py-0 ${trajectoryColors[diagnostics.form_trajectory] ?? ""}`}>
                    {diagnostics.form_trajectory}
                  </Badge>
                )}
              </div>

              {/* risk_profile — rotation, injury, volatility */}
              <div className="space-y-1.5">
                {diagnostics.risk_profile.rotation_risk && (
                  <Row label="Rotation risk" value={diagnostics.risk_profile.rotation_risk} />
                )}
                {diagnostics.risk_profile.injury_risk && (
                  <Row label="Injury risk" value={diagnostics.risk_profile.injury_risk} />
                )}
                {diagnostics.risk_profile.volatility && (
                  <Row label="Volatility" value={diagnostics.risk_profile.volatility} />
                )}
                {diagnostics.team_context_modifier && (
                  <Row label="Team context" value={diagnostics.team_context_modifier} />
                )}
              </div>
            </div>
          )}

          {/* ── Pillar 3: Prediction (lens.prediction) ── */}
          {prediction && (
            <div className="space-y-3">
              <SectionHeader label="Prediction" />
              <div className="space-y-1.5">
                <Row
                  label="Fixture outlook"
                  value={prediction.fixture_outlook}
                  valueClass={outlookColors[prediction.fixture_outlook] ?? ""}
                />
                <Row
                  label="EP trend"
                  value={prediction.ep_trend_alignment}
                />
                {prediction.ceiling_indicator && (
                  <div className="pt-0.5">
                    <Badge variant="outline" className={`text-[10px] font-normal px-1.5 py-0 ${ceilingColors[prediction.ceiling_indicator] ?? ""}`}>
                      {prediction.ceiling_indicator} ceiling
                    </Badge>
                  </div>
                )}
                {prediction.replacement_pressure && (
                  <Row label="Replacement pressure" value={prediction.replacement_pressure} />
                )}
              </div>
            </div>
          )}

          {/* ── Pillar 4: Intelligence (lens.intelligence) ── */}
          {intelligence && (
            <div className="space-y-3">
              <SectionHeader label="Intelligence" />

              {/* analysis_gameweek_data — performance metrics, compact grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-md bg-muted/20 border border-border/40 px-3 py-2">
                  <div className="text-xs text-muted-foreground">PPG</div>
                  <div className="text-sm font-medium mt-0.5">
                    {intelligence.analysis_gameweek_data.points_per_game.toFixed(1)}
                  </div>
                </div>
                <div className="rounded-md bg-muted/20 border border-border/40 px-3 py-2">
                  <div className="text-xs text-muted-foreground">Value form</div>
                  <div className="text-sm font-medium mt-0.5">
                    {intelligence.analysis_gameweek_data.value_form.toFixed(1)}
                  </div>
                </div>
                {intelligence.analysis_gameweek_data.xgi_per_90 !== null && (
                  <div className="rounded-md bg-muted/20 border border-border/40 px-3 py-2">
                    <div className="text-xs text-muted-foreground">xGI/90</div>
                    <div className="text-sm font-medium mt-0.5">
                      {intelligence.analysis_gameweek_data.xgi_per_90?.toFixed(2) ?? "—"}
                    </div>
                  </div>
                )}
              </div>

              {/* current_gameweek_data — fixture context */}
              <div className="space-y-1.5">
                <Row label="EP this GW" value={intelligence.current_gameweek_data.ep_this.toFixed(1)} />
                <Row label="EP next GW" value={intelligence.current_gameweek_data.ep_next.toFixed(1)} />
                <Row
                  label="Venue"
                  value={intelligence.current_gameweek_data.fixtures.was_home ? "Home" : "Away"}
                />
                <Row
                  label="FDR (next n)"
                  value={intelligence.current_gameweek_data.fixtures.fdr_next_n.toFixed(1)}
                />
              </div>
            </div>
          )}

          {/* ── Pillar 5: Transfer Outlook (lens.transfers) ── */}
          {transfers?.summary && (
            <div className="space-y-3">
              <SectionHeader label="Transfer Outlook" />

              {/* Summary */}
              <div className="space-y-2.5">
                {/* transfer_rating — mini bar meter */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Transfer rating</span>
                    <span className="text-foreground font-medium">
                      {transfers.summary.transfer_rating.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-muted/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-slate-400/60"
                      style={{ width: `${Math.min(transfers.summary.transfer_rating * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <Row
                  label="Replacement score"
                  value={transfers.summary.replacement_score.toFixed(2)}
                />

                {/* urgency_level — red only if high */}
                <Row
                  label="Urgency"
                  value={transfers.summary.urgency_level}
                  valueClass={
                    transfers.summary.urgency_level === "high"
                      ? "text-rose-400"
                      : transfers.summary.urgency_level === "moderate"
                      ? "text-slate-300"
                      : "text-slate-500"
                  }
                />
              </div>

              {/* Top 3 options by composite_transfer_score */}
              {(() => {
                const allOptions = [
                  ...(transfers.options?.better_variants ?? []),
                  ...(transfers.options?.value_variants ?? []),
                  ...(transfers.options?.upside_variants ?? []),
                ]
                const top3 = [...allOptions]
                  .sort((a, b) => (b.composite_transfer_score ?? 0) - (a.composite_transfer_score ?? 0))
                  .slice(0, 3)

                if (top3.length === 0) return null

                return (
                  <div className="space-y-1.5 pt-1 border-t border-border/40">
                    <p className="text-[11px] text-muted-foreground/70 uppercase tracking-wide">Top options</p>
                    {top3.map((opt, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-sm bg-muted/10 rounded-md px-2.5 py-2"
                      >
                        <span className="font-medium truncate">
                          {resolvePlayer(opt.target_player_id)}
                        </span>
                        <div className="flex items-center gap-3 shrink-0 text-xs text-muted-foreground">
                          <span title="Absolute gain">+{opt.absolute_gain.toFixed(3)}</span>
                          <span title="Budget efficiency">{opt.budget_efficiency.toFixed(3)} eff</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })()}
            </div>
          )}

          {/* ── No lens fallback ── */}
          {!lens && (
            <p className="text-xs text-muted-foreground/60">
              Detailed analysis unavailable for this player.
            </p>
          )}

        </div>
      </SheetContent>
    </Sheet>
  )
}
