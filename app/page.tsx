import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"
import { PlayersTable } from "@/components/players-table"
import playersData from "@/data/players.json"
import type { Player } from "@/lib/types"

const players = playersData as Player[]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <StatsCards players={players} />
        <PlayersTable players={players} />
      </main>
    </div>
  )
}
