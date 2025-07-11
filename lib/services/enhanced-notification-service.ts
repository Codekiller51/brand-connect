import { supabase } from "@/lib/supabase/client"
import type { Notification } from "@/lib/database/types"

export class EnhancedNotificationService {
  // Email notifications
  static async sendEmail(to: string, subject: string, content: string): Promise<void> {
    try {
      const response = await fetch("/api/notifications/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, content }),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      console.error("Email notification failed:", error)
    }
  }

  // SMS notifications
  static async sendSMS(to: string, message: string): Promise<void> {
    try {
      const response = await fetch("/api/notifications/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, message }),
      })

      if (!response.ok) {
        throw new Error("Failed to send SMS")
      }
    } catch (error) {
      console.error("SMS notification failed:", error)
    }
  }

  // In-app notifications
  static async createNotification(notification: Partial<Notification>): Promise<Notification> {
    const { data, error } = await supabase.from("notifications").insert(notification).select().single()

    if (error) throw error
    return data
  }

  static async getNotifications(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  static async markAsRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("id", notificationId)

    if (error) throw error
  }

  // Booking notifications
  static async sendBookingConfirmation(booking: any, creative: any, client: any): Promise<void> {
    const emailContent = `
      <h2>Booking Confirmation</h2>
      <p>Dear ${client.name},</p>
      <p>Your booking with ${creative.name} has been confirmed!</p>
      <p><strong>Service:</strong> ${booking.serviceName}</p>
      <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
      <p>We'll send you a reminder before your appointment.</p>
    `

    const smsMessage = `Brand Connect: Your booking with ${creative.name} is confirmed for ${new Date(booking.date).toLocaleDateString()} at ${booking.startTime}. Booking ID: ${booking.id}`

    await Promise.all([
      this.sendEmail(client.email, "Booking Confirmation - Brand Connect", emailContent),
      this.sendSMS(client.phone, smsMessage),
      this.createNotification({
        user_id: client.id,
        type: "booking_confirmed",
        title: "Booking Confirmed",
        message: `Your booking with ${creative.name} has been confirmed`,
        data: { booking_id: booking.id },
      }),
    ])
  }

  static async sendPaymentReceipt(payment: any, booking: any): Promise<void> {
    const emailContent = `
      <h2>Payment Receipt</h2>
      <p>Thank you for your payment!</p>
      <p><strong>Amount:</strong> ${new Intl.NumberFormat("sw-TZ", { style: "currency", currency: "TZS" }).format(payment.amount)}</p>
      <p><strong>Transaction ID:</strong> ${payment.transaction_id}</p>
      <p><strong>Booking ID:</strong> ${booking.id}</p>
      <p>Your payment has been processed successfully.</p>
    `

    await this.sendEmail(booking.clientEmail, "Payment Receipt - Brand Connect", emailContent)
  }

  // Real-time notifications
  static subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
    return supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new as Notification)
        },
      )
      .subscribe()
  }
}
