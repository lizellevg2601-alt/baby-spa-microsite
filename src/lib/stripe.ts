import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured')
    }
    _stripe = new Stripe(secretKey, {
      apiVersion: '2026-09-30.endive',
      // Register as a Twinkle Toe Love integration
      appInfo: {
        name: 'twinkle-toe-love-baby-spa',
        version: '1.0.0',
      },
    })
  }
  return _stripe
}

export const stripeConfig = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  currency: 'gbp',
  successUrl: `${process.env.APP_URL}/bookings/success`,
  cancelUrl: `${process.env.APP_URL}/bookings/cancel`,
} as const
