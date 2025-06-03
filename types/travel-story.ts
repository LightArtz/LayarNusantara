export interface TravelStory {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  coverImage: string
  images: string[]
  location: string
  readTime: number
  publishedAt: string
  tags: string[]
  featured: boolean
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  location: string
  avatar: string
}
