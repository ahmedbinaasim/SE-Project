// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"

// import { useState, useEffect } from "react"
// import { DashboardShell } from "../../../../components/dashboard/dashboard-shell"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
// import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
// import { Input } from "../../../../components/ui/input"
// import { Button } from "../../../../components/ui/button"
// import { Search, X, Users, ArrowUpRight } from "lucide-react"
// import Link from "next/link"
// import { getSharedNotes, getSharedByMeNotes } from "../../../../services/notes-service"
// import type { Note } from "../../../../types/note"

// export default function CollaboratorsPage() {
//   const [notesSharedWithMe, setNotesSharedWithMe] = useState<Note[]>([])
//   const [notesSharedByMe, setNotesSharedByMe] = useState<Note[]>([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
  
//   // Create maps of collaborators from notes
//   const [collaboratorsWithMe, collaboratorsByMe] = useState<[Map<string, any>, Map<string, any>]>([new Map(), new Map()]);
  
//   // Process notes to extract collaborators
//   useEffect(() => {
//     // For notes shared with me - get the owners
//     const withMe = new Map();
//     notesSharedWithMe.forEach(note => {
//       if (note.author && note.author.id) {
//         if (!withMe.has(note.author.id)) {
//           withMe.set(note.author.id, {
//             id: note.author.id,
//             name: note.author.name,
//             email: note.author.email || "",
//             avatar: note.author.avatar || "/placeholder.svg",
//             notes: []
//           });
//         }
//         withMe.get(note.author.id).notes.push({
//           id: note.id,
//           title: note.title,
//           updatedAt: note.updatedAt
//         });
//       }
//     });
    
//     // For notes shared by me - get the collaborators
//     const byMe = new Map();
//     notesSharedByMe.forEach(note => {
//       if (note.collaborators) {
//         note.collaborators.forEach((collab: any) => {
//           const collabId = typeof collab.user === 'string' ? collab.user : collab.user?.id;
//           const collabName = typeof collab.user === 'string' ? 'Unknown' : collab.user?.name || 'Unknown';
//           const collabEmail = typeof collab.user === 'string' ? '' : collab.user?.email || '';
//           const collabAvatar = typeof collab.user === 'string' ? '/placeholder.svg' : collab.user?.avatar || '/placeholder.svg';
          
//           if (!byMe.has(collabId)) {
//             byMe.set(collabId, {
//               id: collabId,
//               name: collabName,
//               email: collabEmail,
//               avatar: collabAvatar,
//               notes: []
//             });
//           }
//           byMe.get(collabId).notes.push({
//             id: note.id,
//             title: note.title,
//             updatedAt: note.updatedAt,
//             permission: collab.permission
//           });
//         });
//       }
//     });
    
//     setCollaboratorsWithMe(withMe);
//     setCollaboratorsByMe(byMe);
//   }, [notesSharedWithMe, notesSharedByMe]);

//   useEffect(() => {
//     const fetchSharedNotes = async () => {
//       try {
//         setLoading(true)
//         setError(null)
        
//         // Fetch notes shared with the user
//         const withMe = await getSharedNotes()
//         setNotesSharedWithMe(withMe)
        
//         // Fetch notes shared by the user
//         const byMe = await getSharedByMeNotes()
//         setNotesSharedByMe(byMe)
//       } catch (err) {
//         console.error("Error fetching shared notes:", err)
//         setError("Failed to load collaborator information")
//       } finally {
//         setLoading(false)
//       }
//     }
    
//     fetchSharedNotes()
//   }, [])

//   // Filter collaborators based on search term
//   const filteredCollaboratorsWithMe = Array.from(collaboratorsWithMe.values()).filter(collab => 
//     collab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     collab.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   const filteredCollaboratorsByMe = Array.from(collaboratorsByMe.values()).filter(collab => 
//     collab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     collab.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value)
//   }

//   const handleClearSearch = () => {
//     setSearchTerm("")
//   }

//   if (loading) {
//     return (
//       <DashboardShell>
//         <div className="flex flex-col gap-4">
//           <h1 className="text-2xl font-bold tracking-tight">Collaborators</h1>
//           <p className="text-muted-foreground">
//             Manage your note sharing and collaboration with others.
//           </p>
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-center">
//                 <p>Loading collaborator information...</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </DashboardShell>
//     )
//   }

//   if (error) {
//     return (
//       <DashboardShell>
//         <div className="flex flex-col gap-4">
//           <h1 className="text-2xl font-bold tracking-tight">Collaborators</h1>
//           <p className="text-muted-foreground">
//             Manage your note sharing and collaboration with others.
//           </p>
//           <Card>
//             <CardContent className="p-6">
//               <div className="text-center">
//                 <p className="text-destructive">{error}</p>
//                 <Button 
//                   variant="outline" 
//                   className="mt-4"
//                   onClick={() => window.location.reload()}
//                 >
//                   Try Again
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </DashboardShell>
//     )
//   }

//   return (
//     <DashboardShell>
//       <div className="flex flex-col gap-6">
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight">Collaborators</h1>
//             <p className="text-muted-foreground">
//               Manage your note sharing and collaboration with others.
//             </p>
//           </div>
//           <div className="relative w-full sm:w-auto sm:min-w-[260px]">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search collaborators..."
//               className="pl-8"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             {searchTerm && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-0 top-0 h-9 w-9"
//                 onClick={handleClearSearch}
//               >
//                 <X className="h-4 w-4" />
//                 <span className="sr-only">Clear search</span>
//               </Button>
//             )}
//           </div>
//         </div>

//         <Tabs defaultValue="sharing-with-me">
//           <TabsList>
//             <TabsTrigger value="sharing-with-me">Sharing with me</TabsTrigger>
//             <TabsTrigger value="my-sharing">My sharing</TabsTrigger>
//           </TabsList>
          
//           <TabsContent value="sharing-with-me" className="mt-6">
//             {filteredCollaboratorsWithMe.length > 0 ? (
//               <div className="space-y-6">
//                 <h2 className="text-lg font-medium">People sharing notes with you</h2>
//                 <div className="space-y-4">
//                   {filteredCollaboratorsWithMe.map(collaborator => (
//                     <Card key={collaborator.id}>
//                       <CardHeader className="p-4 pb-0">
//                         <div className="flex items-center gap-3">
//                           <Avatar className="h-10 w-10">
//                             <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
//                             <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
//                           </Avatar>
//                           <div>
//                             <CardTitle className="text-base">{collaborator.name}</CardTitle>
//                             <CardDescription>{collaborator.email}</CardDescription>
//                           </div>
//                         </div>
//                       </CardHeader>
//                       <CardContent className="p-4">
//                         <h4 className="mb-2 text-sm font-medium">Shared Notes</h4>
//                         <ul className="space-y-2">
//                           {collaborator.notes.map(note => (
//                             <li key={note.id} className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
//                               <span className="line-clamp-1">{note.title}</span>
//                               <Link href={`/dashboard/notes/${note.id}`}>
//                                 <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
//                                   <ArrowUpRight className="h-4 w-4" />
//                                   <span className="sr-only">View note</span>
//                                 </Button>
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <Card>
//                 <CardContent className="flex h-[200px] flex-col items-center justify-center p-6">
//                   <Users className="mb-4 h-12 w-12 text-muted-foreground" />
//                   <h3 className="text-lg font-semibold">No collaborators found</h3>
//                   {searchTerm ? (
//                     <p className="mt-2 text-center text-sm text-muted-foreground">
//                       No one matches your search. Try with a different name or email.
//                     </p>
//                   ) : (
//                     <p className="mt-2 text-center text-sm text-muted-foreground">
//                       No one is sharing notes with you yet. When someone shares a note with you, they&apos;ll appear here.
//                     </p>
//                   )}
//                 </CardContent>
//               </Card>
//             )}
//           </TabsContent>
          
//           <TabsContent value="my-sharing" className="mt-6">
//             {filteredCollaboratorsByMe.length > 0 ? (
//               <div className="space-y-6">
//                 <h2 className="text-lg font-medium">People you&apos;re sharing notes with</h2>
//                 <div className="space-y-4">
//                   {filteredCollaboratorsByMe.map(collaborator => (
//                     <Card key={collaborator.id}>
//                       <CardHeader className="p-4 pb-0">
//                         <div className="flex items-center gap-3">
//                           <Avatar className="h-10 w-10">
//                             <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
//                             <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
//                           </Avatar>
//                           <div>
//                             <CardTitle className="text-base">{collaborator.name}</CardTitle>
//                             <CardDescription>{collaborator.email}</CardDescription>
//                           </div>
//                         </div>
//                       </CardHeader>
//                       <CardContent className="p-4">
//                         <h4 className="mb-2 text-sm font-medium">Notes you're sharing</h4>
//                         <ul className="space-y-2">
//                           {collaborator.notes.map(note => (
//                             <li key={note.id} className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
//                               <div className="flex items-center gap-2">
//                                 <span className="line-clamp-1">{note.title}</span>
//                                 <span className="rounded-full bg-background px-2 py-0.5 text-xs">
//                                   {note.permission === 'view' ? 'Can view' : 
//                                    note.permission === 'comment' ? 'Can comment' : 'Can edit'}
//                                 </span>
//                               </div>
//                               <div className="flex gap-1">
//                                 <Link href={`/dashboard/notes/${note.id}`}>
//                                   <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
//                                     <ArrowUpRight className="h-4 w-4" />
//                                     <span className="sr-only">View note</span>
//                                   </Button>
//                                 </Link>
//                                 <Link href={`/dashboard/notes/${note.id}/share`}>
//                                   <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
//                                     <Users className="h-4 w-4" />
//                                     <span className="sr-only">Manage sharing</span>
//                                   </Button>
//                                 </Link>
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <Card>
//                 <CardContent className="flex h-[200px] flex-col items-center justify-center p-6">
//                   <Users className="mb-4 h-12 w-12 text-muted-foreground" />
//                   <h3 className="text-lg font-semibold">No collaborators found</h3>
//                   {searchTerm ? (
//                     <p className="mt-2 text-center text-sm text-muted-foreground">
//                       No one matches your search. Try with a different name or email.
//                     </p>
//                   ) : (
//                     <p className="mt-2 text-center text-sm text-muted-foreground">
//                       You haven&apos;t shared any notes yet. When you share notes with others, they&apos;ll appear here.
//                     </p>
//                   )}
//                 </CardContent>
//               </Card>
//             )}
//           </TabsContent>
//         </Tabs>
//       </div>
//     </DashboardShell>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "../../../../components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar"
import { Input } from "../../../../components/ui/input"
import { Button } from "../../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { Search, X, Users, ArrowUpRight, Copy } from "lucide-react"
import Link from "next/link"
import { getSharedNotes, getSharedByMeNotes } from "../../../../services/notes-service"
import { updateCollaboratorPermission } from "../../../../services/collaboration-service"
import { useToast } from "../../../../hooks/use-toast"
import type { Note } from "../../../../types/note"

interface CollaboratorInfo {
  id: string
  name: string
  email: string
  avatar: string
  notes: Array<{
    id: string
    title: string
    updatedAt: string
    permission?: string
  }>
}

export default function CollaboratorsPage() {
  const [notesSharedWithMe, setNotesSharedWithMe] = useState<Note[]>([])
  const [notesSharedByMe, setNotesSharedByMe] = useState<Note[]>([])
  const [collaboratorsWithMe, setCollaboratorsWithMe] = useState<Map<string, CollaboratorInfo>>(new Map())
  const [collaboratorsByMe, setCollaboratorsByMe] = useState<Map<string, CollaboratorInfo>>(new Map())
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingCollaboratorId, setUpdatingCollaboratorId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSharedNotes = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const [withMe, byMe] = await Promise.all([
          getSharedNotes(),
          getSharedByMeNotes()
        ])
        setNotesSharedWithMe(withMe)
        setNotesSharedByMe(byMe)
      } catch (err) {
        console.error("Error fetching shared notes:", err)
        setError("Failed to load collaborator information")
      } finally {
        setLoading(false)
      }
    }
    
    fetchSharedNotes()
  }, [])

  useEffect(() => {
    // For notes shared with me - get the owners
    const withMe = new Map<string, CollaboratorInfo>()
    notesSharedWithMe.forEach(note => {
      if (note.author && note.author.id) {
        if (!withMe.has(note.author.id)) {
          withMe.set(note.author.id, {
            id: note.author.id,
            name: note.author.name || "Unknown",
            email: note.author.email || "",
            avatar: note.author.avatar || "/placeholder.svg",
            notes: []
          })
        }
        withMe.get(note.author.id)!.notes.push({
          id: note.id,
          title: note.title,
          updatedAt: note.updatedAt
        })
      }
    })
    
    // For notes shared by me - get the collaborators
    const byMe = new Map<string, CollaboratorInfo>()
    notesSharedByMe.forEach(note => {
      if (note.collaborators) {
        note.collaborators.forEach(collab => {
          const collabId = typeof collab.user === 'string' ? collab.user : collab.user?.id
          const collabName = typeof collab.user === 'string' ? 'Unknown' : collab.user?.name || 'Unknown'
          const collabEmail = typeof collab.user === 'string' ? '' : collab.user?.email || ''
          const collabAvatar = typeof collab.user === 'string' ? '/placeholder.svg' : collab.user?.avatar || '/placeholder.svg'
          
          if (!byMe.has(collabId)) {
            byMe.set(collabId, {
              id: collabId,
              name: collabName,
              email: collabEmail,
              avatar: collabAvatar,
              notes: []
            })
          }
          byMe.get(collabId)!.notes.push({
            id: note.id,
            title: note.title,
            updatedAt: note.updatedAt,
            permission: collab.permission
          })
        })
      }
    })
    
    setCollaboratorsWithMe(withMe)
    setCollaboratorsByMe(byMe)
  }, [notesSharedWithMe, notesSharedByMe])

  const handleUpdatePermission = async (noteId: string, collaboratorId: string, newPermission: string) => {
    try {
      setUpdatingCollaboratorId(collaboratorId)
      await updateCollaboratorPermission(noteId, collaboratorId, newPermission)
      
      // Update the local state
      setCollaboratorsByMe(prev => {
        const newMap = new Map(prev)
        const collaborator = newMap.get(collaboratorId)
        if (collaborator) {
          collaborator.notes = collaborator.notes.map(note => 
            note.id === noteId ? { ...note, permission: newPermission } : note
          )
        }
        return newMap
      })
      
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

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    toast({
      title: "Email copied",
      description: "Collaborator's email has been copied to clipboard."
    })
  }

  const filteredCollaboratorsWithMe = Array.from(collaboratorsWithMe.values()).filter(collab => 
    collab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collab.email.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const filteredCollaboratorsByMe = Array.from(collaboratorsByMe.values()).filter(collab => 
    collab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collab.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
  }

  if (loading) {
    return (
      <DashboardShell>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Collaborators</h1>
          <p className="text-muted-foreground">
            Manage your note sharing and collaboration with others.
          </p>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p>Loading collaborator information...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    )
  }

  if (error) {
    return (
      <DashboardShell>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Collaborators</h1>
          <p className="text-muted-foreground">
            Manage your note sharing and collaboration with others.
          </p>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-destructive">{error}</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Collaborators</h1>
            <p className="text-muted-foreground">
              Manage your note sharing and collaboration with others.
            </p>
          </div>
          <div className="relative w-full sm:w-auto sm:min-w-[260px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search collaborators..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
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

        <Tabs defaultValue="sharing-with-me">
          <TabsList>
            <TabsTrigger value="sharing-with-me">Sharing with me</TabsTrigger>
            <TabsTrigger value="my-sharing">My sharing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sharing-with-me" className="mt-6">
            {filteredCollaboratorsWithMe.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">People sharing notes with you</h2>
                <div className="space-y-4">
                  {filteredCollaboratorsWithMe.map(collaborator => (
                    <Card key={collaborator.id}>
                      <CardHeader className="p-4 pb-0">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                            <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{collaborator.name}</CardTitle>
                            <div className="flex items-center gap-1">
                              <CardDescription>{collaborator.email}</CardDescription>
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
                      </CardHeader>
                      <CardContent className="p-4">
                        <h4 className="mb-2 text-sm font-medium">Shared Notes</h4>
                        <ul className="space-y-2">
                          {collaborator.notes.map(note => (
                            <li key={note.id} className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                              <span className="line-clamp-1">{note.title}</span>
                              <Link href={`/dashboard/notes/${note.id}`}>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                  <ArrowUpRight className="h-4 w-4" />
                                  <span className="sr-only">View note</span>
                                </Button>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="flex h-[200px] flex-col items-center justify-center p-6">
                  <Users className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">No collaborators found</h3>
                  {searchTerm ? (
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                      No one matches your search. Try with a different name or email.
                    </p>
                  ) : (
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                      No one is sharing notes with you yet. When someone shares a note with you, they&apos;ll appear here.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="my-sharing" className="mt-6">
            {filteredCollaboratorsByMe.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-lg font-medium">People you&apos;re sharing notes with</h2>
                <div className="space-y-4">
                  {filteredCollaboratorsByMe.map(collaborator => (
                    <Card key={collaborator.id}>
                      <CardHeader className="p-4 pb-0">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                            <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{collaborator.name}</CardTitle>
                            <div className="flex items-center gap-1">
                              <CardDescription>{collaborator.email}</CardDescription>
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
                      </CardHeader>
                      <CardContent className="p-4">
                        <h4 className="mb-2 text-sm font-medium">Notes you&apos;re sharing</h4>
                        <ul className="space-y-2">
                          {collaborator.notes.map(note => (
                            <li key={note.id} className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="line-clamp-1">{note.title}</span>
                                <Select 
                                  value={note.permission} 
                                  onValueChange={(value) => handleUpdatePermission(note.id, collaborator.id, value)}
                                  disabled={updatingCollaboratorId === collaborator.id}
                                >
                                  <SelectTrigger className="w-[120px] h-7 text-xs">
                                    <SelectValue placeholder="Permission" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="view">Can view</SelectItem>
                                    <SelectItem value="comment">Can comment</SelectItem>
                                    <SelectItem value="edit">Can edit</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex gap-1">
                                <Link href={`/dashboard/notes/${note.id}`}>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <ArrowUpRight className="h-4 w-4" />
                                    <span className="sr-only">View note</span>
                                  </Button>
                                </Link>
                                <Link href={`/dashboard/notes/${note.id}/share`}>
                                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                    <Users className="h-4 w-4" />
                                    <span className="sr-only">Manage sharing</span>
                                  </Button>
                                </Link>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="flex h-[200px] flex-col items-center justify-center p-6">
                  <Users className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">No collaborators found</h3>
                  {searchTerm ? (
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                      No one matches your search. Try with a different name or email.
                    </p>
                  ) : (
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                      You haven&apos;t shared any notes yet. When you share notes with others, they&apos;ll appear here.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}