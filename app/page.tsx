import SearchPatient from '@/components/patient/SearchPatient'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 py-16 text-center bg-white border-b">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-teal-800 mb-6">
            MaHIS
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Electronic Health Record System for Maternal and Child Health Services<br />
            Ministry of Health and Sanitation • Republic of Malawi
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <SearchPatient />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center bg-white">
        <Link
          href="/register"
          className="inline-flex items-center gap-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg sm:text-xl px-10 sm:px-14 py-6 rounded-2xl shadow-xl transition-all transform hover:scale-105"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Register New Patient
        </Link>
      </section>
    </>
  )
}