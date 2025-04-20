// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent } from "../ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
// import { NoteCard } from "../notes/note-card"
// import { Skeleton } from "../ui/skeleton"
// import { getSharedNotes, getSharedByMeNotes } from "../../services/notes-service"
// import type { Note } from "../../types/note"
// import { Users } from "lucide-react"

// export function SharedNotesList() {
//   const [sharedWithMe, setSharedWithMe] = useState<Note[]>([])
//   const [sharedByMe, setSharedByMe] = useState<Note[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchSharedNotes = async () => {
//       setLoading(true)
//       try {
//         // Simulate API call delay
//         setTimeout(() => {
//           const withMeNotes = getSharedNotes()
//           const byMeNotes = getSharedByMeNotes()
//           setSharedWithMe(withMeNotes)
//           setSharedByMe(byMeNotes)
//           setLoading(false)
//         }, 1000)
//       } catch (error) {
//         console.error("Error fetching shared notes:", error)
//         setLoading(false)
//       }
//     }

//     fetchSharedNotes()
//   }, [])

//   if (loading) {
//     return (
//       <div className="mt-6 space-y-4">
//         <Skeleton className="h-10 w-[200px]" />
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {Array(3)
//             .fill(null)
//             .map((_, index) => (
//               <Skeleton key={index} className="h-[200px] w-full" />
//             ))}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="mt-6">
//       <Tabs defaultValue="with-me">
//         <TabsList>
//           <TabsTrigger value="with-me">Shared with me</TabsTrigger>
//           <TabsTrigger value="by-me">Shared by me</TabsTrigger>
//         </TabsList>
//         <TabsContent value="with-me" className="mt-6">
//           {sharedWithMe.length > 0 ? (
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//               {sharedWithMe.map((note) => (
//                 <NoteCard key={note.id} note={note} />
//               ))}
//             </div>
//           ) : (
//             <Card>
//               <CardContent className="flex h-[200px] flex-col items-center justify-center p-6">
//                 <Users className="h-10 w-10 text-muted-foreground" />
//                 <h3 className="mt-4 text-lg font-semibold">No shared notes</h3>
//                 <p className="text-center text-sm text-muted-foreground">No one has shared any notes with you yet.</p>
//               </CardContent>
//             </Card>
//           )}
//         </TabsContent>
//         <TabsContent value="by-me" className="mt-6">
//           {sharedByMe.length > 0 ? (
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//               {sharedByMe.map((note) => (
//                 <NoteCard key={note.id} note={note} />
//               ))}
//             </div>
//           ) : (
//             <Card>
//               <CardContent className="flex h-[200px] flex-col items-center justify-center p-6">
//                 <Users className="h-10 w-10 text-muted-foreground" />
//                 <h3 className="mt-4 text-lg font-semibold">No shared notes</h3>
//                 <p className="text-center text-sm text-muted-foreground">
//                   You haven&apos;t shared any notes with others yet.
//                 </p>
//               </CardContent>
//             </Card>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { NoteCard } from "../notes/note-card"
import { Skeleton } from "../ui/skeleton"
import { getSharedNotes, getSharedByMeNotes } from "../../services/notes-service"
import type { Note } from "../../types/note"
import { Users } from "lucide-react"

interface SharedNotesListProps {
  ownerFilter?: string
  collaboratorFilter?: string
}

export function SharedNotesList({ ownerFilter = "", collaboratorFilter = "" }: SharedNotesListProps) {
  const [sharedWithMe, setSharedWithMe] = useState<Note[]>([])
  const [sharedByMe, setSharedByMe] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSharedNotes = async () => {
      setLoading(true)
      setError(null)
      try {
        const [withMeNotes, byMeNotes] = await Promise.all([
          getSharedNotes(),
          getSharedByMeNotes()
        ])
        setSharedWithMe(withMeNotes)
        setSharedByMe(byMeNotes)
      } catch (error) {
        console.error("Error fetching shared notes:", error)
        setError("Failed to load shared notes")
      } finally {
        setLoading(false)
      }
    }

    fetchSharedNotes()
  }, [])

  // Apply filters
  const filteredSharedWithMe = sharedWithMe.filter(note => 
    !ownerFilter || (note.author?.name?.toLowerCase() || "").includes(ownerFilter.toLowerCase())
  )

  const filteredSharedByMe = sharedByMe.filter(note => {
    if (!collaboratorFilter) return true
    return note.collaborators?.some(collab => 
      (collab.user?.name?.toLowerCase() || "").includes(collaboratorFilter.toLowerCase())
    )
  })

  if (loading) {
    return (
      <div className="mt-6 space-y-4">
        <Skeleton className="h-10 w-[200px]" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="h-[200px] w-full" />
            ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex h-[200px] flex-col items-center justify-center p-6">
          <Users className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Error</h3>
          <p className="text-center text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mt-6">
      <Tabs defaultValue="with-me">
        <TabsList>
          <TabsTrigger value="with-me">Shared with me</TabsTrigger>
          <TabsTrigger value="by-me">Shared by me</TabsTrigger>
        </TabsList>
        <TabsContent value="with-me" className="mt-6">
          {filteredSharedWithMe.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSharedWithMe.map((note) => (
                <NoteCard key={note.id} note={note} showOwner />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex h-[200px] flex-col items-center justify-center p-6">
                <Users className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No shared notes</h3>
                <p className="text-center text-sm text-muted-foreground">
                  {ownerFilter 
                    ? "No notes match your filter."
                    : "No one has shared any notes with you yet."}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="by-me" className="mt-6">
          {filteredSharedByMe.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSharedByMe.map((note) => (
                <NoteCard key={note.id} note={note} showCollaborators />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex h-[200px] flex-col items-center justify-center p-6">
                <Users className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No shared notes</h3>
                <p className="text-center text-sm text-muted-foreground">
                  {collaboratorFilter 
                    ? "No notes match your filter."
                    : "You haven't shared any notes with others yet."}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}