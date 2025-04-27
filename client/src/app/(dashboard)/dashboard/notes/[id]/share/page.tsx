"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardShell } from "../../../../../../components/dashboard/dashboard-shell"
import { Button } from "../../../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../../../components/ui/card"
import { Input } from "../../../../../../components/ui/input"
import { Label } from "../../../../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../../components/ui/avatar"
import { useToast } from "../../../../../../hooks/use-toast"
import { getNoteById } from "../../../../../../services/notes-service"
import { getNoteCollaborators, addCollaborator, removeCollaborator, updateCollaboratorPermission } from "../../../../../../services/collaboration-service"
import { ChevronLeft, X, UserPlus, Mail, Copy, Link, Trash } from "lucide-react"
import type { Note } from "../../../../../../types/note"
import type { Collaborator } from "../../../../../../types/collaborator"

export default function ShareNotePage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { toast } = useToast()
  const [note, setNote] = useState<Note | null>(null)
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [email, setEmail] = useState("")
  const [permission, setPermission] = useState("view")
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [updatingCollaboratorId, setUpdatingCollaboratorId] = useState<string | null>(null)
  const [isShareLinkEnabled, setIsShareLinkEnabled] = useState(true)

  // Generate a share link for the note
  const shareLink = typeof window !== "undefined" 
    ? `${window.location.origin}/dashboard/notes/${id}?shared=true` 
    : ""

  // Fetch the note and its collaborators
  useEffect(() => {
    const fetchNoteAndCollaborators = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const noteData = await getNoteById(id)
        setNote(noteData)
        
        const collaboratorsData = await getNoteCollaborators(id)
        setCollaborators(collaboratorsData)
      } catch (err) {
        console.error("Error fetching note or collaborators:", err)
        setError("Failed to load note details or collaborators")
      } finally {
        setLoading(false)
      }
    }
    
    fetchNoteAndCollaborators()
  }, [id])

  // Handle adding a new collaborator
  const handleAddCollaborator = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    
    try {
      setAdding(true)
      setError(null)
      
      const newCollaborator = await addCollaborator(id, email, permission)
      setCollaborators([...collaborators, newCollaborator])
      setEmail("")
      
      toast({
        title: "Collaborator added",
        description: `${newCollaborator.name} has been added as a collaborator.`
      })
    } catch (err) {
      console.error("Error adding collaborator:", err)
      setError("Failed to add collaborator. Please check the email address.")
      
      toast({
        title: "Error",
        description: "Failed to add collaborator. Please try again.",
        variant: "destructive"
      })
    } finally {
      setAdding(false)
    }
  }

  // Handle updating a collaborator's permission
  const handleUpdatePermission = async (collaboratorId: string, newPermission: string) => {
    try {
      setUpdatingCollaboratorId(collaboratorId)
      const updatedCollaborator = await updateCollaboratorPermission(id, collaboratorId, newPermission)
      setCollaborators(collaborators.map(c => 
        c.id === collaboratorId ? { ...c, permission: updatedCollaborator.permission } : c
      ))
      
      toast({
        title: "Permission updated",
        description: "Collaborator permission has been updated successfully."
      })
    } catch (err) {
      console.error("Error updating collaborator permission:", err)
      
      toast({
        title: "Error",
        description: "Failed to update permission. Please try again.",
        variant: "destructive"
      })
    } finally {
      setUpdatingCollaboratorId(null)
    }
  }

  // Handle removing a collaborator
  const handleRemoveCollaborator = async (collaboratorId: string) => {
    try {
      await removeCollaborator(id, collaboratorId)
      setCollaborators(collaborators.filter(c => c.id !== collaboratorId))
      
      toast({
        title: "Collaborator removed",
        description: "The collaborator has been removed successfully."
      })
    } catch (err) {
      console.error("Error removing collaborator:", err)
      
      toast({
        title: "Error",
        description: "Failed to remove collaborator. Please try again.",
        variant: "destructive"
      })
    }
  }

  // Copy share link to clipboard
  const copyShareLink = () => {
    if (!isShareLinkEnabled) {
      toast({
        title: "Share link disabled",
        description: "The share link has been disabled for this note.",
        variant: "destructive"
      })
      return
    }
    navigator.clipboard.writeText(shareLink)
    toast({
      title: "Link copied",
      description: "Share link has been copied to clipboard."
    })
  }

  // Share via email (mock implementation)
  // const shareViaEmail = () => {
  //   if (!isShareLinkEnabled) {
  //     toast({
  //       title: "Share link disabled",
  //       description: "The share link has been disabled for this note.",
  //       variant: "destructive"
  //     })
  //     return
  //   }
  //   const subject = encodeURIComponent(`Invitation to collaborate on "${note?.title}"`)
  //   const body = encodeURIComponent(
  //     `Hi,\n\nI've shared a note with you on NoteGenius. You can access it here:\n${shareLink}\n\nBest,\n[Your Name]`
  //   )
  //   window.location.href = `mailto:?subject=${subject}&body=${body}`
  // }

  // Toggle share link (mock implementation)
  const toggleShareLink = () => {
    setIsShareLinkEnabled(!isShareLinkEnabled)
    toast({
      title: isShareLinkEnabled ? "Share link disabled" : "Share link enabled",
      description: isShareLinkEnabled 
        ? "The share link has been disabled." 
        : "The share link has been re-enabled."
    })
  }

  // Copy collaborator email
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    toast({
      title: "Email copied",
      description: "Collaborator's email has been copied to clipboard."
    })
  }

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Share Note</h1>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
              <CardDescription>Please wait while we load the note details.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </DashboardShell>
    )
  }

  if (error || !note) {
    return (
      <DashboardShell>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Share Note</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>{error || "Note not found"}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.back()}>Go Back</Button>
          </CardFooter>
        </Card>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/notes/${id}`)}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Note
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Share Note</h1>
      </div>
      
      <div className="grid gap-6">
        {/* Note info */}
        <Card>
          <CardHeader>
            <CardTitle>&quot;{note.title}&quot;</CardTitle>
            <CardDescription>Share this note with other users.</CardDescription>
          </CardHeader>
        </Card>
        
        {/* Share link */}
        <Card>
          <CardHeader>
            <CardTitle>Share Link</CardTitle>
            <CardDescription>Anyone with the link can access this note if they have permission.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Input value={shareLink} readOnly className="flex-1" />
                <Button variant="outline" size="sm" onClick={copyShareLink}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                {/* <Button variant="outline" size="sm" onClick={shareViaEmail}>
                  <Send className="mr-2 h-4 w-4" />
                  Share via Email
                </Button> */}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleShareLink}
                className={isShareLinkEnabled ? "text-destructive" : "text-primary"}
              >
                {isShareLinkEnabled ? (
                  <>
                    <Trash className="mr-2 h-4 w-4" />
                    Disable Share Link
                  </>
                ) : (
                  <>
                    <Link className="mr-2 h-4 w-4" />
                    Enable Share Link
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Add collaborator */}
        <Card>
          <CardHeader>
            <CardTitle>Add Collaborators</CardTitle>
            <CardDescription>Invite others to access this note.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCollaborator} className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    placeholder="colleague@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="w-full space-y-2 md:w-[180px]">
                <Label htmlFor="permission">Permission</Label>
                <Select value={permission} onValueChange={setPermission}>
                  <SelectTrigger id="permission">
                    <SelectValue placeholder="Select permission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="view">Can view</SelectItem>
                    <SelectItem value="comment">Can comment</SelectItem>
                    <SelectItem value="edit">Can edit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={adding} className="md:ml-2">
                {adding ? (
                  "Adding..."
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add
                  </>
                )}
              </Button>
            </form>
            {error && (
              <p className="mt-2 text-sm text-destructive">{error}</p>
            )}
          </CardContent>
        </Card>
        
        {/* Current collaborators */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Current Collaborators</h3>
          {collaborators.length > 0 ? (
            <div className="space-y-3">
              {collaborators.map((collaborator) => (
                <div key={collaborator.id} className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
                      <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{collaborator.name}</p>
                      <div className="flex items-center gap-1">
                        <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0"
                          onClick={() => copyEmail(collaborator.email)}
                        >
                          <Copy className="h-3 w-3" />
                          <span className="sr-only">Copy email</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select 
                      value={collaborator.permission} 
                      onValueChange={(value) => handleUpdatePermission(collaborator.id, value)}
                      disabled={updatingCollaboratorId === collaborator.id}
                    >
                      <SelectTrigger className="w-[120px] h-8 text-sm">
                        <SelectValue placeholder="Permission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">Can view</SelectItem>
                        <SelectItem value="comment">Can comment</SelectItem>
                        <SelectItem value="edit">Can edit</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveCollaborator(collaborator.id)}
                      disabled={updatingCollaboratorId === collaborator.id}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex h-[100px] flex-col items-center justify-center p-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    No collaborators yet. Add someone to collaborate on this note.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}