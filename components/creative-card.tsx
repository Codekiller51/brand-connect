import Link from "next/link"
import Image from "next/image"
import { MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface CreativeCardProps {
  name: string
  title: string
  location: string
  rating: number
  reviews: number
  imageSrc: string
  href: string
}

export function CreativeCard({ name, title, location, rating, reviews, imageSrc, href }: CreativeCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={imageSrc || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-xl">{name}</h3>
          <p className="text-gray-500 dark:text-gray-400">{title}</p>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center">
            <div className="flex mr-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({reviews} reviews)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={href} className="w-full">
          <Button variant="outline" className="w-full">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
