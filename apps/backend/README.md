# FinTrack Backend API

A robust RESTful API built with Express.js, TypeScript, and MongoDB for managing personal expenses. Features JWT authentication, data validation, and comprehensive error handling.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-brightgreen)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey)

## 📋 Table of Contents

- Features
- Tech Stack
- [Project Structure](#-project-structure)
- Prerequisites
- Installation
- Environment Variables
- Running the Application
- API Documentation
- Database Schema
- Authentication Flow
- Error Handling
- Deployment
- Troubleshooting

## ✨ Features

### 🔐 Authentication & Security
- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for password encryption
- **Protected Routes** - Middleware-based route protection
- **Token Expiration** - Configurable token lifespan
- **CORS Configuration** - Cross-origin resource sharing setup

### 💼 Expense Management
- **CRUD Operations** - Create, read, update, delete expenses
- **User Isolation** - Users can only access their own expenses
- **Category System** - 8 predefined expense categories
- **Date Tracking** - Timestamp-based expense tracking
- **Statistics** - Total expenses, counts, and averages

### 🛡️ Data Validation
- **Request Validation** - express-validator middleware
- **Schema Validation** - Mongoose schema validators
- **Type Safety** - TypeScript for compile-time checks
- **Error Messages** - Detailed validation error responses

### 📊 API Features
- **RESTful Design** - Standard REST conventions
- **JSON Responses** - Consistent response structure
- **Error Handling** - Centralized error middleware
- **Health Checks** - Server status endpoints
- **CORS Support** - Configurable origin policies

## 🛠 Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/) >= 18.x
- **Framework:** [Express.js](https://expressjs.com/) 4.18
- **Language:** [TypeScript](https://www.typescriptlang.org/) 5.0
- **Database:** [MongoDB](https://www.mongodb.com/) 8.0
- **ODM:** [Mongoose](https://mongoosejs.com/) 8.0
- **Authentication:** [JWT](https://jwt.io/) (jsonwebtoken)
- **Password Hashing:** [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Validation:** [express-validator](https://express-validator.github.io/)
- **CORS:** [cors](https://www.npmjs.com/package/cors)
- **Environment:** [dotenv](https://www.npmjs.com/package/dotenv)

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── authController.ts    # Authentication logic
│   │   └── expenseController.ts # Expense CRUD operations
│   │
│   ├── middleware/
│   │   ├── auth.ts              # JWT verification
│   │   ├── errorHandler.ts      # Error handling
│   │   └── validation.ts        # Request validation
│   │
│   ├── models/
│   │   ├── User.ts              # User schema
│   │   └── Expense.ts           # Expense schema
│   │
│   ├── routes/
│   │   ├── authRoutes.ts        # Auth endpoints
│   │   └── expenseRoutes.ts     # Expense endpoints
│   │
│   ├── types/
│   │   ├── index.ts             # Type definitions
│   │   └── express.d.ts         # Express type extensions
│   │
│   └── index.ts                 # Application entry point
│
├── .env                          # Local environment variables
├── .env.production              # Production environment variables
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 📦 Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** >= 11.x (comes with Node.js)
- **MongoDB** ([Local Installation](https://www.mongodb.com/try/download/community) or [Atlas Account](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/royanish0410/fintrack.git
cd fintrack/apps/backend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- express-validator
- cors
- dotenv
- TypeScript and type definitions

### 3. Set Up MongoDB

#### Option A: Local MongoDB

```bash
# Install MongoDB Community Edition
# macOS
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify MongoDB is running
mongosh
```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address (or use `0.0.0.0/0` for all IPs)
5. Get your connection string

## 🔐 Environment Variables

### Development Environment

Create a `.env` file in the 

backend

 directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/fintrack

# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fintrack?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=7d

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### Production Environment

Create a `.env.production` file in the 

backend

 directory:

```env
# Server Configuration
NODE_ENV=production
PORT=5000

# MongoDB Configuration (Use MongoDB Atlas for production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fintrack?retryWrites=true&w=majority

# JWT Configuration (Use strong secret in production)
JWT_SECRET=your_production_jwt_secret_min_32_characters_long_random_string
JWT_EXPIRE=7d

# Client URL (Your deployed frontend URL)
CLIENT_URL=https://fin-track-frontend-mu.vercel.app
```

### Environment Variable Descriptions

| Variable | Description | Example |
|----------|-------------|---------|
| 

NODE_ENV

 | Application environment | `development` or `production` |
| 

PORT

 | Server port number | `5000` |
| 

MONGODB_URI

 | MongoDB connection string | `mongodb://localhost:27017/fintrack` |
| 

JWT_SECRET

 | Secret key for JWT signing | Min 32 characters, use random string |
| 

JWT_EXPIRE

 | JWT token expiration time | `7d`, `24h`, `30d` |
| 

CLIENT_URL

 | Frontend URL for CORS | `http://localhost:3000` |

## 🏃 Running the Application

### Development Mode (with hot reload)

```bash
npm run dev
```

The server will start on `http://localhost:5000` with automatic restart on file changes.

### Production Build

```bash
# Compile TypeScript to JavaScript
npm run build

# Start production server
npm start
```

### Type Checking

```bash
# Check TypeScript types without emitting files
npm run type-check
```

## 📚 API Documentation

### Base URL

- **Development:** `http://localhost:5000`
- **Production:** `https://fintrack-ziby.onrender.com`

### Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [ /* validation errors if any */ ]
}
```

---

## 🔐 Authentication Endpoints

### 1. Register User

Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- 

name

: 2-50 characters, required
- 

email

: Valid email format, unique, required
- 

password

: Minimum 6 characters, required

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Error Responses:**
- `400`: Validation failed or user already exists
- `500`: Server error

---

### 2. Login User

Authenticate existing user.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Error Responses:**
- `401`: Invalid email or password
- `500`: Server error

---

### 3. Get Current User

Get authenticated user's profile.

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `401`: Not authorized or invalid token
- `404`: User not found
- `500`: Server error

---

### 4. Logout User

Logout current user (frontend should delete token).

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully. Please remove token from client."
}
```

---

## 💰 Expense Endpoints

All expense endpoints require authentication. Include JWT token in Authorization header.

### 1. Get All Expenses

Retrieve all expenses for authenticated user with optional filters.

**Endpoint:** `GET /api/expenses`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters (Optional):**
```
?category=Food
&startDate=2024-01-01
&endDate=2024-12-31
&search=groceries
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Groceries",
      "amount": 50.00,
      "category": "Food",
      "description": "Weekly groceries",
      "date": "2024-01-15T00:00:00.000Z",
      "user": "507f1f77bcf86cd799439010",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Expense

Retrieve a specific expense by ID.

**Endpoint:** `GET /api/expenses/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Groceries",
    "amount": 50.00,
    "category": "Food",
    "description": "Weekly groceries",
    "date": "2024-01-15T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439010"
  }
}
```

**Error Responses:**
- `404`: Expense not found
- `403`: Not authorized to access this expense
- `401`: Authentication required

---

### 3. Create Expense

Create a new expense.

**Endpoint:** `POST /api/expenses`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Groceries",
  "amount": 50.00,
  "category": "Food",
  "description": "Weekly groceries",
  "date": "2024-01-15"
}
```

**Validation Rules:**
- 

title

: 2-100 characters, required
- 

amount

: Number > 0, required
- 

category

: Must be one of: Food, Transport, Entertainment, Shopping, Bills, Healthcare, Education, Other (required)
- 

description

: Max 500 characters, optional
- 

date

: ISO date format, optional (defaults to current date)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Groceries",
    "amount": 50.00,
    "category": "Food",
    "description": "Weekly groceries",
    "date": "2024-01-15T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439010",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: Authentication required

---

### 4. Update Expense

Update an existing expense.

**Endpoint:** `PUT /api/expenses/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Groceries",
  "amount": 55.00,
  "category": "Food",
  "description": "Updated description"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Expense updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Groceries",
    "amount": 55.00,
    "category": "Food",
    "description": "Updated description",
    "date": "2024-01-15T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439010"
  }
}
```

**Error Responses:**
- `404`: Expense not found
- `403`: Not authorized to update this expense
- `400`: Validation failed

---

### 5. Delete Expense

Delete an expense.

**Endpoint:** `DELETE /api/expenses/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Expense deleted successfully",
  "data": {}
}
```

**Error Responses:**
- `404`: Expense not found
- `403`: Not authorized to delete this expense

---

### 6. Get Statistics

Get expense statistics for authenticated user.

**Endpoint:** `GET /api/expenses/stats`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalExpenses": 1250.50,
    "expenseCount": 25,
    "averageExpense": 50.02,
    "categoryBreakdown": [
      {
        "category": "Food",
        "total": 500.00,
        "count": 10
      },
      {
        "category": "Transport",
        "total": 300.00,
        "count": 8
      }
    ]
  }
}
```

---

## 📊 Database Schema

### User Model (

src/models/User.ts

)

```typescript
{
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /email regex/
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false  // Not included in queries by default
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Methods:**
- 

comparePassword(candidatePassword)

 - Compare hashed passwords

**Hooks:**
- 

pre('save')

 - Hash password before saving

---

### Expense Model (

src/models/Expense.ts

)

```typescript
{
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Entertainment', 'Shopping', 
           'Bills', 'Healthcare', 'Education', 'Other']
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Authentication Flow

### JWT Token Structure

```json
{
  "id": "user_id_from_database",
  "iat": 1234567890,  // Issued at
  "exp": 1234567890   // Expiration
}
```

### Authentication Process

1. **User Registration/Login:**
   - User provides credentials
   - Server validates credentials
   - Server generates JWT token with user ID
   - Token sent to client

2. **Token Storage:**
   - Client stores token (localStorage/memory)
   - Token format: `Bearer <actual_token>`

3. **Authenticated Requests:**
   - Client includes token in Authorization header
   - 

protect

 middleware extracts and verifies token
   - If valid, user object attached to 

req.user


   - Route handler accesses user via 

req.user



4. **Token Verification (

src/middleware/auth.ts

):**
   ```typescript
   - Extract token from Authorization header
   - Verify token with JWT_SECRET
   - Decode user ID from token
   - Find user in database
   - Attach user to request object
   ```

---

## ⚠️ Error Handling

### Error Handler Middleware (

src/middleware/errorHandler.ts

)

Centralized error handling for:

- **CastError** (404) - Invalid MongoDB ObjectId
- **11000 Error** (400) - Duplicate key (e.g., existing email)
- **ValidationError** (400) - Mongoose validation failure
- **JsonWebTokenError** (401) - Invalid JWT token
- **TokenExpiredError** (401) - Expired JWT token

**Error Response Format:**
```json
{
  "success": false,
  "message": "Error description",
  "stack": "Error stack trace (development only)"
}
```

---

## 🚢 Deployment

### Deploy to Render

1. **Create Account:** Sign up at [Render](https://render.com)

2. **Create New Web Service:**
   - Connect your GitHub repository
   - Select the 

backend

 directory

3. **Configure Build Settings:**
   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Set Environment Variables:**
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<your_mongodb_atlas_uri>
   JWT_SECRET=<your_secret_key>
   JWT_EXPIRE=7d
   CLIENT_URL=<your_frontend_url>
   ```

5. **Deploy:** Click "Create Web Service"

## 🐛 Troubleshooting

### MongoDB Connection Issues

```bash
# Check MongoDB service status
# macOS
brew services list

# Start MongoDB
brew services start mongodb-community

# Linux
sudo systemctl status mongod
sudo systemctl start mongod

# Verify connection
mongosh
```

**Common Errors:**
- `MongooseServerSelectionError`: MongoDB not running or wrong URI
- `MongoNetworkError`: Network connectivity issue
- `Authentication failed`: Wrong username/password in URI

---

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or use a different port in .env
PORT=5001
```

---

### JWT Token Errors

**Invalid Token:**
- Ensure 

JWT_SECRET

 is set correctly
- Check token format: `Bearer <token>`
- Verify token hasn't expired

**Token Expired:**
- Increase 

JWT_EXPIRE

 value
- User needs to login again

---

### TypeScript Compilation Errors

```bash
# Clear build directory
rm -rf dist

# Reinstall dependencies
rm -rf node_modules
npm install

# Check TypeScript configuration
npm run type-check

# Build again
npm run build
```

---

### CORS Issues

**Error:** `Access-Control-Allow-Origin`

**Solution:** Update 

CLIENT_URL

 in `.env`:
```env
CLIENT_URL=http://localhost:3000
```

Or allow multiple origins in 

src/index.ts

:
```typescript
const allowedOrigins = ['http://localhost:3000', 'https://your-frontend.com'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

---

### Database Seeding (Optional)

Create test data:

```typescript
// src/utils/seed.ts
import User from './models/User';
import Expense from './models/Expense';

async function seedDatabase() {
  // Create test user
  const user = await User.create({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  });

  // Create test expenses
  await Expense.create([
    {
      title: 'Groceries',
      amount: 50,
      category: 'Food',
      user: user._id
    },
    // ... more expenses
  ]);
}
```

---

## 📝 API Testing

### Using cURL

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get expenses (replace TOKEN)
curl -X GET http://localhost:5000/api/expenses \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman

1. Import collection from `postman_collection.json` (if provided)
2. Set environment variable: `BASE_URL=http://localhost:5000`
3. Test endpoints with saved requests

---

## 🔧 Development Tips

### Hot Reload

The development server uses 

tsx watch

 for automatic restart:

```bash
npm run dev
```

### Debugging

Add breakpoints and debug in VS Code:

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

### Logging

Add Morgan for HTTP logging:

```bash
npm install morgan
npm install --save-dev @types/morgan
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Authors

- **Anish Anand** - [GitHub Profile](https://github.com/royanish0410)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (

git push origin feature/AmazingFeature

)
5. Open a Pull Request

---

## 📞 Support

For issues and questions:

- Open an issue on [GitHub](https://github.com/royanish0410/fintrack/issues)
- Email: [your-email@example.com]

---

**Live API:** [https://fintrack-ziby.onrender.com](https://fintrack-ziby.onrender.com)