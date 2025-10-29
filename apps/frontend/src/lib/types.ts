export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    message?: string;
    data: {
      token: string;
      user: User;
    };
  }
  
  export interface Expense {
    _id: string;
    title: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
    description?: string;
    user: string;
    createdAt: string;
    updatedAt: string;
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
  
  export interface ExpenseResponse {
    success: boolean;
    count?: number;
    data: {
      expenses: Expense[];
      total: number;
      categoryWise: Record<string, number>;
    };
  }
  
  export interface CreateExpenseData {
    title: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
    description?: string;
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