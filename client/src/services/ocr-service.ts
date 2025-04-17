// // Mock OCR service

// // Simulated delay for API calls
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// // Mock OCR results
// let mockOcrResults = ""

// // Process an image for OCR
// export async function processOcrImage(file: File): Promise<void> {
//   // In a real app, this would upload the file to an OCR service
//   await delay(2000)

//   // Generate mock OCR text based on file name
//   if (file.name.includes("receipt")) {
//     mockOcrResults = `RECEIPT\n\nStore: Example Bookstore\nDate: April 10, 2023\n\nItems:\n1. JavaScript: The Good Parts - $29.99\n2. Clean Code - $34.95\n3. Design Patterns - $44.99\n\nSubtotal: $109.93\nTax (8%): $8.79\nTotal: $118.72\n\nThank you for your purchase!`
//   } else if (file.name.includes("notes")) {
//     mockOcrResults = `LECTURE NOTES\n\nTopic: Introduction to Algorithms\nDate: March 15, 2023\n\nKey Points:\n- Algorithm complexity and Big O notation\n- Sorting algorithms: Bubble sort, Merge sort, Quick sort\n- Search algorithms: Linear search, Binary search\n- Graph algorithms: BFS, DFS, Dijkstra's algorithm\n\nAssignment due: March 22, 2023`
//   } else {
//     mockOcrResults = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.\n\nNullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.`
//   }
// }

// // Get OCR results
// export async function getOcrResults(): Promise<string> {
//   await delay(500)
//   return mockOcrResults
// }

// // Save OCR text as a note
// export async function saveOcrAsNote(text: string): Promise<void> {
//   // In a real app, this would create a new note with the OCR text
//   await delay(1000)
//   console.log("Saved OCR text as note:", text.substring(0, 50) + "...")
// }

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper for getting token
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Process an image for OCR
export async function processOcrImage(file: File): Promise<string> {
  const token = getToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_URL}/ocr/process`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Do not set Content-Type header when using FormData
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to process OCR image');
  }

  const data = await response.json();
  return data.data.text;
}

// Save OCR text as a note
export async function saveOcrAsNote(text: string, title?: string): Promise<void> {
  const token = getToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_URL}/ocr/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ text, title }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to save OCR as note');
  }
}

// Get OCR results (this is used by the frontend to retrieve the last processed OCR text)
// In our backend implementation, we don't store this state server-side, so we'll handle it client-side
let lastOcrResults = "";

export function setOcrResults(text: string): void {
  lastOcrResults = text;
}

export async function getOcrResults(): Promise<string> {
  // Instead of a real API call, we just return the last OCR results
  return lastOcrResults;
}