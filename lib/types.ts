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

// Team Health types - diagnostic health only
export type HealthBand = "EXCELLENT" | "OK" | "FRAGILE" | "AT RISK"
export type FlagSeverity = "HIGH" | "MEDIUM" | "LOW"

export interface TeamHealthFlag {
  type: string
  severity: FlagSeverity
  count: number
}

export interface TeamHealth {
  team_id: number
  gameweek: number
  health_score: number
  health_band: HealthBand
  summary: string
  flags: TeamHealthFlag[]
}

// Team View / Breakdown types
export type PositionStatus = "neutral" | "concern" | "risk"
export type FixtureStress = "easy" | "medium" | "hard"
export type StatusLabel = "MUST-HAVE" | "STRONG-BUY" | "VALUE-PICK" | "HOLD" | "MONITOR"

export interface TeamViewStarter {
  player_id: number
  name: string
  status: StatusLabel
  minutes_ok: boolean
  fixture_stress: FixtureStress
}

export interface TeamViewBench {
  player_id: number
  name: string
  minutes_ok: boolean
}

export interface PositionBreakdown {
  starters: TeamViewStarter[]
  bench: TeamViewBench[]
  status: PositionStatus
  reason: string
}

export interface FixPriority {
  priority: number
  issue: string
  action: string
}

export interface TeamViewSummary {
  starter_minutes_risk: number
  availability_risk: number
  free_transfers: number
  bank: number
}

export interface TeamView {
  summary: TeamViewSummary
  by_position: {
    Goalkeeper: PositionBreakdown
    Defender: PositionBreakdown
    Midfielder: PositionBreakdown
    Forward: PositionBreakdown
  }
  structural_notes: string[]
}

// Transfer Context types - structural/meta context only
export interface MissingMustHave {
  player_id: number
  reason: string
}

export interface TransferContext {
  meta: {
    type: string
    team_id: number
    gameweek: number
  }
  missing_must_haves: MissingMustHave[]
}
