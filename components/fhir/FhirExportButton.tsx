'use client'

import { Patient, Visit } from "@/app/generated/prisma/client"


interface PatientWithVisits extends Patient {
  visits: Visit[]
}

export default function FhirExportButton({ patient }: { patient: PatientWithVisits }) {
  const generateFhirBundle = () => {
    const bundle = {
      resourceType: "Bundle",
      type: "collection",
      entry: [
        {
          fullUrl: `Patient/${patient.id}`,
          resource: {
            resourceType: "Patient",
            id: patient.id,
            name: [{ family: patient.lastName, given: [patient.firstName] }],
            telecom: patient.phone ? [{ system: "phone", value: patient.phone }] : [],
            birthDate: patient.dateOfBirth ? new Date(patient.dateOfBirth).toISOString().split('T')[0] : undefined,
            gender: patient.gender,
          },
        },
        ...patient.visits.map((visit) => ({
          fullUrl: `Observation/${visit.id}`,
          resource: {
            resourceType: "Observation",
            status: "final",
            code: { coding: [{ system: "http://loinc.org", code: "ANC", display: "Antenatal Care" }] },
            subject: { reference: `Patient/${patient.id}` },
            effectiveDateTime: new Date(visit.visitDate).toISOString(),
            valueQuantity: visit.weightKg ? { value: visit.weightKg, unit: "kg" } : undefined,
          },
        })),
      ],
    }

    const dataStr = JSON.stringify(bundle, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${patient.firstName}_${patient.lastName}_FHIR.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={generateFhirBundle}
      className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-10 py-6 rounded-2xl shadow-xl transition-all transform hover:scale-105 flex items-center gap-4 whitespace-nowrap"
    >
      Export as FHIR Bundle
    </button>
  )
}