export interface Note {
    id: string
    title: string
    content: string
    contentHtml?: string
    summary?: string
    detailedSummary?: string
    bulletPoints?: string[]
    tags: string[]
    createdAt: string
    updatedAt: string
    isFavorite: boolean
    isShared: boolean
    hasSummary: boolean
    folder?: string
    author: {
      id: string
      name: string
      email: string
      avatar?: string
    }
  }
  