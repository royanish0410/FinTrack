import { Request, Response, NextFunction } from 'express';
import Expense from '../models/Expense';
import { ExpenseQuery } from '../types';

export const getExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, startDate, endDate, search } = req.query as ExpenseQuery;
    
    const query: any = { user: req.user?.id };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const expenses = await Expense.find(query).sort({ date: -1 });

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const categoryWise = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {} as Record<string, number>);

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: {
        expenses,
        total,
        categoryWise
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
      return;
    }

    if (expense.user.toString() !== req.user?.id) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to access this expense'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: expense
    });
  } catch (error) {
    next(error);
  }
};

export const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    req.body.user = req.user?.id;

    const expense = await Expense.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: expense
    });
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
      return;
    }

    if (expense.user.toString() !== req.user?.id) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to update this expense'
      });
      return;
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      data: updatedExpense
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
      return;
    }

    if (expense.user.toString() !== req.user?.id) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this expense'
      });
      return;
    }

    await expense.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

export const getStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stats = await Expense.aggregate([
      { $match: { user: req.user?.id } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    const totalExpenses = await Expense.aggregate([
      { $match: { user: req.user?.id } },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        categoryStats: stats,
        overall: totalExpenses[0] || { total: 0, count: 0 }
      }
    });
  } catch (error) {
    next(error);
  }
};