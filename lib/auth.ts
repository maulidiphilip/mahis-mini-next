import { cookies } from 'next/headers'
import { prisma } from './prisma'

export async function getCurrentUser() {
  // For demo: we store user in memory via context
  // In real app: read from httpOnly cookie
  return null // will be replaced by context
}