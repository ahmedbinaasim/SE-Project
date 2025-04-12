import { Button } from "../ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export function NotesHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Notes</h1>
        <p className="text-muted-foreground">Create, manage, and organize your notes.</p>
      </div>
      <Link href="/dashboard/notes/new">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </Link>
    </div>
  )
}
