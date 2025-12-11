import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  
  const visit = await prisma.visit.create({
    data: {
      ...body,
      visitDate: new Date(body.visitDate),
      weightKg: body.weightKg ? parseFloat(body.weightKg) : null,
      heightCm: body.heightCm ? parseFloat(body.heightCm) : null,
      fundalHeight: body.fundalHeight ? parseFloat(body.fundalHeight) : null,
      fetalHeartRate: body.fetalHeartRate ? parseInt(body.fetalHeartRate) : null,
    },
  })

  return Response.json(visit)
}