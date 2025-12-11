// app/patient/[id]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import FhirExportButton from '@/components/fhir/FhirExportButton'
import RequireRole from '@/components/auth/RequireRole'
import NewVisitForm from '@/components/patient/NewVisitForm'

export default async function PatientPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      visits: {
        orderBy: { visitDate: 'desc' },
      },
    },
  })

  if (!patient) notFound()

  const age = patient.dateOfBirth
    ? Math.floor((new Date().getTime() - new Date(patient.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 365))
    : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-teal-700 text-white shadow-xl">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                {patient.firstName} {patient.lastName}
              </h1>
              <p className="text-teal-100 text-lg mt-2">
                National ID: {patient.nationalId || '—'} • Phone: {patient.phone}
              </p>
            </div>
            <Link
              href="/"
              className="bg-white/20 hover:bg-white/30 px-8 py-4 rounded-2xl font-medium transition self-start sm:self-center"
            >
              ← Back to Search
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Patient Info + FHIR Export */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10 border border-gray-200">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-teal-800 mb-6">Patient Information</h2>
              <div className="space-y-4 text-lg">
                <p><span className="font-medium text-gray-800">Age:</span> <strong>{age ? `${age} years` : '—'}</strong></p>
                <p><span className="font-medium text-gray-800">Date of Birth:</span> {patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString('en-GB') : '—'}</p>
                <p><span className="font-medium text-gray-800">Total ANC Visits:</span> <span className="text-3xl font-bold text-teal-600">{patient.visits.length}</span></p>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              {/* ADMIN & CLINICIAN can export */}
              <RequireRole allowedRoles={['ADMIN', 'CLINICIAN']}>
                <FhirExportButton patient={patient} />
              </RequireRole>
            </div>
          </div>
        </div>

        {/* ONLY CLINICIANS CAN RECORD NEW VISITS */}
        <RequireRole allowedRoles={['CLINICIAN']}>
          <div className="mb-12">
            <NewVisitForm patientId={patient.id} />
          </div>
        </RequireRole>

        {/* ANC Timeline — Everyone can see */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-teal-800 mb-8">ANC Visit History</h2>

          {patient.visits.length === 0 ? (
            <p className="text-center text-gray-500 py-16 text-xl">No ANC visits recorded yet.</p>
          ) : (
            <div className="space-y-10">
              {patient.visits.map((visit, i) => (
                <div key={visit.id} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                      {patient.visits.length - i}
                    </div>
                    {i < patient.visits.length - 1 && (
                      <div className="w-1 h-32 bg-teal-300 mt-2"></div>
                    )}
                  </div>

                  <div className="flex-1 bg-gradient-to-r from-teal-50 to-white rounded-2xl p-6 border border-teal-200 shadow-md">
                    <p className="text-xl font-bold text-teal-900">
                      {new Date(visit.visitDate).toLocaleDateString('en-GB', { 
                        day: 'numeric', month: 'long', year: 'numeric' 
                      })}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Weight</p>
                        <p className="text-2xl font-bold text-teal-700">{visit.weightKg || '—'} kg</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Blood Pressure</p>
                        <p className="text-2xl font-bold text-teal-700">{visit.bloodPressure || '—'}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Fundal Height</p>
                        <p className="text-2xl font-bold text-teal-700">{visit.fundalHeight || '—'} cm</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Fetal HR</p>
                        <p className="text-2xl font-bold text-teal-700">{visit.fetalHeartRate || '—'} bpm</p>
                      </div>
                    </div>
                    {visit.notes && (
                      <p className="mt-6 text-gray-700 italic border-t pt-4">" {visit.notes} "</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}