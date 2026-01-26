import { FlaskConical } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
            <FlaskConical className="size-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">FPL Labs</h1>
            <p className="text-sm text-muted-foreground">Player Analytics Dashboard</p>
          </div>
        </div>
      </div>
    </header>
  )
}
