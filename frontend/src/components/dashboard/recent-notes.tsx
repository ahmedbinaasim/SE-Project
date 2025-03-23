import type { Note } from "@/lib/types"
import NoteCard from "@/components/dashboard/note-card"

interface RecentNotesProps {
  notes: Note[]
}

export default function RecentNotes({ notes }: RecentNotesProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Recent Notes</h2>
        <a href="/dashboard/notes" className="text-sm text-primary hover:underline">
          View all
        </a>
      </div>

      {notes.length === 0 ? (
        <div className="bg-card/50 border border-border/40 rounded-lg p-8 text-center backdrop-blur-sm">
          <p className="text-muted-foreground">You don&apos;t have any notes yet.</p>
          <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Create your first note
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </section>
  )
}

