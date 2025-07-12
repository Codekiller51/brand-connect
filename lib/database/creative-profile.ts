import type { User } from './types'

export interface Service {
  title: string
  price: string
  description: string
  deliveryTime: string
}

export interface PortfolioItem {
  title: string
  image: string
  category: string
}

export interface Testimonial {
  name: string
  company: string
  image: string
  text: string
  rating: number
}

export interface CreativeProfile {
  id: string
  user_id: string
  title: string
  bio: string
  skills: string[]
  rating: number
  reviews: number
  completed_projects: number
  services: Service[]
  portfolio: PortfolioItem[]
  testimonials: Testimonial[]
  created_at: string
  updated_at: string
  user: User
}