"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"
import { cn } from "../../lib/utils"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

interface NotesFiltersProps {
  className?: string
}

export function NotesFilters({ className }: NotesFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showFilters, setShowFilters] = useState(false)
  const [subject, setSubject] = useState("all")
  const [dateRange, setDateRange] = useState<[number]>([30])
  const [showFavorites, setShowFavorites] = useState(false)

  const clearFilters = () => {
    setSearchTerm("")
    setSubject("all")
    setDateRange([30])
    setShowFavorites(false)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Filter your notes by subject, date, and more.</SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              <MobileFilters
                subject={subject}
                setSubject={setSubject}
                dateRange={dateRange}
                setDateRange={setDateRange}
                showFavorites={showFavorites}
                setShowFavorites={setShowFavorites}
                clearFilters={clearFilters}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden space-y-4 rounded-lg border p-4 md:block">
        <div className="space-y-2">
          <h3 className="font-medium">Filters</h3>
          <Separator />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="literature">Literature</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="date-range">Date Range</Label>
              <span className="text-xs text-muted-foreground">Last {dateRange[0]} days</span>
            </div>
            <Slider id="date-range" min={7} max={90} step={1} value={dateRange} onValueChange={setDateRange as never} />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="favorites" checked={showFavorites} onCheckedChange={setShowFavorites} />
            <Label htmlFor="favorites">Show favorites only</Label>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  )
}

function MobileFilters({
  subject,
  setSubject,
  dateRange,
  setDateRange,
  showFavorites,
  setShowFavorites,
  clearFilters,
}: {
  subject: string
  setSubject: (value: string) => void
  dateRange: [number]
  setDateRange: (value: [number]) => void
  showFavorites: boolean
  setShowFavorites: (value: boolean) => void
  clearFilters: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subject-mobile">Subject</Label>
        <Select value={subject} onValueChange={setSubject}>
          <SelectTrigger id="subject-mobile">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="math">Mathematics</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="history">History</SelectItem>
            <SelectItem value="literature">Literature</SelectItem>
            <SelectItem value="cs">Computer Science</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="date-range-mobile">Date Range</Label>
          <span className="text-xs text-muted-foreground">Last {dateRange[0]} days</span>
        </div>
        <Slider
          id="date-range-mobile"
          min={7}
          max={90}
          step={1}
          value={dateRange}
          onValueChange={setDateRange as never}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="favorites-mobile" checked={showFavorites} onCheckedChange={setShowFavorites} />
        <Label htmlFor="favorites-mobile">Show favorites only</Label>
      </div>
      <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  )
}

function Separator() {
  return <div className="h-px w-full bg-border" />
}
