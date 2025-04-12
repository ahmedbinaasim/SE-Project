import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { NoteCard } from "../notes/note-card"
import { getFavoriteNotes } from "../../services/notes-service"
import Link from "next/link"
import { Button } from "../ui/button"
import { Star } from "lucide-react"

export function FavoriteNotes() {
  const favoriteNotes = getFavoriteNotes()

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <CardHeader>
        <CardTitle>Favorite Notes</CardTitle>
        <CardDescription>Your favorite notes for quick access</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {favoriteNotes.length > 0 ? (
            favoriteNotes.map((note) => <NoteCard key={note.id} note={note} compact />)
          ) : (
            <div className="flex h-[120px] flex-col items-center justify-center rounded-md border border-dashed p-4 text-center">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <h3 className="mt-2 text-sm font-semibold">No favorites yet</h3>
                <p className="mt-1 text-xs text-muted-foreground">Mark notes as favorites for quick access.</p>
                <Link href="/dashboard/notes" className="mt-2">
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    <Star className="mr-1 h-3 w-3" />
                    Browse Notes
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
