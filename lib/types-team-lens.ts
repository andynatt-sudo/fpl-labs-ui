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

export interface TeamLensGovernance {
  team_id: number
  gameweek: number
  health_score: number
  health_band: HealthBandLens
  performance_state: string
  performance_driver: string
  capital_efficiency_state: string
  action_pressure: ActionPressure
  recommended_posture: string
  flags: TeamLensFlag[]
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
