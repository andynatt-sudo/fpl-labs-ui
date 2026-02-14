import { DashboardHeader } from "@/components/dashboard-header"
import { GovernanceBanner } from "@/components/governance-banner"
import { FlagsSection } from "@/components/flags-section"
import { SquadGrid } from "@/components/squad-grid"
import { Watchlist } from "@/components/watchlist"
import { TacticalReplacementsSection } from "@/components/tactical-replacements"
import { TransferBundlesSection } from "@/components/transfer-bundles"
import playersData from "@/data/players.json"
import teamLensData from "@/data/team_lens.json"
import transferContextData from "@/data/transfer_context.json"
import playerLensData from "@/data/player_lens.json"
import tacticalReplacementsData from "@/data/tactical_replacements.json"
import transferBundlesData from "@/data/transfer_bundles.json"
import type { 
  Player, 
  TransferContext,
  PlayerLensData,
  TacticalReplacements, 
  TransferBundles 
} from "@/lib/types"
import type { TeamLens } from "@/lib/types-team-lens"

const players = playersData as Player[]
const teamLens = teamLensData as TeamLens
const transferContext = transferContextData as TransferContext
const playerLens = playerLensData as PlayerLensData
const tacticalReplacements = tacticalReplacementsData as TacticalReplacements
const transferBundles = transferBundlesData as TransferBundles

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
        <SquadGrid squad={teamLens.squad} flags={teamLens.governance.flags} playerLensData={playerLens.profiles} />
        
        {/* 4. Watchlist - Monitored players */}
        {teamLens.watchlist && (
          <Watchlist watchlist={teamLens.watchlist} playerLensData={playerLens.profiles} />
        )}
        
        {/* 5. Optional Actions - Below the fold */}
        <div className="space-y-6 pt-4 border-t border-border/50">
          <TacticalReplacementsSection data={tacticalReplacements} />
          <TransferBundlesSection data={transferBundles} />
        </div>
      </main>
    </div>
  )
}
