'use client'

import { useAuth } from './AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RequireRole({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode
  allowedRoles: ('ADMIN' | 'CLINICIAN' | 'DATA_CLERK' | 'VIEWER')[]
}) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    } else if (!allowedRoles.includes(user.role)) {
      router.replace('/unauthorized')
    }
  }, [user, allowedRoles, router])

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-700">You dont have permission to view this page.</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-6 px-8 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}