import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()

  const { data: { user }, error: getUserError } = await supabase.auth.getUser();

  if (getUserError) {
    console.error('Error verifying user:', getUserError);
    return NextResponse.json({ error: getUserError.message }, { status: getUserError.status || 500 });
  }

  if (!user) {
    console.warn('No authenticated user found for signout.');
    return NextResponse.json({ error: 'Auth session missing!' }, { status: 500 });
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const response = NextResponse.json({ message: 'Signed out successfully' })
  // Clear all auth cookies
  response.cookies.set('sb-access-token', '', { maxAge: 0 })
  response.cookies.set('sb-refresh-token', '', { maxAge: 0 })
  return response
}