// "use client"

// import { useState, useEffect } from "react"
// import { Card } from "../ui/card"
// import { Skeleton } from "../ui/skeleton"
// import { getNoteById } from "../../services/notes-service"
// import type { Note } from "../../types/note"

// interface NoteViewerProps {
//   noteId: string
// }

// export function NoteViewer({ noteId }: NoteViewerProps) {
//   const [note, setNote] = useState<Note | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         setLoading(true)
//         // Simulate API call delay
//         setTimeout(() => {
//           const fetchedNote = getNoteById(noteId)
//           setNote(fetchedNote)
//           setLoading(false)
//         }, 1000)
//       } catch (error) {
//         console.error("Error fetching note:", error)
//         setLoading(false)
//       }
//     }

//     fetchNote()
//   }, [noteId])

//   if (loading) {
//     return (
//       <div className="space-y-4">
//         <Skeleton className="h-8 w-[250px]" />
//         <Skeleton className="h-4 w-full" />
//         <Skeleton className="h-4 w-full" />
//         <Skeleton className="h-4 w-3/4" />
//         <Skeleton className="h-32 w-full" />
//       </div>
//     )
//   }

//   if (!note) {
//     return (
//       <Card className="flex h-[300px] items-center justify-center p-6">
//         <div className="text-center">
//           <h3 className="text-lg font-semibold">Note not found</h3>
//           <p className="text-muted-foreground">The note you are looking for does not exist or has been deleted.</p>
//         </div>
//       </Card>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       <div className="prose prose-gray dark:prose-invert max-w-none">
//         <h1>{note.title}</h1>
//         <div dangerouslySetInnerHTML={{ __html: note.contentHtml || note.content }} />
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { getNoteById } from "../../services/notes-service"
import type { Note } from "../../types/note"

interface NoteViewerProps {
  noteId: string
}

export function NoteViewer({ noteId }: NoteViewerProps) {
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true)
        const fetchedNote = await getNoteById(noteId)
        setNote(fetchedNote)
        setError(null)
      } catch (err) {
        console.error("Error fetching note:", err)
        setError("Failed to load note content")
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [noteId])

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="flex h-[300px] items-center justify-center p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Error loading note</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </Card>
    )
  }

  if (!note) {
    return (
      <Card className="flex h-[300px] items-center justify-center p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Note not found</h3>
          <p className="text-muted-foreground">The note you are looking for does not exist or has been deleted.</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h1>{note.title}</h1>
        {note.contentHtml ? (
          <div dangerouslySetInnerHTML={{ __html: note.contentHtml }} />
        ) : (
          <div>
            {note.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}