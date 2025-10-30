'use client';

import { useAuth } from '@/context/AuthContext';
import { Wallet, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
const { user, logout } = useAuth();

return (
<motion.nav
initial={{ y: -50, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.5 }}
className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md"
> <div className="container mx-auto px-4"> <div className="flex justify-between items-center h-16">
{/* Logo */}
<motion.div
whileHover={{ scale: 1.05 }}
className="flex items-center space-x-3 cursor-pointer"
> <div className="p-2 bg-linear-to-br from-emerald-600 to-emerald-600 rounded-lg shadow-md"> <Wallet className="h-6 w-6 text-white" /> </div> <span className="text-xl font-bold bg-linear-to-r from-emerald-600 to-emerald-600 bg-clip-text text-transparent">
FinTrack </span>
</motion.div>

      {/* User Menu */}
      <div className="flex items-center space-x-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg shadow-sm"
        >
          <User className="h-2 w-2 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">{user?.name}</span>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#fee2e2' }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="flex items-center space-x-2 px-4 py-2 text-red-600 rounded-lg font-medium transition-all"
        >
          <LogOut className="h-3 w-3" />
          <span>Logout</span>
        </motion.button>
      </div>
    </div>
  </div>
</motion.nav>
);
}