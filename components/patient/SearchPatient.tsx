'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string | null;
  nationalId?: string;
}

export default function SearchPatient() {
  const [query, setQuery] = useState('')
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false)

  const search = async () => {
    if (!query.trim()) return
    setLoading(true)
    const res = await fetch(`/api/patients?q=${encodeURIComponent(query)}`)
    const data = await res.json()
    setPatients(data)
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-teal-600 px-8 py-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-white text-center">
          Search Patient
        </h3>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Phone • Name • National ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && search()}
            className="flex-1 px-6 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:border-teal-500 focus:outline-none transition text-gray-900 placeholder-gray-500"
          />
          <button
            onClick={search}
            disabled={loading}
            className="px-10 py-5 bg-teal-600 text-white font-bold text-lg rounded-2xl hover:bg-teal-700 disabled:opacity-70 transition"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-5">
          {patients.map((p) => (
            <div key={p.id} className="bg-teal-50 border border-teal-200 rounded-2xl p-6 hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-xl font-bold text-teal-900">
                    {p.firstName} {p.lastName}
                  </p>
                  <p className="text-gray-700 mt-1">
                    {p.phone} • DOB: {p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString('en-GB') : '—'} • ID: {p.nationalId || '—'}
                  </p>
                </div>
                <Link
                  href={`/patient/${p.id}`}
                  className="px-8 py-3 bg-teal-600 text-white font-medium rounded-xl hover:bg-teal-700 transition whitespace-nowrap"
                >
                  View Record
                </Link>
              </div>
            </div>
          ))}

          {patients.length === 0 && query && !loading && (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600">
                No patient found.<br />
                <Link href="/register" className="text-teal-600 font-semibold underline">
                  Register a new patient
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}