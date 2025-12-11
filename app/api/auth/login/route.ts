import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // In real app: use httpOnly cookie + JWT. For demo: return user
  return Response.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  })
}