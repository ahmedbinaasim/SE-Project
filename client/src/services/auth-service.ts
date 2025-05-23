

import type { User } from "../types/user"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong")
  }
  
  return data
}

export async function loginUser(email: string, password: string): Promise<User> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await handleResponse(response)
  
  // Store token in localStorage
  if (data.token) {
    localStorage.setItem("token", data.token)
  }
  
  return data.data.user
}

export async function registerUser(email: string, password: string): Promise<User> {
  // Generate a name from the email (before the @ symbol)
  const name = email.split("@")[0]
  
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })

  const data = await handleResponse(response)
  
  // We don't store the token from registration as we'll redirect to login
  
  return data.data.user
}

export async function logoutUser(): Promise<void> {
  // Remove token from localStorage
  localStorage.removeItem("token")
  return
}

export async function getCurrentUser(): Promise<User | null> {
  const token = localStorage.getItem("token")
  
  if (!token) {
    return null
  }
  
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    
    const data = await handleResponse(response)
    return data.data.user
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // If there's an error (like token expired), remove the token
    localStorage.removeItem("token")
    return null
  }
}