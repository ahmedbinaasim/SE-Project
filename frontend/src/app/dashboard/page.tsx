"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import WelcomeSection from "@/components/dashboard/welcome-section"
import RecentNotes from "@/components/dashboard/recent-notes"
import QuickActions from "@/components/dashboard/quick-actions"
import StatisticsPanel from "@/components/dashboard/statistics-panel"
import { getUserData, getRecentNotes, getStatistics, getUpcomingDeadlines, getFolders } from "@/lib/dashboard-service"
import type { User, Note, Statistics, Deadline, Folder } from "@/lib/types"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [recentNotes, setRecentNotes] = useState<Note[]>([])
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [deadlines, setDeadlines] = useState<Deadline[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, we would check if the user is authenticated here
        // and redirect to login if not

        const userData = await getUserData()
        const notesData = await getRecentNotes()
        const statsData = await getStatistics()
        const deadlinesData = await getUpcomingDeadlines()
        const foldersData = await getFolders()

        setUser(userData)
        setRecentNotes(notesData)
        setStatistics(statsData)
        setDeadlines(deadlinesData)
        setFolders(foldersData)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        // In a real app, we might redirect to login or show an error
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // This would be handled by the useEffect redirect in a real app
  }

  return (
    <DashboardLayout user={user}>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <WelcomeSection user={user} />
          <RecentNotes notes={recentNotes} />
          <QuickActions />
        </div>
        <StatisticsPanel statistics={statistics} deadlines={deadlines} folders={folders} />
      </div>
    </DashboardLayout>
  )
}

