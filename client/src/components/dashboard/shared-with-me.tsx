// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
// import { NoteCard } from "../notes/note-card"
// import { getSharedNotes } from "../../services/notes-service"
// import Link from "next/link"
// import { Button } from "../ui/button"
// import { Users } from "lucide-react"

// export function SharedWithMe() {
//   const sharedNotes = getSharedNotes()

//   return (
//     <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
//       <CardHeader>
//         <CardTitle>Shared With Me</CardTitle>
//         <CardDescription>Notes shared with you by others</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {sharedNotes.length > 0 ? (
//             sharedNotes.map((note) => <NoteCard key={note.id} note={note} compact />)
//           ) : (
//             <div className="flex h-[120px] flex-col items-center justify-center rounded-md border border-dashed p-4 text-center">
//               <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
//                 <h3 className="mt-2 text-sm font-semibold">No shared notes</h3>
//                 <p className="mt-1 text-xs text-muted-foreground">No one has shared any notes with you yet.</p>
//                 <Link href="/dashboard/shared" className="mt-2">
//                   <Button size="sm" variant="outline" className="h-7 text-xs">
//                     <Users className="mr-1 h-3 w-3" />
//                     View Shared
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
import { getSharedNotes } from "../../services/notes-service"
import Link from "next/link"
import { Button } from "../ui/button"
import { Users } from "lucide-react"
import type { Note } from "../../types/note"
import { Skeleton } from "../ui/skeleton"

export function SharedWithMe() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true)
        const fetchedNotes = await getSharedNotes()
        setNotes(fetchedNotes)
        setError(null)
      } catch (err) {
        console.error("Error fetching shared notes:", err)
        setError("Failed to load shared notes")
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <CardHeader>
        <CardTitle>Shared With Me</CardTitle>
        <CardDescription>Notes shared with you by others</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {Array(2).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : error ? (
          <div className="flex h-[120px] items-center justify-center">
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        ) : notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note) => <NoteCard key={note.id} note={note} compact />)}
          </div>
        ) : (
          <div className="flex h-[120px] flex-col items-center justify-center rounded-md border border-dashed p-4 text-center">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <h3 className="mt-2 text-sm font-semibold">No shared notes</h3>
              <p className="mt-1 text-xs text-muted-foreground">No one has shared any notes with you yet.</p>
              <Link href="/dashboard/shared" className="mt-2">
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  <Users className="mr-1 h-3 w-3" />
                  View Shared
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}