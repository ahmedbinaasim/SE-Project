"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Progress } from "../ui/progress"
import { Upload, ImageIcon, FileText, X } from "lucide-react"
import { useToast } from "../../hooks/use-toast"
import { processOcrImage } from "../../services/ocr-service"

export function OcrUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Check file type
    if (!selectedFile.type.startsWith("image/") && selectedFile.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload an image or PDF file.",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    setFile(selectedFile)

    // Create preview for images
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      // For PDFs, just show an icon
      setPreview(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval)
            return 95
          }
          return prev + 5
        })
      }, 100)

      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Process the OCR
      await processOcrImage(file)

      // Complete the progress
      clearInterval(interval)
      setProgress(100)

      toast({
        title: "OCR processing complete",
        description: "Your file has been processed successfully.",
      })
    } catch (error) {
      console.error("Error processing OCR:", error)
      toast({
        title: "Error",
        description: "Failed to process OCR. Please try again.",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setUploading(false)
      }, 500)
    }
  }

  const handleClear = () => {
    setFile(null)
    setPreview(null)
    setProgress(0)
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>Upload an image or document to extract text using OCR.</CardDescription>
      </CardHeader>
      <CardContent>
        {!file ? (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Upload className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Drag & Drop or Click to Upload</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Supports JPG, PNG, and PDF files up to 10MB
            </p>
            <Label htmlFor="ocr-file" className="mt-4">
              <Button variant="outline" className="cursor-pointer">
                Select File
              </Button>
              <Input
                id="ocr-file"
                type="file"
                accept="image/jpeg,image/png,application/pdf"
                className="sr-only"
                onChange={handleFileChange}
              />
            </Label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-md border p-2">
              <div className="flex items-center gap-3">
                {preview ? (
                  <div className="relative h-20 w-20 overflow-hidden rounded-md">
                    <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-md bg-muted">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button variant="ghost" size="icon" onClick={handleClear} disabled={uploading}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
              {uploading && (
                <div className="mt-2">
                  <Progress value={progress} className="h-2" />
                  <p className="mt-1 text-right text-xs text-muted-foreground">{progress}%</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleClear} disabled={!file || uploading}>
          Clear
        </Button>
        <Button onClick={handleUpload} disabled={!file || uploading}>
          {uploading ? (
            <>Processing...</>
          ) : (
            <>
              <ImageIcon className="mr-2 h-4 w-4" />
              Process OCR
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
