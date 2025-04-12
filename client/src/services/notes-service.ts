// Change import statements to use relative paths
import type { Note } from "../types/note"

// Mock data for notes
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Introduction to Machine Learning",
    content:
      "Machine learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed...",
    tags: ["AI", "Machine Learning", "Computer Science"],
    createdAt: "2023-04-15T10:30:00Z",
    updatedAt: "2023-04-16T14:20:00Z",
    isFavorite: true,
    isShared: false,
    hasSummary: true,
    summary:
      "This note covers the basics of machine learning, including supervised and unsupervised learning approaches.",
    detailedSummary:
      "Machine learning is a field of AI that enables systems to learn from data. This note explores key concepts including supervised learning (using labeled data), unsupervised learning (finding patterns in unlabeled data), and reinforcement learning (learning through trial and error). It also covers common algorithms like decision trees, neural networks, and support vector machines.",
    bulletPoints: [
      "Machine learning is a subset of AI focused on data-based learning",
      "Three main types: supervised, unsupervised, and reinforcement learning",
      "Common algorithms include decision trees, neural networks, and SVMs",
      "Applications span from image recognition to natural language processing",
    ],
    author: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
  },
  {
    id: "2",
    title: "Quantum Computing Fundamentals",
    content:
      "Quantum computing is a type of computation that harnesses the collective properties of quantum states, such as superposition, interference, and entanglement, to perform calculations...",
    tags: ["Quantum", "Computing", "Physics"],
    createdAt: "2023-05-02T09:15:00Z",
    updatedAt: "2023-05-03T11:45:00Z",
    isFavorite: false,
    isShared: true,
    hasSummary: true,
    summary: "An overview of quantum computing principles and how they differ from classical computing.",
    author: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
  },
  {
    id: "3",
    title: "Advanced Data Structures",
    content:
      "Data structures are a way of organizing and storing data so that they can be accessed and modified efficiently. More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data...",
    tags: ["Programming", "Algorithms", "Computer Science"],
    createdAt: "2023-03-10T15:20:00Z",
    updatedAt: "2023-03-12T16:30:00Z",
    isFavorite: true,
    isShared: false,
    hasSummary: false,
    author: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
  },
  {
    id: "4",
    title: "Neural Networks and Deep Learning",
    content:
      "Neural networks are a set of algorithms, modeled loosely after the human brain, that are designed to recognize patterns. They interpret sensory data through a kind of machine perception, labeling or clustering raw input...",
    tags: ["AI", "Deep Learning", "Neural Networks"],
    createdAt: "2023-06-05T13:40:00Z",
    updatedAt: "2023-06-07T10:15:00Z",
    isFavorite: false,
    isShared: true,
    hasSummary: true,
    summary: "This note explains neural networks architecture and deep learning concepts.",
    author: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
  },
  {
    id: "5",
    title: "Blockchain Technology",
    content:
      "A blockchain is a distributed database or ledger that is shared among the nodes of a computer network. As a database, a blockchain stores information electronically in digital format...",
    tags: ["Blockchain", "Cryptocurrency", "Technology"],
    createdAt: "2023-02-20T11:25:00Z",
    updatedAt: "2023-02-22T14:50:00Z",
    isFavorite: true,
    isShared: false,
    hasSummary: false,
    author: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    },
  },
]

// Get all notes
export function getAllNotes(): Note[] {
  return mockNotes
}

// Get recent notes (last 3 updated)
export function getRecentNotes(): Note[] {
  return [...mockNotes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 3)
}

// Get favorite notes
export function getFavoriteNotes(): Note[] {
  return mockNotes.filter((note) => note.isFavorite)
}

// Get shared notes
export function getSharedNotes(): Note[] {
  return mockNotes.filter((note) => note.isShared)
}

// Get shared by me notes
export function getSharedByMeNotes(): Note[] {
  // In a real app, this would filter notes shared by the current user
  return mockNotes.filter((note) => note.isShared).slice(0, 2)
}

// Get note by ID
export function getNoteById(id: string): Note | null {
  return mockNotes.find((note) => note.id === id) || null
}

// Toggle favorite status
export function toggleFavorite(id: string): void {
  const note = mockNotes.find((note) => note.id === id)
  if (note) {
    note.isFavorite = !note.isFavorite
  }
}

// Delete note
export function deleteNote(id: string): void {
  const index = mockNotes.findIndex((note) => note.id === id)
  if (index !== -1) {
    mockNotes.splice(index, 1)
  }
}

// Generate note summary
export function generateNoteSummary(id: string): string {
  const note = mockNotes.find((note) => note.id === id)
  if (!note) return ""

  // In a real app, this would call an AI service to generate a summary
  note.hasSummary = true
  note.summary = `This is an AI-generated summary of "${note.title}". The note covers key concepts and provides a comprehensive overview of the topic.`

  return note.summary
}
