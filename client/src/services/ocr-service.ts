// // // Mock OCR service

// // // Simulated delay for API calls
// // const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// // // Mock OCR results
// // let mockOcrResults = ""

// // // Process an image for OCR
// // export async function processOcrImage(file: File): Promise<void> {
// //   // In a real app, this would upload the file to an OCR service
// //   await delay(2000)

// //   // Generate mock OCR text based on file name
// //   if (file.name.includes("receipt")) {
// //     mockOcrResults = `RECEIPT\n\nStore: Example Bookstore\nDate: April 10, 2023\n\nItems:\n1. JavaScript: The Good Parts - $29.99\n2. Clean Code - $34.95\n3. Design Patterns - $44.99\n\nSubtotal: $109.93\nTax (8%): $8.79\nTotal: $118.72\n\nThank you for your purchase!`
// //   } else if (file.name.includes("notes")) {
// //     mockOcrResults = `LECTURE NOTES\n\nTopic: Introduction to Algorithms\nDate: March 15, 2023\n\nKey Points:\n- Algorithm complexity and Big O notation\n- Sorting algorithms: Bubble sort, Merge sort, Quick sort\n- Search algorithms: Linear search, Binary search\n- Graph algorithms: BFS, DFS, Dijkstra's algorithm\n\nAssignment due: March 22, 2023`
// //   } else {
// //     mockOcrResults = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.\n\nNullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.`
// //   }
// // }

// // // Get OCR results
// // export async function getOcrResults(): Promise<string> {
// //   await delay(500)
// //   return mockOcrResults
// // }

// // // Save OCR text as a note
// // export async function saveOcrAsNote(text: string): Promise<void> {
// //   // In a real app, this would create a new note with the OCR text
// //   await delay(1000)
// //   console.log("Saved OCR text as note:", text.substring(0, 50) + "...")
// // }

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// // Helper function to get auth token
// const getToken = (): string | null => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("token")
//   }
//   return null
// }

// // Helper function to handle API responses
// const handleResponse = async (response: Response) => {
//   const data = await response.json()
  
//   if (!response.ok) {
//     throw new Error(data.message || "Something went wrong")
//   }
  
//   return data
// }

// // Process an image for OCR
// export async function processOcrImage(file: File): Promise<void> {
//   const token = getToken()
  
//   if (!token) {
//     throw new Error("Not authenticated")
//   }
  
//   // Create FormData object to send the file
//   const formData = new FormData()
//   formData.append("file", file)
  
//   const response = await fetch(`${API_URL}/ocr/process`, {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${token}`
//     },
//     body: formData
//   })
  
//   await handleResponse(response)
// }

// // Get OCR results
// export async function getOcrResults(): Promise<string> {
//   const data = await fetch(`${API_URL}/ocr/results`, {
//     headers: {
//       "Authorization": `Bearer ${getToken()}`
//     }
//   }).then(handleResponse)
  
//   return data.data.text
// }

// // Save OCR text as a note
// export async function saveOcrAsNote(text: string, title?: string): Promise<void> {
//   const data = {
//     text,
//     title: title || "OCR Document"
//   }
  
//   await fetch(`${API_URL}/ocr/save`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${getToken()}`
//     },
//     body: JSON.stringify(data)
//   }).then(handleResponse)
// }
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