import { DashboardHeader } from "@/components/dashboard-header"
import { GovernanceBanner } from "@/components/governance-banner"
import { FlagsSection } from "@/components/flags-section"
import { SquadGrid } from "@/components/squad-grid"
import { PlayersTable } from "@/components/players-table"
import { Watchlist } from "@/components/watchlist"
import { TacticalReplacementsSection } from "@/components/tactical-replacements"
import { TransferBundlesSection } from "@/components/transfer-bundles"
import teamLensData from "@/data/team_lens.json"
import playerProfilesData from "@/data/player_profiles.json"
import playerLensData from "@/data/player_lens.json"
import tacticalReplacementsData from "@/data/tactical_replacements.json"
import transferBundlesData from "@/data/transfer_bundles.json"
import type { 
  PlayerProfiles,
  PlayerLensData,
  TacticalReplacements, 
  TransferBundles 
} from "@/lib/types"
import type { TeamLens } from "@/lib/types-team-lens"

const teamLens = teamLensData as TeamLens
const playerProfiles = playerProfilesData as PlayerProfiles
const playerLensDataRaw = playerLensData as PlayerLensData
const tacticalReplacements = tacticalReplacementsData as TacticalReplacements
const transferBundles = transferBundlesData as TransferBundles

// Convert player_lens.json object to array with player_id embedded
const playerLensArray = Object.entries(playerLensDataRaw.players).map(([playerId, lens]) => ({
  player_id: parseInt(playerId),
  lens
}))

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* 1. Governance Summary - Top banner */}
        <GovernanceBanner governance={teamLens.governance} />
        
        {/* 2. Flags Section - Alert cards */}
        <FlagsSection flags={teamLens.governance.flags} />
        
        {/* 3. Squad Grid - Starters + Bench */}
        <SquadGrid 
          squad={teamLens.squad} 
          flags={teamLens.governance.flags} 
          playerProfiles={playerProfiles.players}
          playerLensData={playerLensArray} 
        />
        
        {/* 4. Dashboard Table - All players from player_profiles.json */}
        <section className="space-y-3">
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
        
        {/* 6. Optional Actions - Below the fold */}
        <div className="space-y-6 pt-4 border-t border-border/50">
          <TacticalReplacementsSection data={tacticalReplacements} />
          <TransferBundlesSection data={transferBundles} />
        </div>
      </main>
    </div>
  )
}
