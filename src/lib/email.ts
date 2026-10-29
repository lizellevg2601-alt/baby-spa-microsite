export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  // Email is not configured — do not block payment flow
  console.log(`[EMAIL SKIPPED] To: ${to}\nSubject: ${subject}`)
  return { success: false, skipped: true, reason: 'email_not_configured' }
}

export function bookingConfirmationEmail(
  to: string,
  bookingReference: string,
  serviceName: string,
  slotStart: string,
  slotEnd: string,
  pairsCount: number,
  totalPence: number,
  status: string,
) {
  const total = (totalPence / 100).toFixed(2)
  const statusLabel = status === 'CONFIRMED' ? 'Confirmed' : 'Pending payment'

  return {
    to,
    subject: `Twinkle Toe Love — Booking ${bookingReference} (${statusLabel})`,
    html: `
      <div style="font-family: ui-sans-serif, system-ui, sans-serif; color: #4c4c4c; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 24px; background: #fbfcf9;">
        <div style="background: #ffffff; border-radius: 16px; padding: 32px; border: 1px solid #e7eadf;">
          <div style="font-size: 24px; font-weight: 700; color: #6b8e7a; letter-spacing: -0.2px; margin-bottom: 8px;">
            Twinkle Toe Love
          </div>
          <div style="font-size: 14px; color: #8a8a7a; margin-bottom: 24px;">
            Baby Wellness Spa • "Little wonders. Big discoveries."
          </div>

          <h1 style="font-size: 20px; color: #2d2d2d; margin: 0 0 16px 0;">Booking ${bookingReference}</h1>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #6b8e7a; width: 40%;">Experience</td>
              <td style="padding: 8px 0; color: #2d2d2d; font-weight: 600;">${serviceName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b8e7a;">Date & time</td>
              <td style="padding: 8px 0; color: #2d2d2d;">${slotStart} – ${slotEnd} (Europe/London)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b8e7a;">Places</td>
              <td style="padding: 8px 0; color: #2d2d2d;">${pairsCount} parent-and-baby pair(s)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b8e7a;">Total</td>
              <td style="padding: 8px 0; color: #2d2d2d; font-weight: 700;">£${total}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b8e7a;">Status</td>
              <td style="padding: 8px 0; color: #2d2d2d; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; font-size: 12px;">${statusLabel}</td>
            </tr>
          </table>

          ${status === 'CONFIRMED'
            ? `<p style="color: #4c4c4c; font-size: 14px; margin: 0 0 16px 0;">Thank you for booking with Twinkle Toe Love. Your place is reserved and payment has been confirmed. We look forward to welcoming you and your little one.</p>`
            : `<p style="color: #4c4c4c; font-size: 14px; margin: 0 0 16px 0;">Your reservation is held while payment is being processed. Please complete checkout to confirm your booking. Unpaid reservations are released after 25 minutes.</p>`}

          <div style="border-top: 1px solid #e7eadf; padding-top: 24px; margin-top: 24px;">
            <p style="font-size: 12px; color: #8a8a7a; margin: 0 0 8px 0;">Questions?</p>
            <p style="font-size: 12px; color: #8a8a7a; margin: 0;">Reply to this email or contact us at bookings@baby.twinkletoelove.com</p>
          </div>
        </div>
      </div>
    `,
    text: `Twinkle Toe Love — Booking ${bookingReference}\nExperience: ${serviceName}\nDate & time: ${slotStart} – ${slotEnd} (Europe/London)\nPlaces: ${pairsCount} parent-and-baby pair(s)\nTotal: £${total}\nStatus: ${statusLabel}\n`,
  }
}
