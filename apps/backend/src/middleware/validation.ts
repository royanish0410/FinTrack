import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.type === 'field' ? (err as any).path : 'unknown',
        message: err.msg
      }))
    });
    return;
  }
  
  next();
};

export const registerValidation: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

export const loginValidation: ValidationChain[] = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
];

export const expenseValidation: ValidationChain[] = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 2, max: 100 }).withMessage('Title must be 2-100 characters'),
  
  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isFloat({ min: 0.01 }).withMessage('Amount must be greater than 0'),
  
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn(['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'])
    .withMessage('Invalid category'),
  
  body('date')
    .optional()
    .isISO8601().withMessage('Invalid date format').toDate(),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
];