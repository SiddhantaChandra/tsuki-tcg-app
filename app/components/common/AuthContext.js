'use client'

import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('login') // Centralized tab state

  const openSignIn = () => {
    setIsSignInOpen(true)
    setIsSignUpOpen(false)
    setActiveTab('login')
  }

  const openSignUp = () => {
    setIsSignUpOpen(true)
    setIsSignInOpen(false)
    setActiveTab('register')
  }

  const closeModals = () => {
    setIsSignInOpen(false)
    setIsSignUpOpen(false)
  }

  const switchToSignUp = () => {
    setIsSignInOpen(false)
    setIsSignUpOpen(true)
    setActiveTab('register')
  }

  const switchToSignIn = () => {
    setIsSignUpOpen(false)
    setIsSignInOpen(true)
    setActiveTab('login')
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'login') {
      switchToSignIn()
    } else if (tab === 'register') {
      switchToSignUp()
    }
  }

  const value = {
    isSignInOpen,
    isSignUpOpen,
    user,
    setUser,
    activeTab,
    setActiveTab,
    openSignIn,
    openSignUp,
    closeModals,
    switchToSignUp,
    switchToSignIn,
    handleTabChange
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 