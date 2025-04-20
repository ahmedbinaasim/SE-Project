// import { Button } from "../ui/button"
// import { Filter } from "lucide-react"

// export function SharedHeader() {
//   return (
//     <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//       <div>
//         <h1 className="text-2xl font-bold tracking-tight">Shared Notes</h1>
//         <p className="text-muted-foreground">View and manage notes shared with you by others.</p>
//       </div>
//       <Button variant="outline">
//         <Filter className="mr-2 h-4 w-4" />
//         Filter
//       </Button>
//     </div>
//   )
// }

import { useState } from "react"
import { Button } from "../ui/button"
import { Filter, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

interface SharedHeaderProps {
  onFilterChange: (filters: { owner?: string; collaborator?: string }) => void
}

export function SharedHeader({ onFilterChange }: SharedHeaderProps) {
  const [ownerFilter, setOwnerFilter] = useState("")
  const [collaboratorFilter, setCollaboratorFilter] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleApplyFilters = () => {
    onFilterChange({
      owner: ownerFilter.trim(),
      collaborator: collaboratorFilter.trim()
    })
    setIsOpen(false)
  }

  const handleClearFilters = () => {
    setOwnerFilter("")
    setCollaboratorFilter("")
    onFilterChange({ owner: "", collaborator: "" })
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Shared Notes</h1>
        <p className="text-muted-foreground">View and manage notes shared with you by others.</p>
      </div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filters</h4>
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                Clear
                <X className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner-filter">Owner (Shared with me)</Label>
              <Input
                id="owner-filter"
                placeholder="Filter by owner name..."
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collaborator-filter">Collaborator (Shared by me)</Label>
              <Input
                id="collaborator-filter"
                placeholder="Filter by collaborator name..."
                value={collaboratorFilter}
                onChange={(e) => setCollaboratorFilter(e.target.value)}
              />
            </div>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}