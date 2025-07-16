import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Define database types for better type safety
export type Database = {
  public: {
    Tables: {
      client_profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          phone: string | null
          location: string | null
          company_name: string | null
          industry: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          location?: string | null
          company_name?: string | null
          industry?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          location?: string | null
          company_name?: string | null
          industry?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      creative_profiles: {
        Row: {
          id: string
          user_id: string
          title: string | null
          bio: string | null
          skills: string[] | null
          rating: number | null
          reviews: number | null
          completed_projects: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string | null
          bio?: string | null
          skills?: string[] | null
          rating?: number | null
          reviews?: number | null
          completed_projects?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string | null
          bio?: string | null
          skills?: string[] | null
          rating?: number | null
          reviews?: number | null
          completed_projects?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase credentials');
  }

  try {
    const client = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      }
    });
    return client;
  } catch (error) {
    throw error;
  }
}