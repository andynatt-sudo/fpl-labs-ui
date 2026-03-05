"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TeamLensGovernance } from "@/lib/types-team-lens"

interface TeamGovernancePanelProps {
  governance: TeamLensGovernance
}

// ── Gauge bar — renders a 0–100 score as a horizontal fill bar ──
function GaugeBar({ value, colorClass }: { value: number; colorClass: string }) {
  const pct = Math.min(Math.max(value, 0), 100)
  return (
    <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${colorClass}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// ── Structural pressure interpretation (do not recompute) ──
function structuralLabel(score: number): string {
  if (score < 20) return "Stable"
  if (score < 40) return "Minor Risk"
  if (score < 60) return "Fragile"
  return "Structural Risk"
}

// ── Overall pressure interpretation (do not recompute) ──
function overallPressureLabel(score: number): string {
  if (score < 20) return "Fully stable"
  if (score < 40) return "Mild pressure"
  if (score < 60) return "Watch"
  if (score < 80) return "Alert"
  return "Critical"
}

// ── Gauge fill colour based on score severity ──
function pressureColor(score: number): string {
  if (score < 20) return "bg-slate-400/50"
  if (score < 40) return "bg-slate-400/70"
  if (score < 60) return "bg-amber-400/70"
  if (score < 80) return "bg-orange-400/80"
  return "bg-rose-500"
}

// ── Health score gauge — higher is better ──
function healthColor(score: number): string {
  if (score >= 80) return "bg-slate-400/60"
  if (score >= 60) return "bg-amber-400/60"
  return "bg-rose-500/70"
}

// ── Warning level badge ──
const warningStyles: Record<string, string> = {
  normal:   "bg-slate-800/60  text-slate-300  border border-slate-600/40",
  watch:    "bg-amber-950/50  text-amber-300  border border-amber-600/40",
  alert:    "bg-orange-950/50 text-orange-300 border border-orange-600/40",
  critical: "bg-rose-950/50   text-rose-300   border border-rose-600/40",
}

const warningLabels: Record<string, string> = {
  normal:   "Normal",
  watch:    "Monitor",
  alert:    "Intervention suggested",
  critical: "Urgent action",
}

// ── Flag severity badge ──
const flagStyles: Record<string, string> = {
  HIGH:   "bg-rose-950/50   text-rose-300   border border-rose-600/40",
  MEDIUM: "bg-amber-950/50  text-amber-300  border border-amber-600/40",
  LOW:    "bg-slate-800/60  text-slate-400  border border-slate-600/40",
}

// ── Competitive state label ──
const competitiveStateLabels: Record<string, string> = {
  critical_underperformance: "Critical Underperformance",
  underperformance:          "Underperformance",
  neutral:                   "Neutral",
  outperformance:            "Outperformance",
}

export function TeamGovernancePanel({ governance }: TeamGovernancePanelProps) {
  const { 
    health_score, health_status, structural_pressure_score,
    competitive, overall_pressure_score, warning_level, flags
  } = governance

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Team Governance</h2>
        <p className="text-sm text-muted-foreground">GW{governance.gameweek} · Engine signals only — no derived metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* ── 1. Structural Status ── */}
        <Card className="border">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Structural Status
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-4">
            {/* Health status + score */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Health Status</span>
                <span className="text-sm font-medium text-foreground">{health_status}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Health Score</span>
                <span className="font-medium text-foreground">{health_score}</span>
              </div>
              <GaugeBar value={health_score} colorClass={healthColor(health_score)} />
            </div>

            {/* Structural pressure */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Structural Pressure</span>
                <span className="font-medium text-foreground">{structural_pressure_score}</span>
              </div>
              <GaugeBar value={structural_pressure_score} colorClass={pressureColor(structural_pressure_score)} />
              <p className="text-[11px] text-muted-foreground/70">{structuralLabel(structural_pressure_score)}</p>
            </div>
          </CardContent>
        </Card>

        {/* ── 2. Competitive Performance ── */}
        <Card className="border">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Competitive Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-4">
            {/* Competitive state */}
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Competitive State</span>
              <p className="text-sm font-medium text-foreground leading-tight">
                {competitiveStateLabels[competitive.competitive_state] ?? competitive.competitive_state}
              </p>
            </div>

            {/* Competitive pressure meter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Competitive Pressure</span>
                <span className="font-medium text-foreground">{competitive.competitive_pressure_score}</span>
              </div>
              <GaugeBar value={competitive.competitive_pressure_score} colorClass={pressureColor(competitive.competitive_pressure_score)} />
            </div>

            {/* GW deltas + rolling delta */}
            <div className="space-y-1 pt-1 border-t border-border/40">
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wide">Last {competitive.lookback_used} GWs vs field</p>
              <div className="flex flex-wrap gap-1.5">
                {competitive.gw_deltas.map((d, i) => (
                  <span
                    key={i}
                    className={`text-xs font-medium tabular-nums ${d >= 0 ? "text-emerald-400" : "text-rose-400"}`}
                  >
                    {d >= 0 ? "+" : ""}{d}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Rolling delta: <span className={`font-medium ${competitive.rolling_delta >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                  {competitive.rolling_delta >= 0 ? "+" : ""}{competitive.rolling_delta}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── 3. Team Pressure ── */}
        <Card className="border">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Team Pressure
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-4">
            {/* Overall pressure score — dominant metric */}
            <div className="space-y-1.5">
              <div className="flex items-end gap-2">
                <span className={`text-3xl font-bold tabular-nums leading-none ${pressureColor(overall_pressure_score).replace("bg-", "text-").replace("/80", "").replace("/70", "").replace("/50", "").replace("/60", "")}`}>
                  {overall_pressure_score}
                </span>
                <span className="text-xs text-muted-foreground mb-0.5">/ 100</span>
              </div>
              <GaugeBar value={overall_pressure_score} colorClass={pressureColor(overall_pressure_score)} />
              <p className="text-[11px] text-muted-foreground/70">{overallPressureLabel(overall_pressure_score)}</p>
            </div>

            {/* Warning level badge */}
            <div className="space-y-1.5 pt-1 border-t border-border/40">
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wide">Warning Level</p>
              <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${warningStyles[warning_level] ?? warningStyles.normal}`}>
                {warningLabels[warning_level] ?? warning_level}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* ── 4. Structural Flags ── */}
        <Card className="border">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Structural Flags
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {flags.length === 0 ? (
              <p className="text-xs text-muted-foreground/60 italic">No active flags</p>
            ) : (
              <div className="space-y-2">
                {flags.map((flag, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide shrink-0 ${flagStyles[flag.severity] ?? flagStyles.LOW}`}>
                      {flag.severity}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground leading-tight">{flag.code}</p>
                      {flag.player_ids.length > 0 && (
                        <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                          {flag.player_ids.length} player{flag.player_ids.length !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
