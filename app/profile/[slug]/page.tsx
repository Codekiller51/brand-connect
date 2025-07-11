import Image from "next/image"
import Link from "next/link"
import { Clock, Facebook, Instagram, Linkedin, MapPin, MessageSquare, Star, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage({ params }: { params: { slug: string } }) {
  // In a real app, you would fetch the profile data based on the slug
  const profile = {
    name: "Maria Joseph",
    title: "Graphic Designer",
    location: "Dar es Salaam",
    rating: 4.9,
    reviews: 124,
    completedProjects: 87,
    joinedDate: "January 2022",
    about:
      "I'm a passionate graphic designer with over 5 years of experience specializing in brand identity, logo design, and print materials. I work closely with clients to understand their vision and deliver designs that exceed expectations.",
    skills: ["Logo Design", "Brand Identity", "Print Design", "Packaging", "Social Media Graphics", "UI/UX Design"],
    services: [
      {
        title: "Logo Design",
        price: "Tsh 250,000",
        description: "Custom logo design including 3 concepts, unlimited revisions, and all file formats.",
        deliveryTime: "3-5 days",
      },
      {
        title: "Brand Identity Package",
        price: "Tsh 750,000",
        description: "Complete brand identity including logo, business cards, letterhead, and brand guidelines.",
        deliveryTime: "7-10 days",
      },
      {
        title: "Social Media Package",
        price: "Tsh 350,000",
        description: "10 custom social media graphics designed for your brand across multiple platforms.",
        deliveryTime: "5-7 days",
      },
    ],
    portfolio: [
      {
        title: "ABC Company Rebrand",
        image: "/placeholder.svg?height=400&width=400",
        category: "Brand Identity",
      },
      {
        title: "XYZ Restaurant Menu Design",
        image: "/placeholder.svg?height=400&width=400",
        category: "Print Design",
      },
      {
        title: "123 Tech Logo Design",
        image: "/placeholder.svg?height=400&width=400",
        category: "Logo Design",
      },
      {
        title: "Fashion Brand Packaging",
        image: "/placeholder.svg?height=400&width=400",
        category: "Packaging",
      },
      {
        title: "Event Promotion Materials",
        image: "/placeholder.svg?height=400&width=400",
        category: "Print Design",
      },
      {
        title: "E-commerce Website UI",
        image: "/placeholder.svg?height=400&width=400",
        category: "UI/UX Design",
      },
    ],
    testimonials: [
      {
        name: "John Doe",
        company: "ABC Company",
        image: "/placeholder.svg?height=60&width=60",
        text: "Maria did an exceptional job on our company rebrand. She understood our vision perfectly and delivered designs that exceeded our expectations. Highly recommended!",
        rating: 5,
      },
      {
        name: "Sarah Smith",
        company: "XYZ Restaurant",
        image: "/placeholder.svg?height=60&width=60",
        text: "Working with Maria was a pleasure. She designed our new menu and promotional materials, and the results were outstanding. Professional, responsive, and talented!",
        rating: 5,
      },
      {
        name: "Michael Johnson",
        company: "123 Tech",
        image: "/placeholder.svg?height=60&width=60",
        text: "Maria created a perfect logo for our tech startup. She was patient with revisions and made sure we were completely satisfied with the final design.",
        rating: 4,
      },
    ],
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
