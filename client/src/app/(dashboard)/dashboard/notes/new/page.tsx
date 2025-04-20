import type { Metadata } from "next"
import { DashboardShell } from "../../../../../components/dashboard/dashboard-shell"
import NewNoteForm from "../../../../../components/notes/new-note-form"

export const metadata: Metadata = {
  title: "New Note - NoteGenius",
  description: "Create a new note",
}

export default function NewNotePage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight">Create New Note</h1>
        <NewNoteForm />
      </div>
    </DashboardShell>
  )
}