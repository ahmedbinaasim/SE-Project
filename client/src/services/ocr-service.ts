// Mock OCR service

// Simulated delay for API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock OCR results
let mockOcrResults = ""

// Process an image for OCR
export async function processOcrImage(file: File): Promise<void> {
  // In a real app, this would upload the file to an OCR service
  await delay(2000)

  // Generate mock OCR text based on file name
  if (file.name.includes("receipt")) {
    mockOcrResults = `RECEIPT\n\nStore: Example Bookstore\nDate: April 10, 2023\n\nItems:\n1. JavaScript: The Good Parts - $29.99\n2. Clean Code - $34.95\n3. Design Patterns - $44.99\n\nSubtotal: $109.93\nTax (8%): $8.79\nTotal: $118.72\n\nThank you for your purchase!`
  } else if (file.name.includes("notes")) {
    mockOcrResults = `LECTURE NOTES\n\nTopic: Introduction to Algorithms\nDate: March 15, 2023\n\nKey Points:\n- Algorithm complexity and Big O notation\n- Sorting algorithms: Bubble sort, Merge sort, Quick sort\n- Search algorithms: Linear search, Binary search\n- Graph algorithms: BFS, DFS, Dijkstra's algorithm\n\nAssignment due: March 22, 2023`
  } else {
    mockOcrResults = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.\n\nNullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.`
  }
}

// Get OCR results
export async function getOcrResults(): Promise<string> {
  await delay(500)
  return mockOcrResults
}

// Save OCR text as a note
export async function saveOcrAsNote(text: string): Promise<void> {
  // In a real app, this would create a new note with the OCR text
  await delay(1000)
  console.log("Saved OCR text as note:", text.substring(0, 50) + "...")
}
