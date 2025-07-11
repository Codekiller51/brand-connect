"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BookingCalendarProps {
  creativeId: string
  onScheduleSelect: (date: string, timeSlot: string) => void
}

export function BookingCalendar({ creativeId, onScheduleSelect }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [availableSlots, setAvailableSlots] = useState<string[]>([])

  // Sample time slots - in a real app, this would come from the creative's availability
  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
  ]

  useEffect(() => {
    if (selectedDate) {
      // Simulate loading available slots
      setAvailableSlots(timeSlots.filter(() => Math.random() > 0.3))
    }
  }, [selectedDate])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const isDateAvailable = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const handleDateSelect = (date: Date) => {
    if (!isDateAvailable(date)) return

    const dateString = formatDate(date)
    setSelectedDate(dateString)
    setSelectedTimeSlot("")
  }

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot)
    onScheduleSelect(selectedDate, timeSlot)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              if (!date) {
                return <div key={index} className="p-2" />
              }

              const isAvailable = isDateAvailable(date)
              const isSelected = selectedDate === formatDate(date)
              const isToday = date.toDateString() === new Date().toDateString()

              return (
                <motion.button
                  key={index}
                  whileHover={isAvailable ? { scale: 1.05 } : {}}
                  whileTap={isAvailable ? { scale: 0.95 } : {}}
                  onClick={() => handleDateSelect(date)}
                  disabled={!isAvailable}
                  className={`
                    p-2 text-sm rounded-lg transition-colors
                    ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : isAvailable
                          ? "hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                          : "text-gray-300 cursor-not-allowed"
                    }
                    ${isToday ? "ring-2 ring-emerald-600 ring-offset-2" : ""}
                  `}
                >
                  {date.getDate()}
                </motion.button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      {selectedDate && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Available Time Slots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTimeSlot === slot ? "default" : "outline"}
                    onClick={() => handleTimeSlotSelect(slot)}
                    className={selectedTimeSlot === slot ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                  >
                    {slot}
                  </Button>
                ))}
              </div>

              {availableSlots.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400">No available time slots for this date</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
