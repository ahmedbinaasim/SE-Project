
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