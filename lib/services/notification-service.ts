export interface SMSConfig {
  apiKey: string
  senderId: string
  baseUrl: string
}

export interface EmailConfig {
  apiKey: string
  fromEmail: string
  fromName: string
}

export class NotificationService {
  private static smsConfig: SMSConfig = {
    apiKey: process.env.SMS_API_KEY || "demo_key",
    senderId: "BrandConnect",
    baseUrl: "https://api.sms-provider.com",
  }

  private static emailConfig: EmailConfig = {
    apiKey: process.env.EMAIL_API_KEY || "demo_key",
    fromEmail: "noreply@brandconnect.co.tz",
    fromName: "Brand Connect",
  }

  static async sendSMS(phoneNumber: string, message: string): Promise<boolean> {
    try {
      // Simulate SMS API call
      console.log(`SMS to ${phoneNumber}: ${message}`)
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In production, you would integrate with a real SMS provider like:
      // - Twilio
      // - Africa's Talking
      // - Nexmo/Vonage
      // - Local Tanzanian SMS providers

      return true
    } catch (error) {
      console.error("Failed to send SMS:", error)
      return false
    }
  }

  static async sendEmail(to: string, subject: string, htmlContent: string): Promise<boolean> {
    try {
      // Simulate email API call
      console.log(`Email to ${to}: ${subject}`)
      await new Promise((resolve) => setTimeout(resolve, 800))

      // In production, you would integrate with:
      // - SendGrid
      // - Mailgun
      // - Amazon SES
      // - Resend

      return true
    } catch (error) {
      console.error("Failed to send email:", error)
      return false
    }
  }

  static async sendBookingConfirmation(booking: any, creative: any, client: any): Promise<void> {
    const smsMessage = `Hi ${client.name}! Your booking with ${creative.name} for ${booking.date} at ${booking.startTime} has been confirmed. Booking ID: ${booking.id}`

    const emailSubject = "Booking Confirmation - Brand Connect"
    const emailContent = `
      <h2>Booking Confirmed!</h2>
      <p>Dear ${client.name},</p>
      <p>Your booking has been confirmed with the following details:</p>
      <ul>
        <li><strong>Creative:</strong> ${creative.name}</li>
        <li><strong>Service:</strong> ${booking.serviceName}</li>
        <li><strong>Date:</strong> ${booking.date}</li>
        <li><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</li>
        <li><strong>Amount:</strong> ${booking.totalAmount.toLocaleString()} TZS</li>
      </ul>
      <p>We'll send you a reminder 24 hours before your appointment.</p>
      <p>Best regards,<br>Brand Connect Team</p>
    `

    await Promise.all([
      this.sendSMS(client.phone, smsMessage),
      this.sendEmail(client.email, emailSubject, emailContent),
    ])
  }

  static async sendPaymentReceipt(payment: any, booking: any): Promise<void> {
    const emailSubject = "Payment Receipt - Brand Connect"
    const emailContent = `
      <h2>Payment Receipt</h2>
      <p>Thank you for your payment!</p>
      <ul>
        <li><strong>Transaction ID:</strong> ${payment.transactionId}</li>
        <li><strong>Amount:</strong> ${payment.amount.toLocaleString()} TZS</li>
        <li><strong>Payment Method:</strong> ${payment.method}</li>
        <li><strong>Date:</strong> ${new Date(payment.createdAt).toLocaleDateString()}</li>
      </ul>
    `

    await this.sendEmail(booking.clientEmail, emailSubject, emailContent)
  }

  static async sendReminder(booking: any, creative: any, client: any): Promise<void> {
    const smsMessage = `Reminder: You have a booking with ${creative.name} tomorrow at ${booking.startTime}. Location: ${creative.location}. Contact: ${creative.phone}`

    await this.sendSMS(client.phone, smsMessage)
  }
}
