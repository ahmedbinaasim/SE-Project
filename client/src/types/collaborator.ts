export interface Collaborator {
    id: string
    name: string
    email: string
    avatar?: string
    permission: "view" | "comment" | "edit"
  }
  