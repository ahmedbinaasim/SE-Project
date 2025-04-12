import type { Metadata } from "next"
import { DashboardShell } from "../../../../components/dashboard/dashboard-shell"
import { SharedNotesList } from "../../../../components/shared/shared-notes-list"
import { SharedHeader } from "../../../../components/shared/shared-header"

export const metadata: Metadata = {
  title: "Shared Notes - NoteGenius",
  description: "View notes shared with you",
}

export default function SharedPage() {
  return (
    <DashboardShell>
      <SharedHeader />
      <SharedNotesList />
    </DashboardShell>
  )
}
