import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRightLeft } from "lucide-react"
import type { TacticalReplacements } from "@/lib/types"

interface TacticalReplacementsProps {
  data: TacticalReplacements | null
}

export function TacticalReplacementsSection({ data }: TacticalReplacementsProps) {
  if (!data || !data.items || data.items.length === 0) {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Tactical Replacements</h2>
          <p className="text-sm text-muted-foreground">Situational swaps for short-term flexibility</p>
        </div>
        <Card className="bg-card/50">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              No obvious short-term tactical replacements identified.
            </p>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Tactical Replacements</h2>
        <p className="text-sm text-muted-foreground">Situational swaps for short-term flexibility</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.items.map((item, idx) => {
          const outgoing = item.outgoing
          const safeOptions = item.replacements.safe_productivity ?? []
          const upsideOptions = item.replacements.higher_upside ?? []
          const hasReplacements = safeOptions.length > 0 || upsideOptions.length > 0

          if (!hasReplacements) {
            return null
          }

          const capitalChange = 
            safeOptions.length > 0 
              ? safeOptions[0].now_cost - outgoing.now_cost 
              : upsideOptions[0].now_cost - outgoing.now_cost

          return (
            <Card key={idx} className="bg-card/50">
              <CardContent className="p-4">
                {/* Outgoing Player */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <ArrowRightLeft className="size-5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-semibold">{outgoing.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {outgoing.position}
                        </Badge>
                        {outgoing.is_starter && (
                          <Badge variant="outline" className="text-xs text-emerald-400 border-emerald-500/30">
                            Starter
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{outgoing.reason}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <div className="text-sm font-medium">£{outgoing.now_cost}m</div>
                    <div className="text-xs text-muted-foreground">Form: {outgoing.form}</div>
                  </div>
                </div>

                {/* Replacement Options */}
                <div className="space-y-3">
                  {/* Safe Productivity */}
                  {safeOptions.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs text-sky-400 border-sky-500/30">
                          SAFE
                        </Badge>
                        <span className="text-xs text-muted-foreground">Low risk, stability-focused</span>
                      </div>
                      <div className="grid gap-2">
                        {safeOptions.map((option) => {
                          const costDiff = option.now_cost - outgoing.now_cost
                          const costLabel = 
                            costDiff > 0 
                              ? `+£${costDiff}m` 
                              : costDiff < 0 
                              ? `-£${Math.abs(costDiff)}m` 
                              : "Neutral"
                          
                          return (
                            <div 
                              key={option.player_id} 
                              className="flex items-center justify-between bg-background/50 rounded-md px-3 py-2"
                            >
                              <div>
                                <span className="text-sm font-medium text-foreground">{option.name}</span>
                                <span className="text-xs text-muted-foreground ml-2">
                                  Form: {option.form}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-muted-foreground">£{option.now_cost}m</span>
                                <span className={`
                                  ${costDiff > 0 ? 'text-rose-400' : costDiff < 0 ? 'text-emerald-400' : 'text-muted-foreground'}
                                `}>
                                  {costLabel}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Higher Upside */}
                  {upsideOptions.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs text-violet-400 border-violet-500/30">
                          UPSIDE
                        </Badge>
                        <span className="text-xs text-muted-foreground">Higher variance, ceiling play</span>
                      </div>
                      <div className="grid gap-2">
                        {upsideOptions.map((option) => {
                          const costDiff = option.now_cost - outgoing.now_cost
                          const costLabel = 
                            costDiff > 0 
                              ? `+£${costDiff}m` 
                              : costDiff < 0 
                              ? `-£${Math.abs(costDiff)}m` 
                              : "Neutral"
                          
                          return (
                            <div 
                              key={option.player_id} 
                              className="flex items-center justify-between bg-background/50 rounded-md px-3 py-2"
                            >
                              <div>
                                <span className="text-sm font-medium text-foreground">{option.name}</span>
                                <span className="text-xs text-muted-foreground ml-2">
                                  Form: {option.form}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-muted-foreground">£{option.now_cost}m</span>
                                <span className={`
                                  ${costDiff > 0 ? 'text-rose-400' : costDiff < 0 ? 'text-emerald-400' : 'text-muted-foreground'}
                                `}>
                                  {costLabel}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
