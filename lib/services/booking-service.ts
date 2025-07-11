import type { Booking, TimeSlot, Creative } from "@/lib/types"

// Mock data for demonstration
const mockCreatives: Creative[] = [
  {
    id: "1",
    name: "Maria Joseph",
    email: "maria@example.com",
    phone: "+255123456789",
    role: "creative",
    title: "Senior Graphic Designer",
    category: "Graphic Design",
    location: "Dar es Salaam",
    rating: 4.9,
    reviews: 124,
    completedProjects: 87,
    hourlyRate: 25000,
    verified: true,
    createdAt: "2023-01-15",
    bio: "Experienced graphic designer specializing in brand identity and digital design.",
    availability: [],
    portfolio: [],
    services: [
      {
        id: "s1",
        name: "Logo Design",
        description: "Custom logo design with 3 concepts and unlimited revisions",
        price: 250000,
        duration: 180,
        category: "Branding",
      },
      {
        id: "s2",
        name: "Brand Identity Package",
        description: "Complete brand identity including logo, business cards, and guidelines",
        price: 750000,
        duration: 480,
        category: "Branding",
      },
    ],
  },
  {
    id: "2",
    name: "John Mbwambo",
    email: "john@example.com",
    phone: "+255987654321",
    role: "creative",
    title: "Professional Photographer",
    category: "Photography",
    location: "Arusha",
    rating: 4.8,
    reviews: 87,
    completedProjects: 156,
    hourlyRate: 35000,
    verified: true,
    createdAt: "2023-02-20",
    bio: "Professional photographer with expertise in events, portraits, and commercial photography.",
    availability: [],
    portfolio: [],
    services: [
      {
        id: "s3",
        name: "Event Photography",
        description: "Professional event photography with edited photos",
        price: 400000,
        duration: 480,
        category: "Photography",
      },
      {
        id: "s4",
        name: "Portrait Session",
        description: "Professional portrait session with 20 edited photos",
        price: 150000,
        duration: 120,
        category: "Photography",
      },
    ],
  },
]

export class BookingService {
  static async getCreatives(): Promise<Creative[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockCreatives
  }

  static async getCreativeById(id: string): Promise<Creative | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockCreatives.find((c) => c.id === id) || null
  }

  static async getAvailableTimeSlots(creativeId: string, date: string): Promise<TimeSlot[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    // Generate mock time slots for the selected date
    const slots: TimeSlot[] = []
    const startHour = 9
    const endHour = 17

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({
        id: `${creativeId}-${date}-${hour}`,
        date,
        startTime: `${hour.toString().padStart(2, "0")}:00`,
        endTime: `${(hour + 1).toString().padStart(2, "0")}:00`,
        available: Math.random() > 0.3, // 70% chance of being available
        creativeId,
      })
    }

    return slots
  }

  static async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const booking: Booking = {
      id: `booking_${Date.now()}`,
      clientId: bookingData.clientId || "client_1",
      creativeId: bookingData.creativeId!,
      serviceId: bookingData.serviceId!,
      date: bookingData.date!,
      startTime: bookingData.startTime!,
      endTime: bookingData.endTime!,
      status: "pending",
      paymentStatus: "pending",
      totalAmount: bookingData.totalAmount!,
      notes: bookingData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return booking
  }

  static async getBookings(filters?: { status?: string; creativeId?: string }): Promise<Booking[]> {
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Mock bookings data
    const mockBookings: Booking[] = [
      {
        id: "booking_1",
        clientId: "client_1",
        creativeId: "1",
        serviceId: "s1",
        date: "2024-05-20",
        startTime: "10:00",
        endTime: "13:00",
        status: "confirmed",
        paymentStatus: "paid",
        totalAmount: 250000,
        createdAt: "2024-05-15T10:00:00Z",
        updatedAt: "2024-05-15T10:00:00Z",
      },
      {
        id: "booking_2",
        clientId: "client_2",
        creativeId: "2",
        serviceId: "s3",
        date: "2024-05-22",
        startTime: "14:00",
        endTime: "22:00",
        status: "pending",
        paymentStatus: "pending",
        totalAmount: 400000,
        createdAt: "2024-05-16T14:00:00Z",
        updatedAt: "2024-05-16T14:00:00Z",
      },
    ]

    return mockBookings
  }
}
