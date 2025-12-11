'use client'

import { useAuth } from '@/components/auth/AuthContext'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    try {
      await login(form.get('email') as string, form.get('password') as string)
      router.push('/')
    } catch (err) {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-teal-700 text-center mb-8">MaHIS Mini Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="email" type="email" placeholder="Email" required className="w-full px-6 py-4 border-2 rounded-xl" />
          <input name="password" type="password" placeholder="Password" required className="w-full px-6 py-4 border-2 rounded-xl" />
          <button type="submit" className="w-full bg-teal-600 text-white font-bold py-5 rounded-xl hover:bg-teal-700">
            Login
          </button>
        </form>
        <div className="mt-6 text-sm text-gray-600">
          <p>Demo accounts:</p>
          <p>admin@mahis.mw / admin123</p>
          <p>clinician@mahis.mw / clinician123</p>
        </div>
      </div>
    </div>
  )
}