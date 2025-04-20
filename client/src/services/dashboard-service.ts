interface DashboardStats {
    totalNotes: number
    newNotesLastWeek: number
    collaboratorsCount: number
    aiSummaries: number
    newAiSummariesLastMonth: number
    studyTime: number
  }
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
  
  // Helper function to get auth token
  const getToken = (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  }
  
  // Helper function to handle API responses
  const handleResponse = async (response: Response) => {
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong")
    }
    
    return data
  }
  
  // Function to make authenticated API requests
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = getToken()
    
    if (!token) {
      throw new Error("Not authenticated")
    }
    
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...options.headers
    }
    
    const response = await fetch(url, {
      ...options,
      headers
    })
    
    return handleResponse(response)
  }
  
  // Get dashboard statistics
  export async function getDashboardStats(): Promise<DashboardStats> {
    const data = await fetchWithAuth(`${API_URL}/dashboard/stats`)
    
    return data.data
  }