import type { Statistics, Deadline, Folder } from "@/lib/types"
import { Calendar, Clock, FolderOpen } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface StatisticsPanelProps {
  statistics: Statistics | null
  deadlines: Deadline[]
  folders: Folder[]
}

export default function StatisticsPanel({ statistics, deadlines, folders }: StatisticsPanelProps) {
  if (!statistics) {
    return null
  }

  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Study Statistics */}
      <div className="bg-card/50 border border-border/40 rounded-lg p-4 backdrop-blur-sm">
        <h3 className="text-lg font-medium mb-4">Study Statistics</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Notes Created This Week</span>
            <span className="font-medium">{statistics.notesCreatedThisWeek}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Time Spent Studying</span>
            <span className="font-medium">{statistics.timeSpentStudying} hrs</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">AI Summaries Generated</span>
            <span className="font-medium">{statistics.summariesGenerated}</span>
          </div>

          <div className="h-1 bg-primary/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${statistics.weeklyGoalProgress}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Weekly Goal</span>
            <span>{statistics.weeklyGoalProgress}%</span>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-card/50 border border-border/40 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Upcoming Deadlines</h3>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>

        {deadlines.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No upcoming deadlines</p>
        ) : (
          <div className="space-y-3">
            {deadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="p-3 border border-border/40 rounded-md hover:bg-primary/5 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{deadline.title}</h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      deadline.isUrgent ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                    }`}
                  >
                    {deadline.isUrgent ? "Urgent" : "Upcoming"}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(deadline.dueDate)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Folder Structure */}
      <div className="bg-card/50 border border-border/40 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Folders</h3>
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
        </div>

        {folders.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No folders created yet</p>
        ) : (
          <div className="space-y-2">
            {folders.map((folder) => (
              <a
                key={folder.id}
                href={`/dashboard/folders/${folder.id}`}
                className="flex items-center justify-between p-2 hover:bg-primary/5 rounded-md transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: folder.color }}></div>
                  <span className="text-sm">{folder.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{folder.notesCount} notes</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

