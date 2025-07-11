import { jest } from "@jest/globals"
import { EnhancedNotificationService } from "@/lib/services/enhanced-notification-service"

// Mock fetch globally
global.fetch = jest.fn()

describe("Enhanced Notification System Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.MockedFunction<typeof fetch>).mockClear()
  })

  describe("SMS Notifications", () => {
    test("should send SMS successfully", async () => {
      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message_id: "sms_123" }),
      } as Response)

      const result = await EnhancedNotificationService.sendSMS("+255123456789", "Test message")

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/send"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: expect.stringContaining("Bearer"),
            "Content-Type": "application/json",
          }),
          body: expect.stringContaining("Test message"),
        }),
      )
      expect(result).toBe(true)
    })

    test("should handle SMS API failure", async () => {
      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: false,
        statusText: "API Error",
      } as Response)

      const result = await EnhancedNotificationService.sendSMS("+255123456789", "Test message")

      expect(result).toBe(false)
    })

    test("should handle network errors", async () => {
      ;(fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(new Error("Network error"))

      const result = await EnhancedNotificationService.sendSMS("+255123456789", "Test message")

      expect(result).toBe(false)
    })
  })

  describe("Email Notifications", () => {
    test("should send email successfully", async () => {
      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: "success" }),
      } as Response)

      const result = await EnhancedNotificationService.sendEmail(
        "test@example.com",
        "Test Subject",
        "<h1>Test HTML Content</h1>",
      )

      expect(fetch).toHaveBeenCalledWith(
        "https://api.sendgrid.com/v3/mail/send",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            Authorization: expect.stringContaining("Bearer"),
            "Content-Type": "application/json",
          }),
        }),
      )
      expect(result).toBe(true)
    })

    test("should handle email API failure", async () => {
      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: false,
        statusText: "Email API Error",
      } as Response)

      const result = await EnhancedNotificationService.sendEmail(
        "test@example.com",
        "Test Subject",
        "<h1>Test HTML Content</h1>",
      )

      expect(result).toBe(false)
    })
  })

  describe("Booking Notifications", () => {
    test("should send booking confirmation with SMS and email", async () => {
      const mockBooking = {
        id: "booking_123",
        booking_date: "2024-05-20",
        start_time: "10:00",
        end_time: "13:00",
        total_amount: 250000,
        service: { name: "Logo Design" },
      }

      const mockCreative = {
        name: "John Creative",
        location: "Dar es Salaam",
        phone: "+255111111111",
      }

      const mockClient = {
        id: "client_1",
        name: "Jane Client",
        email: "jane@example.com",
        phone: "+255222222222",
      }

      // Mock successful SMS and email responses
      ;(fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ message: "success" }),
        } as Response)

      await EnhancedNotificationService.sendBookingConfirmation(mockBooking, mockCreative, mockClient)

      expect(fetch).toHaveBeenCalledTimes(2) // SMS + Email
    })

    test("should send booking reminder", async () => {
      const mockBooking = {
        id: "booking_123",
        booking_date: "2024-05-21",
        start_time: "14:00",
        end_time: "16:00",
      }

      const mockCreative = {
        name: "John Creative",
        location: "Arusha",
        phone: "+255333333333",
      }

      const mockClient = {
        name: "Jane Client",
        email: "jane@example.com",
        phone: "+255444444444",
      }

      // Mock successful responses
      ;(fetch as jest.MockedFunction<typeof fetch>)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ message: "success" }),
        } as Response)

      await EnhancedNotificationService.sendBookingReminder(mockBooking, mockCreative, mockClient)

      expect(fetch).toHaveBeenCalledTimes(2) // SMS + Email
    })
  })

  describe("Status Update Notifications", () => {
    test("should send status update notification", async () => {
      const mockBooking = {
        id: "booking_123",
        status: "confirmed",
      }

      const mockUser = {
        id: "user_1",
        phone: "+255555555555",
      }
      ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      await EnhancedNotificationService.sendStatusUpdateNotification(mockBooking, "confirmed", mockUser)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/send"),
        expect.objectContaining({
          body: expect.stringContaining("confirmed"),
        }),
      )
    })
  })
})
