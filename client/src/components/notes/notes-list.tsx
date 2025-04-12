import { NoteCard } from "./note-card"
import { getAllNotes } from "../../services/notes-service"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

interface NotesListProps {
  className?: string
}

export function NotesList({ className }: NotesListProps) {
  const notes = getAllNotes()

  return (
    <div className={cn("space-y-4", className)}>
      {notes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="flex h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <h3 className="mt-4 text-lg font-semibold">No notes found</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              You don&apos;t have any notes yet. Start by creating a new note.
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
  )
}
