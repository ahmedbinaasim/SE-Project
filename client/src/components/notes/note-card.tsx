"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { MoreHorizontal, Star, Clock, FileText, Brain, Share2, Trash2, Edit, Download } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { Note } from "../../types/note"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { toggleFavorite, deleteNote } from "../../services/notes-service"
import { useToast } from "../../hooks/use-toast"

interface NoteCardProps {
  note: Note
  compact?: boolean
}

export function NoteCard({ note, compact = false }: NoteCardProps) {
  const [isFavorite, setIsFavorite] = useState(note.isFavorite)
  const { toast } = useToast()

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    toggleFavorite(note.id)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? `"${note.title}" has been removed from favorites.`
        : `"${note.title}" has been added to favorites.`,
    })
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    deleteNote(note.id)
    toast({
      title: "Note deleted",
      description: `"${note.title}" has been deleted.`,
    })
  }

  if (compact) {
    return (
      <Link href={`/dashboard/notes/${note.id}`}>
        <div className="flex items-center justify-between rounded-md border p-3 transition-all hover:bg-accent/10">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{note.title}</span>
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
            <CardTitle className="line-clamp-1">{note.title}</CardTitle>
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
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
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
            <span>{formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}</span>
          </div>
          <div className="flex items-center gap-2">
            {note.hasSummary && (
              <div className="flex items-center gap-1">
                <Brain className="h-3 w-3 text-accent" />
                <span className="text-accent">AI Summary</span>
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
