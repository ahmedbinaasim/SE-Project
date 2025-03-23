import type { User } from "@/lib/types"

interface WelcomeSectionProps {
  user: User
}

export default function WelcomeSection({ user }: WelcomeSectionProps) {
  const currentHour = new Date().getHours()
  let greeting = "Good evening"

  if (currentHour < 12) {
    greeting = "Good morning"
  } else if (currentHour < 18) {
    greeting = "Good afternoon"
  }

  return (
    <section className="bg-card/50 border border-border/40 rounded-lg p-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            {greeting}, <span className="gradient-text">{user.firstName}</span>
          </h1>
          <p className="text-muted-foreground mt-1">Here&apos;s an overview of your study notes and activities</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 min-w-[120px]">
            <p className="text-xs text-muted-foreground">Total Notes</p>
            <p className="text-2xl font-bold">{user.stats.totalNotes}</p>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 min-w-[120px]">
            <p className="text-xs text-muted-foreground">Recently Viewed</p>
            <p className="text-2xl font-bold">{user.stats.recentlyViewed}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

