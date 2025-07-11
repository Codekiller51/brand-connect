"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Calendar,
  ChevronDown,
  Clock,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Star,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="font-bold text-xl">Brand Connect</span>
        </Link>
        <nav className="hidden flex-1 items-center gap-6 md:flex">
          <Link href="/dashboard" className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Dashboard
          </Link>
          <Link
            href="/dashboard/messages"
            className="text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Messages
          </Link>
          <Link
            href="/dashboard/bookings"
            className="text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Bookings
          </Link>
          <Link
            href="/dashboard/payments"
            className="text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Payments
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4 md:justify-end">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-medium text-white">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-8 flex items-center gap-2 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-flex">Maria Joseph</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
          <aside className="hidden border-r md:block">
            <div className="flex h-full max-h-screen flex-col gap-2 p-4">
              <nav className="grid gap-1">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    activeTab === "overview"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <Home className="h-4 w-4" />
                  Overview
                </Link>
                <Link
                  href="/dashboard/messages"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    activeTab === "messages"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                  }`}
                  onClick={() => setActiveTab("messages")}
                >
                  <MessageSquare className="h-4 w-4" />
                  Messages
                  <Badge className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                    3
                  </Badge>
                </Link>
                <Link
                  href="/dashboard/bookings"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    activeTab === "bookings"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                  }`}
                  onClick={() => setActiveTab("bookings")}
                >
                  <Calendar className="h-4 w-4" />
                  Bookings
                </Link>
                <Link
                  href="/dashboard/payments"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    activeTab === "payments"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                  }`}
                  onClick={() => setActiveTab("payments")}
                >
                  <CreditCard className="h-4 w-4" />
                  Payments
                </Link>
                <Link
                  href="/dashboard/portfolio"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    activeTab === "portfolio"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                  }`}
                  onClick={() => setActiveTab("portfolio")}
                >
                  <FileText className="h-4 w-4" />
                  Portfolio
                </Link>
                <Link
                  href="/dashboard/settings"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    activeTab === "settings"
                      ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                  }`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
          </aside>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">+1 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Tsh 1,250,000</div>
                  <p className="text-xs text-muted-foreground">+Tsh 350,000 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.9</div>
                  <p className="text-xs text-muted-foreground">Based on 124 reviews</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>You have 4 active bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((booking) => (
                      <div key={booking} className="flex items-center gap-4">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="Client" />
                          <AvatarFallback>CL</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">Logo Design for ABC Company</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            Due in 3 days
                          </div>
                        </div>
                        <Badge className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                          In Progress
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>You have 3 unread messages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((message) => (
                      <div key={message} className="flex items-center gap-4">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="Client" />
                          <AvatarFallback>CL</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">John Doe</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            Hi Maria, I wanted to discuss the logo design project...
                          </p>
                        </div>
                        <div className="flex h-2 w-2 rounded-full bg-emerald-600"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
