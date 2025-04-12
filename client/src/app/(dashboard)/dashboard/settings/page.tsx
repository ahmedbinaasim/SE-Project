import type { Metadata } from "next"
import { DashboardShell } from "../../../../components/dashboard/dashboard-shell"
import { SettingsTabs } from "../../../../components/settings/settings-tabs"

export const metadata: Metadata = {
  title: "Settings - NoteGenius",
  description: "Manage your account settings",
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <SettingsTabs />
      </div>
    </DashboardShell>
  )
}
