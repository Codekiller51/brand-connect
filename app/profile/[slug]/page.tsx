"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, Facebook, Instagram, Linkedin, MapPin, MessageSquare, Star, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DatabaseService } from "@/lib/services/database-service"

export default function ProfilePage({ params }: { params: { slug: string } }) {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      try {
        // Fetch creative profile data based on slug
        const profiles = await DatabaseService.getCreativeProfiles()
        const userProfile = profiles.find(p => p.user.id === params.slug)
        
        if (userProfile) {
          setProfile({
            name: userProfile.user.name,
            title: userProfile.title,
            location: userProfile.user.location,
            rating: userProfile.rating || 0,
            reviews: userProfile.reviews || 0,
            completedProjects: userProfile.completed_projects || 0,
            joinedDate: new Date(userProfile.user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            about: userProfile.bio,
            skills: userProfile.skills || [],
            services: userProfile.services || [],
            portfolio: userProfile.portfolio || [],
            testimonials: userProfile.testimonials || []
          })
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [params.slug])

  if (loading) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold">Profile Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">The requested profile could not be found.</p>
            <Button className="mt-4" asChild>
              <Link href="/search">Browse Creatives</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=128&width=128" alt={profile.name} fill className="object-cover" />
                </div>
                <h1 className="mt-4 text-2xl font-bold">{profile.name}</h1>
                <p className="text-gray-500 dark:text-gray-400">{profile.title}</p>
                <div className="flex items-center mt-2 text-gray-500 dark:text-gray-400">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{profile.location}</span>
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex mr-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <span className="text-sm font-medium">{profile.rating}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({profile.reviews} reviews)</span>
                </div>
                <div className="w-full mt-6">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Me
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Completed Projects</span>
                  <span className="text-sm font-medium">{profile.completedProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Member Since</span>
                  <span className="text-sm font-medium">{profile.joinedDate}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Connect</h3>
                <div className="flex space-x-4">
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link
                    href="#"
                    className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">About Me</h2>
                  <p className="text-gray-500 dark:text-gray-400">{profile.about}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="services" className="mt-6">
              <div className="space-y-4">
                {profile.services.map((service, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold">{service.title}</h3>
                          <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-1">{service.price}</p>
                          <p className="text-gray-500 dark:text-gray-400 mt-2">{service.description}</p>
                          <div className="flex items-center mt-4 text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">Delivery: {service.deliveryTime}</span>
                          </div>
                        </div>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="portfolio" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.portfolio.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {profile.testimonials.map((testimonial, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{testimonial.name}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-gray-500 dark:text-gray-400">{testimonial.text}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
