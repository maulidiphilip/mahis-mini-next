// components/auth/RequireRole.tsx
'use client'
import { useAuth } from './AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RequireRole({ children, roles }: { children: React.ReactNode, roles: string[] }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || !roles.includes(user.role)) {
      router.replace('/login')
    }
  }, [user, roles, router])

  if (!user || !roles.includes(user.role)) {
    return <div className="text-center py-20">Access Denied</div>
  }

  return <>{children}</>
}