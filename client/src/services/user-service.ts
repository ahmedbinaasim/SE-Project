/* eslint-disable @typescript-eslint/no-explicit-any */
// Mock user service

// Simulated delay for API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Update user profile
export async function updateUserProfile(data: any): Promise<void> {
  // In a real app, this would update the user profile in the database
  await delay(1000)
  console.log("Updated user profile:", data)
}

// Update account settings
export async function updateAccountSettings(data: any): Promise<void> {
  // In a real app, this would update account settings in the database
  await delay(1000)
  console.log("Updated account settings:", data)
}

// Update appearance settings
export async function updateAppearanceSettings(data: any): Promise<void> {
  // In a real app, this would update appearance settings in the database
  await delay(1000)
  console.log("Updated appearance settings:", data)
}

// Update notification settings
export async function updateNotificationSettings(data: any): Promise<void> {
  // In a real app, this would update notification settings in the database
  await delay(1000)
  console.log("Updated notification settings:", data)
}
