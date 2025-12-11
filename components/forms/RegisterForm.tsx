'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', nationalId: '', dateOfBirth: '', gender: 'female'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        alert('Patient registered successfully!')
        router.push('/')
      }
    } catch (err) {
      alert('Error registering patient')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
            placeholder="0999123456" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">National ID (optional)</label>
          <input value={form.nationalId} onChange={e => setForm({...form, nationalId: e.target.value})}
            placeholder="MW199805120001" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input required type="date" value={form.dateOfBirth} onChange={e => setForm({...form, dateOfBirth: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg">
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-4 bg-teal-600 text-white text-lg font-semibold rounded-xl hover:bg-teal-700 disabled:opacity-70">
        {loading ? 'Registering...' : 'Register Patient'}
      </button>
    </form>
  )
}