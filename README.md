# Twinkle Toe Love – Baby Wellness Spa Microsite

A standalone, production-quality booking microsite for a premium baby development and sensory studio.

**Proposed address:** `https://baby.twinkletoelove.com` (not yet configured)

## Important

This microsite is **completely independent** of the existing `twinkletoelove.com` website. No code, hosting, DNS, or database is shared.

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- **Database:** PostgreSQL (Supabase or hosted) + Prisma ORM
- **Payments:** Stripe Checkout (test mode by default), server-side secret keys + webhooks
- **Email:** Resend (disabled until sender domain verified)
- **Deployment:** Vercel (or similar serverless-friendly host)

## Getting started

### Prerequisites

- Node.js 20+
- PostgreSQL database (local or hosted)
- Stripe account (test keys for development)
- Resend account (for emails, optional in dev)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your own values

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database (creates 3 sample services + admin user)
npm run prisma:seed

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Admin

- Admin login: `/login`
- Admin dashboard: `/admin`
- Seed admin credentials are set via `ADMIN_SEED_EMAIL` and `ADMIN_SEED_PASSWORD` in `.env.local`

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:seed` | Seed database with sample data |
| `npm test` | Run unit + integration tests |
| `npm run test:e2e` | Run Playwright e2e tests |

## Environment variables

See `.env.example` for the full list. Key variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `STRIPE_SECRET_KEY` | Stripe secret key (test mode by default) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `RESEND_API_KEY` | Resend API key for emails |
| `RESEND_FROM_EMAIL` | Verified sender email address |
| `ADMIN_SEED_EMAIL` | Seed admin email |
| `ADMIN_SEED_PASSWORD` | Seed admin password |
| `BOOKINGS_ENABLED` | `false` by default — enable when ready |
| `PAYMENTS_MODE` | `test` by default — switch to `live` only with approval |

## Deployment

See `DEPLOYMENT.md` for the full deployment guide, including DNS instructions for `baby.twinkletoelove.com`.

### Summary of deployment steps

1. Create a Vercel project and connect this repo
2. Provision PostgreSQL (Supabase or hosted)
3. Set environment variables in Vercel
4. Run `prisma migrate deploy` and `prisma seed`
5. Configure Stripe webhook endpoint
6. Verify sender domain in Resend
7. Create admin account
8. Add `baby` subdomain DNS record (CNAME/A) — **only after authorization**
9. Enable bookings and (optionally) live payments

## Testing

- **Unit tests:** `npm test` — capacity logic, pricing, DST boundaries, webhook idempotency, expired reservations
- **E2E tests:** `npm run test:e2e` — Playwright smoke checks (requires dev server running)

## Security

- Stripe secret keys are never exposed to the browser
- All payment validation happens server-side
- Admin area is password-protected with session cookies
- No live keys stored in the repository
- `BOOKINGS_ENABLED=false` and `PAYMENTS_MODE=test` by default

## Legal

Terms, Privacy, and Cancellation policy pages are drafts pending legal review. Do not launch without legal approval.

## Status

- ✅ Site structure and pages
- ✅ Booking flow with Stripe Checkout (test mode)
- ✅ Admin dashboard with booking management
- ✅ Database schema with Prisma
- ✅ Unit and integration tests
- ✅ Playwright e2e smoke tests
- ⏳ Deployment to `baby.twinkletoelove.com` (pending authorization)
- ⏳ Live Stripe payments (pending approval)
