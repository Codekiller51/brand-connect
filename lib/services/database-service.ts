import { createClient } from '@supabase/supabase-js'
import type { User } from '@/lib/database/types'
import type { CreativeProfile } from '@/lib/database/creative-profile'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export class DatabaseService {
  static async getUsers(filters?: any): Promise<User[]> {
    let query = supabase.from("users").select("*")

    if (filters?.role) {
      query = query.eq("role", filters.role)
    }

    const { data, error } = await query
    if (error) throw error
    return data || []
  }

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
        user:users(*)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  }

  static async updateCreativeProfile(id: string, profile: Partial<CreativeProfile>): Promise<CreativeProfile> {
    const { data, error } = await supabase
      .from("creative_profiles")
      .update(profile)
      .eq("id", id)
      .select(`
        *,
        user:users(*)
      `)
      .single()

    if (error) throw error
    return data
  }

  static async createCreativeProfile(profile: Partial<CreativeProfile>): Promise<CreativeProfile> {
    const { data, error } = await supabase
      .from("creative_profiles")
      .insert(profile)
      .select(`
        *,
        user:users(*)
      `)
      .single()

    if (error) throw error
    return data
  }
}
