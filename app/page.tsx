import { DashboardHeader } from "@/components/dashboard-header"
import { TeamHealthCards } from "@/components/team-health-cards"
import { TeamBreakdown } from "@/components/team-breakdown"
import { TacticalReplacementsSection } from "@/components/tactical-replacements"
import { TransferBundlesSection } from "@/components/transfer-bundles"
import playersData from "@/data/players.json"
import teamHealthData from "@/data/team_health.json"
import teamViewData from "@/data/team_view.json"
import transferContextData from "@/data/transfer_context.json"
import tacticalReplacementsData from "@/data/tactical_replacements.json"
import transferBundlesData from "@/data/transfer_bundles.json"
import type { Player, TeamHealth, TeamView, TransferContext, TacticalReplacements, TransferBundles } from "@/lib/types"

const players = playersData as Player[]
const teamHealth = teamHealthData as TeamHealth
const teamView = teamViewData as TeamView
const transferContext = transferContextData as TransferContext
const tacticalReplacements = tacticalReplacementsData as TacticalReplacements
const transferBundles = transferBundlesData as TransferBundles

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <TeamHealthCards health={teamHealth} context={transferContext} players={players} />
        <TeamBreakdown data={teamView} />
        <TacticalReplacementsSection data={tacticalReplacements} />
        <TransferBundlesSection data={transferBundles} />
      </main>
    </div>
  )
}
