 # FinTrack - Personal Expense Tracker

A modern, full-stack expense tracking application built with Next.js, Express, and MongoDB. Track your expenses, visualize spending patterns, and manage your finances with ease.

![FinTrack](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📋 Table of Contents

- Features
- Tech Stack
- [Project Structure](#-project-structure)
- Prerequisites
- Installation
- Environment Variables
- Running the Application
- [Available Scripts](#-available-scripts)
- API Documentation
- Deployment
- Contributing
- License

## ✨ Features

- **User Authentication** - Secure JWT-based authentication with password hashing
- **Expense Management** - Create, read, update, and delete expenses
- **Category-wise Tracking** - Organize expenses by categories (Food, Transport, Entertainment, etc.)
- **Visual Analytics** - Beautiful charts and statistics using Recharts
- **Responsive Design** - Mobile-friendly interface built with Tailwind CSS
- **Real-time Updates** - Instant UI updates with optimistic rendering
- **Secure API** - Protected routes with middleware authentication
- **Form Validation** - Client and server-side validation
- **Toast Notifications** - User-friendly feedback system

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, shadcn/ui
- **Animations:** Framer Motion
- **Charts:** Recharts
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Form Handling:** React Hook Form
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **CORS:** CORS middleware

### Development Tools
- **Monorepo:** Turborepo
- **Package Manager:** npm
- **Linting:** ESLint
- **Formatting:** Prettier
- **Type Checking:** TypeScript

## 📁 Project Structure

```
FinTrack/
├── apps/
│   ├── frontend/              # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/          # App router pages
│   │   │   ├── components/   # React components
│   │   │   ├── context/      # Context providers
│   │   │   ├── lib/          # Utilities and API client
│   │   │   └── utils/        # Helper functions
│   │   ├── public/           # Static assets
│   │   └── package.json
│   │
│   └── backend/              # Express.js backend API
│       ├── src/
│       │   ├── config/       # Database configuration
│       │   ├── controllers/  # Route controllers
│       │   ├── middleware/   # Custom middleware
│       │   ├── models/       # Mongoose models
│       │   ├── routes/       # API routes
│       │   ├── types/        # TypeScript types
│       │   ├── utils/        # Helper functions
│       │   └── index.ts      # Entry point
│       └── package.json
│
├── packages/
│   ├── eslint-config/        # Shared ESLint configurations
│   ├── typescript-config/    # Shared TypeScript configurations
│   └── ui/                   # Shared UI components (optional)
│
├── turbo.json                # Turborepo configuration
└── package.json              # Root package.json
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** >= 11.x
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/royanish0410/fintrack.git
cd fintrack
```

### 2. Install Dependencies

```bash
# Install all dependencies for monorepo
npm install
```

This will install dependencies for all workspaces (frontend, backend, and packages).

## 🔐 Environment Variables

### Backend Environment Variables

Create `.env` file in 

backend

:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/fintrack
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fintrack

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

Create `.env.production` file in 

backend

 for production:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
JWT_EXPIRE=7d
CLIENT_URL=https://fin-track-frontend-mu.vercel.app/    
```

### Frontend Environment Variables

Create `.env.local` file in 

frontend

:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Create `.env.production` file in 

frontend

 for production:

```env
NEXT_PUBLIC_API_URL=https://fintrack-ziby.onrender.com
```

## 🏃 Running the Application

### Development Mode

#### Option 1: Run All Services (Recommended)

```bash
# From root directory
npm run dev
```

This will start both frontend (port 3000) and backend (port 5000) concurrently.

#### Option 2: Run Services Separately

**Terminal 1 - Backend:**
```bash
cd apps/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd apps/frontend
npm run dev
```

### Access the Application

- **Frontend:** [http://localhost:3000](https://fin-track-frontend-mu.vercel.app/)
- **Backend API:** [http://localhost:5000](https://fintrack-ziby.onrender.com)
- **API Health Check:** [http://localhost:5000/health](http://localhost:5000/health)

### Production Build

```bash
# Build all apps
npm run build

# Start production servers
# Backend
cd apps/backend
npm start

# Frontend (in another terminal)
cd apps/frontend
npm start
```

## 📜 Available Scripts

### Root Level Scripts

```bash
npm run dev          # Start all services in development mode
npm run build        # Build all apps for production
npm run lint         # Lint all workspaces
npm run format       # Format code with Prettier
npm run check-types  # Type check all TypeScript code
```

### Frontend Scripts (

frontend

)

```bash
npm run dev         # Start Next.js development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
```

### Backend Scripts (

backend

)

```bash
npm run dev         # Start development server with hot reload
npm run build       # Compile TypeScript to JavaScript
npm run start       # Start production server
npm run type-check  # Type check without emitting files
```

## 📚 API Documentation

### Base URL
- Development: `http://localhost:5000`
- Production: 'https://fintrack-ziby.onrender.com'

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### Expense Endpoints

#### Get All Expenses
```http
GET /api/expenses
Authorization: Bearer <token>
```

#### Get Single Expense
```http
GET /api/expenses/:id
Authorization: Bearer <token>
```

#### Create Expense
```http
POST /api/expenses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Groceries",
  "amount": 50.00,
  "category": "Food",
  "description": "Weekly groceries",
  "date": "2024-01-15"
}
```

#### Update Expense
```http
PUT /api/expenses/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Groceries",
  "amount": 55.00
}
```

#### Delete Expense
```http
DELETE /api/expenses/:id
Authorization: Bearer <token>
```

#### Get Statistics
```http
GET /api/expenses/stats
Authorization: Bearer <token>
```

### Categories
- Food
- Transport
- Entertainment
- Shopping
- Bills
- Healthcare
- Education
- Other

## 🚢 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. **Connect your repository** to the deployment platform
2. **Set environment variables** from `.env.production`
3. **Build command:** `npm run build`
4. **Start command:** `npm start`
5. **Root directory:** 

backend



### Frontend Deployment (Vercel/Netlify)

1. **Connect your repository** to Vercel/Netlify
2. **Set environment variables** from `.env.production`
3. **Build command:** `npm run build`
4. **Output directory:** `.next` (for Vercel) or `out` (for static export)
5. **Root directory:** 

frontend



### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Set up database user and password
4. Whitelist your IP (or use 0.0.0.0/0 for all IPs)
5. Get connection string and update 

MONGODB_URI



## 🔧 Troubleshooting

### Common Issues

**Issue: MongoDB Connection Error**
```bash
# Check if MongoDB is running
sudo systemctl status mongod  # Linux
brew services list            # macOS

# Start MongoDB
sudo systemctl start mongod   # Linux
brew services start mongodb-community  # macOS
```

**Issue: Port Already in Use**
```bash
# Find process using port
lsof -i :3000  # Frontend
lsof -i :5000  # Backend

# Kill process
kill -9 <PID>
```

**Issue: Module Not Found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules apps/*/node_modules packages/*/node_modules
npm install
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (

git push origin feature/AmazingFeature

)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Anish Anand** - [GitHub Profile](https://github.com/royanish0410)
