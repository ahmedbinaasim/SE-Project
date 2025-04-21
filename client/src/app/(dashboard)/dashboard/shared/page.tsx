"use client"
import { useState } from "react"
import { DashboardShell } from "../../../../components/dashboard/dashboard-shell"
import { SharedNotesList } from "../../../../components/shared/shared-notes-list"
import { SharedHeader } from "../../../../components/shared/shared-header"

// export const metadata: Metadata = {
//   title: "Shared Notes - NoteGenius",
//   description: "View notes shared with you",
// }

export default function SharedPage() {
  const [filters, setFilters] = useState({ owner: "", collaborator: "" })

  return (
    <DashboardShell>
      <SharedHeader
        onFilterChange={(filters) =>
          setFilters({
            owner: filters.owner || "",
            collaborator: filters.collaborator || "",
          })
        }
      />
      <SharedNotesList ownerFilter={filters.owner} collaboratorFilter={filters.collaborator} />
    </DashboardShell>
  )
}