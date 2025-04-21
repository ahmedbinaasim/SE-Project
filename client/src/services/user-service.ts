
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from "../types/user"

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

// Get current user profile
export async function getCurrentUserProfile(): Promise<User> {
  const data = await fetchWithAuth(`${API_URL}/users/me`)
  return data.data.user
}

// Update user profile
export async function updateUserProfile(profileData: any): Promise<User> {
  const data = await fetchWithAuth(`${API_URL}/users/profile`, {
    method: "PATCH",
    body: JSON.stringify(profileData)
  })
  return data.data.user
}

// Update account settings (password)
export async function updateAccountSettings(accountData: any): Promise<void> {
  if (accountData.newPassword) {
    await fetchWithAuth(`${API_URL}/users/password`, {
      method: "PATCH",
      body: JSON.stringify({
        currentPassword: accountData.currentPassword,
        newPassword: accountData.newPassword
      })
    })
  }

  if (accountData.twoFactorEnabled !== undefined) {
    await fetchWithAuth(`${API_URL}/users/two-factor`, {
      method: "PATCH",
      body: JSON.stringify({
        twoFactorEnabled: accountData.twoFactorEnabled
      })
    })
  }
}

// Update appearance settings
export async function updateAppearanceSettings(appearanceData: any): Promise<void> {
  await fetchWithAuth(`${API_URL}/users/appearance`, {
    method: "PATCH",
    body: JSON.stringify(appearanceData)
  })
}

// Update notification settings
export async function updateNotificationSettings(notificationData: any): Promise<void> {
  await fetchWithAuth(`${API_URL}/users/notifications`, {
    method: "PATCH",
    body: JSON.stringify(notificationData)
  })
}

// Delete user account
export async function deleteUserAccount(): Promise<void> {
  await fetchWithAuth(`${API_URL}/users/account`, {
    method: "DELETE"
  })
  localStorage.removeItem("token")
}