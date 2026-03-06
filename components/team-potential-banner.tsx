import type { StructuralPotential } from "@/lib/types"

interface TeamPotentialBannerProps {
  potential: StructuralPotential
}

export function TeamPotentialBanner({ potential }: TeamPotentialBannerProps) {
  const hasMeaningfulGain =
    potential.best_gain_two_gw !== undefined &&
    potential.best_gain_two_gw !== null &&
    potential.best_gain_two_gw > 0

  return (
    <div className="rounded-lg border border-border/60 bg-card px-5 py-4 space-y-1">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        Team Potential
      </p>

      {hasMeaningfulGain ? (
        <>
          <p className="text-2xl font-bold tracking-tight text-foreground">
            +{potential.best_gain_two_gw.toFixed(1)}{" "}
            <span className="text-base font-normal text-muted-foreground">
              points available over the next 2 GWs
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            Best structural improvement next GW:{" "}
            <span className="font-medium text-foreground">
              +{potential.best_gain_next_gw.toFixed(1)}
            </span>
          </p>
        </>
      ) : (
        <p className="text-base text-muted-foreground">
          No meaningful structural improvement available
        </p>
      )}
    </div>
  )
}
