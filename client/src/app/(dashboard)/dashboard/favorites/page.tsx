"use client"


import { DashboardShell } from "../../../../components/dashboard/dashboard-shell"
import { FavoritesHeader } from "../../../../components/favorites/favorites-header"
import { FavoritesList } from "../../../../components/favorites/favorites-list"
import { useState } from "react"

// export const metadata: Metadata = {
//   title: "Favorites - NoteGenius",
//   description: "View and manage your favorite notes",
// }

export default function FavoritesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <FavoritesHeader onSearch={handleSearch} />
        <FavoritesList searchTerm={searchTerm} />
      </div>
    </DashboardShell>
  )
}