"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Star, Search, X } from "lucide-react"

interface FavoritesHeaderProps {
  onSearch: (term: string) => void
}

export function FavoritesHeader({ onSearch }: FavoritesHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    onSearch("")
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-400" />
          <h1 className="text-2xl font-bold tracking-tight">Favorite Notes</h1>
        </div>
        <p className="text-muted-foreground">Quick access to your most important notes.</p>
      </div>
      <div className="relative w-full sm:w-auto sm:min-w-[260px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search favorites..."
          className="pl-8"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-9 w-9"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </div>
  )
}