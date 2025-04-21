
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