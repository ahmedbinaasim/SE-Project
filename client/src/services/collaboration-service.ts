// Change import statements to use relative paths
import type { Collaborator } from "../types/collaborator"

// Mock data for collaborators
const mockCollaborators: Collaborator[] = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/placeholder.svg",
    permission: "edit",
  },
  {
    id: "2",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg",
    permission: "view",
  },
  {
    id: "3",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    avatar: "/placeholder.svg",
    permission: "comment",
  },
]

// Get collaborators for a note
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getNoteCollaborators(noteId: string): Collaborator[] {
  // In a real app, this would filter collaborators by note ID
  return mockCollaborators
}

// Add a collaborator to a note
export function addCollaborator(noteId: string, email: string, permission: string): Collaborator {
  // In a real app, this would add a collaborator to the database
  const newCollaborator: Collaborator = {
    id: `${mockCollaborators.length + 1}`,
    name: email.split("@")[0].replace(".", " "),
    email,
    permission: permission as "view" | "comment" | "edit",
  }

  mockCollaborators.push(newCollaborator)
  return newCollaborator
}

// Remove a collaborator from a note
export function removeCollaborator(noteId: string, collaboratorId: string): void {
  // In a real app, this would remove a collaborator from the database
  const index = mockCollaborators.findIndex((c) => c.id === collaboratorId)
  if (index !== -1) {
    mockCollaborators.splice(index, 1)
  }
}
