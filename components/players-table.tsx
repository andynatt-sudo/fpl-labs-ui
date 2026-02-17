"use client"

import { useState, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { PlayerLensSidebar } from "@/components/player-lens-sidebar"
import { cn } from "@/lib/utils"
import type { PlayerProfile, PlayerLens, Reliability, InjuryState } from "@/lib/types"

interface PlayersTableProps {
  players: PlayerProfile[]
  playerLensData: Array<{ player_id: number; lens: PlayerLens }>
}

type SortKey = "web_name" | "position" | "team" | "price" | "ownership" | "reliability"
type SortDirection = "asc" | "desc"

const reliabilityColors: Record<Reliability, string> = {
  "Must-Have": "bg-primary/20 text-primary border-primary/30",
  "Hold": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Watch": "bg-muted text-muted-foreground border-border",
}

const injuryColors: Record<InjuryState, string> = {
  "AVAILABLE": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "DOUBTFUL": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "INJURED": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "SUSPENDED": "bg-rose-500/20 text-rose-400 border-rose-500/30",
  "UNKNOWN": "bg-muted text-muted-foreground border-border",
}

export function PlayersTable({ players, playerLensData }: PlayersTableProps) {
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [reliabilityFilter, setReliabilityFilter] = useState<string>("all")
  const [sortKey, setSortKey] = useState<SortKey>("ownership")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerLens | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handlePlayerClick = (playerId: number) => {
    const lensEntry = playerLensData?.find(p => p.player_id === playerId)
    if (lensEntry?.lens) {
      setSelectedPlayer(lensEntry.lens)
      setSidebarOpen(true)
    }
  }

  const filteredAndSortedPlayers = useMemo(() => {
    let result = [...players]

    // Apply filters
    if (positionFilter !== "all") {
      result = result.filter((p) => p.position === positionFilter)
    }
    if (reliabilityFilter !== "all") {
      result = result.filter((p) => p.profile.reliability === reliabilityFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      let aVal: any
      let bVal: any

      if (sortKey === "reliability") {
        aVal = a.profile.reliability
        bVal = b.profile.reliability
      } else {
        aVal = a[sortKey]
        bVal = b[sortKey]
      }

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal
      }

      return 0
    })

    return result
  }, [players, positionFilter, reliabilityFilter, sortKey, sortDirection])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDirection("desc")
    }
  }

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) {
      return <ArrowUpDown className="ml-1 size-3.5 text-muted-foreground/50" />
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 size-3.5 text-primary" />
    ) : (
      <ArrowDown className="ml-1 size-3.5 text-primary" />
    )
  }

  const SortableHeader = ({
    columnKey,
    children,
    className,
  }: {
    columnKey: SortKey
    children: React.ReactNode
    className?: string
  }) => (
    <TableHead
      className={cn("cursor-pointer select-none hover:text-foreground transition-colors", className)}
      onClick={() => handleSort(columnKey)}
    >
      <span className="flex items-center">
        {children}
        <SortIcon columnKey={columnKey} />
      </span>
    </TableHead>
  )

  return (
    <>
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Position</span>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Goalkeeper">GKP</SelectItem>
                <SelectItem value="Defender">DEF</SelectItem>
                <SelectItem value="Midfielder">MID</SelectItem>
                <SelectItem value="Forward">FWD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Reliability</span>
            <Select value={reliabilityFilter} onValueChange={setReliabilityFilter}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Must-Have">Must-Have</SelectItem>
                <SelectItem value="Hold">Hold</SelectItem>
                <SelectItem value="Watch">Watch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <span className="ml-auto text-sm text-muted-foreground">
            {filteredAndSortedPlayers.length} players
          </span>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <SortableHeader columnKey="web_name">Player</SortableHeader>
                <SortableHeader columnKey="position">Pos</SortableHeader>
                <SortableHeader columnKey="team">Team</SortableHeader>
                <SortableHeader columnKey="price" className="text-right">
                  Price
                </SortableHeader>
                <SortableHeader columnKey="ownership" className="text-right">
                  Own%
                </SortableHeader>
                <TableHead>Role</TableHead>
                <SortableHeader columnKey="reliability">Reliability</SortableHeader>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedPlayers.map((player) => (
                <TableRow
                  key={player.player_id}
                  onClick={() => handlePlayerClick(player.player_id)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">{player.web_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">
                      {player.position.substring(0, 3).toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {player.team}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    £{player.price.toFixed(1)}m
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {player.ownership.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {player.profile.role}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("text-xs", reliabilityColors[player.profile.reliability])}
                    >
                      {player.profile.reliability}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("text-xs", injuryColors[player.injury.state])}
                    >
                      {player.injury.state}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <PlayerLensSidebar 
        player={selectedPlayer} 
        open={sidebarOpen} 
        onOpenChange={setSidebarOpen} 
      />
    </>
  )
}
