// User types
export interface User {
    id: string
    name: string
    firstName: string
    email: string
    avatar?: string
    stats: {
      totalNotes: number
      recentlyViewed: number
    }
  }
  
  // Note types
  export interface Tag {
    id: string
    name: string
    color: string
  }
  
  export interface Note {
    id: string
    title: string
    content: string
    tags: Tag[]
    isFavorite: boolean
    createdAt: Date
    updatedAt: Date
  }
  
  // Statistics types
  export interface Statistics {
    notesCreatedThisWeek: number
    timeSpentStudying: number
    summariesGenerated: number
    weeklyGoalProgress: number
  }
  
  // Deadline types
  export interface Deadline {
    id: string
    title: string
    dueDate: Date
    isUrgent: boolean
  }
  
  // Folder types
  export interface Folder {
    id: string
    name: string
    color: string
    notesCount: number
  }
  
  