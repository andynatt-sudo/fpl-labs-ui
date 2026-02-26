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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { PlayerLensSidebar } from "@/components/player-lens-sidebar"
import { cn } from "@/lib/utils"
import type { PlayerProfile, PlayerLens, Reliability, InjuryState } from "@/lib/types"

const PAGE_SIZE_OPTIONS = [10, 25, 50]

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
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [sortKey, setSortKey] = useState<SortKey>("ownership")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [selectedProfile, setSelectedProfile] = useState<PlayerProfile | null>(null)
  const [selectedLens, setSelectedLens] = useState<PlayerLens | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handlePlayerClick = (playerId: number) => {
    const profile = players.find(p => p.player_id === playerId)
    const lensEntry = playerLensData?.find(p => p.player_id === playerId)
    
    if (profile && lensEntry?.lens) {
      setSelectedProfile(profile)
      setSelectedLens(lensEntry.lens)
      setSidebarOpen(true)
    }
  }

  const filteredAndSortedPlayers = useMemo(() => {
    let result = [...players]

    // Search by player name or team
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter(
        (p) =>
          p.web_name.toLowerCase().includes(q) ||
          p.team.toLowerCase().includes(q)
      )
    }

    // Position filter
    if (positionFilter !== "all") {
      result = result.filter((p) => p.position === positionFilter)
    }

    // Reliability filter
    if (reliabilityFilter !== "all") {
      result = result.filter((p) => p.profile.reliability === reliabilityFilter)
    }

    // Sort
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
  }, [players, searchQuery, positionFilter, reliabilityFilter, sortKey, sortDirection])

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedPlayers.length / pageSize))
  const paginatedPlayers = filteredAndSortedPlayers.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  // Reset to page 1 whenever filters/search change
  const handleSearchChange = (v: string) => { setSearchQuery(v); setPage(1) }
  const handlePositionChange = (v: string) => { setPositionFilter(v); setPage(1) }
  const handleReliabilityChange = (v: string) => { setReliabilityFilter(v); setPage(1) }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDirection("desc")
    }
    setPage(1)
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
          {/* Search — player name or team */}
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Player or team..."
              className="pl-8 h-9 text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Position</span>
            <Select value={positionFilter} onValueChange={handlePositionChange}>
              <SelectTrigger className="w-28 h-9">
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
            <Select value={reliabilityFilter} onValueChange={handleReliabilityChange}>
              <SelectTrigger className="w-36 h-9">
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
            {filteredAndSortedPlayers.length} player{filteredAndSortedPlayers.length !== 1 ? "s" : ""}
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
              {paginatedPlayers.map((player) => (
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

        {/* Pagination */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Rows per page</span>
            <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setPage(1) }}>
              <SelectTrigger className="w-16 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map(n => (
                  <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {filteredAndSortedPlayers.length === 0
                ? "0 of 0"
                : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, filteredAndSortedPlayers.length)} of ${filteredAndSortedPlayers.length}`}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PlayerLensSidebar
        profile={selectedProfile}
        lens={selectedLens}
        availability={null}
        playerProfiles={players}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />
    </>
  )
}
