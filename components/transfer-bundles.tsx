import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Layers } from "lucide-react"
import type { TransferBundles } from "@/lib/types"

interface TransferBundlesProps {
  data: TransferBundles | null
}

export function TransferBundlesSection({ data }: TransferBundlesProps) {
  if (!data || !data.bundles || data.bundles.length === 0) {
    return (
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Transfer Bundles</h2>
          <p className="text-sm text-muted-foreground">Strategic paths to improve squad structure</p>
        </div>
        <Card className="bg-card/50">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              No clear multi-transfer structural paths identified.
            </p>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Transfer Bundles</h2>
        <p className="text-sm text-muted-foreground">Strategic paths to improve squad structure</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.bundles.map((bundle, idx) => {
          const budgetImpact = bundle.net_budget_impact ?? 0
          const budgetLabel = 
            budgetImpact > 0 
              ? `+£${budgetImpact}m` 
              : budgetImpact < 0 
              ? `£${budgetImpact}m` 
              : "Neutral"
          
          return (
            <Card key={idx} className="bg-card/50">
              <CardContent className="p-5">
                {/* Bundle Header */}
                <div className="flex items-start gap-3 mb-4">
                  <Layers className="size-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold mb-1">{bundle.name}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {bundle.transfers_required} Transfers
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          budgetImpact > 0 
                            ? 'text-rose-400 border-rose-500/30' 
                            : budgetImpact < 0 
                            ? 'text-emerald-400 border-emerald-500/30' 
                            : 'text-muted-foreground'
                        }`}
                      >
                        {budgetLabel}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Transfers */}
                <div className="space-y-2 mb-4">
                  {bundle.transfers.map((transfer, tidx) => (
                    <div 
                      key={tidx}
                      className="flex items-center gap-2 text-sm bg-background/50 rounded-md px-3 py-2"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-muted-foreground truncate">
                          {transfer.out.name}
                        </span>
                        <Badge variant="outline" className="text-xs shrink-0">
                          £{transfer.out.now_cost}m
                        </Badge>
                      </div>
                      <ArrowRight className="size-4 text-muted-foreground shrink-0" />
                      <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                        <Badge variant="outline" className="text-xs shrink-0">
                          £{transfer.in.now_cost}m
                        </Badge>
                        <span className="font-medium truncate text-right">
                          {transfer.in.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Problem Solved */}
                <div className="mb-3 pb-3 border-b border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {bundle.problem_solved}
                  </p>
                </div>

                {/* Trade-offs */}
                {bundle.trade_offs && bundle.trade_offs.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">Considerations</h4>
                    <ul className="space-y-1">
                      {bundle.trade_offs.map((tradeoff, toidx) => (
                        <li 
                          key={toidx} 
                          className="text-xs text-muted-foreground/80 flex items-start gap-1.5"
                        >
                          <span className="text-muted-foreground/40 mt-px">-</span>
                          <span>{tradeoff}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
