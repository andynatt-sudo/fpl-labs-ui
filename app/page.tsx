import { DashboardHeader } from "@/components/dashboard-header"
import { DiagnosticBanner } from "@/components/diagnostic-banner"
import { TeamBreakdown } from "@/components/team-breakdown"
import { Watchlist } from "@/components/watchlist"
import { TacticalReplacementsSection } from "@/components/tactical-replacements"
import { TransferBundlesSection } from "@/components/transfer-bundles"
import playersData from "@/data/players.json"
import teamHealthData from "@/data/team_health.json"
import teamViewData from "@/data/team_view.json"
import transferContextData from "@/data/transfer_context.json"
import playerLensData from "@/data/player_lens.json"
import tacticalReplacementsData from "@/data/tactical_replacements.json"
import transferBundlesData from "@/data/transfer_bundles.json"
import type { 
  Player, 
  TeamHealth, 
  TeamView, 
  TransferContext,
  PlayerLensData,
  TacticalReplacements, 
  TransferBundles 
} from "@/lib/types"

const players = playersData as Player[]
const teamHealth = teamHealthData as TeamHealth
const teamView = teamViewData as TeamView
const transferContext = transferContextData as TransferContext
const playerLens = playerLensData as PlayerLensData
const tacticalReplacements = tacticalReplacementsData as TacticalReplacements
const transferBundles = transferBundlesData as TransferBundles

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* 1. Context - Compact diagnostic banner */}
        <DiagnosticBanner health={teamHealth} context={transferContext} players={players} />
        
        {/* 2. Squad State - Main body content with readability priority */}
        <TeamBreakdown data={teamView} />
        
        {/* 3. Watchlist - Monitored players for potential inclusion */}
        <Watchlist watchlist={teamView?.watchlist} playerLensData={playerLens.profiles} />
        
        {/* 4. Optional Actions - Below the fold */}
        <div className="space-y-6 pt-4 border-t border-border/50">
          <TacticalReplacementsSection data={tacticalReplacements} />
          <TransferBundlesSection data={transferBundles} />
        </div>
      </main>
    </div>
  )
}
