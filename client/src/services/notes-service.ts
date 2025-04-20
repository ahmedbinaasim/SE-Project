// // // // // Change import statements to use relative paths
// // // // import type { Note } from "../types/note"

// // // // // Mock data for notes
// // // // const mockNotes: Note[] = [
// // // //   {
// // // //     id: "1",
// // // //     title: "Introduction to Machine Learning",
// // // //     content:
// // // //       "Machine learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed...",
// // // //     tags: ["AI", "Machine Learning", "Computer Science"],
// // // //     createdAt: "2023-04-15T10:30:00Z",
// // // //     updatedAt: "2023-04-16T14:20:00Z",
// // // //     isFavorite: true,
// // // //     isShared: false,
// // // //     hasSummary: true,
// // // //     summary:
// // // //       "This note covers the basics of machine learning, including supervised and unsupervised learning approaches.",
// // // //     detailedSummary:
// // // //       "Machine learning is a field of AI that enables systems to learn from data. This note explores key concepts including supervised learning (using labeled data), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through trial and error). It also covers common algorithms like decision trees, neural networks, and support vector machines.",
// // // //     bulletPoints: [
// // // //       "Machine learning is a subset of AI focused on data-based learning",
// // // //       "Three main types: supervised, unsupervised, and reinforcement learning",
// // // //       "Common algorithms include decision trees, neural networks, and SVMs",
// // // //       "Applications span from image recognition to natural language processing",
// // // //     ],
// // // //     author: {
// // // //       id: "1",
// // // //       name: "John Doe",
// // // //       email: "john.doe@example.com",
// // // //     },
// // // //   },
// // // //   {
// // // //     id: "2",
// // // //     title: "Quantum Computing Fundamentals",
// // // //     content:
// // // //       "Quantum computing is a type of computation that harnesses the collective properties of quantum states, such as superposition, interference, and entanglement, to perform calculations...",
// // // //     tags: ["Quantum", "Computing", "Physics"],
// // // //     createdAt: "2023-05-02T09:15:00Z",
// // // //     updatedAt: "2023-05-03T11:45:00Z",
// // // //     isFavorite: false,
// // // //     isShared: true,
// // // //     hasSummary: true,
// // // //     summary: "An overview of quantum computing principles and how they differ from classical computing.",
// // // //     author: {
// // // //       id: "1",
// // // //       name: "John Doe",
// // // //       email: "john.doe@example.com",
// // // //     },
// // // //   },
// // // //   {
// // // //     id: "3",
// // // //     title: "Advanced Data Structures",
// // // //     content:
// // // //       "Data structures are a way of organizing and storing data so that they can be accessed and modified efficiently. More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data...",
// // // //     tags: ["Programming", "Algorithms", "Computer Science"],
// // // //     createdAt: "2023-03-10T15:20:00Z",
// // // //     updatedAt: "2023-03-12T16:30:00Z",
// // // //     isFavorite: true,
// // // //     isShared: false,
// // // //     hasSummary: false,
// // // //     author: {
// // // //       id: "1",
// // // //       name: "John Doe",
// // // //       email: "john.doe@example.com",
// // // //     },
// // // //   },
// // // //   {
// // // //     id: "4",
// // // //     title: "Neural Networks and Deep Learning",
// // // //     content:
// // // //       "Neural networks are a set of algorithms, modeled loosely after the human brain, that are designed to recognize patterns. They interpret sensory data through a kind of machine perception, labeling or clustering raw input...",
// // // //     tags: ["AI", "Deep Learning", "Neural Networks"],
// // // //     createdAt: "2023-06-05T13:40:00Z",
// // // //     updatedAt: "2023-06-07T10:15:00Z",
// // // //     isFavorite: false,
// // // //     isShared: true,
// // // //     hasSummary: true,
// // // //     summary: "This note explains neural networks architecture and deep learning concepts.",
// // // //     author: {
// // // //       id: "1",
// // // //       name: "John Doe",
// // // //       email: "john.doe@example.com",
// // // //     },
// // // //   },
// // // //   {
// // // //     id: "5",
// // // //     title: "Blockchain Technology",
// // // //     content:
// // // //       "A blockchain is a distributed database or ledger that is shared among the nodes of a computer network. As a database, a blockchain stores information electronically in digital format...",
// // // //     tags: ["Blockchain", "Cryptocurrency", "Technology"],
// // // //     createdAt: "2023-02-20T11:25:00Z",
// // // //     updatedAt: "2023-02-22T14:50:00Z",
// // // //     isFavorite: true,
// // // //     isShared: false,
// // // //     hasSummary: false,
// // // //     author: {
// // // //       id: "1",
// // // //       name: "John Doe",
// // // //       email: "john.doe@example.com",
// // // //     },
// // // //   },
// // // // ]

// // // // // Get all notes
// // // // export function getAllNotes(): Note[] {
// // // //   return mockNotes
// // // // }

// // // // // Get recent notes (last 3 updated)
// // // // export function getRecentNotes(): Note[] {
// // // //   return [...mockNotes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 3)
// // // // }

// // // // // Get favorite notes
// // // // export function getFavoriteNotes(): Note[] {
// // // //   return mockNotes.filter((note) => note.isFavorite)
// // // // }

// // // // // Get shared notes
// // // // export function getSharedNotes(): Note[] {
// // // //   return mockNotes.filter((note) => note.isShared)
// // // // }

// // // // // Get shared by me notes
// // // // export function getSharedByMeNotes(): Note[] {
// // // //   // In a real app, this would filter notes shared by the current user
// // // //   return mockNotes.filter((note) => note.isShared).slice(0, 2)
// // // // }

// // // // // Get note by ID
// // // // export function getNoteById(id: string): Note | null {
// // // //   return mockNotes.find((note) => note.id === id) || null
// // // // }

// // // // // Toggle favorite status
// // // // export function toggleFavorite(id: string): void {
// // // //   const note = mockNotes.find((note) => note.id === id)
// // // //   if (note) {
// // // //     note.isFavorite = !note.isFavorite
// // // //   }
// // // // }

// // // // // Delete note
// // // // export function deleteNote(id: string): void {
// // // //   const index = mockNotes.findIndex((note) => note.id === id)
// // // //   if (index !== -1) {
// // // //     mockNotes.splice(index, 1)
// // // //   }
// // // // }

// // // // // Generate note summary
// // // // export function generateNoteSummary(id: string): string {
// // // //   const note = mockNotes.find((note) => note.id === id)
// // // //   if (!note) return ""

// // // //   // In a real app, this would call an AI service to generate a summary
// // // //   note.hasSummary = true
// // // //   note.summary = `This is an AI-generated summary of "${note.title}". The note covers key concepts and provides a comprehensive overview of the topic.`

// // // //   return note.summary
// // // // }

// // // import type { Note } from "../types/note"

// // // const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// // // // Helper function to get auth token
// // // const getToken = (): string | null => {
// // //   if (typeof window !== "undefined") {
// // //     return localStorage.getItem("token")
// // //   }
// // //   return null
// // // }

// // // // Helper function to handle API responses
// // // const handleResponse = async (response: Response) => {
// // //   const data = await response.json()
  
// // //   if (!response.ok) {
// // //     throw new Error(data.message || "Something went wrong")
// // //   }
  
// // //   return data
// // // }

// // // // Function to make authenticated API requests
// // // const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
// // //   const token = getToken()
  
// // //   if (!token) {
// // //     throw new Error("Not authenticated")
// // //   }
  
// // //   const headers = {
// // //     "Content-Type": "application/json",
// // //     "Authorization": `Bearer ${token}`,
// // //     ...options.headers
// // //   }
  
// // //   const response = await fetch(url, {
// // //     ...options,
// // //     headers
// // //   })
  
// // //   return handleResponse(response)
// // // }

// // // // Format note data from API to match frontend type
// // // // eslint-disable-next-line @typescript-eslint/no-explicit-any
// // // const formatNote = (note: any): Note => {
// // //   return {
// // //     id: note._id,
// // //     title: note.title,
// // //     content: note.content,
// // //     contentHtml: note.contentHtml || note.content,
// // //     summary: note.summary || "",
// // //     detailedSummary: note.detailedSummary || "",
// // //     bulletPoints: note.bulletPoints || [],
// // //     tags: note.tags || [],
// // //     createdAt: note.createdAt,
// // //     updatedAt: note.updatedAt,
// // //     isFavorite: note.isFavorite || false,
// // //     isShared: note.isShared || false,
// // //     hasSummary: note.hasSummary || false,
// // //     author: {
// // //       id: note.owner._id || note.owner,
// // //       name: note.owner.name || "Unknown",
// // //       email: note.owner.email || "",
// // //       avatar: note.owner.avatar || "/placeholder.svg"
// // //     }
// // //   }
// // // }

// // // // Get all notes
// // // export async function getAllNotes(filters = {}): Promise<Note[]> {
// // //   // Build query string from filters
// // //   const queryParams = new URLSearchParams()
  
// // //   Object.entries(filters).forEach(([key, value]) => {
// // //     if (value !== undefined && value !== null) {
// // //       queryParams.append(key, String(value))
// // //     }
// // //   })
  
// // //   const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""
  
// // //   const data = await fetchWithAuth(`${API_URL}/notes${queryString}`)
  
// // //   return data.data.notes.map(formatNote)
// // // }

// // // // Get a specific note by ID
// // // export async function getNoteById(id: string): Promise<Note> {
// // //   const data = await fetchWithAuth(`${API_URL}/notes/${id}`)
  
// // //   return formatNote(data.data.note)
// // // }

// // // // Create a new note
// // // export async function createNote(noteData: Partial<Note>): Promise<Note> {
// // //   const data = await fetchWithAuth(`${API_URL}/notes`, {
// // //     method: "POST",
// // //     body: JSON.stringify(noteData)
// // //   })
  
// // //   return formatNote(data.data.note)
// // // }

// // // // Update a note
// // // export async function updateNote(id: string, noteData: Partial<Note>): Promise<Note> {
// // //   const data = await fetchWithAuth(`${API_URL}/notes/${id}`, {
// // //     method: "PATCH",
// // //     body: JSON.stringify(noteData)
// // //   })
  
// // //   return formatNote(data.data.note)
// // // }

// // // // Delete a note
// // // export async function deleteNote(id: string): Promise<void> {
// // //   await fetchWithAuth(`${API_URL}/notes/${id}`, {
// // //     method: "DELETE"
// // //   })
// // // }

// // // // Toggle favorite status
// // // export async function toggleFavorite(id: string): Promise<Note> {
// // //   const data = await fetchWithAuth(`${API_URL}/notes/${id}/favorite`, {
// // //     method: "PATCH"
// // //   })
  
// // //   return formatNote(data.data.note)
// // // }

// // // // Get notes shared with the user
// // // export async function getSharedNotes(): Promise<Note[]> {
// // //   const data = await fetchWithAuth(`${API_URL}/notes/shared`)
  
// // //   return data.data.notes.map(formatNote)
// // // }

// // // // Get notes shared by the user
// // // export async function getSharedByMeNotes(): Promise<Note[]> {
// // //   const data = await fetchWithAuth(`${API_URL}/notes/shared-by-me`)
  
// // //   return data.data.notes.map(formatNote)
// // // }

// // // // Generate a summary for a note
// // // export async function generateNoteSummary(id: string): Promise<{
// // //   concise: string;
// // //   detailed: string;
// // //   bulletPoints: string[];
// // // }> {
// // //   const data = await fetchWithAuth(`${API_URL}/notes/${id}/summary`, {
// // //     method: "POST"
// // //   })
  
// // //   return data.data.summary
// // // }

// // // // Get the summary for a note
// // // export async function getNoteSummary(id: string): Promise<{
// // //   concise: string;
// // //   detailed: string;
// // //   bulletPoints: string[];
// // // }> {
// // //   const data = await fetchWithAuth(`${API_URL}/notes/${id}/summary`)
  
// // //   return data.data.summary
// // // }

// // // // Export a note
// // // // eslint-disable-next-line @typescript-eslint/no-explicit-any
// // // export async function exportNote(id: string): Promise<any> {
// // //   const data = await fetchWithAuth(`${API_URL}/notes/${id}/export`)
  
// // //   return data.data.exportData
// // // }
// // import type { Note } from "../types/note"

// // const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// // // Helper function to get auth token
// // const getToken = (): string | null => {
// //   if (typeof window !== "undefined") {
// //     return localStorage.getItem("token")
// //   }
// //   return null
// // }

// // // Helper function to handle API responses
// // const handleResponse = async (response: Response) => {
// //   const data = await response.json()
  
// //   if (!response.ok) {
// //     throw new Error(data.message || "Something went wrong")
// //   }
  
// //   return data
// // }

// // // Function to make authenticated API requests
// // const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
// //   const token = getToken()
  
// //   if (!token) {
// //     throw new Error("Not authenticated")
// //   }
  
// //   const headers = {
// //     "Content-Type": "application/json",
// //     "Authorization": `Bearer ${token}`,
// //     ...options.headers
// //   }
  
// //   const response = await fetch(url, {
// //     ...options,
// //     headers
// //   })
  
// //   return handleResponse(response)
// // }

// // // Format note data from API to match frontend type
// // // eslint-disable-next-line @typescript-eslint/no-explicit-any
// // const formatNote = (note: any): Note => {
// //   return {
// //     id: note._id,
// //     title: note.title,
// //     content: note.content,
// //     contentHtml: note.contentHtml || note.content,
// //     summary: note.summary || "",
// //     detailedSummary: note.detailedSummary || "",
// //     bulletPoints: note.bulletPoints || [],
// //     tags: note.tags || [],
// //     createdAt: note.createdAt,
// //     updatedAt: note.updatedAt,
// //     isFavorite: note.isFavorite || false,
// //     isShared: note.isShared || false,
// //     hasSummary: note.hasSummary || false,
// //     author: {
// //       id: note.owner._id || note.owner,
// //       name: note.owner.name || "Unknown",
// //       email: note.owner.email || "",
// //       avatar: note.owner.avatar || "/placeholder.svg"
// //     }
// //   }
// // }

// // // Get all notes
// // export async function getAllNotes(filters = {}): Promise<Note[]> {
// //   // Build query string from filters
// //   const queryParams = new URLSearchParams()
  
// //   Object.entries(filters).forEach(([key, value]) => {
// //     if (value !== undefined && value !== null) {
// //       queryParams.append(key, String(value))
// //     }
// //   })
  
// //   const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""
  
// //   const data = await fetchWithAuth(`${API_URL}/notes${queryString}`)
  
// //   return data.data.notes.map(formatNote)
// // }

// // // Get recent notes (most recently updated)
// // export async function getRecentNotes(limit = 5): Promise<Note[]> {
// //   const data = await fetchWithAuth(`${API_URL}/dashboard/recent-notes?limit=${limit}`)
  
// //   return data.data.notes.map(formatNote)
// // }

// // // Get favorite notes
// // export async function getFavoriteNotes(limit = 5): Promise<Note[]> {
// //   const data = await fetchWithAuth(`${API_URL}/dashboard/favorite-notes?limit=${limit}`)
  
// //   return data.data.notes.map(formatNote)
// // }

// // // Get a specific note by ID
// // export async function getNoteById(id: string): Promise<Note> {
// //   const data = await fetchWithAuth(`${API_URL}/notes/${id}`)
  
// //   return formatNote(data.data.note)
// // }

// // // Create a new note
// // export async function createNote(noteData: Partial<Note>): Promise<Note> {
// //   const data = await fetchWithAuth(`${API_URL}/notes`, {
// //     method: "POST",
// //     body: JSON.stringify(noteData)
// //   })
  
// //   return formatNote(data.data.note)
// // }

// // // Update a note
// // export async function updateNote(id: string, noteData: Partial<Note>): Promise<Note> {
// //   const data = await fetchWithAuth(`${API_URL}/notes/${id}`, {
// //     method: "PATCH",
// //     body: JSON.stringify(noteData)
// //   })
  
// //   return formatNote(data.data.note)
// // }

// // // Delete a note
// // export async function deleteNote(id: string): Promise<void> {
// //   await fetchWithAuth(`${API_URL}/notes/${id}`, {
// //     method: "DELETE"
// //   })
// // }

// // // Toggle favorite status
// // export async function toggleFavorite(id: string): Promise<Note> {
// //   const data = await fetchWithAuth(`${API_URL}/notes/${id}/favorite`, {
// //     method: "PATCH"
// //   })
  
// //   return formatNote(data.data.note)
// // }

// // // Get notes shared with the user
// // export async function getSharedNotes(): Promise<Note[]> {
// //   const data = await fetchWithAuth(`${API_URL}/notes/shared`)
  
// //   return data.data.notes.map(formatNote)
// // }

// // // Get notes shared by the user
// // export async function getSharedByMeNotes(): Promise<Note[]> {
// //   const data = await fetchWithAuth(`${API_URL}/notes/shared-by-me`)
  
// //   return data.data.notes.map(formatNote)
// // }

// // // Generate a summary for a note
// // export async function generateNoteSummary(id: string): Promise<{
// //   concise: string;
// //   detailed: string;
// //   bulletPoints: string[];
// // }> {
// //   const data = await fetchWithAuth(`${API_URL}/notes/${id}/summary`, {
// //     method: "POST"
// //   })
  
// //   return data.data.summary
// // }

// // // Get the summary for a note
// // export async function getNoteSummary(id: string): Promise<{
// //   concise: string;
// //   detailed: string;
// //   bulletPoints: string[];
// // }> {
// //   const data = await fetchWithAuth(`${API_URL}/notes/${id}/summary`)
  
// //   return data.data.summary
// // }

// // // Export a note
// // // eslint-disable-next-line @typescript-eslint/no-explicit-any
// // export async function exportNote(id: string): Promise<any> {
// //   const data = await fetchWithAuth(`${API_URL}/notes/${id}/export`)
  
// //   return data.data.exportData
// // }
// import type { Note } from "../types/note"

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

// // Function to make authenticated API requests
// const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
//   const token = getToken()
  
//   if (!token) {
//     throw new Error("Not authenticated")
//   }
  
//   const headers = {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${token}`,
//     ...options.headers
//   }
  
//   const response = await fetch(url, {
//     ...options,
//     headers
//   })
  
//   return handleResponse(response)
// }

// // Format note data from API to match frontend type
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const formatNote = (note: any): Note => {
//   return {
//     id: note._id,
//     title: note.title,
//     content: note.content,
//     contentHtml: note.contentHtml || note.content,
//     summary: note.summary || "",
//     detailedSummary: note.detailedSummary || "",
//     bulletPoints: note.bulletPoints || [],
//     tags: note.tags || [],
//     createdAt: note.createdAt,
//     updatedAt: note.updatedAt,
//     isFavorite: note.isFavorite || false,
//     isShared: note.isShared || false,
//     hasSummary: note.hasSummary || false,
//     author: {
//       id: note.owner._id || note.owner,
//       name: note.owner.name || "Unknown",
//       email: note.owner.email || "",
//       avatar: note.owner.avatar || "/placeholder.svg"
//     }
//   }
// }

// // Get all notes
// export async function getAllNotes(filters = {}): Promise<Note[]> {
//   // Build query string from filters
//   const queryParams = new URLSearchParams()
  
//   Object.entries(filters).forEach(([key, value]) => {
//     if (value !== undefined && value !== null) {
//       queryParams.append(key, String(value))
//     }
//   })
  
//   const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""
  
//   const data = await fetchWithAuth(`${API_URL}/notes${queryString}`)
  
//   return data.data.notes.map(formatNote)
// }

// // Get recent notes (most recently updated)
// export async function getRecentNotes(limit = 5): Promise<Note[]> {
//   const data = await fetchWithAuth(`${API_URL}/dashboard/recent-notes?limit=${limit}`)
  
//   return data.data.notes.map(formatNote)
// }

// // Get favorite notes
// // Get favorite notes
// export async function getFavoriteNotes(limit = 5): Promise<Note[]> {
//   const data = await fetchWithAuth(`${API_URL}/dashboard/favorite-notes?limit=${limit}`)
  
//   return data.data.notes.map(formatNote)
// }

// // Get a specific note by ID
// export async function getNoteById(id: string): Promise<Note> {
//   // Don't attempt to fetch if the ID is "new" - this fixes the issue with the New Note page
//   if (id === "new") {
//     throw new Error("Cannot fetch note with ID 'new'")
//   }
  
//   const data = await fetchWithAuth(`${API_URL}/notes/${id}`)
  
//   return formatNote(data.data.note)
// }

// // Create a new note
// export async function createNote(noteData: Partial<Note>): Promise<Note> {
//   const data = await fetchWithAuth(`${API_URL}/notes`, {
//     method: "POST",
//     body: JSON.stringify(noteData)
//   })
  
//   return formatNote(data.data.note)
// }

// // Update a note
// export async function updateNote(id: string, noteData: Partial<Note>): Promise<Note> {
//   const data = await fetchWithAuth(`${API_URL}/notes/${id}`, {
//     method: "PATCH",
//     body: JSON.stringify(noteData)
//   })
  
//   return formatNote(data.data.note)
// }

// // Delete a note
// export async function deleteNote(id: string): Promise<void> {
//   await fetchWithAuth(`${API_URL}/notes/${id}`, {
//     method: "DELETE"
//   })
// }

// // Toggle favorite status
// export async function toggleFavorite(id: string): Promise<Note> {
//   const data = await fetchWithAuth(`${API_URL}/notes/${id}/favorite`, {
//     method: "PATCH"
//   })
  
//   return formatNote(data.data.note)
// }

// // Get notes shared with the user
// export async function getSharedNotes(): Promise<Note[]> {
//   const data = await fetchWithAuth(`${API_URL}/notes/shared`)
  
//   return data.data.notes.map(formatNote)
// }

// // Get notes shared by the user
// export async function getSharedByMeNotes(): Promise<Note[]> {
//   const data = await fetchWithAuth(`${API_URL}/notes/shared-by-me`)
  
//   return data.data.notes.map(formatNote)
// }

// // Generate a summary for a note
// export async function generateNoteSummary(id: string): Promise<{
//   concise: string;
//   detailed: string;
//   bulletPoints: string[];
// }> {
//   const data = await fetchWithAuth(`${API_URL}/notes/${id}/summary`, {
//     method: "POST"
//   })
  
//   return data.data.summary
// }

// // Get the summary for a note
// export async function getNoteSummary(id: string): Promise<{
//   concise: string;
//   detailed: string;
//   bulletPoints: string[];
// }> {
//   const data = await fetchWithAuth(`${API_URL}/notes/${id}/summary`)
  
//   return data.data.summary
// }

// // Export a note
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function exportNote(id: string): Promise<any> {
//   const data = await fetchWithAuth(`${API_URL}/notes/${id}/export`)
  
//   return data.data.exportData
// }
import type { Note } from "../types/note"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

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

// Function to make authenticated API requests
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getToken()
  
  if (!token) {
    throw new Error("Not authenticated")
  }
  
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    ...options.headers
  }
  
  const response = await fetch(url, {
    ...options,
    headers
  })
  
  return handleResponse(response)
}

// Format note data from API to match frontend type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatNote = (note: any): Note => {
  return {
    id: note._id,
    title: note.title,
    content: note.content,
    contentHtml: note.contentHtml || note.content,
    summary: note.summary || "",
    detailedSummary: note.detailedSummary || "",
    bulletPoints: note.bulletPoints || [],
    tags: note.tags || [],
    folderId: note.folderId || null,
    createdAt: note.createdAt,
    updatedAt: note.updatedAt,
    isFavorite: note.isFavorite || false,
    isShared: note.isShared || false,
    hasSummary: note.hasSummary || false,
    author: {
      id: note.owner._id || note.owner,
      name: note.owner.name || "Unknown",
      email: note.owner.email || "",
      avatar: note.owner.avatar || "/placeholder.svg"
    }
  }
}

// Get all notes
export async function getAllNotes(filters = {}): Promise<Note[]> {
  // Build query string from filters
  const queryParams = new URLSearchParams()
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value))
    }
  })
  
  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""
  
  const data = await fetchWithAuth(`${API_URL}/notes${queryString}`)
  
  return data.data.notes.map(formatNote)
}

// Get recent notes (most recently updated)
export async function getRecentNotes(limit = 5): Promise<Note[]> {
  const data = await fetchWithAuth(`${API_URL}/dashboard/recent-notes?limit=${limit}`)
  
  return data.data.notes.map(formatNote)
}

// Get favorite notes
export async function getFavoriteNotes(limit = 5): Promise<Note[]> {
  const data = await fetchWithAuth(`${API_URL}/dashboard/favorite-notes?limit=${limit}`)
  
  return data.data.notes.map(formatNote)
}

// Get a specific note by ID
export async function getNoteById(id: string): Promise<Note> {
  // Don't attempt to fetch if the ID is "new" - this fixes the issue with the New Note page
  if (id === "new") {
    throw new Error("Cannot fetch note with ID 'new'")
  }
  
  const data = await fetchWithAuth(`${API_URL}/notes/${id}`)
  
  return formatNote(data.data.note)
}

// Create a new note
export async function createNote(noteData: Partial<Note>): Promise<Note> {
  const data = await fetchWithAuth(`${API_URL}/notes`, {
    method: "POST",
    body: JSON.stringify(noteData)
  })
  
  return formatNote(data.data.note)
}

// Update a note
export async function updateNote(id: string, noteData: Partial<Note>): Promise<Note> {
  const data = await fetchWithAuth(`${API_URL}/notes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(noteData)
  })
  
  return formatNote(data.data.note)
}

// Delete a note
export async function deleteNote(id: string): Promise<void> {
  await fetchWithAuth(`${API_URL}/notes/${id}`, {
    method: "DELETE"
  })
}

// Toggle favorite status
export async function toggleFavorite(id: string): Promise<Note> {
  const data = await fetchWithAuth(`${API_URL}/notes/${id}/favorite`, {
    method: "PATCH"
  })
  
  return formatNote(data.data.note)
}

// Get notes shared with the user
export async function getSharedNotes(): Promise<Note[]> {
  const data = await fetchWithAuth(`${API_URL}/notes/shared`)
  
  return data.data.notes.map(formatNote)
}

// Get notes shared by the user
export async function getSharedByMeNotes(): Promise<Note[]> {
  const data = await fetchWithAuth(`${API_URL}/notes/shared-by-me`)
  
  return data.data.notes.map(formatNote)
}

// Generate a summary for a note
export async function generateNoteSummary(id: string): Promise<{
  concise: string;
  detailed: string;
  bulletPoints: string[];
}> {
  const data = await fetchWithAuth(`${API_URL}/notes/${id}/summary`, {
    method: "POST"
  })
  
  return data.data.summary
}

// Get the summary for a note
export async function getNoteSummary(id: string): Promise<{
  concise: string;
  detailed: string;
  bulletPoints: string[];
}> {
  const data = await fetchWithAuth(`${API_URL}/notes/${id}/summary`)
  
  return data.data.summary
}

// Export a note
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function exportNote(id: string): Promise<any> {
  const data = await fetchWithAuth(`${API_URL}/notes/${id}/export`)
  
  return data.data.exportData
}

// Create a new folder
export async function createFolder(name: string): Promise<{ id: string; name: string }> {
  const data = await fetchWithAuth(`${API_URL}/folders`, {
    method: "POST",
    body: JSON.stringify({ name })
  });
  
  return {
    id: data.data.folder._id,
    name: data.data.folder.name
  };
}

// Get all folders
export async function getAllFolders(): Promise<{ id: string; name: string }[]> {
  const data = await fetchWithAuth(`${API_URL}/folders`);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.data.folders.map((folder: any) => ({
    id: folder._id,
    name: folder.name
  }));
}