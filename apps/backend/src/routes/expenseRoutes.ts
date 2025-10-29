import express from 'express';
import {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getStats
} from '../controllers/expenseController';
import { protect } from '../middleware/auth';
import { expenseValidation, validate } from '../middleware/validation';

const router = express.Router();

// Protect all expense routes
router.use(protect);

// Routes
router.route('/')
  .get(getExpenses)
  .post(expenseValidation, validate, createExpense);

router.get('/stats', getStats);

router.route('/:id')
  .get(getExpense)
  .put(expenseValidation, validate, updateExpense)
  .delete(deleteExpense);

export default router;