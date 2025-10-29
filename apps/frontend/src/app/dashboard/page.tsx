'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseCard from '@/components/ExpenseCard';
import StatCard from '@/components/StatCard';
import CategoryChart from '@/components/CategoryChart';
import { expenseAPI } from '@/lib/api';
import { Expense, CreateExpenseData } from '@/lib/types';
import { Plus, Wallet, TrendingUp, ShoppingCart, Filter, Search, Download } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [total, setTotal] = useState(0);
  const [categoryWise, setCategoryWise] = useState<Record<string, number>>({});
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });

  const categories = ['All', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'];

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      const response = await expenseAPI.getAll();
      if (response.success) {
        setExpenses(response.data.expenses);
        setFilteredExpenses(response.data.expenses);
        setTotal(response.data.total);
        setCategoryWise(response.data.categoryWise);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to fetch expenses');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...expenses];

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(exp => exp.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(exp =>
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Date filter
    if (dateFilter.startDate) {
      filtered = filtered.filter(exp => new Date(exp.date) >= new Date(dateFilter.startDate));
    }
    if (dateFilter.endDate) {
      filtered = filtered.filter(exp => new Date(exp.date) <= new Date(dateFilter.endDate));
    }

    setFilteredExpenses(filtered);
  }, [selectedCategory, searchQuery, dateFilter, expenses]);

  // Handle create expense
  const handleCreateExpense = async (data: CreateExpenseData) => {
    try {
      const response = await expenseAPI.create(data);
      if (response.success) {
        toast.success('Expense added successfully!');
        fetchExpenses();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add expense');
      throw error;
    }
  };

  // Handle update expense
  const handleUpdateExpense = async (data: CreateExpenseData) => {
    if (!editingExpense) return;
    
    try {
      const response = await expenseAPI.update(editingExpense._id, data);
      if (response.success) {
        toast.success('Expense updated successfully!');
        fetchExpenses();
        setEditingExpense(null);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update expense');
      throw error;
    }
  };

  // Handle delete expense
  const handleDeleteExpense = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    try {
      const response = await expenseAPI.delete(id);
      if (response.success) {
        toast.success('Expense deleted successfully!');
        fetchExpenses();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete expense');
    }
  };

  // Handle edit
  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  // Export to CSV
  const exportToCSV = () => {
    if (filteredExpenses.length === 0) {
      toast.error('No expenses to export');
      return;
    }

    const headers = ['Title', 'Amount', 'Category', 'Date', 'Description'];
    const rows = filteredExpenses.map(exp => [
      exp.title,
      exp.amount,
      exp.category,
      new Date(exp.date).toLocaleDateString(),
      exp.description || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Expenses exported successfully!');
  };

  const filteredTotal = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Expense Dashboard
              </h1>
              <p className="text-slate-600">Track and manage your expenses efficiently</p>
            </div>
            <button
              onClick={() => {
                setEditingExpense(null);
                setShowForm(true);
              }}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Expense</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Expenses"
              value={`₹${total.toFixed(2)}`}
              icon={Wallet}
              iconColor="text-blue-600"
              iconBgColor="bg-blue-100"
            />
            <StatCard
              title="Total Transactions"
              icon={ShoppingCart}
              value={expenses.length}
              iconColor="text-indigo-600"
              iconBgColor="bg-indigo-100"
            />
            <StatCard
              title="Average Expense"
              value={expenses.length > 0 ? `₹${(total / expenses.length).toFixed(2)}` : '₹0.00'}
              icon={TrendingUp}
              iconColor="text-purple-600"
              iconBgColor="bg-purple-100"
            />
          </div>

          {/* Chart */}
          {Object.keys(categoryWise).length > 0 && (
            <div className="mb-8">
              <CategoryChart data={categoryWise} />
            </div>
          )}

          {/* Filters */}
          <div className="card mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-slate-600" />
              <h3 className="text-lg font-bold text-slate-900">Filters</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Start Date */}
              <input
                type="date"
                value={dateFilter.startDate}
                onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
                className="input-field"
                placeholder="Start Date"
              />

              {/* End Date */}
              <input
                type="date"
                value={dateFilter.endDate}
                onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
                className="input-field"
                placeholder="End Date"
              />
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Showing {filteredExpenses.length} of {expenses.length} expenses
                {filteredExpenses.length > 0 && (
                  <span className="font-semibold text-slate-900 ml-2">
                    (Total: ₹{filteredTotal.toFixed(2)})
                  </span>
                )}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setDateFilter({ startDate: '', endDate: '' });
                  }}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium"
                >
                  Clear Filters
                </button>
                <button
                  onClick={exportToCSV}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span className="text-sm font-medium">Export CSV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Expenses List */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading expenses...</p>
            </div>
          ) : filteredExpenses.length === 0 ? (
            <div className="card text-center py-12">
              <div className="inline-block p-4 bg-slate-100 rounded-full mb-4">
                <Wallet className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Expenses Found</h3>
              <p className="text-slate-600 mb-6">
                {expenses.length === 0
                  ? 'Start tracking your expenses by adding your first one!'
                  : 'No expenses match your current filters.'}
              </p>
              {expenses.length === 0 && (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Your First Expense</span>
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExpenses.map((expense) => (
                <ExpenseCard
                  key={expense._id}
                  expense={expense}
                  onEdit={handleEdit}
                  onDelete={handleDeleteExpense}
                />
              ))}
            </div>
          )}
        </div>

        {/* Expense Form Modal */}
        {showForm && (
          <ExpenseForm
            onSubmit={editingExpense ? handleUpdateExpense : handleCreateExpense}
            onClose={() => {
              setShowForm(false);
              setEditingExpense(null);
            }}
            initialData={editingExpense ? {
              title: editingExpense.title,
              amount: editingExpense.amount,
              category: editingExpense.category,
              date: editingExpense.date,
              description: editingExpense.description,
            } : undefined}
            isEdit={!!editingExpense}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}