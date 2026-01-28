import { DashboardHeader } from "@/components/dashboard-header"
import { TeamHealthCards } from "@/components/team-health-cards"
import { StatsCards } from "@/components/stats-cards"
import { PlayersTable } from "@/components/players-table"
import playersData from "@/data/players.json"
import teamHealthData from "@/data/team_health.json"
import type { Player, TeamHealth } from "@/lib/types"

const players = playersData as Player[]
const teamHealth = teamHealthData as TeamHealth

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <TeamHealthCards data={teamHealth} />
        <StatsCards players={players} />
        <PlayersTable players={players} />
      </main>
    </div>
  )
}
