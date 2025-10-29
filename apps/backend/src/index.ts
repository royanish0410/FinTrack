import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import errorHandler from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import expenseRoutes from './routes/expenseRoutes';

// Load environment variables based on environment
const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

// Initialize express app
const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Dynamic CORS setup for local + production
const allowedOrigin =
  process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL || 'https://fin-track-frontend-mu.vercel.app'
    : 'http://localhost:3000';

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Health check route
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Expense Tracker API',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    endpoints: {
      auth: '/api/auth',
      expenses: '/api/expenses',
    },
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler (must be last)
app.use(errorHandler);

// ✅ Start server after successful MongoDB connection
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

    process.on('unhandledRejection', (err: Error) => {
      console.error('❌ Unhandled Rejection:', err.message);
      server.close(() => process.exit(1));
    });

    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM received, shutting down gracefully');
      server.close(() => console.log('💤 Process terminated'));
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  });
