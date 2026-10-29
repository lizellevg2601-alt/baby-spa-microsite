import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-09-30.endive',
  // Register as a Twinkle Toe Love integration
  appInfo: {
    name: 'twinkle-toe-love-baby-spa',
    version: '1.0.0',
  },
})

export const stripeConfig = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  currency: 'gbp',
  successUrl: `${process.env.APP_URL}/bookings/success`,
  cancelUrl: `${process.env.APP_URL}/bookings/cancel`,
} as const
