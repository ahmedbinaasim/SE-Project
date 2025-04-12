import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { NoteCard } from "../notes/note-card"
import { Button } from "../ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "../../lib/utils"
import { getRecentNotes } from "../../services/notes-service"

interface RecentNotesProps {
  className?: string
}

export function RecentNotes({ className }: RecentNotesProps) {
  const recentNotes = getRecentNotes()

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Notes</CardTitle>
          <CardDescription>Your recently updated notes</CardDescription>
        </div>
        <Link href="/dashboard/notes/new">
          <Button size="sm" className="h-8">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentNotes.length > 0 ? (
            recentNotes.map((note) => <NoteCard key={note.id} note={note} />)
          ) : (
            <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <h3 className="mt-4 text-lg font-semibold">No notes created</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                  You haven&apos;t created any notes yet. Start by creating a new note.
                </p>
                <Link href="/dashboard/notes/new">
                  <Button size="sm" className="relative">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Note
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
