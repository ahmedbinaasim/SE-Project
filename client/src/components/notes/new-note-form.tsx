"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { createNote } from "../../services/notes-service"
import { useToast } from "../../hooks/use-toast"
import { TagInput } from "../ui/tag-input"

export default function NewNoteForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [note, setNote] = useState({
    title: "",
    content: "",
    tags: [] as string[]
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNote(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTagsChange = (tags: string[]) => {
    setNote(prev => ({
      ...prev,
      tags
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!note.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your note",
        variant: "destructive"
      })
      return
    }
    
    if (!note.content.trim()) {
      toast({
        title: "Missing content",
        description: "Please add some content to your note",
        variant: "destructive"
      })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const createdNote = await createNote(note)
      toast({
        title: "Note created",
        description: "Your note has been created successfully"
      })
      router.push(`/dashboard/notes/${createdNote.id}`)
    } catch (error) {
      console.error("Error creating note:", error)
      toast({
        title: "Error",
        description: "Failed to create note. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Note Title"
              value={note.title}
              onChange={handleChange}
              className="text-lg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <TagInput 
              id="tags"
              placeholder="Add tags (press Enter after each tag)..."
              tags={note.tags}
              setTags={handleTagsChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your note content here..."
              value={note.content}
              onChange={handleChange}
              className="min-h-[300px] resize-y"
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Note"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}