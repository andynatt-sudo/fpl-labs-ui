export type Position = "GKP" | "DEF" | "MID" | "FWD"
export type CppStatus = "MUST-HAVE" | "STRONG-BUY" | "VALUE-PICK" | "MONITOR"

export interface Player {
  id: number
  name: string
  position: Position
  team: string
  price: number
  ownership: number
  cpp_status: CppStatus
}

export type SortKey = keyof Player
export type SortDirection = "asc" | "desc"

// Team Health types
export type HealthBand = "EXCELLENT" | "OK" | "FRAGILE" | "AT RISK"
export type FlagSeverity = "HIGH" | "MEDIUM" | "LOW"

export interface TeamHealthFlag {
  type: string
  severity: FlagSeverity
  count: number
}

export interface MissingMustHave {
  player_id: number
  reason: string
}

export interface TeamHealth {
  team_id: number
  gameweek: number
  health_score: number
  health_band: HealthBand
  summary: string
  flags: TeamHealthFlag[]
  missing_must_haves: MissingMustHave[]
}

// Team View / Breakdown types
export type PositionStatus = "neutral" | "concern" | "risk"
export type MinutesReliability = "high" | "medium" | "low"
export type FixtureStress = "easy" | "medium" | "hard"
export type StatusLabel = "MUST-HAVE" | "STRONG-BUY" | "VALUE-PICK" | "HOLD" | "MONITOR"

export interface TeamViewPlayer {
  id: number
  name: string
  is_starter: boolean
  status_label: StatusLabel
  minutes_reliability: MinutesReliability
  fixture_stress: FixtureStress
}

export interface PositionBreakdown {
  status: PositionStatus
  reason: string
  players: TeamViewPlayer[]
}

export interface FixPriority {
  priority: number
  issue: string
  context: string
}

export interface TeamView {
  summary: {
    total_players: number
    starters: number
    bench: number
    gameweek: number
  }
  by_position: {
    Goalkeeper: PositionBreakdown
    Defender: PositionBreakdown
    Midfielder: PositionBreakdown
    Forward: PositionBreakdown
  }
  risk_flags: string[]
  structural_notes: string[]
  fix_priority: FixPriority[]
}
