import { Button } from "../ui/button"
import { Filter } from "lucide-react"

export function SharedHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Shared Notes</h1>
        <p className="text-muted-foreground">View and manage notes shared with you by others.</p>
      </div>
      <Button variant="outline">
        <Filter className="mr-2 h-4 w-4" />
        Filter
      </Button>
    </div>
  )
}
