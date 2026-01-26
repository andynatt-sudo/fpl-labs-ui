import { Card, CardContent } from "@/components/ui/card"
import { Users, Star, TrendingUp, Target } from "lucide-react"
import type { Player } from "@/lib/types"

interface StatsCardsProps {
  players: Player[]
}

export function StatsCards({ players }: StatsCardsProps) {
  const totalPlayers = players.length
  const mustHaves = players.filter((p) => p.cpp_status === "MUST-HAVE").length
  const avgOwnership = (
    players.reduce((sum, p) => sum + p.ownership, 0) / players.length
  ).toFixed(1)
  const avgPrice = (
    players.reduce((sum, p) => sum + p.price, 0) / players.length
  ).toFixed(1)

  const stats = [
    {
      label: "Total Players",
      value: totalPlayers,
      icon: Users,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
    },
    {
      label: "Must-Haves",
      value: mustHaves,
      icon: Star,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Avg Ownership",
      value: `${avgOwnership}%`,
      icon: TrendingUp,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Avg Price",
      value: `£${avgPrice}m`,
      icon: Target,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center size-10 rounded-lg ${stat.bg}`}>
                <stat.icon className={`size-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
