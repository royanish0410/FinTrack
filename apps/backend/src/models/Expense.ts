import mongoose, { Schema, Model } from 'mongoose';
import { IExpense, ExpenseCategory } from '../types';

const expenseSchema = new Schema<IExpense>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
      validate: {
        validator: function(value: number) {
          return value > 0;
        },
        message: 'Amount must be a positive number'
      }
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'] as ExpenseCategory[],
        message: '{VALUE} is not a valid category'
      },
      default: 'Other'
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now
    },
    user: {
      type: String,
      ref: 'User',
      required: true
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    }
  },
  {
    timestamps: true
  }
);

// Indexes for faster queries
expenseSchema.index({ user: 1, date: -1 });
expenseSchema.index({ user: 1, category: 1 });

const Expense: Model<IExpense> = mongoose.model<IExpense>('Expense', expenseSchema);

export default Expense;