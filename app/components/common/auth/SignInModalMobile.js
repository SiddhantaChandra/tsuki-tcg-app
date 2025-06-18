'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Xmark, Eye, EyeClosed } from 'iconoir-react'
import Image from 'next/image'
import { useAuth } from '../AuthContext'
import AuthToggle from './AuthToggle'

export default function SignInModalMobile() {
  const { isSignInOpen, closeModals, switchToSignUp, activeTab, handleTabChange } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
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
    <div className={`fixed inset-0 bg-white dark:bg-neutral-900 z-50 flex flex-col h-screen ${isSignInOpen ? 'block' : 'hidden'}`}>
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={closeModals}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <Xmark className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pt-16 pb-8 flex flex-col h-full overflow-y-auto">
          {/* Title Section */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Don&apos;t have an account? 
              <button 
                onClick={switchToSignUp}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium ml-1"
              >
                Sign Up
              </button>
            </p>
          </div>

          {/* Toggle Component */}
          <div className="mb-6">
            <AuthToggle 
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 mb-5">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                placeholder="ferdin@gmail.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeClosed className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-xs text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all text-sm"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-neutral-900 text-gray-500">or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
              <Image
                src="/assets/images/auth/GoogleIcon.svg"
                alt="Google"
                width={16}
                height={16}
              />
              <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">Google</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-auto text-center">
            <span className="text-gray-600 dark:text-gray-400 text-xs">Don&apos;t have an account? </span>
            <button
              onClick={switchToSignUp}
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium text-xs"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    )
} 