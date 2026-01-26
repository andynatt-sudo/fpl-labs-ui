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
import { cn } from "@/lib/utils"
import type { Player, Position, CppStatus, SortKey, SortDirection } from "@/lib/types"

interface PlayersTableProps {
  players: Player[]
}

const positionColors: Record<Position, string> = {
  GKP: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  DEF: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  MID: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  FWD: "bg-rose-500/20 text-rose-400 border-rose-500/30",
}

const statusColors: Record<CppStatus, string> = {
  "MUST-HAVE": "bg-primary/20 text-primary border-primary/30",
  "STRONG-BUY": "bg-sky-500/20 text-sky-400 border-sky-500/30",
  "VALUE-PICK": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "MONITOR": "bg-muted text-muted-foreground border-border",
}

export function PlayersTable({ players }: PlayersTableProps) {
  const [positionFilter, setPositionFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortKey, setSortKey] = useState<SortKey>("ownership")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const filteredAndSortedPlayers = useMemo(() => {
    let result = [...players]

    // Apply filters
    if (positionFilter !== "all") {
      result = result.filter((p) => p.position === positionFilter)
    }
    if (statusFilter !== "all") {
      result = result.filter((p) => p.cpp_status === statusFilter)
    }

    // Apply sorting
    result.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

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
  }, [players, positionFilter, statusFilter, sortKey, sortDirection])

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
              <SelectItem value="GKP">GKP</SelectItem>
              <SelectItem value="DEF">DEF</SelectItem>
              <SelectItem value="MID">MID</SelectItem>
              <SelectItem value="FWD">FWD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="MUST-HAVE">Must-Have</SelectItem>
              <SelectItem value="STRONG-BUY">Strong-Buy</SelectItem>
              <SelectItem value="VALUE-PICK">Value-Pick</SelectItem>
              <SelectItem value="MONITOR">Monitor</SelectItem>
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
              <SortableHeader columnKey="name">Player</SortableHeader>
              <SortableHeader columnKey="position">Pos</SortableHeader>
              <SortableHeader columnKey="team">Team</SortableHeader>
              <SortableHeader columnKey="price" className="text-right">
                Price
              </SortableHeader>
              <SortableHeader columnKey="ownership" className="text-right">
                Own%
              </SortableHeader>
              <SortableHeader columnKey="cpp_status">Status</SortableHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedPlayers.map((player) => (
              <TableRow
                key={player.id}
                className={cn(
                  player.cpp_status === "MUST-HAVE" &&
                    "bg-primary/5 hover:bg-primary/10"
                )}
              >
                <TableCell className="font-medium">{player.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("font-mono text-xs", positionColors[player.position])}
                  >
                    {player.position}
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
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("text-xs", statusColors[player.cpp_status])}
                  >
                    {player.cpp_status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
