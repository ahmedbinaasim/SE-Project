import type { Metadata } from "next"
import { DashboardShell } from "../../../../components/dashboard/dashboard-shell"
import { NotesHeader } from "../../../../components/notes/notes-header"
import { NotesList } from "../../../../components/notes/notes-list"
import { NotesFilters } from "../../../../components/notes/notes-filters"

export const metadata: Metadata = {
  title: "Notes - NoteGenius",
  description: "Manage your notes and summaries",
}

export default function NotesPage() {
  return (
    <DashboardShell>
      <NotesHeader />
      <div className="flex flex-col gap-6 md:flex-row">
        <NotesFilters className="w-full md:w-64" />
        <NotesList className="flex-1" />
      </div>
    </DashboardShell>
  )
}
