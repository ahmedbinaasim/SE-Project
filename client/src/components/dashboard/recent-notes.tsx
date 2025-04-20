// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
// import { NoteCard } from "../notes/note-card"
// import { Button } from "../ui/button"
// import { PlusCircle } from "lucide-react"
// import Link from "next/link"
// import { cn } from "../../lib/utils"
// import { getRecentNotes } from "../../services/notes-service"

// interface RecentNotesProps {
//   className?: string
// }

// export function RecentNotes({ className }: RecentNotesProps) {
//   const recentNotes = getRecentNotes()

//   return (
//     <Card className={cn("animate-fade-in", className)}>
//       <CardHeader className="flex flex-row items-center justify-between">
//         <div>
//           <CardTitle>Recent Notes</CardTitle>
//           <CardDescription>Your recently updated notes</CardDescription>
//         </div>
//         <Link href="/dashboard/notes/new">
//           <Button size="sm" className="h-8">
//             <PlusCircle className="mr-2 h-4 w-4" />
//             New Note
//           </Button>
//         </Link>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {recentNotes.length > 0 ? (
//             recentNotes.map((note) => <NoteCard key={note.id} note={note} />)
//           ) : (
//             <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
//               <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
//                 <h3 className="mt-4 text-lg font-semibold">No notes created</h3>
//                 <p className="mb-4 mt-2 text-sm text-muted-foreground">
//                   You haven&apos;t created any notes yet. Start by creating a new note.
//                 </p>
//                 <Link href="/dashboard/notes/new">
//                   <Button size="sm" className="relative">
//                     <PlusCircle className="mr-2 h-4 w-4" />
//                     New Note
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { NoteCard } from "../notes/note-card"
import { Button } from "../ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "../../lib/utils"
import { getRecentNotes } from "../../services/notes-service"
import type { Note } from "../../types/note"
import { Skeleton } from "../ui/skeleton"

interface RecentNotesProps {
  className?: string
}

export function RecentNotes({ className }: RecentNotesProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true)
        const fetchedNotes = await getRecentNotes(5)
        setNotes(fetchedNotes)
        setError(null)
      } catch (err) {
        console.error("Error fetching recent notes:", err)
        setError("Failed to load recent notes")
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

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
        {loading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note) => <NoteCard key={note.id} note={note} />)}
          </div>
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
      </CardContent>
    </Card>
  )
}