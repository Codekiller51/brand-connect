import { createBrowserClient } from "@supabase/ssr"

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey
    });
    throw new Error('Missing Supabase credentials');
  }

  console.log('Initializing Supabase client with URL:', supabaseUrl);
  
  try {
    const client = createBrowserClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client created successfully');
    return client;
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    throw error;
  }
}
