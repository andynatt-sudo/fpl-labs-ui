import { DashboardHeader } from "@/components/dashboard-header"
import { TeamHealthCards } from "@/components/team-health-cards"
import { TeamBreakdown } from "@/components/team-breakdown"
import { PlayersTable } from "@/components/players-table"
import playersData from "@/data/players.json"
import teamHealthData from "@/data/team_health.json"
import teamViewData from "@/data/team_view.json"
import type { Player, TeamHealth, TeamView } from "@/lib/types"

const players = playersData as Player[]
const teamHealth = teamHealthData as TeamHealth
const teamView = teamViewData as TeamView

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <TeamHealthCards data={teamHealth} />
        <TeamBreakdown data={teamView} />
        <PlayersTable players={players} />
      </main>
    </div>
  )
}
