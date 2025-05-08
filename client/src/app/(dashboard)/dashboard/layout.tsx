// import type React from "react"
// import { DashboardHeader } from "../../../components/dashboard/dashboard-header"
// import { DashboardSidebar } from "../../../components/dashboard/dashboard-sidebar"

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className="flex min-h-screen flex-col">
//       <DashboardHeader />
//       <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
//         <DashboardSidebar />
//         <main className="flex w-full flex-col overflow-hidden pt-6">{children}</main>
//       </div>
//     </div>
//   )
// }

import type React from "react"
import { DashboardHeader } from "../../../components/dashboard/dashboard-header"
import { DashboardSidebar } from "../../../components/dashboard/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <div className="sticky top-16 min-h-screen">
          <DashboardSidebar />
        </div>
        <main className="flex w-full flex-col overflow-hidden pt-6">{children}</main>
      </div>
    </div>
  )
}