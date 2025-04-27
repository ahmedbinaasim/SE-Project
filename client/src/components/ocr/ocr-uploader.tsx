
"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Progress } from "../ui/progress"
import { Upload, ImageIcon, FileText, X } from "lucide-react"
import { useToast } from "../../hooks/use-toast"
import { processOcrImage } from "../../services/ocr-service"
import { emitOcrUpdate } from "../../services/ocr-events"

export function OcrUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Check file type (only images)
    if (!selectedFile.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG or PNG).",
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
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleSelectFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const droppedFile = e.dataTransfer.files?.[0]
    if (!droppedFile) return

    // Check file type (only images)
    if (!droppedFile.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPG or PNG).",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 10MB)
    if (droppedFile.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    setFile(droppedFile)

    // Create preview for images
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(droppedFile)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)

    try {
      // Process the OCR with real progress updates
      await processOcrImage(file, (progressValue) => {
        setProgress(progressValue)
      })

      setProgress(100)

      // Emit event to notify OcrResults of new results
      emitOcrUpdate()

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
      setUploading(false)
    }
  }

  const handleClear = () => {
    setFile(null)
    setPreview(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>Upload an image to extract text using OCR.</CardDescription>
      </CardHeader>
      <CardContent>
        {!file ? (
          <div
            className="flex flex-col items-center justify-center rounded-md border border-dashed p-8"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Upload className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Drag & Drop or Click to Upload</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Supports JPG and PNG files up to 10MB
            </p>
            <div className="mt-4">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={handleSelectFileClick}
              >
                Select File
              </Button>
              <Input
                ref={fileInputRef}
                id="ocr-file"
                type="file"
                accept="image/jpeg,image/png"
                className="sr-only"
                onChange={handleFileChange}
              />
            </div>
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