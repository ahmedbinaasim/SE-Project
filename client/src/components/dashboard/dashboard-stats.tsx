"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { FileText, Users, Brain, Clock } from "lucide-react"
import { Skeleton } from "../ui/skeleton"
import { getDashboardStats } from "../../services/dashboard-service"

export function DashboardStats() {
  const [stats, setStats] = useState({
    totalNotes: 0,
    newNotesLastWeek: 0,
    collaboratorsCount: 0,
    aiSummaries: 0,
    newAiSummariesLastMonth: 0,
    studyTime: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const dashboardStats = await getDashboardStats()
        setStats(dashboardStats)
        setError(null)
      } catch (err) {
        console.error("Error fetching dashboard stats:", err)
        setError("Failed to load dashboard statistics")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-12 mb-1" />
              <Skeleton className="h-3 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid gap-4">
        <Card className="p-6">
          <p className="text-center text-muted-foreground">{error}</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalNotes}</div>
          <p className="text-xs text-muted-foreground">+{stats.newNotesLastWeek} from last week</p>
        </CardContent>
      </Card>
      <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Collaborators</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.collaboratorsCount}</div>
          <p className="text-xs text-muted-foreground">Active collaborators</p>
        </CardContent>
      </Card>
      <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">AI Summaries</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.aiSummaries}</div>
          <p className="text-xs text-muted-foreground">+{stats.newAiSummariesLastMonth} from last month</p>
        </CardContent>
      </Card>
      <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Study Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.studyTime}h</div>
          <p className="text-xs text-muted-foreground">This week</p>
        </CardContent>
      </Card>
    </div>
  )
}