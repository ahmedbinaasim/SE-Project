import type { Metadata } from "next"
import { DashboardShell } from "../../../components/dashboard/dashboard-shell"
import { RecentNotes } from "../../../components/dashboard/recent-notes"
import { DashboardStats } from "../../../components/dashboard/dashboard-stats"
import { FavoriteNotes } from "../../../components/dashboard/favorite-notes"
import { SharedWithMe } from "../../../components/dashboard/shared-with-me"

export const metadata: Metadata = {
  title: "Dashboard - NoteGenius",
  description: "Manage your notes and summaries",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        <DashboardStats />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <RecentNotes className="col-span-4" />
          <div className="col-span-3 flex flex-col gap-6">
            <FavoriteNotes />
            <SharedWithMe />
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
