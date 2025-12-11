import Link from 'next/link'

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-8">
          You dont have permission to access this page.
        </p>
        <Link href="/" className="bg-teal-600 text-white px-10 py-4 rounded-xl hover:bg-teal-700">
          Back to Home
        </Link>
      </div>
    </div>
  )
}