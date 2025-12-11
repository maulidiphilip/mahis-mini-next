import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')?.trim()

    if (!q) {
        return Response.json([])
    }

    const patients = await prisma.patient.findMany({
        where: {
            OR: [
                { phone: { contains: q, mode: 'insensitive' } },
                { firstName: { contains: q, mode: 'insensitive' } },
                { lastName: { contains: q, mode: 'insensitive' } },
                { nationalId: { contains: q, mode: 'insensitive' } },
            ],
        },
        take: 20,
        orderBy: { createdAt: 'desc' },
    })

    return Response.json(patients)
}

export async function POST(request: Request) {
    const body = await request.json()
    const patient = await prisma.patient.create({
        data: {
            ...body,
            dateOfBirth: body.dateOfBirth ? new Date(body.dateOfBirth) : null,
        },
    })
    return Response.json(patient, { status: 201 })
}