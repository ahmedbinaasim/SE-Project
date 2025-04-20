// // // Change import statements to use relative paths
// // "use client"

// // import { useState, useEffect } from "react"
// // import { Button } from "../ui/button"
// // import { Card, CardContent } from "../ui/card"
// // import { Skeleton } from "../ui/skeleton"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
// // import { Brain, Copy, Download } from "lucide-react"
// // import { getNoteById, generateNoteSummary } from "../../services/notes-service"
// // import type { Note } from "../../types/note"
// // import { useToast } from "../../hooks/use-toast"

// // interface NoteSummaryProps {
// //   noteId: string
// // }

// // export function NoteSummary({ noteId }: NoteSummaryProps) {
// //   const [note, setNote] = useState<Note | null>(null)
// //   const [summary, setSummary] = useState<string | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [generating, setGenerating] = useState(false)
// //   const { toast } = useToast()

// //   useEffect(() => {
// //     const fetchNote = async () => {
// //       try {
// //         setLoading(true)
// //         // Simulate API call delay
// //         setTimeout(() => {
// //           const fetchedNote = getNoteById(noteId)
// //           setNote(fetchedNote)
// //           if (fetchedNote && fetchedNote.summary) {
// //             setSummary(fetchedNote.summary)
// //           } else {
// //             setSummary(null)
// //           }
// //           setLoading(false)
// //         }, 1000)
// //       } catch (error) {
// //         console.error("Error fetching note:", error)
// //         setLoading(false)
// //       }
// //     }

// //     fetchNote()
// //   }, [noteId])

// //   const handleGenerateSummary = async () => {
// //     if (!note) return

// //     setGenerating(true)
// //     try {
// //       // Simulate API call delay
// //       setTimeout(() => {
// //         const generatedSummary = generateNoteSummary(noteId)
// //         setSummary(generatedSummary)
// //         setGenerating(false)
// //         toast({
// //           title: "Summary generated",
// //           description: "Your note summary has been generated successfully.",
// //         })
// //       }, 2000)
// //     } catch (error) {
// //       console.error("Error generating summary:", error)
// //       setGenerating(false)
// //       toast({
// //         title: "Error",
// //         description: "Failed to generate summary. Please try again.",
// //         variant: "destructive",
// //       })
// //     }
// //   }

// //   const handleCopy = () => {
// //     if (summary) {
// //       navigator.clipboard.writeText(summary)
// //       toast({
// //         title: "Copied to clipboard",
// //         description: "The summary has been copied to your clipboard.",
// //       })
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <div className="space-y-4">
// //         <Skeleton className="h-8 w-[250px]" />
// //         <Skeleton className="h-4 w-full" />
// //         <Skeleton className="h-4 w-full" />
// //         <Skeleton className="h-4 w-3/4" />
// //         <Skeleton className="h-32 w-full" />
// //       </div>
// //     )
// //   }

// //   if (!note) {
// //     return (
// //       <Card className="flex h-[300px] items-center justify-center p-6">
// //         <div className="text-center">
// //           <h3 className="text-lg font-semibold">Note not found</h3>
// //           <p className="text-muted-foreground">The note you are looking for does not exist or has been deleted.</p>
// //         </div>
// //       </Card>
// //     )
// //   }

// //   return (
// //     <div className="space-y-4">
// //       {summary ? (
// //         <div className="space-y-4">
// //           <div className="flex items-center justify-between">
// //             <h2 className="text-xl font-semibold">AI-Generated Summary</h2>
// //             <div className="flex gap-2">
// //               <Button variant="outline" size="sm" onClick={handleCopy}>
// //                 <Copy className="mr-2 h-4 w-4" />
// //                 Copy
// //               </Button>
// //               <Button variant="outline" size="sm">
// //                 <Download className="mr-2 h-4 w-4" />
// //                 Export
// //               </Button>
// //               <Button size="sm" onClick={handleGenerateSummary} disabled={generating}>
// //                 <Brain className="mr-2 h-4 w-4" />
// //                 {generating ? "Regenerating..." : "Regenerate"}
// //               </Button>
// //             </div>
// //           </div>
// //           <Tabs defaultValue="concise">
// //             <TabsList>
// //               <TabsTrigger value="concise">Concise</TabsTrigger>
// //               <TabsTrigger value="detailed">Detailed</TabsTrigger>
// //               <TabsTrigger value="bullet">Bullet Points</TabsTrigger>
// //             </TabsList>
// //             <TabsContent value="concise" className="mt-4">
// //               <Card>
// //                 <CardContent className="pt-6">
// //                   <p>{summary}</p>
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>
// //             <TabsContent value="detailed" className="mt-4">
// //               <Card>
// //                 <CardContent className="pt-6">
// //                   <p>
// //                     {note.detailedSummary || "Detailed summary not available. Generate one by clicking 'Regenerate'."}
// //                   </p>
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>
// //             <TabsContent value="bullet" className="mt-4">
// //               <Card>
// //                 <CardContent className="pt-6">
// //                   <ul className="list-disc pl-5 space-y-2">
// //                     {note.bulletPoints ? (
// //                       note.bulletPoints.map((point, index) => <li key={index}>{point}</li>)
// //                     ) : (
// //                       <li>Bullet points not available. Generate them by clicking &apos;Regenerate&apos;.</li>
// //                     )}
// //                   </ul>
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>
// //           </Tabs>
// //         </div>
// //       ) : (
// //         <Card className="flex flex-col items-center justify-center p-6 space-y-4">
// //           <Brain className="h-12 w-12 text-muted-foreground" />
// //           <div className="text-center">
// //             <h3 className="text-lg font-semibold">No summary available</h3>
// //             <p className="text-muted-foreground mb-4">
// //               Generate an AI-powered summary of this note to quickly grasp the key points.
// //             </p>
// //             <Button onClick={handleGenerateSummary} disabled={generating}>
// //               <Brain className="mr-2 h-4 w-4" />
// //               {generating ? "Generating..." : "Generate Summary"}
// //             </Button>
// //           </div>
// //         </Card>
// //       )}
// //     </div>
// //   )
// // }

// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "../ui/button"
// import { Card, CardContent } from "../ui/card"
// import { Skeleton } from "../ui/skeleton"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
// import { Brain, Copy, Download } from "lucide-react"
// import { getNoteById, generateNoteSummary, getNoteSummary } from "../../services/notes-service"
// import type { Note } from "../../types/note"
// import { useToast } from "../../hooks/use-toast"

// interface NoteSummaryProps {
//   noteId: string
// }

// export function NoteSummary({ noteId }: NoteSummaryProps) {
//   const [note, setNote] = useState<Note | null>(null)
//   const [summary, setSummary] = useState<{
//     concise: string;
//     detailed: string;
//     bulletPoints: string[];
//   } | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [generating, setGenerating] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const { toast } = useToast()

//   useEffect(() => {
//     const fetchNoteAndSummary = async () => {
//       try {
//         setLoading(true)
//         // Fetch note data
//         const fetchedNote = await getNoteById(noteId)
//         setNote(fetchedNote)
        
//         // If note has a summary, fetch it
//         if (fetchedNote && fetchedNote.hasSummary) {
//           try {
//             const fetchedSummary = await getNoteSummary(noteId)
//             setSummary(fetchedSummary)
//           } catch (summaryError) {
//             console.error("Error fetching summary:", summaryError)
//             // If we can't fetch the summary, don't show an error to the user
//             // Just indicate there's no summary available
//           }
//         } else {
//           setSummary(null)
//         }
        
//         setError(null)
//       } catch (err) {
//         console.error("Error fetching note:", err)
//         setError("Failed to load note data")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchNoteAndSummary()
//   }, [noteId])

//   const handleGenerateSummary = async () => {
//     if (!note) return

//     setGenerating(true)
//     try {
//       const generatedSummary = await generateNoteSummary(noteId)
//       setSummary(generatedSummary)
      
//       // Update the local note state to show it has a summary
//       setNote(prevNote => {
//         if (prevNote) {
//           return { ...prevNote, hasSummary: true }
//         }
//         return prevNote
//       })
      
//       toast({
//         title: "Summary generated",
//         description: "Your note summary has been generated successfully.",
//       })
//     } catch (error) {
//       console.error("Error generating summary:", error)
//       toast({
//         title: "Error",
//         description: "Failed to generate summary. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setGenerating(false)
//     }
//   }

//   const handleCopy = (text: string) => {
//     navigator.clipboard.writeText(text)
//     toast({
//       title: "Copied to clipboard",
//       description: "The summary has been copied to your clipboard.",
//     })
//   }

//   if (loading) {
//     return (
//       <div className="space-y-4">
//         <Skeleton className="h-8 w-[250px]" />
//         <Skeleton className="h-4 w-full" />
//         <Skeleton className="h-4 w-full" />
//         <Skeleton className="h-4 w-3/4" />
//         <Skeleton className="h-32 w-full" />
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <Card className="flex h-[300px] items-center justify-center p-6">
//         <div className="text-center">
//           <h3 className="text-lg font-semibold">Error</h3>
//           <p className="text-muted-foreground">{error}</p>
//         </div>
//       </Card>
//     )
//   }

//   if (!note) {
//     return (
//       <Card className="flex h-[300px] items-center justify-center p-6">
//         <div className="text-center">
//           <h3 className="text-lg font-semibold">Note not found</h3>
//           <p className="text-muted-foreground">The note you are looking for does not exist or has been deleted.</p>
//         </div>
//       </Card>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {summary ? (
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-semibold">AI-Generated Summary</h2>
//             <div className="flex gap-2">
//               <Button variant="outline" size="sm" onClick={() => handleCopy(summary.concise)}>
//                 <Copy className="mr-2 h-4 w-4" />
//                 Copy
//               </Button>
//               <Button variant="outline" size="sm">
//                 <Download className="mr-2 h-4 w-4" />
//                 Export
//               </Button>
//               <Button size="sm" onClick={handleGenerateSummary} disabled={generating}>
//                 <Brain className="mr-2 h-4 w-4" />
//                 {generating ? "Regenerating..." : "Regenerate"}
//               </Button>
//             </div>
//           </div>
//           <Tabs defaultValue="concise">
//             <TabsList>
//               <TabsTrigger value="concise">Concise</TabsTrigger>
//               <TabsTrigger value="detailed">Detailed</TabsTrigger>
//               <TabsTrigger value="bullet">Bullet Points</TabsTrigger>
//             </TabsList>
//             <TabsContent value="concise" className="mt-4">
//               <Card>
//                 <CardContent className="pt-6">
//                   <p>{summary.concise}</p>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="detailed" className="mt-4">
//               <Card>
//                 <CardContent className="pt-6">
//                   <p>{summary.detailed || "Detailed summary not available. Generate one by clicking 'Regenerate'."}</p>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             <TabsContent value="bullet" className="mt-4">
//               <Card>
//                 <CardContent className="pt-6">
//                   <ul className="list-disc pl-5 space-y-2">
//                     {summary.bulletPoints && summary.bulletPoints.length > 0 ? (
//                       summary.bulletPoints.map((point, index) => <li key={index}>{point}</li>)
//                     ) : (
//                       <li>Bullet points not available. Generate them by clicking &apos;Regenerate&apos;.</li>
//                     )}
//                   </ul>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       ) : (
//         <Card className="flex flex-col items-center justify-center p-6 space-y-4">
//           <Brain className="h-12 w-12 text-muted-foreground" />
//           <div className="text-center">
//             <h3 className="text-lg font-semibold">No summary available</h3>
//             <p className="text-muted-foreground mb-4">
//               Generate an AI-powered summary of this note to quickly grasp the key points.
//             </p>
//             <Button onClick={handleGenerateSummary} disabled={generating}>
//               <Brain className="mr-2 h-4 w-4" />
//               {generating ? "Generating..." : "Generate Summary"}
//             </Button>
//           </div>
//         </Card>
//       )}
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Brain, Copy, Download } from "lucide-react"
import { getNoteById, generateNoteSummary, getNoteSummary } from "../../services/notes-service"
import type { Note } from "../../types/note"
import { useToast } from "../../hooks/use-toast"

interface NoteSummaryProps {
  noteId: string
}

export function NoteSummary({ noteId }: NoteSummaryProps) {
  const [note, setNote] = useState<Note | null>(null)
  const [summary, setSummary] = useState<{
    concise: string;
    detailed: string;
    bulletPoints: string[];
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch the note and its summary
  useEffect(() => {
    const fetchNoteAndSummary = async () => {
      try {
        setLoading(true)
        // Fetch note data
        const fetchedNote = await getNoteById(noteId)
        setNote(fetchedNote)
        
        // If note has a summary, fetch it
        if (fetchedNote && fetchedNote.hasSummary) {
          try {
            const fetchedSummary = await getNoteSummary(noteId)
            setSummary(fetchedSummary)
          } catch (summaryError) {
            console.error("Error fetching summary:", summaryError)
            // If we can't fetch the summary, don't show an error to the user
            // Just indicate there's no summary available
          }
        } else {
          setSummary(null)
        }
        
        setError(null)
      } catch (err) {
        console.error("Error fetching note:", err)
        setError("Failed to load note data")
      } finally {
        setLoading(false)
      }
    }

    fetchNoteAndSummary()
  }, [noteId])

  // Handle generating a new summary
  const handleGenerateSummary = async () => {
    if (!note) return

    setGenerating(true)
    try {
      const generatedSummary = await generateNoteSummary(noteId)
      setSummary(generatedSummary)
      
      // Update the local note state to show it has a summary
      setNote(prevNote => {
        if (prevNote) {
          return { ...prevNote, hasSummary: true }
        }
        return prevNote
      })
      
      toast({
        title: "Summary generated",
        description: "Your note summary has been generated successfully.",
      })
    } catch (error) {
      console.error("Error generating summary:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      toast({
        title: "Error",
        description: `Failed to generate summary: ${errorMessage}`,
        variant: "destructive",
      })
    } finally {
      setGenerating(false)
    }
  }

  // Copy text to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The summary has been copied to your clipboard.",
    })
  }

  // Display loading state
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  // Display error state
  if (error) {
    return (
      <Card className="flex h-[300px] items-center justify-center p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Error</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </Card>
    )
  }

  // Display not found state
  if (!note) {
    return (
      <Card className="flex h-[300px] items-center justify-center p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Note not found</h3>
          <p className="text-muted-foreground">The note you are looking for does not exist or has been deleted.</p>
        </div>
      </Card>
    )
  }

  // Display summary or generate summary UI
  return (
    <div className="space-y-4">
      {summary ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold">AI-Generated Summary</h2>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => handleCopy(summary.concise)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm" onClick={handleGenerateSummary} disabled={generating}>
                <Brain className="mr-2 h-4 w-4" />
                {generating ? "Regenerating..." : "Regenerate"}
              </Button>
            </div>
          </div>
          <Tabs defaultValue="concise">
            <TabsList>
              <TabsTrigger value="concise">Concise</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
              <TabsTrigger value="bullet">Bullet Points</TabsTrigger>
            </TabsList>
            <TabsContent value="concise" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p>{summary.concise}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="detailed" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p>{summary.detailed || "Detailed summary not available. Generate one by clicking 'Regenerate'."}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bullet" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <ul className="list-disc pl-5 space-y-2">
                    {summary.bulletPoints && summary.bulletPoints.length > 0 ? (
                      summary.bulletPoints.map((point, index) => <li key={index}>{point}</li>)
                    ) : (
                      <li>Bullet points not available. Generate them by clicking &apos;Regenerate&apos;.</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-6 space-y-4">
          <Brain className="h-12 w-12 text-muted-foreground" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">No summary available</h3>
            <p className="text-muted-foreground mb-4">
              Generate an AI-powered summary of this note to quickly grasp the key points.
            </p>
            <Button onClick={handleGenerateSummary} disabled={generating}>
              <Brain className="mr-2 h-4 w-4" />
              {generating ? "Generating..." : "Generate Summary"}
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}