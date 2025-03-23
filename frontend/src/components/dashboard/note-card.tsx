"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { Note } from "@/lib/types"
import { Star, MoreVertical, Download, Share2, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface NoteCardProps {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const [isFavorite, setIsFavorite] = useState(note.isFavorite)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    // In a real app, we would call an API to update the favorite status
  }

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowMenu(!showMenu)
  }

  return (
    <a
      href={`/dashboard/notes/${note.id}`}
      className="block bg-card/50 border border-border/40 rounded-lg overflow-hidden hover:shadow-md hover:shadow-primary/5 transition-all hover:translate-y-[-2px] backdrop-blur-sm"
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium line-clamp-1">{note.title}</h3>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleFavorite}
              className={`p-1.5 rounded-md hover:bg-primary/10 ${
                isFavorite ? "text-yellow-400" : "text-muted-foreground"
              }`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
            </button>

            <div className="relative" ref={menuRef}>
              <button
                onClick={handleMenuToggle}
                className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground"
                aria-label="More options"
              >
                <MoreVertical size={16} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-card border border-border/40 rounded-md shadow-lg overflow-hidden z-10">
                  <div className="py-1">
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-primary/10 text-left">
                      <Download size={16} />
                      <span>Download</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-primary/10 text-left">
                      <Share2 size={16} />
                      <span>Share</span>
                    </button>
                    <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-primary/10 text-destructive text-left">
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mt-2 line-clamp-3">{note.content}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {note.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-block px-2 py-0.5 text-xs rounded-full"
                style={{
                  backgroundColor: `${tag.color}20`,
                  color: tag.color,
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>

          <span className="text-xs text-muted-foreground">{formatDate(note.updatedAt)}</span>
        </div>
      </div>
    </a>
  )
}

