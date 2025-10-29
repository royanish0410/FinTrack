import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: Record<string, any>;
  errors?: Record<string, any>;
}

const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let error = { ...err };
  error.message = err.message;

  console.error('Error:', err);

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 } as CustomError;
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    const message = `${field?.charAt(0).toUpperCase() + field?.slice(1)} already exists`;
    error = { message, statusCode: 400 } as CustomError;
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors || {}).map((e: any) => e.message).join(', ');
    error = { message, statusCode: 400 } as CustomError;
  }

  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, statusCode: 401 } as CustomError;
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401 } as CustomError;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default errorHandler;