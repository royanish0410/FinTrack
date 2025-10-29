'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { CreateExpenseData, ExpenseCategory } from '@/lib/types';
import toast from 'react-hot-toast';

interface ExpenseFormProps {
  onSubmit: (data: CreateExpenseData) => Promise<void>;
  onClose: () => void;
  initialData?: CreateExpenseData & { _id?: string };
  isEdit?: boolean;
}

const categories: ExpenseCategory[] = [
  'Food',
  'Transport',
  'Entertainment',
  'Shopping',
  'Bills',
  'Healthcare',
  'Education',
  'Other',
];

export default function ExpenseForm({
  onSubmit,
  onClose,
  initialData,
  isEdit = false,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState<CreateExpenseData>({
    title: initialData?.title || '',
    amount: initialData?.amount || 0,
    category: initialData?.category || 'Other',
    date: initialData?.date?.split('T')[0] || new Date().toISOString().split('T')[0],
    description: initialData?.description || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.amount <= 0) {
      toast.error('Amount must be greater than 0');
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting expense:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto border border-emerald-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-emerald-100 bg-emerald-50">
          <h2 className="text-2xl font-bold text-emerald-700">
            {isEdit ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-emerald-100 rounded-lg transition-all"
          >
            <X className="h-5 w-5 text-emerald-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-emerald-700 mb-2">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 p-2.5 text-gray-800 outline-none transition"
              placeholder="e.g., Grocery Shopping"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-emerald-700 mb-2">
              Amount *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 font-semibold">
                ₹
              </span>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0.01"
                value={formData.amount || ''}
                onChange={handleChange}
                className="w-full rounded-lg border border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 p-2.5 pl-8 text-gray-800 outline-none transition"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-emerald-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 p-2.5 text-gray-800 outline-none transition"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-emerald-700 mb-2">
              Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-lg border border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 p-2.5 text-gray-800 outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-emerald-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300 p-2.5 text-gray-800 outline-none transition resize-none"
              rows={3}
              placeholder="Add notes about this expense..."
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-lg border border-emerald-300 text-emerald-700 font-semibold hover:bg-emerald-50 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>{isEdit ? 'Updating...' : 'Adding...'}</span>
                </div>
              ) : (
                isEdit ? 'Update Expense' : 'Add Expense'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
