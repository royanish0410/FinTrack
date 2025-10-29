 # FinTrack Frontend

A modern, responsive expense tracking application built with Next.js 16, TypeScript, and Tailwind CSS. Features beautiful animations, real-time updates, and an intuitive user interface for managing your finances.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)

## ✨ Features

### 🔐 Authentication
- **Secure Login & Registration** - JWT-based authentication with protected routes
- **Password Visibility Toggle** - Enhanced user experience with show/hide password
- **Persistent Sessions** - Stay logged in across browser sessions
- **Automatic Redirects** - Smart navigation based on authentication state

### 💰 Expense Management
- **Create Expenses** - Quick expense entry with intuitive form
- **Edit & Delete** - Full CRUD operations with confirmation dialogs
- **Category Organization** - 8 predefined categories (Food, Transport, Entertainment, Shopping, Bills, Healthcare, Education, Other)
- **Date Tracking** - Calendar-based date selection for expenses
- **Description Notes** - Optional notes for detailed tracking

### 📊 Analytics & Visualization
- **Dashboard Overview** - Real-time statistics and insights
- **Category-wise Charts** - Beautiful pie charts using Recharts
- **Statistics Cards** - Total expenses, transaction count, and average expense
- **Spending Breakdown** - Visual representation of category-wise expenses

### 🔍 Advanced Features
- **Search & Filter** - Find expenses by title, category, or date range
- **Export to CSV** - Download your expense data for offline analysis
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile
- **Dark Mode Ready** - Theme support with Tailwind CSS

### 🎨 UI/UX
- **Smooth Animations** - Framer Motion powered transitions
- **Toast Notifications** - Real-time feedback for user actions
- **Loading States** - Elegant loading indicators
- **Form Validation** - Client-side validation with helpful error messages
- **Animated Borders** - Eye-catching UI elements with BorderBeam component
- **Confetti Celebrations** - Delightful micro-interactions

## 🛠 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** 
  - [Radix UI](https://www.radix-ui.com/) - Accessible primitives
  - [shadcn/ui](https://ui.shadcn.com/) - Beautiful components
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Charts:** [Recharts](https://recharts.org/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **State Management:** React Context API
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Date Handling:** [date-fns](https://date-fns.org/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x
- **npm** >= 11.x
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/royanish0410/fintrack.git
cd fintrack/apps/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the 

frontend

 directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production, create `.env.production`:

```env
NEXT_PUBLIC_API_URL=https://fintrack-ziby.onrender.com
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📜 Available Scripts

```bash
npm run dev         # Start development server with hot reload
npm run build       # Build for production
npm start           # Start production server
npm run lint        # Run ESLint for code quality
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/         # Dashboard page
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Landing page
│   │   └── globals.css       # Global styles
│   │
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── CategoryChart.tsx # Chart component
│   │   ├── ExpenseCard.tsx   # Expense display card
│   │   ├── ExpenseForm.tsx   # Expense form modal
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── ProtectedRoute.tsx # Auth guard
│   │   └── StatCard.tsx      # Statistics card
│   │
│   ├── context/              # React Context
│   │   └── AuthContext.tsx  # Authentication context
│   │
│   ├── lib/                  # Utilities
│   │   ├── api.ts           # API client (Axios)
│   │   ├── types.ts         # TypeScript types
│   │   └── utils.ts         # Helper functions
│   │
│   └── public/              # Static assets
│
├── .env.local               # Local environment variables
├── .env.production          # Production environment variables
├── components.json          # shadcn/ui configuration
├── next.config.ts           # Next.js configuration
├── package.json            # Dependencies
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Key Components

### 

AuthContext


Manages authentication state, user data, and provides login/logout functionality.

### 

ProtectedRoute


Higher-order component that guards routes requiring authentication.

### 

ExpenseForm


Modal form for creating and editing expenses with validation.

### 

ExpenseCard


Displays individual expense with category colors and action buttons.

### 

CategoryChart


Pie chart visualization of expenses by category using Recharts.

### 

StatCard


Displays key statistics with icons and animated hover effects.

## 🔧 Configuration

### Tailwind CSS

Custom utilities and components are defined in 

globals.css

:

- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.btn-danger` - Destructive action buttons
- `.input-field` - Styled input fields
- `.card` - Enhanced card styling

### API Client

The API client is configured in 

lib/api.ts

 with:

- Automatic token injection
- Response/error interceptors
- 401 redirect handling
- Base URL configuration

## 🎯 Features Walkthrough

### Dashboard (

dashboard/page.tsx

)
- Real-time expense statistics
- Category-wise pie chart
- Search and filter functionality
- Date range filtering
- CSV export
- Add/Edit/Delete operations

### Authentication
- Login page with email/password (

login/page.tsx

)
- Registration with validation (

register/page.tsx

)
- Secure JWT token storage
- Auto-redirect based on auth state

### Landing Page (

page.tsx

)
- Animated hero section
- Feature highlights
- Confetti animation on CTA click
- Responsive navigation

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variable:
   ```
   NEXT_PUBLIC_API_URL=your_backend_url
   ```
4. Deploy!

### Manual Deployment

```bash
# Build the application
npm run build

# The output is in .next directory
# Deploy .next directory to your hosting service
```

## 🔒 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

### API Connection Issues
- Verify backend is running at the URL specified in `NEXT_PUBLIC_API_URL`
- Check browser console for CORS errors
- Ensure backend CORS is configured to allow your frontend URL

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Anish Anand** - [GitHub Profile](https://github.com/royanish0410)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Live Demo:** [https://fin-track-frontend-mu.vercel.app](https://fin-track-frontend-mu.vercel.app)