"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { CreativeCard } from "@/components/creative-card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: "Maria Joseph",
      title: "Graphic Designer",
      location: "Dar es Salaam",
      rating: 4.9,
      reviews: 124,
      imageSrc: "/placeholder.svg?height=400&width=400",
      href: "/profile/maria-joseph",
    },
    {
      id: 2,
      name: "John Mbwambo",
      title: "Photographer",
      location: "Arusha",
      rating: 4.8,
      reviews: 87,
      imageSrc: "/placeholder.svg?height=400&width=400",
      href: "/profile/john-mbwambo",
    },
    {
      id: 3,
      name: "Sarah Kimaro",
      title: "Digital Marketer",
      location: "Mwanza",
      rating: 4.7,
      reviews: 56,
      imageSrc: "/placeholder.svg?height=400&width=400",
      href: "/profile/sarah-kimaro",
    },
    {
      id: 4,
      name: "David Mushi",
      title: "Videographer",
      location: "Dodoma",
      rating: 4.6,
      reviews: 42,
      imageSrc: "/placeholder.svg?height=400&width=400",
      href: "/profile/david-mushi",
    },
    {
      id: 5,
      name: "Grace Mwakasege",
      title: "Graphic Designer",
      location: "Dar es Salaam",
      rating: 4.5,
      reviews: 38,
      imageSrc: "/placeholder.svg?height=400&width=400",
      href: "/profile/grace-mwakasege",
    },
    {
      id: 6,
      name: "Peter Makundi",
      title: "Photographer",
      location: "Mbeya",
      rating: 4.4,
      reviews: 29,
      imageSrc: "/placeholder.svg?height=400&width=400",
      href: "/profile/peter-makundi",
    },
  ])

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Find Creative Professionals</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Discover verified creative talent across Tanzania based on your location and needs
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input placeholder="Search by name, skill, or keyword" className="w-full" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              <SelectItem value="graphic-design">Graphic Design</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="videography">Videography</SelectItem>
              <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-locations">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-locations">All Locations</SelectItem>
              <SelectItem value="dar-es-salaam">Dar es Salaam</SelectItem>
              <SelectItem value="arusha">Arusha</SelectItem>
              <SelectItem value="mwanza">Mwanza</SelectItem>
              <SelectItem value="dodoma">Dodoma</SelectItem>
              <SelectItem value="mbeya">Mbeya</SelectItem>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Results</SheetTitle>
                <SheetDescription>Refine your search with additional filters</SheetDescription>
              </SheetHeader>
              <div className="grid gap-6 py-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="text-sm font-normal">
                          {rating}+ Stars
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Experience Level</h3>
                  <div className="space-y-2">
                    {["Beginner", "Intermediate", "Expert"].map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox id={`level-${level.toLowerCase()}`} />
                        <Label htmlFor={`level-${level.toLowerCase()}`} className="text-sm font-normal">
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <div className="pt-4">
                    <Slider defaultValue={[50]} max={100} step={1} />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-gray-500">Tsh 0</span>
                      <span className="text-xs text-gray-500">Tsh 1,000,000+</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Availability</h3>
                  <div className="space-y-2">
                    {["Available Now", "Available This Week", "Available This Month"].map((availability) => (
                      <div key={availability} className="flex items-center space-x-2">
                        <Checkbox id={`availability-${availability.toLowerCase().replace(/\s+/g, "-")}`} />
                        <Label
                          htmlFor={`availability-${availability.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm font-normal"
                        >
                          {availability}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <Button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((creative) => (
          <CreativeCard
            key={creative.id}
            name={creative.name}
            title={creative.title}
            location={creative.location}
            rating={creative.rating}
            reviews={creative.reviews}
            imageSrc={creative.imageSrc}
            href={creative.href}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-2">
          <Button variant="outline" size="icon" disabled>
            <span className="sr-only">Previous page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
          >
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="icon">
            <span className="sr-only">Next page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Button>
        </nav>
      </div>
    </div>
  )
}
