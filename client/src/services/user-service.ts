// /* eslint-disable @typescript-eslint/no-explicit-any */
// // Mock user service

// // Simulated delay for API calls
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// // Update user profile
// export async function updateUserProfile(data: any): Promise<void> {
//   // In a real app, this would update the user profile in the database
//   await delay(1000)
//   console.log("Updated user profile:", data)
// }

// // Update account settings
// export async function updateAccountSettings(data: any): Promise<void> {
//   // In a real app, this would update account settings in the database
//   await delay(1000)
//   console.log("Updated account settings:", data)
// }

// // Update appearance settings
// export async function updateAppearanceSettings(data: any): Promise<void> {
//   // In a real app, this would update appearance settings in the database
//   await delay(1000)
//   console.log("Updated appearance settings:", data)
// }

// // Update notification settings
// export async function updateNotificationSettings(data: any): Promise<void> {
//   // In a real app, this would update notification settings in the database
//   await delay(1000)
//   console.log("Updated notification settings:", data)
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

// Helper function to create headers with authorization
const getAuthHeaders = (contentType = true): HeadersInit => {
  const token = getToken();
  const headers: HeadersInit = {
    'Authorization': `Bearer ${token}`,
  };
  
  if (contentType) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};

// Update user profile
export async function updateUserProfile(data: { name: string }): Promise<void> {
  const response = await fetch(`${API_URL}/users/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update profile');
  }
}

// Update password
export async function updatePassword(data: { currentPassword: string, newPassword: string }): Promise<void> {
  const response = await fetch(`${API_URL}/users/password`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update password');
  }
}

// Upload avatar
export async function uploadAvatar(file: File): Promise<string> {
  const token = getToken();
  if (!token) {
    throw new Error('Authentication required');
  }

  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(`${API_URL}/users/avatar`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      // Do not set Content-Type header when using FormData
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to upload avatar');
  }

  const data = await response.json();
  return data.data; // Returns the avatar URL
}

// Update account settings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateAccountSettings(data: any): Promise<void> {
  const response = await fetch(`${API_URL}/users/settings`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update account settings');
  }
}

// Update appearance settings 
// Note: This would typically be handled client-side or through the updateAccountSettings
export async function updateAppearanceSettings(data: never): Promise<void> {
  // Store appearance settings in localStorage for client-side usage
  if (typeof window !== 'undefined') {
    localStorage.setItem('appearanceSettings', JSON.stringify(data));
  }
  
  // If you want to persist these to the server, you can use the account settings endpoint
  return updateAccountSettings({ appearance: data });
}

// Update notification settings
// Note: This would typically be handled through the updateAccountSettings
export async function updateNotificationSettings(data: never): Promise<void> {
  return updateAccountSettings({ notifications: data });
}