import axios from 'axios';
import {
  AuthResponse,
  ExpenseResponse,
  CreateExpenseData,
  ExpenseStats,
  Expense,
} from './types';

// Dynamically detect backend URL based on environment
const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL || 'https://fintrack-ziby.onrender.com'
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data,
    });

    // Handle 401 (unauthorized)
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      if (
        typeof window !== 'undefined' &&
        !window.location.pathname.includes('/login') &&
        !window.location.pathname.includes('/register')
      ) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// ---------- Auth APIs ----------
export const authAPI = {
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },
};

// ---------- Expense APIs ----------
export const expenseAPI = {
  getAll: async (filters?: {
    category?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  }): Promise<ExpenseResponse> => {
    const response = await api.get('/api/expenses', { params: filters });
    return response.data;
  },

  getById: async (id: string): Promise<{ success: boolean; data: Expense }> => {
    const response = await api.get(`/api/expenses/${id}`);
    return response.data;
  },

  create: async (
    data: CreateExpenseData
  ): Promise<{ success: boolean; data: Expense }> => {
    const response = await api.post('/api/expenses', data);
    return response.data;
  },

  update: async (
    id: string,
    data: CreateExpenseData
  ): Promise<{ success: boolean; data: Expense }> => {
    const response = await api.put(`/api/expenses/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    const response = await api.delete(`/api/expenses/${id}`);
    return response.data;
  },

  getStats: async (): Promise<{ success: boolean; data: ExpenseStats }> => {
    const response = await api.get('/api/expenses/stats');
    return response.data;
  },
};

export default api;
