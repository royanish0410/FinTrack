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
    <div className="card hover:scale-[1.02] transition-transform">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 mb-1">{expense.title}</h3>
          <p className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ₹{expense.amount.toFixed(2)}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(expense)}
            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(expense._id)}
            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4 text-slate-400" />
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
            {expense.category}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(expense.date), 'MMM dd, yyyy')}</span>
        </div>

        {expense.description && (
          <p className="text-sm text-slate-600 mt-2 line-clamp-2">
            {expense.description}
          </p>
        )}
      </div>
    </div>
  );
}