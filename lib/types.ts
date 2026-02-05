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

export interface TeamViewPlayer {
  player_id: number
  name: string
  status: StatusLabel
  minutes_ok: boolean
  fixture_stress: FixtureStress
  is_starter: boolean
}

export interface PositionBreakdown {
  starters: TeamViewPlayer[]
  bench: TeamViewPlayer[]
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

export interface WatchlistPlayer {
  id: number
  name: string
  position: string
  team: string
  performance: {
    role: string
    minutes_trust: string
    xgi_per_90: number
    xg_share: number
    xa_share: number
  }
  context: {
    price: number
    points_per_game: number
    form: number
    value: number
    ownership: number
  }
  labels: {
    ceiling: boolean
    consistency: boolean
    minutes: boolean
    risk: boolean
  }
  explanation: string
  display_score: number
}

export interface TeamDiagnostic {
  recent_performance: string
  primary_driver: string
  action_pressure: string
  recommended_posture: string
  capital_efficiency: {
    low_ceiling_share: number
    summary: string
  }
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
  team_diagnostic?: TeamDiagnostic
  watchlist?: {
    Defender?: { budget: WatchlistPlayer[] }
    Forward?: { budget: WatchlistPlayer[] }
    Goalkeeper?: { budget: WatchlistPlayer[] }
    Midfielder?: { budget: WatchlistPlayer[] }
  }
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

// Player Profiles types
export interface PlayerProfile {
  player_id: number
  web_name: string
  profile: {
    role: string
    minutes: string
    scoring: string
    reliability: string
  }
  labels: string[]
  narrative: string
}

export interface PlayerProfiles {
  meta: {
    type: string
    role: string
    description: string
  }
  profiles: PlayerProfile[]
}

// Tactical Replacements types
export type SwapType = "safe_productivity" | "higher_upside"

export interface ReplacementOption {
  player_id: number
  name: string
  form: number
  now_cost: number
  price_band: string
}

export interface OutgoingPlayer {
  player_id: number
  name: string
  position: string
  now_cost: number
  price_band: string
  form: number
  minutes_secure: boolean
  is_starter: boolean
  reason: string
}

export interface TacticalReplacementItem {
  outgoing: OutgoingPlayer
  replacements: {
    safe_productivity: ReplacementOption[]
    higher_upside: ReplacementOption[]
  }
}

export interface TacticalReplacements {
  meta: {
    type: string
    lens: string
    description: string
    count: number
  }
  items: TacticalReplacementItem[]
}

// Transfer Bundles types
export interface BundleTransferPlayer {
  player_id: number
  name: string
  position: string
  now_cost: number
}

export interface BundleTransfer {
  out: BundleTransferPlayer
  in: BundleTransferPlayer
}

export interface TransferBundle {
  name: string
  type: string
  transfers_required: number
  net_budget_impact: number
  transfers: BundleTransfer[]
  problem_solved: string
  trade_offs: string[]
}

export interface TransferBundles {
  meta: {
    type: string
    team_id: number
    gameweek: number
    description: string
    count: number
  }
  bundles: TransferBundle[]
}
