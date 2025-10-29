import { Document } from 'mongoose';

// User Types
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Expense Types
export interface IExpense extends Document {
  _id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
  user: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Add lean version type
export interface IExpenseLean {
  _id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
  user: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export type ExpenseCategory = 
  | 'Food' 
  | 'Transport' 
  | 'Entertainment' 
  | 'Shopping' 
  | 'Bills' 
  | 'Healthcare' 
  | 'Education' 
  | 'Other';

// JWT Payload
export interface IJWTPayload {
  id: string;
  iat?: number;
  exp?: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: ValidationError[];
  count?: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Auth Response Types
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Expense Response Types - Updated to use lean version
export interface ExpenseListResponse {
  expenses: IExpenseLean[];  // Changed from IExpense[]
  total: number;
  categoryWise: Record<string, number>;
}

export interface ExpenseStats {
  categoryStats: {
    _id: string;
    total: number;
    count: number;
  }[];
  overall: {
    total: number;
    count: number;
  };
}

// Query Types
export interface ExpenseQuery {
  category?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}