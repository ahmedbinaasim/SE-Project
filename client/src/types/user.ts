export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  twoFactorEnabled?: boolean
  settings?: UserSettings
  emailVerified?: boolean
  createdAt?: string
}

export interface UserSettings {
  appearance?: {
    theme: "light" | "dark" | "system"
    fontSize: "small" | "normal" | "large"
  }
  notifications?: {
    emailNotifications: boolean
    pushNotifications: boolean
    newShare: boolean
    newComment: boolean
    mentionNotification: boolean
    reminderNotification: boolean
    marketingEmails: boolean
  }
}