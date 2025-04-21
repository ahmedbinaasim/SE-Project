"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { MoreHorizontal, Star, Clock, FileText, Brain, Share2, Trash2, Edit, Download, Folder, Users } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { jsPDF } from "jspdf"
import type { Note } from "../../types/note"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu"
import { toggleFavorite, deleteNote, updateNote, getAllFolders } from "../../services/notes-service"
import { useToast } from "../../hooks/use-toast"

interface NoteCardProps {
  note: Note
  compact?: boolean
  showOwner?: boolean
  showCollaborators?: boolean
}

export function NoteCard({ note, compact = false, showOwner = false, showCollaborators = false }: NoteCardProps) {
  const [isFavorite, setIsFavorite] = useState(note.isFavorite)
  const [folders, setFolders] = useState<{ id: string; name: string }[]>([])
  const [folderName, setFolderName] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch folders on mount
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const fetchedFolders = await getAllFolders()
        setFolders(fetchedFolders)
        // Find the folder name if the note is in a folder
        if (note.folderId) {
          const folder = fetchedFolders.find(f => f.id === note.folderId)
          setFolderName(folder ? folder.name : null)
        }
      } catch (error) {
        console.error("Error fetching folders:", error)
        toast({
          title: "Error",
          description: "Failed to load folders",
          variant: "destructive",
        })
      }
    }
    fetchFolders()
  }, [note.folderId, toast])

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await toggleFavorite(note.id)
      setIsFavorite(!isFavorite)
      toast({
        title: isFavorite ? "Removed from favorites" : "Added to favorites",
        description: isFavorite
          ? `"${note.title}" has been removed from favorites.`
          : `"${note.title}" has been added to favorites.`,
      })
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await deleteNote(note.id)
      toast({
        title: "Note deleted",
        description: `"${note.title}" has been deleted.`,
      })
    } catch (error) {
      console.error("Error deleting note:", error)
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      })
    }
  }

  const handleAddToFolder = async (e: React.MouseEvent, folderId: string | null) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await updateNote(note.id, { folderId })
      const folder = folders.find(f => f.id === folderId)
      setFolderName(folder ? folder.name : null)
      toast({
        title: "Note Moved",
        description: folderId
          ? `"${note.title}" has been moved to "${folder?.name}".`
          : `"${note.title}" has been removed from folder.`,
      })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to move note to folder",
        variant: "destructive",
      })
    }
  }

  const handleExport = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = 10
      const maxWidth = pageWidth - 2 * margin

      // Add title
      doc.setFontSize(16)
      doc.text(note.title, margin, margin)

      // Add content
      doc.setFontSize(12)
      const lines = doc.splitTextToSize(note.content, maxWidth)
      let yPosition = margin + 10
      lines.forEach((line: string) => {
        if (yPosition > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage()
          yPosition = margin
        }
        doc.text(line, margin, yPosition)
        yPosition += 7
      })

      doc.save(`${note.title}.pdf`)
    } catch (error) {
      console.error("Error exporting to PDF:", error)
      toast({
        title: "Error",
        description: "Failed to export note as PDF",
        variant: "destructive",
      })
    }
  }

  if (compact) {
    return (
      <Link href={`/dashboard/notes/${note.id}`}>
        <div className="flex items-center justify-between rounded-md border p-3 transition-all hover:bg-accent/10">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="font-medium">{note.title}</span>
              {showOwner && note.author && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>Owner: {note.author.name}</span>
                </div>
              )}
              {showCollaborators && note.collaborators && note.collaborators.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>Shared with: {note.collaborators.length} {note.collaborators.length === 1 ? "person" : "people"}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {note.hasSummary && <Brain className="h-4 w-4 text-accent" />}
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleToggleFavorite}>
              <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
              <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
            </Button>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/dashboard/notes/${note.id}`}>
      <Card className="note-card-hover h-full overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="line-clamp-1">{note.title}</CardTitle>
              {showOwner && note.author && (
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={note.author.avatar || "/placeholder.svg"} alt={note.author.name} />
                    <AvatarFallback>{note.author.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span>Owner: {note.author.name}</span>
                </div>
              )}
              {showCollaborators && note.collaborators && note.collaborators.length > 0 && (
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="link" className="p-0 h-auto text-sm text-muted-foreground">
                        Shared with {note.collaborators.length} {note.collaborators.length === 1 ? "person" : "people"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">Collaborators</h4>
                        {note.collaborators.map(collab => (
                          <div key={collab.id} className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={collab.user?.avatar || "/placeholder.svg"} alt={collab.user?.name || "Unknown"} />
                              <AvatarFallback>{collab.user?.name?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm">{collab.user?.name || "Unknown"}</p>
                              <p className="text-xs text-muted-foreground">{collab.permission}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/notes/${note.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleToggleFavorite}>
                  <Star className="mr-2 h-4 w-4" />
                  {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/notes/${note.id}/share`}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Folder className="mr-2 h-4 w-4" />
                    Add to Folder
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={(e) => handleAddToFolder(e, null)}>
                      No Folder
                    </DropdownMenuItem>
                    {folders.map((folder) => (
                      <DropdownMenuItem
                        key={folder.id}
                        onClick={(e) => handleAddToFolder(e, folder.id)}
                      >
                        {folder.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="line-clamp-3 text-sm text-muted-foreground">{note.content}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>{formatDistanceToNow(new Date(note.updatedAt), { addSuffix: false })}</span>
            {folderName && (
              <div className="flex items-center gap-1">
                <Folder className="h-3 w-3" />
                <span>{folderName}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {note.hasSummary && (
              <div className="flex items-center gap-1">
                <Brain className="h-3 w-3 text-accent" />
                <span className="text-xs">AI</span>
              </div>
            )}
            {note.isShared && (
              <div className="flex items-center gap-1">
                <Share2 className="h-3 w-3" />
                <span>Shared</span>
              </div>
            )}
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleToggleFavorite}>
              <Star className={`h-3 w-3 ${isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
              <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}