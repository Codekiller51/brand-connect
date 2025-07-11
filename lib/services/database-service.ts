import { supabase } from "@/lib/supabase/client"
import type { User, CreativeProfile, Booking, Conversation, Message } from "@/lib/database/types"

export class DatabaseService {
  // User operations
  static async getUsers(filters?: any): Promise<User[]> {
    let query = supabase.from("users").select("*")

    if (filters?.role) {
      query = query.eq("role", filters.role)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  }

  static async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

    if (error) throw error
    return data
  }

  // Creative profiles
  static async getCreativeProfiles(filters?: any): Promise<CreativeProfile[]> {
    let query = supabase.from("creative_profiles").select(`
        *,
        user:users(*)
      `)

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  }

  static async getCreativeProfileById(id: string): Promise<CreativeProfile | null> {
    const { data, error } = await supabase
      .from("creative_profiles")
      .select(`
        *,
        user:users(*),
        services(*)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  }

  // Bookings
  static async getBookings(filters?: any): Promise<Booking[]> {
    let query = supabase
      .from("bookings")
      .select(`
        *,
        client:users!client_id(*),
        creative:users!creative_id(*),
        service:services(*)
      `)
      .order("created_at", { ascending: false })

    if (filters?.status) {
      query = query.eq("status", filters.status)
    }

    if (filters?.client_id) {
      query = query.eq("client_id", filters.client_id)
    }

    if (filters?.creative_id) {
      query = query.eq("creative_id", filters.creative_id)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  }

  static async createBooking(booking: Partial<Booking>): Promise<Booking> {
    const { data, error } = await supabase.from("bookings").insert(booking).select().single()

    if (error) throw error
    return data
  }

  static async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking> {
    const { data, error } = await supabase.from("bookings").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  // Conversations
  static async getConversations(userId: string): Promise<Conversation[]> {
    const { data, error } = await supabase
      .from("conversations")
      .select(`
        *,
        client:users!client_id(*),
        creative:users!creative_id(*),
        booking:bookings(*)
      `)
      .or(`client_id.eq.${userId},creative_id.eq.${userId}`)
      .order("last_message_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  static async getMessages(conversationId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        sender:users(*)
      `)
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })

    if (error) throw error
    return data || []
  }

  static async sendMessage(message: Partial<Message>): Promise<Message> {
    const { data, error } = await supabase
      .from("messages")
      .insert(message)
      .select(`
        *,
        sender:users(*)
      `)
      .single()

    if (error) throw error

    // Update conversation last_message_at
    await supabase
      .from("conversations")
      .update({ last_message_at: new Date().toISOString() })
      .eq("id", message.conversation_id)

    return data
  }

  // Real-time subscriptions
  static subscribeToMessages(conversationId: string, callback: (message: Message) => void) {
    return supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          callback(payload.new as Message)
        },
      )
      .subscribe()
  }

  static subscribeToBookings(userId: string, callback: (booking: Booking) => void) {
    return supabase
      .channel(`bookings:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
          filter: `or(client_id.eq.${userId},creative_id.eq.${userId})`,
        },
        (payload) => {
          callback(payload.new as Booking)
        },
      )
      .subscribe()
  }
}
