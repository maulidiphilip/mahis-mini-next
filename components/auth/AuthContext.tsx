'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type User = {
  id: string
  email: string
  name: string | null
  role: 'ADMIN' | 'CLINICIAN' | 'DATA_CLERK' | 'VIEWER'
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on first mount — NO setState in effect body!
  useEffect(() => {
    const loadUser = () => {
      try {
        const saved = localStorage.getItem('user')
        if (saved) {
          const parsed = JSON.parse(saved)
          setUser(parsed)
        }
      } catch (e) {
        localStorage.removeItem('user')
      }
    }

    loadUser()
  }, []) // ← empty dependency = runs once on mount

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(error || 'Login failed')
    }

    const data = await res.json()
    setUser(data.user)
    localStorage.setItem('user', JSON.stringify(data.user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}