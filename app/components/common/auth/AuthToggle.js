'use client'

import { motion } from 'framer-motion'

export default function AuthToggle({ activeTab, onTabChange }) {
  return (
    <div className="relative bg-gray-100 dark:bg-neutral-800 p-1 rounded-lg flex">
      {/* Background slider */}
      <motion.div
        className="absolute top-1 bottom-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md shadow-sm"
        animate={{
          x: activeTab === 'login' ? 0 : '100%',
          width: '50%'
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
      />
      
      {/* Login Tab */}
      <button
        onClick={() => onTabChange('login')}
        className={`relative z-10 flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
          activeTab === 'login'
            ? 'text-white'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
        }`}
      >
        Login
      </button>
      
      {/* Register Tab */}
      <button
        onClick={() => onTabChange('register')}
        className={`relative z-10 flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
          activeTab === 'register'
            ? 'text-white'
            : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
        }`}
      >
        Register
      </button>
    </div>
  )
} 