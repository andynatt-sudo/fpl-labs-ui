import { DashboardHeader } from "@/components/dashboard-header"
import { TeamGovernancePanel } from "@/components/team-governance-panel"
import { SquadGrid } from "@/components/squad-grid"
import { PlayersTable } from "@/components/players-table"
import { Watchlist } from "@/components/watchlist"
import { TacticalReplacementsSection } from "@/components/tactical-replacements"
import { TransferBundlesSection } from "@/components/transfer-bundles"
import { TeamPotentialBanner } from "@/components/team-potential-banner"
import teamLensData from "@/data/team_lens.json"
import playerProfilesData from "@/data/player_profiles.json"
import playerLensRaw from "@/data/player_lens.json"
import tacticalReplacementsData from "@/data/tactical_replacements.json"
import transferBundlesData from "@/data/bundles.json"
import decisionLayersData from "@/data/decision_layers.json"
import type { 
  PlayerProfiles,
  PlayerLensData,
  TacticalReplacements, 
  TransferBundles,
  DecisionLayers
} from "@/lib/types"
import type { TeamLens } from "@/lib/types-team-lens"

const teamLens = teamLensData as TeamLens
const playerProfiles = playerProfilesData as PlayerProfiles
const tacticalReplacements = tacticalReplacementsData as TacticalReplacements
const transferBundles = transferBundlesData as TransferBundles
const decisionLayers = decisionLayersData as DecisionLayers

const playerLensArray = Object.entries((playerLensRaw as PlayerLensData).players).map(
  ([playerId, lens]) => ({ player_id: parseInt(playerId), lens })
)

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* 1. Team Governance Panel */}
        <TeamGovernancePanel governance={teamLens.governance} />

        {/* 2. Squad Grid - Starters + Bench */}
        <SquadGrid 
          squad={teamLens.squad} 
          flags={teamLens.governance.flags} 
          playerProfiles={playerProfiles.players}
          playerLensData={playerLensArray} 
        />
        
        {/* 3. Team Potential — headline insight from decision engine */}
        <TeamPotentialBanner potential={decisionLayers.layers.structural_potential} />

        {/* 4. Tactical Replacements + Transfer Bundles */}
        <div className="space-y-6">
          <TacticalReplacementsSection data={tacticalReplacements} />
          <TransferBundlesSection data={decisionLayers.layers.structural_bundles} />
        </div>

        {/* 4. Dashboard Table - All players from player_profiles.json */}
        <section className="space-y-3 pt-4 border-t border-border/50">
          <h2 className="text-xl font-semibold tracking-tight">Player Dashboard</h2>
          <PlayersTable players={playerProfiles.players} playerLensData={playerLensArray} />
        </section>
        
        {/* 5. Watchlist - Monitored players */}
        {teamLens.watchlist && (
          <Watchlist 
            watchlist={teamLens.watchlist} 
            playerProfiles={playerProfiles.players}
            playerLensData={playerLensArray} 
          />
        )}
      </main>
    </div>
  )
}
