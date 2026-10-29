# Deployment Guide — Twinkle Toe Love Baby Wellness Spa Microsite

**Proposed address:** `https://baby.twinkletoelove.com`  
**Status:** NOT live. No DNS, hosting, or payment changes have been made.

---

## 1. Isolation from existing website

This microsite is **completely independent** of `https://twinkletoelove.com`.

- ✅ No shared code, database, or hosting
- ✅ No modifications to the existing site, its DNS, or MX records
- ✅ The `baby` subdomain is a separate DNS record — no changes to the apex `@` or `www` records

---

## 2. What you need before deployment

| Item | Status | Notes |
|------|--------|-------|
| Hosting account (Vercel or similar) | ⬜ To create | Connect this repo |
| PostgreSQL database (Supabase or hosted) | ⬜ To provision | Run `prisma migrate deploy` + `prisma seed` |
| Stripe account (test keys) | ⬜ To create | Test mode only until you approve live |
| Stripe webhook secret | ⬜ To generate | For `POST /api/stripe-webhook` |
| Resend account + verified sender domain | ⬜ To create | For transactional emails |
| Admin account | ⬜ To create | Seeded via `ADMIN_SEED_EMAIL`/`ADMIN_SEED_PASSWORD` |
| `baby` DNS record | ⬜ Your action | CNAME/A pointing to your host |
| Legal policies (Terms, Privacy, Cancellation) | ⬜ Legal review | Currently drafts |
| Venue confirmation | ⬜ To confirm | Nottingham / West Bridgford — not yet secured |

---

## 3. Deployment steps

### Step 1: Hosting
Create a new project on Vercel (or similar). Connect this Git repo. Do **not** connect it to the existing `twinkletoelove.com` project.

### Step 2: Database
Provision PostgreSQL (Supabase free tier works). Set `DATABASE_URL` in your hosting environment variables. Then run:

```bash
npx prisma migrate deploy
npx prisma db seed
```

### Step 3: Environment variables
Set these in your hosting provider (Vercel → Settings → Environment Variables):

```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<long random string>
NEXTAUTH_URL=https://baby.twinkletoelove.com
APP_URL=https://baby.twinkletoelove.com
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=bookings@baby.twinkletoelove.com
ADMIN_SEED_EMAIL=admin@example.com
ADMIN_SEED_PASSWORD=<secure password>
BOOKINGS_ENABLED=false
PAYMENTS_MODE=test
```

### Step 4: Stripe webhook
In your Stripe Dashboard, add a webhook endpoint:
- URL: `https://baby.twinkletoelove.com/api/stripe-webhook`
- Events to listen for: `checkout.session.completed`, `checkout.session.expired`, `payment_intent.payment_failed`, `charge.refunded`, `payment_intent.refunded`
- Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

### Step 5: Email
Verify your sender domain in Resend (e.g., `bookings@baby.twinkletoelove.com`). Emails are disabled until this is verified.

### Step 6: Admin account
The seed script creates an admin user from `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`. Change the password on first login.

### Step 7: DNS — YOUR ACTION REQUIRED
No DNS changes are made automatically. When you're ready, add a DNS record for the `baby` subdomain:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `baby` | `cname.vercel-dns.com` (or your host's target) | Automatic |

Or an A record if your host provides an IP address.

**Only make this change after you've authorized it.** The existing `twinkletoelove.com` apex (`@`), `www`, and MX records must not be touched.

### Step 8: Enable bookings
In the admin dashboard (`/admin`), set `BOOKINGS_ENABLED=true` when you're ready to accept reservations. Keep `PAYMENTS_MODE=test` until you explicitly approve live payments.

---

## 4. Estimated monthly third-party costs

| Service | Free tier | Paid tier |
|---------|-----------|-----------|
| Vercel | $0/month (Hobby) | $20/month (Pro) |
| Supabase PostgreSQL | $0–$25/month | $25+/month |
| Stripe | No monthly fee | ~1.4% + 20p per successful GBP transaction |
| Resend | Up to 100 emails/day free | $20/month for more |

**Estimated total: $0–$45/month depending on usage.**

---

## 5. Launch checklist

- [ ] Hosting account created
- [ ] Database provisioned and migrated
- [ ] Stripe test keys configured
- [ ] Stripe webhook endpoint + secret added
- [ ] Resend sender domain verified
- [ ] Admin account created and tested
- [ ] `baby` DNS record added (after your authorization)
- [ ] HTTPS confirmed (automatic on Vercel)
- [ ] Legal policies reviewed (Terms, Privacy, Cancellation)
- [ ] Venue confirmed (Nottingham / West Bridgford)
- [ ] Instructor qualifications confirmed
- [ ] Test booking flow end-to-end in Stripe test mode
- [ ] `BOOKINGS_ENABLED=true` set in admin
- [ ] `PAYMENTS_MODE=live` — **only after your explicit approval**

---

## 6. What remains blocked (requires your input)

1. **Live payments:** `PAYMENTS_MODE=test` by default. Do not switch to `live` until you explicitly approve.
2. **DNS for `baby` subdomain:** No changes made. You authorize when ready.
3. **Venue:** Pavilion Road is NOT confirmed as the operating location. Do not publish it as an address.
4. **Legal policies:** Terms, Privacy, Cancellation are drafts pending legal review.
5. **Stripe live keys:** Not configured. Test mode only.

---

## 7. Local development

```bash
cd /Users/lizellebalanco/baby-spa-microsite
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev           # http://localhost:3000
npm test              # unit + integration tests
npm run build         # production build
```

**Admin login:** `/login` — use `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` from `.env.local`

**Test mode:** Stripe is in test mode — no real money is taken. Bookings are disabled until `BOOKINGS_ENABLED=true` in the admin config.
