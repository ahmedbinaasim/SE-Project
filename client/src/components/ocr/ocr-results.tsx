
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Textarea } from "../ui/textarea"
import { Copy, FileText, Download, Check } from "lucide-react"
import { useToast } from "../../hooks/use-toast"
import { getOcrResults, saveOcrAsNote } from "../../services/ocr-service"
import { onOcrUpdate } from "../../services/ocr-events"
import { jsPDF } from "jspdf"

export function OcrResults() {
  const [text, setText] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const fetchResults = async () => {
    setLoading(true)
    try {
      const results = await getOcrResults()
      if (results) {
        setText(results)
      }
    } catch (error) {
      console.error("Error fetching OCR results:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResults()

    // Listen for OCR updates
    const unsubscribe = onOcrUpdate(fetchResults)

    return () => unsubscribe()
  }, [])

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        toast({
          title: "Copied to clipboard",
          description: "The OCR text has been copied to your clipboard.",
        })
        // Revert to original state after 1.5 seconds
        setTimeout(() => {
          setCopied(false)
        }, 1500)
      })
      .catch((error) => {
        console.error("Failed to copy text:", error)
        toast({
          title: "Error",
          description: "Failed to copy text to clipboard.",
          variant: "destructive",
        })
      })
  }

  const handleExport = () => {
    if (!text) return

    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = 10
      const maxWidth = pageWidth - 2 * margin

      // Split the text into lines that fit within the PDF page width
      const lines = doc.splitTextToSize(text, maxWidth)

      // Set font and add text
      doc.setFontSize(12)
      let yPosition = margin
      lines.forEach((line: string) => {
        if (yPosition > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage()
          yPosition = margin
        }
        doc.text(line, margin, yPosition)
        yPosition += 7 // Line height
      })

      // Download the PDF
      doc.save("ocr-results.pdf")
    } catch (error) {
      console.error("Error exporting to PDF:", error)
      toast({
        title: "Error",
        description: "Failed to export as PDF. Please try again.",
        variant: "destructive",
      })
    }
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
        <CardDescription>Extracted text from your image. You can edit before saving.</CardDescription>
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
              disabled={loading}
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
                  <p>{loading ? "Processing..." : "No content to preview"}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopy} disabled={!text || loading}>
            {copied ? (
              <Check className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="outline" onClick={handleExport} disabled={!text || loading}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        <Button onClick={handleSaveAsNote} disabled={!text || saving || loading}>
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