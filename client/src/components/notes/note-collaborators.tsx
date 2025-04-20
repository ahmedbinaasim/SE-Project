// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { Button } from "../ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
// import { Input } from "../ui/input"
// import { Label } from "../ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
// import { Skeleton } from "../ui/skeleton"
// import { X, UserPlus, Mail } from "lucide-react"
// import { getNoteCollaborators, addCollaborator, removeCollaborator } from "../../services/collaboration-service"
// import type { Collaborator } from "../../types/collaborator"
// import { useToast } from "../../hooks/use-toast"

// interface NoteCollaboratorsProps {
//   noteId: string
// }

// export function NoteCollaborators({ noteId }: NoteCollaboratorsProps) {
//   const [collaborators, setCollaborators] = useState<Collaborator[]>([])
//   const [loading, setLoading] = useState(true)
//   const [email, setEmail] = useState("")
//   const [permission, setPermission] = useState("view")
//   const [isAdding, setIsAdding] = useState(false)
//   const { toast } = useToast()

//   useEffect(() => {
//     const fetchCollaborators = async () => {
//       try {
//         setLoading(true)
//         // Simulate API call delay
//         setTimeout(() => {
//           const fetchedCollaborators = getNoteCollaborators(noteId)
//           setCollaborators(fetchedCollaborators)
//           setLoading(false)
//         }, 1000)
//       } catch (error) {
//         console.error("Error fetching collaborators:", error)
//         setLoading(false)
//       }
//     }

//     fetchCollaborators()
//   }, [noteId])

//   const handleAddCollaborator = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!email) return

//     setIsAdding(true)
//     try {
//       // Simulate API call delay
//       setTimeout(() => {
//         const newCollaborator = addCollaborator(noteId, email, permission)
//         setCollaborators([...collaborators, newCollaborator])
//         setEmail("")
//         setPermission("view")
//         setIsAdding(false)
//         toast({
//           title: "Collaborator added",
//           description: `${newCollaborator.name} has been added as a collaborator.`,
//         })
//       }, 1000)
//     } catch (error) {
//       console.error("Error adding collaborator:", error)
//       setIsAdding(false)
//       toast({
//         title: "Error",
//         description: "Failed to add collaborator. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleRemoveCollaborator = async (collaboratorId: string) => {
//     try {
//       await removeCollaborator(noteId, collaboratorId)
//       setCollaborators(collaborators.filter((c) => c.id !== collaboratorId))
//       toast({
//         title: "Collaborator removed",
//         description: "The collaborator has been removed successfully.",
//       })
//     } catch (error) {
//       console.error("Error removing collaborator:", error)
//       toast({
//         title: "Error",
//         description: "Failed to remove collaborator. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   if (loading) {
//     return (
//       <div className="space-y-4">
//         <Skeleton className="h-8 w-[250px]" />
//         <Skeleton className="h-10 w-full" />
//         <Skeleton className="h-20 w-full" />
//         <Skeleton className="h-20 w-full" />
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Add Collaborators</CardTitle>
//           <CardDescription>Invite others to view or edit this note.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleAddCollaborator} className="flex flex-col gap-4 md:flex-row md:items-end">
//             <div className="flex-1 space-y-2">
//               <Label htmlFor="email">Email address</Label>
//               <div className="flex items-center">
//                 <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="email"
//                   placeholder="colleague@example.com"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="w-full space-y-2 md:w-[180px]">
//               <Label htmlFor="permission">Permission</Label>
//               <Select value={permission} onValueChange={setPermission}>
//                 <SelectTrigger id="permission">
//                   <SelectValue placeholder="Select permission" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="view">Can view</SelectItem>
//                   <SelectItem value="comment">Can comment</SelectItem>
//                   <SelectItem value="edit">Can edit</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <Button type="submit" disabled={isAdding} className="md:ml-2">
//               {isAdding ? (
//                 "Adding..."
//               ) : (
//                 <>
//                   <UserPlus className="mr-2 h-4 w-4" />
//                   Add
//                 </>
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>

//       <div className="space-y-4">
//         <h3 className="text-lg font-medium">Current Collaborators</h3>
//         {collaborators.length > 0 ? (
//           <div className="space-y-3">
//             {collaborators.map((collaborator) => (
//               <div key={collaborator.id} className="flex items-center justify-between rounded-md border p-3">
//                 <div className="flex items-center gap-3">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src={collaborator.avatar || "/placeholder.svg"} alt={collaborator.name} />
//                     <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="font-medium">{collaborator.name}</p>
//                     <p className="text-sm text-muted-foreground">{collaborator.email}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <span className="text-sm capitalize">
//                     {collaborator.permission === "view"
//                       ? "Can view"
//                       : collaborator.permission === "comment"
//                         ? "Can comment"
//                         : "Can edit"}
//                   </span>
//                   <Button variant="ghost" size="icon" onClick={() => handleRemoveCollaborator(collaborator.id)}>
//                     <X className="h-4 w-4" />
//                     <span className="sr-only">Remove</span>
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <Card className="flex h-[100px] items-center justify-center p-6">
//             <div className="text-center">
//               <p className="text-sm text-muted-foreground">
//                 No collaborators yet. Add someone to collaborate on this note.
//               </p>
//             </div>
//           </Card>
//         )}
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Skeleton } from "../ui/skeleton"
import { X, UserPlus, Mail } from "lucide-react"
import { getNoteCollaborators, addCollaborator, removeCollaborator } from "../../services/collaboration-service"
import type { Collaborator } from "../../types/collaborator"
import { useToast } from "../../hooks/use-toast"

interface NoteCollaboratorsProps {
  noteId: string
}

export function NoteCollaborators({ noteId }: NoteCollaboratorsProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [permission, setPermission] = useState("view")
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        setLoading(true)
        const fetchedCollaborators = await getNoteCollaborators(noteId)
        setCollaborators(fetchedCollaborators)
        setError(null)
      } catch (err) {
        console.error("Error fetching collaborators:", err)
        setError("Failed to load collaborators")
      } finally {
        setLoading(false)
      }
    }

    fetchCollaborators()
  }, [noteId])

  const handleAddCollaborator = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsAdding(true)
    try {
      const newCollaborator = await addCollaborator(noteId, email, permission)
      setCollaborators([...collaborators, newCollaborator])
      setEmail("")
      setPermission("view")
      toast({
        title: "Collaborator added",
        description: `${newCollaborator.name} has been added as a collaborator.`,
      })
    } catch (error) {
      console.error("Error adding collaborator:", error)
      toast({
        title: "Error",
        description: "Failed to add collaborator. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  const handleRemoveCollaborator = async (collaboratorId: string) => {
    try {
      await removeCollaborator(noteId, collaboratorId)
      setCollaborators(collaborators.filter((c) => c.id !== collaboratorId))
      toast({
        title: "Collaborator removed",
        description: "The collaborator has been removed successfully.",
      })
    } catch (error) {
      console.error("Error removing collaborator:", error)
      toast({
        title: "Error",
        description: "Failed to remove collaborator. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Error</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Collaborators</CardTitle>
          <CardDescription>Invite others to view or edit this note.</CardDescription>
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
            <Button type="submit" disabled={isAdding} className="md:ml-2">
              {isAdding ? (
                "Adding..."
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

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
                    <p className="text-sm text-muted-foreground">{collaborator.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm capitalize">
                    {collaborator.permission === "view"
                      ? "Can view"
                      : collaborator.permission === "comment"
                        ? "Can comment"
                        : "Can edit"}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveCollaborator(collaborator.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="flex h-[100px] items-center justify-center p-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                No collaborators yet. Add someone to collaborate on this note.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}