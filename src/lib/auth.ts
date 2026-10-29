import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { prisma } from './db'

const SESSION_COOKIE_NAME = 'ttl_admin_session'
const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) return null

  try {
    const [userId, expiry] = token.split(':')
    const exp = parseInt(expiry, 10)
    if (!userId || isNaN(exp) || Date.now() > exp) return null

    const admin = await prisma.adminUser.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true, isActive: true },
    })

    if (!admin || !admin.isActive) return null
    return admin
  } catch {
    return null
  }
}

export async function createAdminSession(adminId: string): Promise<void> {
  const expiry = Date.now() + SESSION_MAX_AGE * 1000
  const token = `${adminId}:${expiry}`

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })

  await prisma.adminUser.update({
    where: { id: adminId },
    data: { lastLoginAt: new Date() },
  })
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
}

export function requireAdmin(session: Awaited<ReturnType<typeof getAdminSession>> | null) {
  if (!session) {
    return { unauthorized: true }
  }
  return { session }
}
