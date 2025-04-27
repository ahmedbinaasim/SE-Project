"use client"

import { useState } from "react"
import { DashboardShell } from "../../../../components/dashboard/dashboard-shell"
import { NotesHeader } from "../../../../components/notes/notes-header"
import { NotesList } from "../../../../components/notes/notes-list"
import { NotesFilters } from "../../../../components/notes/notes-filters"

export default function NotesPage() {
  const [filters, setFilters] = useState({
    search: "",
    folder: "all",
    days: 30,
    favorites: false
  });

  const handleFilterChange = (newFilters: {
    search: string;
    folder: string;
    days: number;
    favorites: boolean;
  }) => {
    setFilters(newFilters);
  };

  return (
    <DashboardShell>
      <NotesHeader />
      <div className="flex flex-col gap-6 md:flex-row">
        <NotesFilters className="w-full md:w-64" onFilterChange={handleFilterChange} />
        <NotesList className="flex-1" filters={filters} />
      </div>
    </DashboardShell>
  )
}