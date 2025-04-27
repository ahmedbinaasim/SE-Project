import type { Metadata } from "next"
import { DashboardShell } from "../../../../../components/dashboard/dashboard-shell"
import { NoteViewer } from "../../../../../components/notes/note-viewer"
import { NoteSummary } from "../../../../../components/notes/note-summary"
import { NoteActions } from "../../../../../components/notes/note-actions"
import { NoteCollaborators } from "../../../../../components/notes/note-collaborators"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../components/ui/tabs"

type Props = {
  params: Promise<{ id: string }>
}


export async function generateMetadata({ }: Props): Promise<Metadata> {
  return {
    title: "View Note - NoteGenius",
    description: "View and edit your note",
  }
}

export default async function NotePage({ params }: Props) {
  // Convert params.id to a string to ensure it's a primitive value
  const noteId = String((await params).id)
  
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Note Details</h1>
          <NoteActions noteId={noteId} />
        </div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="summary">AI Summary</TabsTrigger>
            <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="mt-4">
            <NoteViewer noteId={noteId} />
          </TabsContent>
          <TabsContent value="summary" className="mt-4">
            <NoteSummary noteId={noteId} />
          </TabsContent>
          <TabsContent value="collaborators" className="mt-4">
            <NoteCollaborators noteId={noteId} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}