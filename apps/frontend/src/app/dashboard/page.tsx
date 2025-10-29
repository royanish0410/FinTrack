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
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [total, setTotal] = useState(0);
  const [categoryWise, setCategoryWise] = useState<Record<string, number>>({});

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });

  const categories = ['All', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'];

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

  useEffect(() => {
    let filtered = [...expenses];
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(exp => exp.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(exp =>
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (dateFilter.startDate) {
      filtered = filtered.filter(exp => new Date(exp.date) >= new Date(dateFilter.startDate));
    }
    if (dateFilter.endDate) {
      filtered = filtered.filter(exp => new Date(exp.date) <= new Date(dateFilter.endDate));
    }
    setFilteredExpenses(filtered);
  }, [selectedCategory, searchQuery, dateFilter, expenses]);

  const handleCreateExpense = async (data: CreateExpenseData) => {
    try {
      const response = await expenseAPI.create(data);
      if (response.success) {
        toast.success('Expense added successfully!');
        fetchExpenses();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add expense');
    }
  };

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
    }
  };

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

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

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
    const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n');
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
      <div className="min-h-screen bg-linear-to-br from-gray-50 via-emerald-50 to-teal-50 transition-all duration-500">
        <Navbar />

        <motion.div
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Expense Dashboard
              </h1>
              <p className="text-gray-600">Track and visualize your spending smarter ✨</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingExpense(null);
                setShowForm(true);
              }}
              className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg shadow-md transition-all"
            >
              <Plus className="h-5 w-5" />
              <span>Add Expense</span>
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Expenses"
              value={`₹${total.toFixed(2)}`}
              icon={Wallet}
              iconColor="text-emerald-600"
              iconBgColor="bg-emerald-100"
            />
            <StatCard
              title="Total Transactions"
              icon={ShoppingCart}
              value={expenses.length}
              iconColor="text-teal-600"
              iconBgColor="bg-teal-100"
            />
            <StatCard
              title="Average Expense"
              value={expenses.length > 0 ? `₹${(total / expenses.length).toFixed(2)}` : '₹0.00'}
              icon={TrendingUp}
              iconColor="text-lime-600"
              iconBgColor="bg-lime-100"
            />
          </div>

          {/* Chart */}
          {Object.keys(categoryWise).length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <CategoryChart data={categoryWise} />
            </motion.div>
          )}

          {/* Filters */}
          <motion.div
            className="card mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-bold text-gray-800">Filters</h3>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search expenses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-10"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <input
                type="date"
                value={dateFilter.startDate}
                onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
                className="input-field"
              />

              <input
                type="date"
                value={dateFilter.endDate}
                onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing {filteredExpenses.length} of {expenses.length} expenses
                {filteredExpenses.length > 0 && (
                  <span className="font-semibold text-gray-800 ml-2">
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
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 font-medium"
                >
                  Clear Filters
                </button>
                <button
                  onClick={exportToCSV}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all"
                >
                  <Download className="h-4 w-4" />
                  <span className="text-sm font-medium">Export CSV</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Expense Cards */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading expenses...</p>
            </div>
          ) : filteredExpenses.length === 0 ? (
            <motion.div
              className="card text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <Wallet className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Expenses Found</h3>
              <p className="text-gray-600 mb-6">
                {expenses.length === 0
                  ? 'Start tracking your expenses by adding your first one!'
                  : 'No expenses match your current filters.'}
              </p>
              {expenses.length === 0 && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg font-medium transition-all"
                >
                  <Plus className="inline h-5 w-5 mr-2" />
                  Add Your First Expense
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } }
              }}
            >
              {filteredExpenses.map((expense) => (
                <motion.div
                  key={expense._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <ExpenseCard
                    expense={expense}
                    onEdit={handleEdit}
                    onDelete={handleDeleteExpense}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {showForm && (
          <ExpenseForm
            onSubmit={editingExpense ? handleUpdateExpense : handleCreateExpense}
            onClose={() => {
              setShowForm(false);
              setEditingExpense(null);
            }}
            initialData={
              editingExpense
                ? {
                    title: editingExpense.title,
                    amount: editingExpense.amount,
                    category: editingExpense.category,
                    date: editingExpense.date,
                    description: editingExpense.description,
                  }
                : undefined
            }
            isEdit={!!editingExpense}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
