import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export async function SessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const supabase = await createClient(cookieStore)
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <>
      {children}
    </>
  )
}