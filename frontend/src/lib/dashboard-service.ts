import type { User, Note, Statistics, Deadline, Folder } from "./types"

// Dummy function to simulate fetching user data
export async function getUserData(): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    id: "user-1",
    name: "Alex Johnson",
    firstName: "Alex",
    email: "alex.johnson@example.com",
    avatar: "/next.svg?height=128&width=128",
    stats: {
      totalNotes: 24,
      recentlyViewed: 5,
    },
  }
}

// Dummy function to simulate fetching recent notes
export async function getRecentNotes(): Promise<Note[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return [
    {
      id: "note-1",
      title: "Quantum Physics Fundamentals",
      content:
        "Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.",
      tags: [
        { id: "tag-1", name: "Physics", color: "#3b82f6" },
        { id: "tag-2", name: "Science", color: "#10b981" },
      ],
      isFavorite: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: "note-2",
      title: "Machine Learning Algorithms",
      content:
        "Machine learning algorithms build a model based on sample data, known as training data, in order to make predictions or decisions without being explicitly programmed to do so. Machine learning algorithms are used in a wide variety of applications, such as in medicine, email filtering, speech recognition, and computer vision.",
      tags: [
        { id: "tag-3", name: "CS", color: "#8b5cf6" },
        { id: "tag-4", name: "AI", color: "#ec4899" },
      ],
      isFavorite: false,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      id: "note-3",
      title: "World History: Renaissance Period",
      content:
        "The Renaissance was a period in European history marking the transition from the Middle Ages to modernity and covering the 15th and 16th centuries. It occurred after the Crisis of the Late Middle Ages and was associated with great social change.",
      tags: [{ id: "tag-5", name: "History", color: "#f59e0b" }],
      isFavorite: true,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    },
    {
      id: "note-4",
      title: "Organic Chemistry: Functional Groups",
      content:
        "Functional groups are specific groups of atoms within molecules that are responsible for the characteristic chemical reactions of those molecules. The same functional group will undergo the same or similar chemical reaction(s) regardless of the size of the molecule it is a part of.",
      tags: [
        { id: "tag-6", name: "Chemistry", color: "#ef4444" },
        { id: "tag-2", name: "Science", color: "#10b981" },
      ],
      isFavorite: false,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    },
    {
      id: "note-5",
      title: "Linear Algebra Basics",
      content:
        "Linear algebra is the branch of mathematics concerning linear equations, linear functions and their representations through matrices and vector spaces. Linear algebra is central to almost all areas of mathematics.",
      tags: [{ id: "tag-7", name: "Math", color: "#6366f1" }],
      isFavorite: true,
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
    {
      id: "note-6",
      title: "Introduction to Psychology",
      content:
        "Psychology is the scientific study of mind and behavior. Psychology includes the study of conscious and unconscious phenomena, including feelings and thoughts. It is an academic discipline of immense scope, crossing the boundaries between the natural and social sciences.",
      tags: [{ id: "tag-8", name: "Psychology", color: "#d946ef" }],
      isFavorite: false,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    },
  ]
}

// Dummy function to simulate fetching statistics
export async function getStatistics(): Promise<Statistics> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  return {
    notesCreatedThisWeek: 8,
    timeSpentStudying: 12.5,
    summariesGenerated: 5,
    weeklyGoalProgress: 65,
  }
}

// Dummy function to simulate fetching upcoming deadlines
export async function getUpcomingDeadlines(): Promise<Deadline[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "deadline-1",
      title: "Physics Exam",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      isUrgent: true,
    },
    {
      id: "deadline-2",
      title: "History Essay",
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      isUrgent: false,
    },
    {
      id: "deadline-3",
      title: "Math Assignment",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      isUrgent: false,
    },
  ]
}

// Dummy function to simulate fetching folders
export async function getFolders(): Promise<Folder[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return [
    {
      id: "folder-1",
      name: "Physics",
      color: "#3b82f6",
      notesCount: 8,
    },
    {
      id: "folder-2",
      name: "Computer Science",
      color: "#8b5cf6",
      notesCount: 12,
    },
    {
      id: "folder-3",
      name: "History",
      color: "#f59e0b",
      notesCount: 5,
    },
    {
      id: "folder-4",
      name: "Chemistry",
      color: "#ef4444",
      notesCount: 7,
    },
    {
      id: "folder-5",
      name: "Mathematics",
      color: "#6366f1",
      notesCount: 10,
    },
  ]
}

