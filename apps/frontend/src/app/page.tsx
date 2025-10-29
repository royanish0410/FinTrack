'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ArrowRight, Wallet, TrendingUp, PieChart, Shield } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="rounded-full h-12 w-12 border-b-2 border-emerald-500"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-emerald-50">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="p-3 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            FinTrack
          </span>
        </div>
        <div className="space-x-4">
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-700 font-semibold hover:text-emerald-600 transition-colors"
            >
              Login
            </motion.button>
          </Link>
          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-6 py-2 text-white font-semibold rounded-lg shadow-md bg-linear-to-r from-emerald-500 to-teal-500 hover:opacity-90"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mt-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
        >
          Take Control of Your Finances
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-600 text-lg mt-4 mb-8"
        >
          Track expenses, analyze spending, and achieve your financial goals with FinTrack.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05, y: -3 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link href="/register">
            <button
              onClick={() => setShowConfetti(true)}
              className="text-lg px-8 py-3 font-semibold rounded-lg shadow-md bg-linear-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90"
            >
              Start Tracking Free
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: <Wallet className="h-8 w-8 text-emerald-600" />,
            title: 'Easy Tracking',
            desc: 'Add expenses in seconds with our intuitive interface.',
          },
          {
            icon: <PieChart className="h-8 w-8 text-teal-600" />,
            title: 'Visual Insights',
            desc: 'Beautiful charts to understand your spending habits.',
          },
          {
            icon: <TrendingUp className="h-8 w-8 text-emerald-700" />,
            title: 'Smart Analytics',
            desc: 'Category-wise breakdown of your expenses.',
          },
          {
            icon: <Shield className="h-8 w-8 text-teal-700" />,
            title: 'Secure & Private',
            desc: 'Your data is encrypted and completely secure.',
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="card border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow p-6 rounded-2xl text-center"
          >
            <div className="inline-block p-4 bg-slate-100 rounded-full mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
            <p className="text-slate-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 flex items-center justify-center z-50"
        >
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            onConfettiComplete={() => setShowConfetti(false)}
          />
        </motion.div>
      )}
    </div>
  );
}
