import type { Metadata } from "next"
import { DashboardShell } from "../../../../components/dashboard/dashboard-shell"
import { OcrUploader } from "../../../../components/ocr/ocr-uploader"
import { OcrResults } from "../../../../components/ocr/ocr-results"

export const metadata: Metadata = {
  title: "OCR - NoteGenius",
  description: "Extract text from images and documents",
}

export default function OcrPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight">OCR Text Recognition</h1>
        <p className="text-muted-foreground">
          Upload images or documents to extract text using Optical Character Recognition.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <OcrUploader />
          <OcrResults />
        </div>
      </div>
    </DashboardShell>
  )
}
