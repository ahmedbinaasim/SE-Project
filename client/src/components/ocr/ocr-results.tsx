"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Textarea } from "../ui/textarea"
import { Copy, FileText, Download } from "lucide-react"
import { useToast } from "../../hooks/use-toast"
import { getOcrResults, saveOcrAsNote } from "../../services/ocr-service"

export function OcrResults() {
  const [text, setText] = useState<string>("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate fetching OCR results
    const fetchResults = async () => {
      try {
        const results = await getOcrResults()
        if (results) {
          setText(results)
        }
      } catch (error) {
        console.error("Error fetching OCR results:", error)
      }
    }

    fetchResults()
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The OCR text has been copied to your clipboard.",
    })
  }

  const handleSaveAsNote = async () => {
    if (!text.trim()) {
      toast({
        title: "No text to save",
        description: "Please process a document first.",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      await saveOcrAsNote(text)
      toast({
        title: "Saved as note",
        description: "The OCR text has been saved as a new note.",
      })
    } catch (error) {
      console.error("Error saving OCR as note:", error)
      toast({
        title: "Error",
        description: "Failed to save as note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <CardHeader>
        <CardTitle>OCR Results</CardTitle>
        <CardDescription>Extracted text from your document. You can edit before saving.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="text">
          <TabsList className="mb-4">
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="text">
            <Textarea
              placeholder="OCR text will appear here after processing..."
              className="min-h-[300px]"
              value={text}
              onChange={handleTextChange}
            />
          </TabsContent>
          <TabsContent value="preview">
            <div className="min-h-[300px] rounded-md border p-4">
              {text ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {text.split("\n").map((line, i) => (
                    <p key={i}>{line || <br />}</p>
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <p>No content to preview</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopy} disabled={!text}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" disabled={!text}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        <Button onClick={handleSaveAsNote} disabled={!text || saving}>
          {saving ? (
            "Saving..."
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Save as Note
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
