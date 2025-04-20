// // export interface Note {
// //     id: string
// //     title: string
// //     content: string
// //     contentHtml?: string
// //     summary?: string
// //     detailedSummary?: string
// //     bulletPoints?: string[]
// //     tags: string[]
// //     createdAt: string
// //     updatedAt: string
// //     isFavorite: boolean
// //     isShared: boolean
// //     hasSummary: boolean
// //     folder?: string
// //     author: {
// //       id: string
// //       name: string
// //       email: string
// //       avatar?: string
// //     }
// //   }
  
// export interface Note {
//   id: string;
//   title: string;
//   content: string;
//   contentHtml: string;
//   summary: string;
//   detailedSummary: string;
//   bulletPoints: string[];
//   tags: string[];
//   folderId: string | null;
//   createdAt: string;
//   updatedAt: string;
//   isFavorite: boolean;
//   isShared: boolean;
//   hasSummary: boolean;
//   author: {
//     id: string;
//     name: string;
//     email: string;
//     avatar: string;
//   };
// }
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Collaborator {
  id: string;
  user: User;
  permission: "view" | "comment" | "edit";
  addedAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  contentHtml?: string;
  summary?: string;
  detailedSummary?: string;
  bulletPoints?: string[];
  tags: string[];
  folderId?: string | null;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  isShared: boolean;
  hasSummary: boolean;
  author?: User;
  collaborators?: Collaborator[];
}