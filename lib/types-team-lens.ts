// Team Lens Types - New Contract
export type HealthBandLens = "OK" | "WARNING" | "CRITICAL"
export type ActionPressure = "low" | "medium" | "high"
export type FlagSeverityLens = "LOW" | "MEDIUM" | "HIGH"
export type PlayerStatus = "MUST-HAVE" | "HOLD" | "WATCH"
export type CeilingClass = "HIGH" | "MEDIUM" | "LOW"
export type CppStatusLens = "MUST-HAVE" | "HOLD" | "WATCH"

export interface TeamLensFlag {
  code: string
  severity: FlagSeverityLens
  player_ids: number[]
}

export interface TeamLensCompetitive {
  lookback_used: number
  gw_deltas: number[]
  rolling_delta: number
  negative_weeks: number
  severe_weeks: number
  competitive_pressure_score: number
  competitive_state: string
}

export type WarningLevel = "normal" | "watch" | "alert" | "critical"

export interface TeamLensGovernance {
  team_id: number
  gameweek: number
  // Structural
  health_score: number
  health_status: string
  structural_pressure_score: number
  // Competitive
  competitive: TeamLensCompetitive
  // Overall pressure
  overall_pressure_score: number
  warning_level: WarningLevel
  flags: TeamLensFlag[]
  // Legacy fields (may be absent) — kept optional so old banner doesn't break
  health_band?: HealthBandLens
  performance_state?: string
  performance_driver?: string
  action_pressure?: ActionPressure
  recommended_posture?: string
}

export interface SquadPlayer {
  player_id: number
  name: string
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward"
  is_starter: boolean
  status: PlayerStatus
  minutes_ok: boolean
  cpp: {
    status: CppStatusLens
    ceiling_class: CeilingClass
  }
}

export interface TeamLensSquad {
  starters: SquadPlayer[]
  bench: SquadPlayer[]
  hold: SquadPlayer[]
}

export interface TeamLens {
  team_id: number
  analysis_gameweek: number
  governance: TeamLensGovernance
  squad: TeamLensSquad
  watchlist: any
  history: any[]
  diagnostic: any
}
