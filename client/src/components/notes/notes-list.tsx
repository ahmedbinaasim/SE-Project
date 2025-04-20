// // // import { NoteCard } from "./note-card"
// // // import { getAllNotes } from "../../services/notes-service"
// // // import { cn } from "../../lib/utils"
// // // import { Button } from "../ui/button"
// // // import { PlusCircle } from "lucide-react"
// // // import Link from "next/link"

// // // interface NotesListProps {
// // //   className?: string
// // // }

// // // export function NotesList({ className }: NotesListProps) {
// // //   const notes = getAllNotes()

// // //   return (
// // //     <div className={cn("space-y-4", className)}>
// // //       {notes.length > 0 ? (
// // //         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
// // //           {notes.map((note) => (
// // //             <NoteCard key={note.id} note={note} />
// // //           ))}
// // //         </div>
// // //       ) : (
// // //         <div className="flex h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
// // //           <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
// // //             <h3 className="mt-4 text-lg font-semibold">No notes found</h3>
// // //             <p className="mb-4 mt-2 text-sm text-muted-foreground">
// // //               You don&apos;t have any notes yet. Start by creating a new note.
// // //             </p>
// // //             <Link href="/dashboard/notes/new">
// // //               <Button size="sm" className="relative">
// // //                 <PlusCircle className="mr-2 h-4 w-4" />
// // //                 New Note
// // //               </Button>
// // //             </Link>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   )
// // // }

// // "use client"

// // import { useState, useEffect } from "react"
// // import { NoteCard } from "./note-card"
// // import { getAllNotes } from "../../services/notes-service"
// // import { cn } from "../../lib/utils"
// // import { Button } from "../ui/button"
// // import { PlusCircle } from "lucide-react"
// // import Link from "next/link"
// // import { Skeleton } from "../ui/skeleton"
// // import type { Note } from "../../types/note"

// // interface NotesListProps {
// //   className?: string
// // }

// // export function NotesList({ className }: NotesListProps) {
// //   const [notes, setNotes] = useState<Note[]>([])
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)

// //   useEffect(() => {
// //     const fetchNotes = async () => {
// //       try {
// //         setLoading(true)
// //         const fetchedNotes = await getAllNotes()
// //         setNotes(fetchedNotes)
// //         setError(null)
// //       } catch (err) {
// //         console.error("Error fetching notes:", err)
// //         setError("Failed to load notes")
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchNotes()
// //   }, [])

// //   if (loading) {
// //     return (
// //       <div className={cn("space-y-4", className)}>
// //         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
// //           {Array(6).fill(0).map((_, i) => (
// //             <Skeleton key={i} className="h-[240px] w-full" />
// //           ))}
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (error) {
// //     return (
// //       <div className={cn("space-y-4", className)}>
// //         <div className="flex h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
// //           <p className="text-muted-foreground">{error}</p>
// //           <Button 
// //             variant="outline" 
// //             size="sm" 
// //             className="mt-4"
// //             onClick={() => window.location.reload()}
// //           >
// //             Try Again
// //           </Button>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className={cn("space-y-4", className)}>
// //       {notes.length > 0 ? (
// //         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
// //           {notes.map((note) => (
// //             <NoteCard key={note.id} note={note} />
// //           ))}
// //         </div>
// //       ) : (
// //         <div className="flex h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
// //           <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
// //             <h3 className="mt-4 text-lg font-semibold">No notes found</h3>
// //             <p className="mb-4 mt-2 text-sm text-muted-foreground">
// //               You don&apos;t have any notes yet. Start by creating a new note.
// //             </p>
// //             <Link href="/dashboard/notes/new">
// //               <Button size="sm" className="relative">
// //                 <PlusCircle className="mr-2 h-4 w-4" />
// //                 New Note
// //               </Button>
// //             </Link>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// "use client"

// import { useState, useEffect, useMemo } from "react"
// import { NoteCard } from "./note-card"
// import { getAllNotes } from "../../services/notes-service"
// import { cn } from "../../lib/utils"
// import { Button } from "../ui/button"
// import { PlusCircle } from "lucide-react"
// import Link from "next/link"
// import { Skeleton } from "../ui/skeleton"
// import type { Note } from "../../types/note"

// interface NotesListProps {
//   className?: string
//   filters?: {
//     search: string;
//     subject: string;
//     days: number;
//     favorites: boolean;
//   }
// }

// export function NotesList({ className, filters }: NotesListProps) {
//   const [allNotes, setAllNotes] = useState<Note[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         setLoading(true)
//         const fetchedNotes = await getAllNotes()
//         setAllNotes(fetchedNotes)
//         setError(null)
//       } catch (err) {
//         console.error("Error fetching notes:", err)
//         setError("Failed to load notes")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchNotes()
//   }, [])

//   // Apply filters to notes
//   const filteredNotes = useMemo(() => {
//     if (!filters) return allNotes;
    
//     return allNotes.filter(note => {
//       // Filter by search term
//       if (filters.search && !note.title.toLowerCase().includes(filters.search.toLowerCase())) {
//         return false;
//       }
      
//       // Filter by subject/tag
//       if (filters.subject !== 'all' && !note.tags.includes(filters.subject)) {
//         return false;
//       }
      
//       // Filter by date range
//       if (filters.days) {
//         const cutoffDate = new Date();
//         cutoffDate.setDate(cutoffDate.getDate() - filters.days);
//         const noteDate = new Date(note.updatedAt);
//         if (noteDate < cutoffDate) {
//           return false;
//         }
//       }
      
//       // Filter by favorites
//       if (filters.favorites && !note.isFavorite) {
//         return false;
//       }
      
//       return true;
//     });
//   }, [allNotes, filters]);

//   const displayedNotes = filters ? filteredNotes : allNotes;

//   if (loading) {
//     return (
//       <div className={cn("space-y-4", className)}>
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
//       <div className={cn("space-y-4", className)}>
//         <div className="flex h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
//           <p className="text-muted-foreground">{error}</p>
//           <Button 
//             variant="outline" 
//             size="sm" 
//             className="mt-4"
//             onClick={() => window.location.reload()}
//           >
//             Try Again
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className={cn("space-y-4", className)}>
//       {displayedNotes.length > 0 ? (
//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {displayedNotes.map((note) => (
//             <NoteCard key={note.id} note={note} />
//           ))}
//         </div>
//       ) : (
//         <div className="flex h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
//           <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
//             <h3 className="mt-4 text-lg font-semibold">
//               {allNotes.length > 0 ? "No matching notes" : "No notes found"}
//             </h3>
//             <p className="mb-4 mt-2 text-sm text-muted-foreground">
//               {allNotes.length > 0 
//                 ? "Try adjusting your filters to find what you're looking for."
//                 : "You don't have any notes yet. Start by creating a new note."}
//             </p>
//             <Link href="/dashboard/notes/new">
//               <Button size="sm" className="relative">
//                 <PlusCircle className="mr-2 h-4 w-4" />
//                 New Note
//               </Button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { NoteCard } from "./note-card"
import { getAllNotes } from "../../services/notes-service"
import type { Note } from "../../types/note"
import { cn } from "../../lib/utils"
import { Skeleton } from "../ui/skeleton"

interface NotesListProps {
  className?: string
  filters?: {
    search: string
    folder: string
    days: number
    favorites: boolean
  }
}

export function NotesList({ className, filters }: NotesListProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const queryFilters = {
          search: filters?.search || "",
          folder: filters?.folder === "none" ? null : filters?.folder || null,
          days: filters?.days || 30,
          favorites: filters?.favorites || false,
        }
        const fetchedNotes = await getAllNotes(queryFilters)
        setNotes(fetchedNotes)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Failed to load notes")
        console.error("Error fetching notes:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotes()
  }, [filters])

  if (isLoading) {
    return (
      <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("text-center text-destructive", className)}>
        <p>{error}</p>
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className={cn("text-center text-muted-foreground", className)}>
        <p>No notes found. Try adjusting your filters or create a new note.</p>
      </div>
    )
  }

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}