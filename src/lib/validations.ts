import { z } from 'zod'

// Booking creation validation
export const createBookingSchema = z.object({
  serviceId: z.string().min(1, 'Service is required'),
  slotId: z.string().min(1, 'Time slot is required'),
  pairsCount: z.coerce.number().int().min(1, 'At least one place required').max(10, 'Maximum 10 places'),
  guardianName: z.string().min(2, 'Please enter your full name').max(100),
  guardianEmail: z.string().email('Please enter a valid email address').max(254),
  guardianPhone: z.string().optional().nullable(),
  babyAgeMonths: z.coerce.number().int().min(0).max(24).optional().nullable(),
  marketingConsent: z.boolean().optional().default(false),
})

// Experience/service update (admin)
export const updateServiceSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100),
  description: z.string().min(1),
  shortDescription: z.string().optional(),
  pricePence: z.number().int().min(0),
  durationMin: z.number().int().min(15).max(240),
  ageBand: z.string().min(1).max(50),
  capacityDefault: z.number().int().min(1).max(50),
  isActive: z.boolean(),
  isDraft: z.boolean(),
  sortOrder: z.number().int().min(0),
})

// Slot creation (admin)
export const createSlotSchema = z.object({
  serviceId: z.string().min(1),
  startDateTime: z.string().datetime(),
  capacity: z.number().int().min(1).max(50).optional(),
})

// Config update (admin)
export const updateConfigSchema = z.object({
  bookingsEnabled: z.boolean().optional(),
  paymentsMode: z.enum(['test', 'live']).optional(),
  defaultCapacity: z.number().int().min(1).max(50).optional(),
  holdMinutes: z.number().int().min(5).max(1440).optional(),
  currency: z.string().length(3).optional(),
  timezone: z.string().optional(),
  siteTitle: z.string().min(1).max(100).optional(),
  siteTagline: z.string().min(1).max(200).optional(),
  venueStatus: z.enum(['coming-soon', 'confirmed']).optional(),
  venueNotice: z.string().optional().nullable(),
})

// Admin login
export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

// Export types
export type CreateBookingInput = z.infer<typeof createBookingSchema>
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>
export type CreateSlotInput = z.infer<typeof createSlotSchema>
export type UpdateConfigInput = z.infer<typeof updateConfigSchema>
export type AdminLoginInput = z.infer<typeof adminLoginSchema>
