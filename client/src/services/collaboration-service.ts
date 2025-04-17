// // Change import statements to use relative paths
// import type { Collaborator } from "../types/collaborator"

// // Mock data for collaborators
// const mockCollaborators: Collaborator[] = [
//   {
//     id: "1",
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     avatar: "/placeholder.svg",
//     permission: "edit",
//   },
//   {
//     id: "2",
//     name: "Alex Johnson",
//     email: "alex.johnson@example.com",
//     avatar: "/placeholder.svg",
//     permission: "view",
//   },
//   {
//     id: "3",
//     name: "Sarah Williams",
//     email: "sarah.williams@example.com",
//     avatar: "/placeholder.svg",
//     permission: "comment",
//   },
// ]

// // Get collaborators for a note
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export function getNoteCollaborators(noteId: string): Collaborator[] {
//   // In a real app, this would filter collaborators by note ID
//   return mockCollaborators
// }

// // Add a collaborator to a note
// export function addCollaborator(noteId: string, email: string, permission: string): Collaborator {
//   // In a real app, this would add a collaborator to the database
//   const newCollaborator: Collaborator = {
//     id: `${mockCollaborators.length + 1}`,
//     name: email.split("@")[0].replace(".", " "),
//     email,
//     permission: permission as "view" | "comment" | "edit",
//   }

//   mockCollaborators.push(newCollaborator)
//   return newCollaborator
// }

// // Remove a collaborator from a note
// export function removeCollaborator(noteId: string, collaboratorId: string): void {
//   // In a real app, this would remove a collaborator from the database
//   const index = mockCollaborators.findIndex((c) => c.id === collaboratorId)
//   if (index !== -1) {
//     mockCollaborators.splice(index, 1)
//   }
// }


import type { Collaborator } from "../types/collaborator"

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper for getting token
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to create headers with authorization
const getAuthHeaders = (): HeadersInit => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Get collaborators for a note
export async function getNoteCollaborators(noteId: string): Promise<Collaborator[]> {
  const response = await fetch(`${API_URL}/collaboration/${noteId}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch collaborators');
  }

  const data = await response.json();
  return data.data;
}

// Add a collaborator to a note
export async function addCollaborator(
  noteId: string, 
  email: string, 
  permission: "view" | "comment" | "edit"
): Promise<Collaborator> {
  const response = await fetch(`${API_URL}/collaboration/${noteId}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, permission }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add collaborator');
  }

  const data = await response.json();
  return data.data;
}

// Remove a collaborator from a note
export async function removeCollaborator(noteId: string, collaboratorId: string): Promise<void> {
  const response = await fetch(`${API_URL}/collaboration/${noteId}/${collaboratorId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to remove collaborator');
  }
}