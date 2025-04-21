

import type { Collaborator } from "../types/collaborator"

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

// Format collaborator data from API to match frontend type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatCollaborator = (collaborator: any): Collaborator => {
  return {
    id: collaborator.id,
    name: collaborator.user.name,
    email: collaborator.user.email,
    avatar: collaborator.user.avatar || "/placeholder.svg",
    permission: collaborator.permission
  }
}

// Get collaborators for a note
export async function getNoteCollaborators(noteId: string): Promise<Collaborator[]> {
  const data = await fetchWithAuth(`${API_URL}/notes/${noteId}/collaborators`)
  
  return data.data.collaborators.map(formatCollaborator)
}

// Add a collaborator to a note
export async function addCollaborator(
  noteId: string, 
  email: string, 
  permission: string
): Promise<Collaborator> {
  const data = await fetchWithAuth(`${API_URL}/notes/${noteId}/collaborators`, {
    method: "POST",
    body: JSON.stringify({ email, permission })
  })
  
  return formatCollaborator(data.data.collaborator)
}

// Remove a collaborator from a note
export async function removeCollaborator(
  noteId: string, 
  collaboratorId: string
): Promise<void> {
  await fetchWithAuth(`${API_URL}/notes/${noteId}/collaborators/${collaboratorId}`, {
    method: "DELETE"
  })
}

// Update a collaborator's permission
export async function updateCollaboratorPermission(
  noteId: string,
  collaboratorId: string,
  permission: string
): Promise<Collaborator> {
  const data = await fetchWithAuth(`${API_URL}/notes/${noteId}/collaborators/${collaboratorId}`, {
    method: "PATCH",
    body: JSON.stringify({ permission })
  })
  
  return formatCollaborator(data.data.collaborator)
}