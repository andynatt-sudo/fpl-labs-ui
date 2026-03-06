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

// Player Lens types
export type CppStatusLens = "MUST-HAVE" | "HOLD" | "WATCH"
export type ValidationState = "validated" | "emerging"
export type FormTrajectory = "accelerating" | "stable" | "declining" | null
export type FixtureOutlook = "easy" | "neutral" | "hard"
export type EPTrendAlignment = "aligned" | "neutral" | "underperforming"
export type CeilingIndicator = "high" | "moderate" | null

export interface PlayerLens {
  analysis_gw: number
  current_gw: number
  intelligence: {
    analysis_gameweek_data: {
      points_per_game: number
      value_form: number
      recent_points: number | null
      xgi_per_90: number | null
      defensive_contribution: number
      pick_score?: number
    }
    current_gameweek_data: {
      ep_this: number
      ep_next: number
      fixtures: {
        opponent_team_code: number
        was_home: boolean
        fdr_next_n: number
      }
    }
  }
  diagnostics: {
    cpp_status: string
    validation_state: ValidationState | null
    form_trajectory: FormTrajectory
    risk_profile: {
      rotation_risk: null | string
      injury_risk: null | string
      volatility: null | string
    }
    team_context_modifier?: null | string
  }
  prediction: {
    fixture_outlook: FixtureOutlook
    ep_trend_alignment: EPTrendAlignment
    ceiling_indicator: CeilingIndicator
    replacement_pressure?: null | string
  }
  // JSON uses "transfers" with "options" sub-key; transfer_options is legacy alias
  transfers?: {
    summary?: {
      transfer_rating: number
      replacement_score: number
      urgency_level: string
    }
    options?: {
      better_variants: unknown[]
      value_variants: unknown[]
      upside_variants: unknown[]
      structural_paths: unknown[]
    }
  }
  transfer_options?: {
    better_variants: unknown[]
    value_variants: unknown[]
    upside_variants: unknown[]
    structural_swap_paths: unknown[]
  }
}

export interface PlayerLensData {
  meta: {
    schema_version?: string
    type?: string
    description?: string
    analysis_gw?: number
    current_gw?: number
  }
  players: Record<string, PlayerLens>
}

// Player Profiles types (presentation surface from player_profiles.json)
export type InjuryState = "AVAILABLE" | "DOUBTFUL" | "INJURED" | "SUSPENDED" | "UNKNOWN"
export type Reliability = "Must-Have" | "Hold" | "Watch"

export interface PlayerProfileInjury {
  state: InjuryState
  chance_next_gw: number | null
  news: string | null
}

export interface PlayerProfileData {
  role: string
  minutes: string
  scoring: string
  reliability: Reliability
}

export interface PlayerProfile {
  player_id: number
  web_name: string
  full_name: string | null
  team: string
  team_code: number
  position: string
  price: number
  ownership: number
  injury: PlayerProfileInjury
  profile: PlayerProfileData
  labels: string[]
  narrative: string
  lens?: PlayerLens
}

export interface PlayerProfiles {
  meta: {
    type: string
    description: string
  }
  players: PlayerProfile[]
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

// Transfer Bundles types — matches bundles.json engine_version 2.0
export interface BundleTransferLeg {
  out: number
  out_name: string
  in: number
  in_name: string
}

export interface BundleImpact {
  gain_next_gw: number
  gain_two_gw: number
  captain_gain: number
}

export interface BundleGovernanceAfter {
  health_score: number
  pressure: "low" | "medium" | "high"
  capital_state: "stable" | "fragmented" | "concentrated"
}

export interface TransferBundle {
  rank: number
  score: number
  impact: BundleImpact
  governance_after: BundleGovernanceAfter
  transfers: BundleTransferLeg[]
}

export interface TransferBundles {
  meta: {
    type: string
    engine_version: string
    gameweek: number
    transfers_evaluated: number
    count: number
  }
  bundles: TransferBundle[]
}

// Decision Layers — v3 structural bundles
export interface StructuralPotential {
  best_bundle_score: number
  best_gain_next_gw: number
  best_gain_two_gw: number
}

export interface StructuralBundleImpact {
  gain_next_gw: number
  gain_two_gw: number
  captain_gain: number
  risk_reduction: number
}

export interface StructuralBundleGovernance {
  health_score: number
  warning_level: string
}

export interface StructuralBundle {
  rank: number
  score: number
  impact: StructuralBundleImpact
  governance_after: StructuralBundleGovernance
  transfers: BundleTransferLeg[]
}

export interface StructuralBundles {
  count: number
  items: StructuralBundle[]
}

export interface DecisionLayers {
  meta: { type: string }
  layers: {
    structural_potential: StructuralPotential
    structural_bundles: StructuralBundles
    [key: string]: unknown
  }
}
