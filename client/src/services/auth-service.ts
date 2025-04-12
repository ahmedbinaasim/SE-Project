// This is a mock service for authentication
// In a real application, this would make API calls to your backend

import type { User } from "../types/user"

// Simulated delay for API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock user data
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg",
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loginUser(email: string, password: string): Promise<User> {
  // Simulate API call
  await delay(1000)

  // In a real app, you would validate credentials here
  return mockUser
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function registerUser(email: string, password: string): Promise<User> {
  // Simulate API call
  await delay(1500)

  // In a real app, you would create a new user here
  return mockUser
}

export async function logoutUser(): Promise<void> {
  // Simulate API call
  await delay(800)

  // In a real app, you would invalidate the session here
  return
}

export async function getCurrentUser(): Promise<User | null> {
  // Simulate API call
  await delay(500)

  // In a real app, you would check if the user is authenticated
  return mockUser
}
