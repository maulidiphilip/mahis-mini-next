'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden p-2 rounded-lg hover:bg-teal-600 transition"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
            d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
      )}
      {open && (
        <div className="fixed top-20 left-0 right-0 bg-teal-700 border-t-4 border-teal-500 z-50 shadow-2xl">
          <div className="px-6 py-8 space-y-6 text-center">
            <div className="text-sm">
              <p className="opacity-80">Presidential Initiative on</p>
              <p className="font-bold text-lg">Maternal Health</p>
              <p className="font-medium mt-1">Digital Health Division</p>
            </div>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="block w-full py-4 bg-white text-teal-700 font-bold text-lg rounded-xl shadow-lg hover:bg-gray-100 transition"
            >
              Register New Patient
            </Link>
          </div>
        </div>
      )}
    </>
  )
}