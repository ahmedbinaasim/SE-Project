// "use client"

// import { useState, useEffect, useMemo } from "react"
// import { NoteCard } from "../notes/note-card"
// import { Button } from "../ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
// import { Skeleton } from "../ui/skeleton"
// import { getFavoriteNotes } from "../../services/notes-service"
// import { FileText, Star, Clock } from "lucide-react"
// import { Card, CardContent } from "../ui/card"
// import type { Note } from "../../types/note"
// import Link from "next/link"

// interface FavoritesListProps {
//   searchTerm?: string
// }

// export function FavoritesList({ searchTerm = "" }: FavoritesListProps) {
//   const [notes, setNotes] = useState<Note[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [activeView, setActiveView] = useState("grid")

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         setLoading(true)
//         // Use a larger limit to get all favorites
//         const fetchedNotes = await getFavoriteNotes(100)
//         setNotes(fetchedNotes)
//         setError(null)
//       } catch (err) {
//         console.error("Error fetching favorite notes:", err)
//         setError("Failed to load favorite notes")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchFavorites()
//   }, [])

//   // Filter notes by search term
//   const filteredNotes = useMemo(() => {
//     if (!searchTerm) return notes
    
//     return notes.filter(note => 
//       note.title.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   }, [notes, searchTerm])

//   // Sort notes by last updated
//   const sortedByRecent = useMemo(() => {
//     return [...filteredNotes].sort((a, b) => 
//       new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
//     )
//   }, [filteredNotes])

//   if (loading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-end">
//           <Skeleton className="h-10 w-[200px]" />
//         </div>
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {Array(6).fill(0).map((_, i) => (
//             <Skeleton key={i} className="h-[240px] w-full" />
//           ))}
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <Card className="p-6">
//         <div className="text-center">
//           <h3 className="text-lg font-semibold">Error</h3>
//           <p className="text-muted-foreground">{error}</p>
//           <Button 
//             variant="outline" 
//             className="mt-4"
//             onClick={() => window.location.reload()}
//           >
//             Try Again
//           </Button>
//         </div>
//       </Card>
//     )
//   }

//   if (notes.length === 0) {
//     return (
//       <Card>
//         <CardContent className="flex flex-col items-center justify-center py-16 text-center">
//           <Star className="mb-4 h-12 w-12 text-muted-foreground" />
//           <h3 className="text-lg font-semibold">No favorites yet</h3>
//           <p className="mt-2 mb-4 text-sm text-muted-foreground max-w-md">
//             You haven&apos;t favorited any notes yet. Mark notes as favorites for quick access.
//           </p>
//           <Link href="/dashboard/notes">
//             <Button>Browse Notes</Button>
//           </Link>
//         </CardContent>
//       </Card>
//     )
//   }

//   if (filteredNotes.length === 0) {
//     return (
//       <Card>
//         <CardContent className="flex flex-col items-center justify-center py-16 text-center">
//           <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
//           <h3 className="text-lg font-semibold">No matching favorites</h3>
//           <p className="mt-2 text-sm text-muted-foreground">
//             No favorites match your search criteria. Try a different search term.
//           </p>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <p className="text-sm text-muted-foreground">
//           {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
//         </p>
//         <Tabs defaultValue="grid" value={activeView} onValueChange={setActiveView} className="w-[400px]">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="grid">
//               <div className="flex items-center">
//                 <FileText className="mr-2 h-4 w-4" />
//                 <span>Grid</span>
//               </div>
//             </TabsTrigger>
//             <TabsTrigger value="recent">
//               <div className="flex items-center">
//                 <Clock className="mr-2 h-4 w-4" />
//                 <span>Recent</span>
//               </div>
//             </TabsTrigger>
//           </TabsList>
//         </Tabs>
//       </div>

//       <TabsContent value="grid" className="mt-0">
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {filteredNotes.map((note) => (
//             <NoteCard key={note.id} note={note} />
//           ))}
//         </div>
//       </TabsContent>

//       <TabsContent value="recent" className="mt-0">
//         <div className="flex flex-col space-y-4">
//           {sortedByRecent.map((note) => (
//             <NoteCard key={note.id} note={note} compact />
//           ))}
//         </div>
//       </TabsContent>
//     </div>
//   )
// }

"use client"

import { useState, useEffect, useMemo } from "react"
import { NoteCard } from "../notes/note-card"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Skeleton } from "../ui/skeleton"
import { getFavoriteNotes } from "../../services/notes-service"
import { FileText, Star, Clock } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import type { Note } from "../../types/note"
import Link from "next/link"

interface FavoritesListProps {
  searchTerm?: string
}

export function FavoritesList({ searchTerm = "" }: FavoritesListProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeView, setActiveView] = useState("grid")

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true)
        // Use a larger limit to get all favorites
        const fetchedNotes = await getFavoriteNotes(100)
        setNotes(fetchedNotes)
        setError(null)
      } catch (err) {
        console.error("Error fetching favorite notes:", err)
        setError("Failed to load favorite notes")
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  // Filter notes by search term
  const filteredNotes = useMemo(() => {
    if (!searchTerm) return notes
    
    return notes.filter(note => 
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [notes, searchTerm])

  // Sort notes by last updated
  const sortedByRecent = useMemo(() => {
    return [...filteredNotes].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
  }, [filteredNotes])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-end">
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[240px] w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Error</h3>
          <p className="text-muted-foreground">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </Card>
    )
  }

  if (notes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <Star className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold">No favorites yet</h3>
          <p className="mt-2 mb-4 text-sm text-muted-foreground max-w-md">
            You haven&apos;t favorited any notes yet. Mark notes as favorites for quick access.
          </p>
          <Link href="/dashboard/notes">
            <Button>Browse Notes</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  if (filteredNotes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-semibold">No matching favorites</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            No favorites match your search criteria. Try a different search term.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
        </p>
        <Tabs defaultValue="grid" value={activeView} onValueChange={setActiveView}>
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="grid">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>Grid</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="recent">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>Recent</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="flex flex-col space-y-4 mt-6">
              {sortedByRecent.map((note) => (
                <NoteCard key={note.id} note={note} compact />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}