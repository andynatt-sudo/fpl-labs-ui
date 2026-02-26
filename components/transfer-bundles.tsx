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
          const spend = bundle.max_spend_required ?? 0
          const spendLabel = spend > 0 ? `-£${spend.toFixed(1)}m` : "Self-funding"

          return (
            <Card key={idx} className="bg-card/50">
              <CardContent className="p-5">
                {/* Bundle Header */}
                <div className="flex items-start gap-3 mb-4">
                  <Layers className="size-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold mb-1">{bundle.strategy}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {bundle.transfers.length} Transfer{bundle.transfers.length !== 1 ? "s" : ""}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${spend > 0 ? "text-slate-400 border-slate-500/30" : "text-muted-foreground"}`}
                      >
                        {spendLabel}
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
                          {transfer.out_profile?.web_name ?? transfer.out_player}
                        </span>
                        <Badge variant="outline" className="text-xs shrink-0">
                          £{transfer.out_profile?.price ?? "?"}m
                        </Badge>
                      </div>
                      <ArrowRight className="size-4 text-muted-foreground shrink-0" />
                      <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                        <Badge variant="outline" className="text-xs shrink-0">
                          £{transfer.in_profile?.price ?? "?"}m
                        </Badge>
                        <span className="font-medium truncate text-right">
                          {transfer.in_profile?.web_name ?? transfer.in_player}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rationale */}
                {bundle.rationale && bundle.rationale.length > 0 && (
                  <div className="mb-3 pb-3 border-b border-border">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {bundle.rationale[0]}
                    </p>
                  </div>
                )}

                {/* Bank remaining */}
                <p className="text-xs text-muted-foreground">
                  Bank remaining: £{(bundle.ending_bank ?? 0).toFixed(1)}m
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
