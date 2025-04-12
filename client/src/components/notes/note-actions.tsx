"use client"

import { useState } from "react"
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
import { Edit, Share2, Download, Trash2, MoreVertical, Star, FileText } from "lucide-react"
import { deleteNote, toggleFavorite } from "../../services/notes-service"
import { useToast } from "../../hooks/use-toast"
import { getNoteById } from "../../services/notes-service"

interface NoteActionsProps {
  noteId: string
}

export function NoteActions({ noteId }: NoteActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const note = getNoteById(noteId)
  const [isFavorite, setIsFavorite] = useState(note?.isFavorite || false)

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

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toggleFavorite(noteId)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? "This note has been removed from your favorites."
        : "This note has been added to your favorites.",
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleToggleFavorite}>
        <Star className={`mr-2 h-4 w-4 ${isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </Button>
      <Button variant="outline" size="sm" asChild>
        <a href={`/api/notes/${noteId}/export`} download>
          <Download className="mr-2 h-4 w-4" />
          Export
        </a>
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
          <DropdownMenuItem asChild>
            <a href={`/dashboard/notes/${noteId}/print`}>
              <FileText className="mr-2 h-4 w-4" />
              Print
            </a>
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
