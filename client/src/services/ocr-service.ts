
import Tesseract from "tesseract.js"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// In-memory storage for OCR results (temporary)
let ocrResults: string = ""

// Helper function to get auth token
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong")
  }
  
  return data
}

// Process an image for OCR using Tesseract.js
export async function processOcrImage(file: File, onProgress?: (progress: number) => void): Promise<void> {
  // Ensure the file is an image
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files (JPG, PNG) are supported for OCR")
  }

  try {
    const { data: { text } } = await Tesseract.recognize(
      file,
      "eng", // Language: English
      {
        logger: (m) => {
          console.log(m)
          if (m.status === "recognizing text" && onProgress) {
            onProgress(Math.round(m.progress * 100))
          }
        },
      }
    )
    ocrResults = text
  } catch (error) {
    console.error("Tesseract OCR error:", error)
    throw new Error("Failed to process OCR")
  }
}

// Get OCR results
export async function getOcrResults(): Promise<string> {
  return ocrResults
}

// Save OCR text as a note
export async function saveOcrAsNote(text: string, title?: string): Promise<void> {
  const token = getToken()
  
  if (!token) {
    throw new Error("Not authenticated")
  }

  const data = {
    text,
    title: title || "OCR Document"
  }
  
  await fetch(`${API_URL}/ocr/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(handleResponse)
}