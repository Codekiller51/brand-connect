import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { AIChatBot } from "@/components/ai-chat-bot"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Brand Connect - Tanzania's Creative Marketplace",
  description:
    "Connect with verified creative professionals across Tanzania. Find graphic designers, photographers, videographers, and digital marketers in your region.",
  keywords: "creative professionals, Tanzania, graphic design, photography, videography, digital marketing",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <AIChatBot />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
