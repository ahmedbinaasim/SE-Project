// // // // "use client"

// // // // import { useState } from "react"
// // // // import { useRouter } from "next/navigation"
// // // // import { Button } from "../ui/button"
// // // // import {
// // // //   DropdownMenu,
// // // //   DropdownMenuContent,
// // // //   DropdownMenuItem,
// // // //   DropdownMenuSeparator,
// // // //   DropdownMenuTrigger,
// // // // } from "../ui/dropdown-menu"
// // // // import {
// // // //   AlertDialog,
// // // //   AlertDialogAction,
// // // //   AlertDialogCancel,
// // // //   AlertDialogContent,
// // // //   AlertDialogDescription,
// // // //   AlertDialogFooter,
// // // //   AlertDialogHeader,
// // // //   AlertDialogTitle,
// // // // } from "../ui/alert-dialog"
// // // // import { Edit, Share2, Download, Trash2, MoreVertical, Star, FileText } from "lucide-react"
// // // // import { deleteNote, toggleFavorite } from "../../services/notes-service"
// // // // import { useToast } from "../../hooks/use-toast"
// // // // import { getNoteById } from "../../services/notes-service"

// // // // interface NoteActionsProps {
// // // //   noteId: string
// // // // }

// // // // export function NoteActions({ noteId }: NoteActionsProps) {
// // // //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// // // //   const [isDeleting, setIsDeleting] = useState(false)
// // // //   const router = useRouter()
// // // //   const { toast } = useToast()

// // // //   const note = getNoteById(noteId)
// // // //   const [isFavorite, setIsFavorite] = useState(note?.isFavorite || false)

// // // //   const handleDelete = async () => {
// // // //     setIsDeleting(true)
// // // //     try {
// // // //       await deleteNote(noteId)
// // // //       toast({
// // // //         title: "Note deleted",
// // // //         description: "Your note has been deleted successfully.",
// // // //       })
// // // //       router.push("/dashboard/notes")
// // // //     } catch (error) {
// // // //       console.error("Error deleting note:", error)
// // // //       toast({
// // // //         title: "Error",
// // // //         description: "Failed to delete note. Please try again.",
// // // //         variant: "destructive",
// // // //       })
// // // //     } finally {
// // // //       setIsDeleting(false)
// // // //       setIsDeleteDialogOpen(false)
// // // //     }
// // // //   }

// // // //   const handleToggleFavorite = () => {
// // // //     setIsFavorite(!isFavorite)
// // // //     toggleFavorite(noteId)
// // // //     toast({
// // // //       title: isFavorite ? "Removed from favorites" : "Added to favorites",
// // // //       description: isFavorite
// // // //         ? "This note has been removed from your favorites."
// // // //         : "This note has been added to your favorites.",
// // // //     })
// // // //   }

// // // //   return (
// // // //     <div className="flex items-center gap-2">
// // // //       <Button variant="outline" size="sm" onClick={handleToggleFavorite}>
// // // //         <Star className={`mr-2 h-4 w-4 ${isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
// // // //         {isFavorite ? "Remove from favorites" : "Add to favorites"}
// // // //       </Button>
// // // //       <Button variant="outline" size="sm" asChild>
// // // //         <a href={`/api/notes/${noteId}/export`} download>
// // // //           <Download className="mr-2 h-4 w-4" />
// // // //           Export
// // // //         </a>
// // // //       </Button>
// // // //       <Button variant="outline" size="sm" asChild>
// // // //         <a href={`/dashboard/notes/${noteId}/share`}>
// // // //           <Share2 className="mr-2 h-4 w-4" />
// // // //           Share
// // // //         </a>
// // // //       </Button>
// // // //       <Button variant="outline" size="sm" asChild>
// // // //         <a href={`/dashboard/notes/${noteId}/edit`}>
// // // //           <Edit className="mr-2 h-4 w-4" />
// // // //           Edit
// // // //         </a>
// // // //       </Button>
// // // //       <DropdownMenu>
// // // //         <DropdownMenuTrigger asChild>
// // // //           <Button variant="ghost" size="icon" className="h-8 w-8">
// // // //             <MoreVertical className="h-4 w-4" />
// // // //             <span className="sr-only">More options</span>
// // // //           </Button>
// // // //         </DropdownMenuTrigger>
// // // //         <DropdownMenuContent align="end">
// // // //           <DropdownMenuItem asChild>
// // // //             <a href={`/dashboard/notes/${noteId}/print`}>
// // // //               <FileText className="mr-2 h-4 w-4" />
// // // //               Print
// // // //             </a>
// // // //           </DropdownMenuItem>
// // // //           <DropdownMenuSeparator />
// // // //           <DropdownMenuItem
// // // //             className="text-destructive focus:text-destructive"
// // // //             onClick={() => setIsDeleteDialogOpen(true)}
// // // //           >
// // // //             <Trash2 className="mr-2 h-4 w-4" />
// // // //             Delete
// // // //           </DropdownMenuItem>
// // // //         </DropdownMenuContent>
// // // //       </DropdownMenu>

// // // //       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// // // //         <AlertDialogContent>
// // // //           <AlertDialogHeader>
// // // //             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
// // // //             <AlertDialogDescription>
// // // //               This action cannot be undone. This will permanently delete your note and remove it from our servers.
// // // //             </AlertDialogDescription>
// // // //           </AlertDialogHeader>
// // // //           <AlertDialogFooter>
// // // //             <AlertDialogCancel>Cancel</AlertDialogCancel>
// // // //             <AlertDialogAction
// // // //               onClick={handleDelete}
// // // //               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
// // // //               disabled={isDeleting}
// // // //             >
// // // //               {isDeleting ? "Deleting..." : "Delete"}
// // // //             </AlertDialogAction>
// // // //           </AlertDialogFooter>
// // // //         </AlertDialogContent>
// // // //       </AlertDialog>
// // // //     </div>
// // // //   )
// // // // }

// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { useRouter } from "next/navigation"
// // // import { Button } from "../ui/button"
// // // import {
// // //   DropdownMenu,
// // //   DropdownMenuContent,
// // //   DropdownMenuItem,
// // //   DropdownMenuSeparator,
// // //   DropdownMenuTrigger,
// // // } from "../ui/dropdown-menu"
// // // import {
// // //   AlertDialog,
// // //   AlertDialogAction,
// // //   AlertDialogCancel,
// // //   AlertDialogContent,
// // //   AlertDialogDescription,
// // //   AlertDialogFooter,
// // //   AlertDialogHeader,
// // //   AlertDialogTitle,
// // // } from "../ui/alert-dialog"
// // // import { Edit, Share2, Download, Trash2, MoreVertical, Star, FileText } from "lucide-react"
// // // import { deleteNote, toggleFavorite, getNoteById } from "../../services/notes-service"
// // // import { useToast } from "../../hooks/use-toast"
// // // import type { Note } from "../../types/note"

// // // interface NoteActionsProps {
// // //   noteId: string
// // // }

// // // export function NoteActions({ noteId }: NoteActionsProps) {
// // //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// // //   const [isDeleting, setIsDeleting] = useState(false)
// // //   const [isLoading, setIsLoading] = useState(true)
// // //   const [note, setNote] = useState<Note | null>(null)
// // //   const [error, setError] = useState<string | null>(null)
// // //   const router = useRouter()
// // //   const { toast } = useToast()

// // //   // Fetch note data
// // //   useEffect(() => {
// // //     const fetchNote = async () => {
// // //       try {
// // //         setIsLoading(true)
// // //         const fetchedNote = await getNoteById(noteId)
// // //         setNote(fetchedNote)
// // //         setError(null)
// // //       } catch (err) {
// // //         console.error("Error fetching note:", err)
// // //         setError("Failed to load note data")
// // //       } finally {
// // //         setIsLoading(false)
// // //       }
// // //     }

// // //     fetchNote()
// // //   }, [noteId])

// // //   const handleDelete = async () => {
// // //     setIsDeleting(true)
// // //     try {
// // //       await deleteNote(noteId)
// // //       toast({
// // //         title: "Note deleted",
// // //         description: "Your note has been deleted successfully.",
// // //       })
// // //       router.push("/dashboard/notes")
// // //     } catch (error) {
// // //       console.error("Error deleting note:", error)
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to delete note. Please try again.",
// // //         variant: "destructive",
// // //       })
// // //     } finally {
// // //       setIsDeleting(false)
// // //       setIsDeleteDialogOpen(false)
// // //     }
// // //   }

// // //   const handleToggleFavorite = async () => {
// // //     if (!note) return
    
// // //     try {
// // //       const updatedNote = await toggleFavorite(noteId)
// // //       setNote(updatedNote)
// // //       toast({
// // //         title: updatedNote.isFavorite ? "Added to favorites" : "Removed from favorites",
// // //         description: updatedNote.isFavorite
// // //           ? "This note has been added to your favorites."
// // //           : "This note has been removed from your favorites.",
// // //       })
// // //     } catch (error) {
// // //       console.error("Error toggling favorite status:", error)
// // //       toast({
// // //         title: "Error",
// // //         description: "Failed to update favorite status. Please try again.",
// // //         variant: "destructive",
// // //       })
// // //     }
// // //   }

// // //   if (isLoading) {
// // //     return <div className="flex gap-2">
// // //       <Button variant="outline" size="sm" disabled>Loading...</Button>
// // //     </div>
// // //   }

// // //   if (error || !note) {
// // //     return <div className="flex gap-2">
// // //       <Button variant="outline" size="sm" onClick={() => router.back()}>Go Back</Button>
// // //     </div>
// // //   }

// // //   return (
// // //     <div className="flex items-center gap-2">
// // //       <Button variant="outline" size="sm" onClick={handleToggleFavorite}>
// // //         <Star className={`mr-2 h-4 w-4 ${note.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
// // //         {note.isFavorite ? "Remove from favorites" : "Add to favorites"}
// // //       </Button>
// // //       <Button variant="outline" size="sm" asChild>
// // //         <a href={`/api/notes/${noteId}/export`} download>
// // //           <Download className="mr-2 h-4 w-4" />
// // //           Export
// // //         </a>
// // //       </Button>
// // //       <Button variant="outline" size="sm" asChild>
// // //         <a href={`/dashboard/notes/${noteId}/share`}>
// // //           <Share2 className="mr-2 h-4 w-4" />
// // //           Share
// // //         </a>
// // //       </Button>
// // //       <Button variant="outline" size="sm" asChild>
// // //         <a href={`/dashboard/notes/${noteId}/edit`}>
// // //           <Edit className="mr-2 h-4 w-4" />
// // //           Edit
// // //         </a>
// // //       </Button>
// // //       <DropdownMenu>
// // //         <DropdownMenuTrigger asChild>
// // //           <Button variant="ghost" size="icon" className="h-8 w-8">
// // //             <MoreVertical className="h-4 w-4" />
// // //             <span className="sr-only">More options</span>
// // //           </Button>
// // //         </DropdownMenuTrigger>
// // //         <DropdownMenuContent align="end">
// // //           <DropdownMenuItem asChild>
// // //             <a href={`/dashboard/notes/${noteId}/print`}>
// // //               <FileText className="mr-2 h-4 w-4" />
// // //               Print
// // //             </a>
// // //           </DropdownMenuItem>
// // //           <DropdownMenuSeparator />
// // //           <DropdownMenuItem
// // //             className="text-destructive focus:text-destructive"
// // //             onClick={() => setIsDeleteDialogOpen(true)}
// // //           >
// // //             <Trash2 className="mr-2 h-4 w-4" />
// // //             Delete
// // //           </DropdownMenuItem>
// // //         </DropdownMenuContent>
// // //       </DropdownMenu>

// // //       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// // //         <AlertDialogContent>
// // //           <AlertDialogHeader>
// // //             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
// // //             <AlertDialogDescription>
// // //               This action cannot be undone. This will permanently delete your note and remove it from our servers.
// // //             </AlertDialogDescription>
// // //           </AlertDialogHeader>
// // //           <AlertDialogFooter>
// // //             <AlertDialogCancel>Cancel</AlertDialogCancel>
// // //             <AlertDialogAction
// // //               onClick={handleDelete}
// // //               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
// // //               disabled={isDeleting}
// // //             >
// // //               {isDeleting ? "Deleting..." : "Delete"}
// // //             </AlertDialogAction>
// // //           </AlertDialogFooter>
// // //         </AlertDialogContent>
// // //       </AlertDialog>
// // //     </div>
// // //   )
// // // }
// // "use client"

// // import { useState, useEffect } from "react"
// // import { useRouter } from "next/navigation"
// // import { Button } from "../ui/button"
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuSeparator,
// //   DropdownMenuTrigger,
// // } from "../ui/dropdown-menu"
// // import {
// //   AlertDialog,
// //   AlertDialogAction,
// //   AlertDialogCancel,
// //   AlertDialogContent,
// //   AlertDialogDescription,
// //   AlertDialogFooter,
// //   AlertDialogHeader,
// //   AlertDialogTitle,
// // } from "../ui/alert-dialog"
// // import { Edit, Share2, Download, Trash2, MoreVertical, Star, FileText, Volume2, Square } from "lucide-react"
// // import { deleteNote, toggleFavorite, getNoteById } from "../../services/notes-service"
// // import { useToast } from "../../hooks/use-toast"
// // import type { Note } from "../../types/note"

// // interface NoteActionsProps {
// //   noteId: string
// // }

// // export function NoteActions({ noteId }: NoteActionsProps) {
// //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
// //   const [isDeleting, setIsDeleting] = useState(false)
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [note, setNote] = useState<Note | null>(null)
// //   const [error, setError] = useState<string | null>(null)
// //   const [isSpeaking, setIsSpeaking] = useState(false)
// //   const router = useRouter()
// //   const { toast } = useToast()

// //   // Fetch note data
// //   useEffect(() => {
// //     const fetchNote = async () => {
// //       try {
// //         setIsLoading(true)
// //         const fetchedNote = await getNoteById(noteId)
// //         setNote(fetchedNote)
// //         setError(null)
// //       } catch (err) {
// //         console.error("Error fetching note:", err)
// //         setError("Failed to load note data")
// //       } finally {
// //         setIsLoading(false)
// //       }
// //     }

// //     fetchNote()
// //   }, [noteId])

// //   // Clean up speech synthesis on component unmount
// //   useEffect(() => {
// //     return () => {
// //       window.speechSynthesis.cancel()
// //     }
// //   }, [])

// //   const handleDelete = async () => {
// //     setIsDeleting(true)
// //     try {
// //       await deleteNote(noteId)
// //       toast({
// //         title: "Note deleted",
// //         description: "Your note has been deleted successfully.",
// //       })
// //       router.push("/dashboard/notes")
// //     } catch (error) {
// //       console.error("Error deleting note:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to delete note. Please try again.",
// //         variant: "destructive",
// //       })
// //     } finally {
// //       setIsDeleting(false)
// //       setIsDeleteDialogOpen(false)
// //     }
// //   }

// //   const handleToggleFavorite = async () => {
// //     if (!note) return
    
// //     try {
// //       const updatedNote = await toggleFavorite(noteId)
// //       setNote(updatedNote)
// //       toast({
// //         title: updatedNote.isFavorite ? "Added to favorites" : "Removed from favorites",
// //         description: updatedNote.isFavorite
// //           ? "This note has been added to your favorites."
// //           : "This note has been removed from your favorites.",
// //       })
// //     } catch (error) {
// //       console.error("Error toggling favorite status:", error)
// //       toast({
// //         title: "Error",
// //         description: "Failed to update favorite status. Please try again.",
// //         variant: "destructive",
// //       })
// //     }
// //   }

// //   const handleTextToSpeech = () => {
// //     if (!note) {
// //       toast({
// //         title: "Error",
// //         description: "No note content available to read.",
// //         variant: "destructive",
// //       })
// //       return
// //     }

// //     if (!window.speechSynthesis) {
// //       toast({
// //         title: "Error",
// //         description: "Text-to-speech is not supported in this browser.",
// //         variant: "destructive",
// //       })
// //       return
// //     }

// //     if (isSpeaking) {
// //       window.speechSynthesis.cancel()
// //       setIsSpeaking(false)
// //       return
// //     }

// //     // Extract text content (strip HTML tags if contentHtml is used)
// //     const textContent = note.contentHtml
// //       ? note.contentHtml.replace(/<[^>]+>/g, '') // Remove HTML tags
// //       : note.content

// //     if (!textContent.trim()) {
// //       toast({
// //         title: "Error",
// //         description: "No text content available to read.",
// //         variant: "destructive",
// //       })
// //       return
// //     }

// //     const utterance = new SpeechSynthesisUtterance(textContent)
// //     utterance.lang = 'en-US'
// //     utterance.rate = 1.0
// //     utterance.pitch = 1.0
// //     utterance.volume = 1.0

// //     utterance.onend = () => {
// //       setIsSpeaking(false)
// //     }

// //     utterance.onerror = (event) => {
// //       console.error("Speech synthesis error:", event)
// //       setIsSpeaking(false)
// //       toast({
// //         title: "Error",
// //         description: "An error occurred while reading the note.",
// //         variant: "destructive",
// //       })
// //     }

// //     window.speechSynthesis.speak(utterance)
// //     setIsSpeaking(true)
// //   }

// //   if (isLoading) {
// //     return <div className="flex gap-2">
// //       <Button variant="outline" size="sm" disabled>Loading...</Button>
// //     </div>
// //   }

// //   if (error || !note) {
// //     return <div className="flex gap-2">
// //       <Button variant="outline" size="sm" onClick={() => router.back()}>Go Back</Button>
// //     </div>
// //   }

// //   return (
// //     <div className="flex items-center gap-2">
// //       <Button variant="outline" size="sm" onClick={handleToggleFavorite}>
// //         <Star className={`mr-2 h-4 w-4 ${note.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
// //         {note.isFavorite ? "Remove from favorites" : "Add to favorites"}
// //       </Button>
// //       <Button variant="outline" size="sm" onClick={handleTextToSpeech}>
// //         {isSpeaking ? (
// //           <>
// //             <Square className="mr-2 h-4 w-4" />
// //             Stop
// //           </>
// //         ) : (
// //           <>
// //             <Volume2 className="mr-2 h-4 w-4" />
// //             Listen
// //           </>
// //         )}
// //       </Button>
// //       <Button variant="outline" size="sm" asChild>
// //         <a href={`/api/notes/${noteId}/export`} download>
// //           <Download className="mr-2 h-4 w-4" />
// //           Export
// //         </a>
// //       </Button>
// //       <Button variant="outline" size="sm" asChild>
// //         <a href={`/dashboard/notes/${noteId}/share`}>
// //           <Share2 className="mr-2 h-4 w-4" />
// //           Share
// //         </a>
// //       </Button>
// //       <Button variant="outline" size="sm" asChild>
// //         <a href={`/dashboard/notes/${noteId}/edit`}>
// //           <Edit className="mr-2 h-4 w-4" />
// //           Edit
// //         </a>
// //       </Button>
// //       <DropdownMenu>
// //         <DropdownMenuTrigger asChild>
// //           <Button variant="ghost" size="icon" className="h-8 w-8">
// //             <MoreVertical className="h-4 w-4" />
// //             <span className="sr-only">More options</span>
// //           </Button>
// //         </DropdownMenuTrigger>
// //         <DropdownMenuContent align="end">
// //           <DropdownMenuItem asChild>
// //             <a href={`/dashboard/notes/${noteId}/print`}>
// //               <FileText className="mr-2 h-4 w-4" />
// //               Print
// //             </a>
// //           </DropdownMenuItem>
// //           <DropdownMenuSeparator />
// //           <DropdownMenuItem
// //             className="text-destructive focus:text-destructive"
// //             onClick={() => setIsDeleteDialogOpen(true)}
// //           >
// //             <Trash2 className="mr-2 h-4 w-4" />
// //             Delete
// //           </DropdownMenuItem>
// //         </DropdownMenuContent>
// //       </DropdownMenu>

// //       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// //         <AlertDialogContent>
// //           <AlertDialogHeader>
// //             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
// //             <AlertDialogDescription>
// //               This action cannot be undone. This will permanently delete your note and remove it from our servers.
// //             </AlertDialogDescription>
// //           </AlertDialogHeader>
// //           <AlertDialogFooter>
// //             <AlertDialogCancel>Cancel</AlertDialogCancel>
// //             <AlertDialogAction
// //               onClick={handleDelete}
// //               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
// //               disabled={isDeleting}
// //             >
// //               {isDeleting ? "Deleting..." : "Delete"}
// //             </AlertDialogAction>
// //           </AlertDialogFooter>
// //         </AlertDialogContent>
// //       </AlertDialog>
// //     </div>
// //   )
// // }
// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "../ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "../ui/alert-dialog"
// import { Edit, Share2, Download, Trash2, MoreVertical, Star, FileText, Volume2, Square } from "lucide-react"
// import { deleteNote, toggleFavorite, getNoteById } from "../../services/notes-service"
// import { useToast } from "../../hooks/use-toast"
// import type { Note } from "../../types/note"
// import jsPDF from "jspdf"

// interface NoteActionsProps {
//   noteId: string
// }

// export function NoteActions({ noteId }: NoteActionsProps) {
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [note, setNote] = useState<Note | null>(null)
//   const [error, setError] = useState<string | null>(null)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const router = useRouter()
//   const { toast } = useToast()

//   // Fetch note data
//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         setIsLoading(true)
//         const fetchedNote = await getNoteById(noteId)
//         setNote(fetchedNote)
//         setError(null)
//       } catch (err) {
//         console.error("Error fetching note:", err)
//         setError("Failed to load note data")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchNote()
//   }, [noteId])

//   // Clean up speech synthesis on component unmount
//   useEffect(() => {
//     return () => {
//       window.speechSynthesis.cancel()
//     }
//   }, [])

//   const handleDelete = async () => {
//     setIsDeleting(true)
//     try {
//       await deleteNote(noteId)
//       toast({
//         title: "Note deleted",
//         description: "Your note has been deleted successfully.",
//       })
//       router.push("/dashboard/notes")
//     } catch (error) {
//       console.error("Error deleting note:", error)
//       toast({
//         title: "Error",
//         description: "Failed to delete note. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsDeleting(false)
//       setIsDeleteDialogOpen(false)
//     }
//   }

//   const handleToggleFavorite = async () => {
//     if (!note) return
    
//     try {
//       const updatedNote = await toggleFavorite(noteId)
//       setNote(updatedNote)
//       toast({
//         title: updatedNote.isFavorite ? "Added to favorites" : "Removed from favorites",
//         description: updatedNote.isFavorite
//           ? "This note has been added to your favorites."
//           : "This note has been removed from your favorites.",
//       })
//     } catch (error) {
//       console.error("Error toggling favorite status:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update favorite status. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleTextToSpeech = () => {
//     if (!note) {
//       toast({
//         title: "Error",
//         description: "No note content available to read.",
//         variant: "destructive",
//       })
//       return
//     }

//     if (!window.speechSynthesis) {
//       toast({
//         title: "Error",
//         description: "Text-to-speech is not supported in this browser.",
//         variant: "destructive",
//       })
//       return
//     }

//     if (isSpeaking) {
//       window.speechSynthesis.cancel()
//       setIsSpeaking(false)
//       return
//     }

//     // Extract text content (strip HTML tags if contentHtml is used)
//     const textContent = note.contentHtml
//       ? note.contentHtml.replace(/<[^>]+>/g, '') // Remove HTML tags
//       : note.content

//     if (!textContent.trim()) {
//       toast({
//         title: "Error",
//         description: "No text content available to read.",
//         variant: "destructive",
//       })
//       return
//     }

//     const utterance = new SpeechSynthesisUtterance(textContent)
//     utterance.lang = 'en-US'
//     utterance.rate = 1.0
//     utterance.pitch = 1.0
//     utterance.volume = 1.0

//     utterance.onend = () => {
//       setIsSpeaking(false)
//     }

//     utterance.onerror = (event) => {
//       console.error("Speech synthesis error:", event)
//       setIsSpeaking(false)
//       toast({
//         title: "Error",
//         description: "An error occurred while reading the note.",
//         variant: "destructive",
//       })
//     }

//     window.speechSynthesis.speak(utterance)
//     setIsSpeaking(true)
//   }

//   const generatePDF = () => {
//     if (!note) {
//       toast({
//         title: "Error",
//         description: "No note content available to generate PDF.",
//         variant: "destructive",
//       })
//       return null
//     }

//     const doc = new jsPDF()
//     const pageWidth = doc.internal.pageSize.getWidth()
//     const margin = 10
//     const maxWidth = pageWidth - 2 * margin

//     // Add title
//     doc.setFontSize(16)
//     doc.text(note.title || "Note", margin, 20)

//     // Add content
//     const textContent = note.contentHtml
//       ? note.contentHtml.replace(/<[^>]+>/g, '') // Remove HTML tags
//       : note.content

//     if (!textContent.trim()) {
//       toast({
//         title: "Error",
//         description: "No text content available to generate PDF.",
//         variant: "destructive",
//       })
//       return null
//     }

//     doc.setFontSize(12)
//     doc.text(textContent, margin, 30, { maxWidth })

//     return doc
//   }

//   const handleExport = () => {
//     const doc = generatePDF()
//     if (doc) {
//       doc.save(`note-${noteId}.pdf`)
//       toast({
//         title: "PDF Exported",
//         description: "The note has been downloaded as a PDF.",
//       })
//     }
//   }

//   const handlePrint = () => {
//     const doc = generatePDF()
//     if (doc) {
//       const pdfBlob = doc.output("blob")
//       const pdfUrl = URL.createObjectURL(pdfBlob)
//       const printWindow = window.open(pdfUrl)
//       if (printWindow) {
//         printWindow.onload = () => {
//           printWindow.print()
//           // Clean up the URL object after printing
//           printWindow.onbeforeunload = () => {
//             URL.revokeObjectURL(pdfUrl)
//           }
//         }
//       } else {
//         toast({
//           title: "Error",
//           description: "Failed to open print dialog. Please allow pop-ups.",
//           variant: "destructive",
//         })
//       }
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="flex gap-2">
//         <Button variant="outline" size="sm" disabled>
//           Loading...
//         </Button>
//       </div>
//     )
//   }

//   if (error || !note) {
//     return (
//       <div className="flex gap-2">
//         <Button variant="outline" size="sm" onClick={() => router.back()}>
//           Go Back
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className="flex items-center gap-2">
//       <Button variant="outline" size="sm" onClick={handleToggleFavorite}>
//         <Star className={`mr-2 h-4 w-4 ${note.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
//         {note.isFavorite ? "Remove from favorites" : "Add to favorites"}
//       </Button>
//       <Button variant="outline" size="sm" onClick={handleTextToSpeech}>
//         {isSpeaking ? (
//           <>
//             <Square className="mr-2 h-4 w-4" />
//             Stop
//           </>
//         ) : (
//           <>
//             <Volume2 className="mr-2 h-4 w-4" />
//             Listen
//           </>
//         )}
//       </Button>
//       <Button variant="outline" size="sm" onClick={handleExport}>
//         <Download className="mr-2 h-4 w-4" />
//         Export
//       </Button>
//       <Button variant="outline" size="sm" asChild>
//         <a href={`/dashboard/notes/${noteId}/share`}>
//           <Share2 className="mr-2 h-4 w-4" />
//           Share
//         </a>
//       </Button>
//       <Button variant="outline" size="sm" asChild>
//         <a href={`/dashboard/notes/${noteId}/edit`}>
//           <Edit className="mr-2 h-4 w-4" />
//           Edit
//         </a>
//       </Button>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" size="icon" className="h-8 w-8">
//             <MoreVertical className="h-4 w-4" />
//             <span className="sr-only">More options</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuItem onClick={handlePrint}>
//             <FileText className="mr-2 h-4 w-4" />
//             Print
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             className="text-destructive focus:text-destructive"
//             onClick={() => setIsDeleteDialogOpen(true)}
//           >
//             <Trash2 className="mr-2 h-4 w-4" />
//             Delete
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete your note and remove it from our servers.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDelete}
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//               disabled={isDeleting}
//             >
//               {isDeleting ? "Deleting..." : "Delete"}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Edit, Share2, Download, Trash2, MoreVertical, Star, FileText, Volume2, Square } from "lucide-react"
import { deleteNote, toggleFavorite, getNoteById } from "../../services/notes-service"
import { useToast } from "../../hooks/use-toast"
import type { Note } from "../../types/note"
import jsPDF from "jspdf"

interface NoteActionsProps {
  noteId: string
}

export function NoteActions({ noteId }: NoteActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [note, setNote] = useState<Note | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Fetch note data
  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true)
        const fetchedNote = await getNoteById(noteId)
        setNote(fetchedNote)
        setError(null)
      } catch (err) {
        console.error("Error fetching note:", err)
        setError("Failed to load note data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNote()
  }, [noteId])

  // Clean up speech synthesis on component unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteNote(noteId)
      toast({
        title: "Note deleted",
        description: "Your note has been deleted successfully.",
      })
      router.push("/dashboard/notes")
    } catch (error) {
      console.error("Error deleting note:", error)
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleToggleFavorite = async () => {
    if (!note) return
    
    try {
      const updatedNote = await toggleFavorite(noteId)
      setNote(updatedNote)
      toast({
        title: updatedNote.isFavorite ? "Added to favorites" : "Removed from favorites",
        description: updatedNote.isFavorite
          ? "This note has been added to your favorites."
          : "This note has been removed from your favorites.",
      })
    } catch (error) {
      console.error("Error toggling favorite status:", error)
      toast({
        title: "Error",
        description: "Failed to update favorite status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTextToSpeech = () => {
    if (!note) {
      toast({
        title: "Error",
        description: "No note content available to read.",
        variant: "destructive",
      })
      return
    }

    if (!window.speechSynthesis) {
      toast({
        title: "Error",
        description: "Text-to-speech is not supported in this browser.",
        variant: "destructive",
      })
      return
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    // Extract text content (strip HTML tags if contentHtml is used)
    const textContent = note.contentHtml
      ? note.contentHtml.replace(/<[^>]+>/g, '') // Remove HTML tags
      : note.content

    if (!textContent.trim()) {
      toast({
        title: "Error",
        description: "No text content available to read.",
        variant: "destructive",
      })
      return
    }

    const utterance = new SpeechSynthesisUtterance(textContent)
    utterance.lang = 'en-US'
    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 1.0

    utterance.onend = () => {
      setIsSpeaking(false)
    }

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event)
      setIsSpeaking(false)
      toast({
        title: "Error",
        description: "An error occurred while reading the note.",
        variant: "destructive",
      })
    }

    window.speechSynthesis.speak(utterance)
    setIsSpeaking(true)
  }

  const generatePDF = () => {
    if (!note) {
      toast({
        title: "Error",
        description: "No note content available to generate PDF.",
        variant: "destructive",
      })
      return null
    }

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 10
    const maxWidth = pageWidth - 2 * margin
    const lineHeight = 7 // Approximate line height for 12pt font
    let cursorY = 20 // Starting Y position

    // Add title
    doc.setFontSize(16)
    doc.text(note.title || "Note", margin, cursorY)
    cursorY += lineHeight + 5 // Space after title

    // Add content
    const textContent = note.contentHtml
      ? note.contentHtml.replace(/<[^>]+>/g, '') // Remove HTML tags
      : note.content

    if (!textContent.trim()) {
      toast({
        title: "Error",
        description: "No text content available to generate PDF.",
        variant: "destructive",
      })
      return null
    }

    doc.setFontSize(12)
    const lines = doc.splitTextToSize(textContent, maxWidth)

    for (const line of lines) {
      // Check if adding this line would exceed the page height
      if (cursorY + lineHeight > pageHeight - margin) {
        doc.addPage()
        cursorY = margin // Reset Y position for new page
      }
      doc.text(line, margin, cursorY)
      cursorY += lineHeight
    }

    return doc
  }

  const handleExport = () => {
    const doc = generatePDF()
    if (doc) {
      doc.save(`note-${noteId}.pdf`)
      toast({
        title: "PDF Exported",
        description: "The note has been downloaded as a PDF.",
      })
    }
  }

  const handlePrint = () => {
    const doc = generatePDF()
    if (doc) {
      const pdfBlob = doc.output("blob")
      const pdfUrl = URL.createObjectURL(pdfBlob)
      const printWindow = window.open(pdfUrl)
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print()
          // Clean up the URL object after printing
          printWindow.onbeforeunload = () => {
            URL.revokeObjectURL(pdfUrl)
          }
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to open print dialog. Please allow pop-ups.",
          variant: "destructive",
        })
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled>
          Loading...
        </Button>
      </div>
    )
  }

  if (error || !note) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleToggleFavorite}>
        <Star className={`mr-2 h-4 w-4 ${note.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
        {note.isFavorite ? "Remove from favorites" : "Add to favorites"}
      </Button>
      <Button variant="outline" size="sm" onClick={handleTextToSpeech}>
        {isSpeaking ? (
          <>
            <Square className="mr-2 h-4 w-4" />
            Stop
          </>
        ) : (
          <>
            <Volume2 className="mr-2 h-4 w-4" />
            Listen
          </>
        )}
      </Button>
      <Button variant="outline" size="sm" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a href={`/dashboard/notes/${noteId}/share`}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </a>
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a href={`/dashboard/notes/${noteId}/edit`}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </a>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handlePrint}>
            <FileText className="mr-2 h-4 w-4" />
            Print
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your note and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}