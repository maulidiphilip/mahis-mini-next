import RegisterForm from '@/components/forms/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-teal-700 mb-2">Register New Patient</h1>
          <p className="text-gray-600">MaHIS – Maternal Health Module</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}