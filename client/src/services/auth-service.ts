// // This is a mock service for authentication
// // In a real application, this would make API calls to your backend

// import type { User } from "../types/user"

// // Simulated delay for API calls
// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// // Mock user data
// const mockUser: User = {
//   id: "1",
//   name: "John Doe",
//   email: "john.doe@example.com",
//   avatar: "/placeholder.svg",
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export async function loginUser(email: string, password: string): Promise<User> {
//   // Simulate API call
//   await delay(1000)

//   // In a real app, you would validate credentials here
//   return mockUser
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export async function registerUser(email: string, password: string): Promise<User> {
//   // Simulate API call
//   await delay(1500)

//   // In a real app, you would create a new user here
//   return mockUser
// }

// export async function logoutUser(): Promise<void> {
//   // Simulate API call
//   await delay(800)

//   // In a real app, you would invalidate the session here
//   return
// }

// export async function getCurrentUser(): Promise<User | null> {
//   // Simulate API call
//   await delay(500)

//   // In a real app, you would check if the user is authenticated
//   return mockUser
// }

import type { User } from "../types/user"

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper for storing token
const storeToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Helper for getting token
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper for removing token
const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};
export async function loginUser(email: string, password: string): Promise<User> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }

  const data = await response.json();
  console.log('Login response:', data); // Check the full response

  // Store token if it exists
  if (data.token) {
    localStorage.setItem('token', data.token);
    console.log('Token stored in localStorage');
  } else {
    console.error('No token received from server');
  }
  
  return data.user;
}

// export async function loginUser(email: string, password: string): Promise<User> {
//   const response = await fetch(`${API_URL}/auth/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.error || 'Login failed');
//   }

//   const data = await response.json();
//   storeToken(data.token);
//   return data.user;
// }

export async function registerUser(email: string, password: string, name: string): Promise<User> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Registration failed');
  }

  const data = await response.json();
  storeToken(data.token);
  return data.user;
}

export async function logoutUser(): Promise<void> {
  // Remove token from local storage
  removeToken();
  // In a real app with backend session management:
  // await fetch(`${API_URL}/auth/logout`, {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': `Bearer ${getToken()}`,
  //   },
  // });
}

export async function getCurrentUser(): Promise<User | null> {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      removeToken();
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

export async function forgotPassword(email: string): Promise<void> {
  const response = await fetch(`${API_URL}/auth/forgotpassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to process forgot password request');
  }
}

export async function resetPassword(token: string, password: string): Promise<void> {
  const response = await fetch(`${API_URL}/auth/resetpassword/${token}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to reset password');
  }
}