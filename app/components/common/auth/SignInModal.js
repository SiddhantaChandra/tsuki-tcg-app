'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../AuthContext'
import { useDarkMode } from '../DarkModeContext'
import { Xmark, Eye, EyeClosed, GoogleIcon, Facebook } from 'iconoir-react'
import { useState } from 'react'
import Image from 'next/image'

export default function SignInModal() {
  const { isSignInOpen, closeModals, switchToSignUp } = useAuth()
  const { isDarkMode } = useDarkMode()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle sign in logic here
    console.log('Sign in:', formData)
    closeModals()
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!isSignInOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && closeModals()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          <div className="flex flex-col md:flex-row h-full">
            {/* Left side - Form */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              {/* Social Login */}
              <div className="mb-4">
                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                  <Image
                    src="/assets/images/auth/GoogleIcon.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">Continue with Google</span>
                </button>
              </div>

              {/* Divider */}
                              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-neutral-900 text-gray-500">or</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 text-sm pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-600 dark:text-gray-400">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-purple-600 hover:text-purple-500 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Login
                </button>
              </form>

              {/* Footer */}
              <div className="mt-2 space-y-4">
                <div className="text-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Don&apos;t have an account? </span>
                  <button
                    onClick={switchToSignUp}
                    className="text-purple-600 hover:text-purple-500 font-semibold"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                  © 2024. All Rights Reserved.
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src="/assets/images/auth/SignIn_SignUp.webp"
                  alt="Sign In"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-end justify-center p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                    Sign In
                  </h2>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 