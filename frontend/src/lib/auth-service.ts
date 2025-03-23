import axios from 'axios';

// Define the base URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Setup axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include token in requests
api.interceptors.request.use(
  (config) => {
    // Only add token for browser requests (not during SSR)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Define interfaces for data structures
interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  data?: {
    userId: string;
  };
  message?: string;
  error?: string;
}

interface VerifyOTPData {
  userId: string;
  otp: string;
}

interface ResetPasswordData {
  userId: string;
  otp: string;
  newPassword: string;
}

// User signup function
export async function signupUser(data: SignupData): Promise<{ userId: string }> {
  try {
    const response = await api.post<AuthResponse>('/api/v1/auth/register', data);
    
    if (!response.data.success || !response.data.data?.userId) {
      throw new Error(response.data.error || 'Signup failed');
    }
    
    return { userId: response.data.data.userId };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Network error during signup');
    }
    throw error;
  }
}

// Verify OTP after signup
export async function verifyOTP(data: VerifyOTPData): Promise<void> {
  try {
    const response = await api.post<AuthResponse>('/api/v1/auth/verify-otp', data);
    
    if (!response.data.success || !response.data.token) {
      throw new Error(response.data.error || 'OTP verification failed');
    }
    
    // Store the JWT token in localStorage
    localStorage.setItem('token', response.data.token);
    
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Network error during OTP verification');
    }
    throw error;
  }
}

// User login function
export async function loginUser(data: LoginData): Promise<void> {
  try {
    const response = await api.post<AuthResponse>('/api/v1/auth/login', data);
    
    if (!response.data.success || !response.data.token) {
      throw new Error(response.data.error || 'Login failed');
    }
    
    // Store the JWT token in localStorage
    localStorage.setItem('token', response.data.token);
    
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400 && error.response?.data?.data?.userId) {
        // Account not verified yet, but we got a userId for verification
        throw new Error('Account not verified. Please check your email for verification code.');
      }
      throw new Error(error.response?.data?.error || 'Invalid credentials');
    }
    throw error;
  }
}

// Request password reset
export async function requestPasswordReset(email: string): Promise<{ userId: string }> {
  try {
    const response = await api.post<AuthResponse>('/api/v1/auth/forgotpassword', { email });
    
    if (!response.data.success || !response.data.data?.userId) {
      throw new Error(response.data.error || 'Password reset request failed');
    }
    
    return { userId: response.data.data.userId };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Network error during password reset request');
    }
    throw error;
  }
}

// Reset password with OTP
export async function resetPassword(data: ResetPasswordData): Promise<void> {
  try {
    const response = await api.put<AuthResponse>('/api/v1/auth/resetpassword', data);
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Password reset failed');
    }
    
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Network error during password reset');
    }
    throw error;
  }
}

// Logout user
export function logoutUser(): void {
  localStorage.removeItem('token');
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token');
}

// Get current user
export async function getCurrentUser() {
  try {
    const response = await api.get('/api/v1/auth/me');
    return response.data.data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // If there's an error fetching the user, they're not authenticated
    localStorage.removeItem('token');
    return null;
  }
}

// Resend OTP 
export async function resendOTP(email: string): Promise<{ userId: string }> {
  try {
    const response = await api.post<AuthResponse>('/api/v1/auth/resend-otp', { email });
    
    if (!response.data.success || !response.data.data?.userId) {
      throw new Error(response.data.error || 'Failed to resend verification code');
    }
    
    return { userId: response.data.data.userId };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Network error while resending code');
    }
    throw error;
  }
}