"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Star, Quote, Play, ChevronLeft, ChevronRight, User, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FloatingCard } from "@/components/floating-card"
import { TestimonialCard } from "@/components/testimonial-card"

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Amina Hassan",
    role: "Business Owner",
    company: "Amina's Fashion Boutique",
    location: "Dar es Salaam",
    image: "/placeholder.svg?height=400&width=400",
    content:
      "Brand Connect transformed how I find creative talent for my fashion business. I was struggling to find a reliable graphic designer for my branding, but within days of joining, I connected with an amazing designer who understood my vision perfectly. The verification system gave me confidence, and the location-based search helped me find someone local who could meet in person. I've since hired three more professionals through the platform!",
    rating: 5,
    category: "Client",
    videoUrl: "#",
    featured: true,
  },
  {
    id: 2,
    name: "David Mushi",
    role: "Photographer",
    company: "DM Photography",
    location: "Arusha",
    image: "/placeholder.svg?height=400&width=400",
    content:
      "As a photographer in Arusha, I was always struggling to reach clients beyond my immediate network. Since joining Brand Connect, my client base has grown by over 200%. The platform's verification process adds credibility to my profile, and the review system helps new clients trust my work. The booking system has also streamlined my scheduling process. I'm now fully booked three months in advance!",
    rating: 5,
    category: "Creative",
    videoUrl: "#",
    featured: true,
  },
  {
    id: 3,
    name: "Sarah Kimaro",
    role: "Marketing Director",
    company: "Tanzania Tours",
    location: "Mwanza",
    image: "/placeholder.svg?height=400&width=400",
    content:
      "Our tourism company needed various creative services - from photography to digital marketing. Brand Connect made it incredibly easy to find verified professionals in different regions where we operate. The quality of work has been consistently excellent, and the platform's messaging system makes communication seamless. We've saved both time and money while getting better results than ever before.",
    rating: 4,
    category: "Client",
    videoUrl: "#",
    featured: false,
  },
  {
    id: 4,
    name: "John Mbwambo",
    role: "Graphic Designer",
    company: "Creative Solutions",
    location: "Dodoma",
    image: "/placeholder.svg?height=400&width=400",
    content:
      "Brand Connect has been a game-changer for my design career. Before joining, I was struggling to find consistent work. Now, I have a steady stream of clients who appreciate quality design. The platform handles all the administrative aspects, from contracts to payments, allowing me to focus solely on my creative work. My income has increased by 70% in just six months!",
    rating: 5,
    category: "Creative",
    videoUrl: "#",
    featured: false,
  },
  {
    id: 5,
    name: "Grace Mwakasege",
    role: "Event Planner",
    company: "Graceful Events",
    location: "Dar es Salaam",
    image: "/placeholder.svg?height=400&width=400",
    content:
      "I regularly need different creative professionals for my events - photographers, videographers, and graphic designers. Brand Connect has become my one-stop solution. The ability to view portfolios, check reviews, and communicate directly with professionals has streamlined my hiring process. The quality of talent on the platform is exceptional, and I've never been disappointed.",
    rating: 5,
    category: "Client",
    videoUrl: "#",
    featured: false,
  },
  {
    id: 6,
    name: "Peter Makundi",
    role: "Videographer",
    company: "Visual Stories",
    location: "Mbeya",
    image: "/placeholder.svg?height=400&width=400",
    content:
      "Living in Mbeya, I found it challenging to connect with clients outside my region. Brand Connect's location-based search has helped clients from across Tanzania discover my services. The platform's secure payment system gives both me and my clients peace of mind. I've collaborated with businesses I never would have reached otherwise, and my portfolio has grown tremendously.",
    rating: 4,
    category: "Creative",
    videoUrl: "#",
    featured: false,
  },
]

// Featured testimonials for the hero section
const featuredTestimonials = testimonials.filter((testimonial) => testimonial.featured)

export default function TestimonialsPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeCategory, setActiveCategory] = useState("all")
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // Filter testimonials based on active category
  const filteredTestimonials =
    activeCategory === "all"
      ? testimonials
      : testimonials.filter((testimonial) => testimonial.category.toLowerCase() === activeCategory)

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === featuredTestimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? featuredTestimonials.length - 1 : prev - 1))
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full py-20 md:py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950 dark:via-teal-950 dark:to-cyan-950 overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div
          className="container px-4 md:px-6 relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge className="mb-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                Success Stories
              </Badge>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
                Hear from our <span className="text-emerald-600 dark:text-emerald-400">Community</span>
              </h1>
              <p className="max-w-[600px] mx-auto text-gray-600 md:text-xl dark:text-gray-300">
                Discover how Brand Connect is transforming the creative landscape in Tanzania through the experiences of
                our clients and creative professionals
              </p>
            </motion.div>
          </div>

          <div className="relative mt-12">
            <div className="absolute -top-16 left-10 z-10">
              <FloatingCard delay={0}>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">4.9 Average Rating</span>
                  </div>
                </div>
              </FloatingCard>
            </div>

            <div className="absolute -top-8 right-10 z-10">
              <FloatingCard delay={0.5}>
                <div className="bg-emerald-600 text-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span className="font-semibold">500+ Happy Users</span>
                  </div>
                </div>
              </FloatingCard>
            </div>

            <motion.div
              className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={featuredTestimonials[activeTestimonial].image || "/placeholder.svg"}
                    alt={featuredTestimonials[activeTestimonial].name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:hidden"></div>
                  <div className="absolute top-4 left-4 md:hidden">
                    <Badge className="bg-emerald-600 hover:bg-emerald-700">
                      {featuredTestimonials[activeTestimonial].category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 md:hidden">
                    <h3 className="text-xl font-bold text-white">{featuredTestimonials[activeTestimonial].name}</h3>
                    <p className="text-white/80">
                      {featuredTestimonials[activeTestimonial].role}, {featuredTestimonials[activeTestimonial].company}
                    </p>
                  </div>
                  <Button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 h-auto w-auto md:hidden"
                    onClick={prevTestimonial}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 h-auto w-auto md:hidden"
                    onClick={nextTestimonial}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="hidden md:block">
                      <Badge className="mb-4 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                        {featuredTestimonials[activeTestimonial].category}
                      </Badge>
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < featuredTestimonials[activeTestimonial].rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-emerald-200 dark:text-emerald-800 rotate-180" />
                      <p className="text-gray-600 dark:text-gray-300 relative z-10 pl-6 md:text-lg">
                        {featuredTestimonials[activeTestimonial].content}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 hidden md:block">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{featuredTestimonials[activeTestimonial].name}</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          {featuredTestimonials[activeTestimonial].role},{" "}
                          {featuredTestimonials[activeTestimonial].company}
                        </p>
                        <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400 text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{featuredTestimonials[activeTestimonial].location}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                          onClick={prevTestimonial}
                          aria-label="Previous testimonial"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                          onClick={nextTestimonial}
                          aria-label="Next testimonial"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-start mt-4">
                      <Button
                        variant="outline"
                        className="text-emerald-600 border-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-400 dark:hover:bg-emerald-950"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Watch Video Testimonial
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* All Testimonials */}
      <section className="w-full py-16 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">Stories from Our Community</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Read testimonials from clients and creative professionals who have experienced the Brand Connect
              difference
            </p>
          </motion.div>

          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveCategory(value)}>
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Testimonials</TabsTrigger>
                <TabsTrigger value="client">From Clients</TabsTrigger>
                <TabsTrigger value="creative">From Creatives</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((testimonial, index) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="client" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((testimonial, index) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="creative" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((testimonial, index) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="w-full py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">Video Testimonials</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Watch our community members share their experiences with Brand Connect
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full group">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover brightness-75 group-hover:brightness-50 transition-all duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full h-12 w-12 flex items-center justify-center"
                        aria-label="Play video"
                      >
                        <Play className="h-5 w-5 ml-1" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-emerald-600 hover:bg-emerald-700">{testimonial.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{testimonial.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {testimonial.role}, {testimonial.company}
                    </p>
                    <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400 text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{testimonial.location}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-4 line-clamp-3">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700">
              View All Video Testimonials
            </Button>
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="w-full py-16 bg-gradient-to-br from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800 text-white">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">Share Your Story</h2>
            <p className="mb-8">
              Had a great experience with Brand Connect? We'd love to hear about it! Share your testimonial and inspire
              others to join our community.
            </p>
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 dark:hover:bg-gray-200">
              Submit Your Testimonial
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
