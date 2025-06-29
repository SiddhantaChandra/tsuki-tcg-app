'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useScrollLock } from './utils'
import { supabase } from '../../../lib/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('login') // Centralized tab state
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(false)
  
  // Apply scroll lock when any modal is open
  const isAnyModalOpen = isSignInOpen || isSignUpOpen
  useScrollLock(isAnyModalOpen)

  // Check for existing session on mount
  useEffect(() => {
    getSession()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function getSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    } catch (error) {
      console.error('Error getting session:', error)
    } finally {
      setLoading(false)
    }
  }

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

  // Auth functions
  const signUp = async (email, password, userData = {}) => {
    try {
      setAuthLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      
      if (error) {
        throw error
      }
      
      return { data, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { data: null, error }
    } finally {
      setAuthLoading(false)
    }
  }

  const signIn = async (email, password) => {
    try {
      setAuthLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        throw error
      }
      
      return { data, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { data: null, error }
    } finally {
      setAuthLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setAuthLoading(true)
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw error
      }
      
      setUser(null)
      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error }
    } finally {
      setAuthLoading(false)
    }
  }

  const value = {
    isSignInOpen,
    isSignUpOpen,
    user,
    setUser,
    activeTab,
    setActiveTab,
    loading,
    authLoading,
    openSignIn,
    openSignUp,
    closeModals,
    switchToSignUp,
    switchToSignIn,
    handleTabChange,
    signUp,
    signIn,
    signOut
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