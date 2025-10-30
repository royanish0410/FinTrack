'use client';

import { Expense } from '@/lib/types';
import { Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Food: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  Transport: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Entertainment: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Shopping: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
  Bills: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  Healthcare: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  Education: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  Other: { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
};

export default function ExpenseCard({ expense, onEdit, onDelete }: ExpenseCardProps) {
  const colors = categoryColors[expense.category] || categoryColors.Other;

  return (
    <div className="card hover:scale-[1.02] transition-transform p-4 sm:p-6 rounded-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 truncate">
            {expense.title}
          </h3>
          <p className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ₹{expense.amount.toFixed(2)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center sm:space-x-2 gap-2 sm:gap-0 self-end sm:self-start">
          <button
            onClick={() => onEdit(expense)}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors active:scale-95"
            aria-label="Edit expense"
          >
            <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={() => onDelete(expense._id)}
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors active:scale-95"
            aria-label="Delete expense"
          >
            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Tag className="h-4 w-4 text-slate-400" />
          <span
            className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}
          >
            {expense.category}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(expense.date), 'MMM dd, yyyy')}</span>
        </div>

        {expense.description && (
          <p className="text-sm text-slate-600 mt-2 line-clamp-2 sm:line-clamp-3">
            {expense.description}
          </p>
        )}
      </div>
    </div>
  );
}
