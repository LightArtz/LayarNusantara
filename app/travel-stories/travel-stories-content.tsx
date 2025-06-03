"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Quote, Clock, MapPin, Heart, ArrowRight, Camera } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Enhanced mock data with more traditional Indonesian colors
const featuredStories = [
  {
    id: "1",
    title: "Dawn of the Sea Wanderers",
    subtitle: "Where the Ocean Meets the Soul",
    excerpt:
      "In the pristine waters of Raja Ampat, where coral gardens bloom beneath crystal waves, I discovered that paradise isn't just a place—it's a feeling that awakens when you surrender to the rhythm of the sea.",
    fullExcerpt:
      "The boat gently rocked as the first rays of sunlight painted the horizon in shades of gold and crimson. Below us, a world of wonder awaited—coral gardens that have thrived for millennia, schools of fish that move like living rainbows, and the gentle giants of the sea that call these waters home.",
    author: {
      name: "Amara Sari",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      bio: "Marine biologist & underwater photographer",
      location: "Jakarta, Indonesia",
    },
    coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400&h=300&fit=crop",
    ],
    location: "Raja Ampat, Papua Barat",
    readTime: 8,
    publishedAt: "2024-01-15",
    tags: ["Marine Life", "Adventure", "Photography"],
    featured: true,
    color: "from-blue-800 to-teal-700",
  },
  {
    id: "2",
    title: "Whispers of Ancient Stones",
    subtitle: "A Journey Through Time at Borobudur",
    excerpt:
      "As dawn breaks over the ancient temple of Borobudur, the stones seem to whisper stories of devotion, artistry, and the eternal human quest for enlightenment.",
    fullExcerpt:
      "Each carved relief tells a story, each Buddha statue holds a prayer. Walking through these corridors at sunrise, I felt the weight of centuries and the lightness of spiritual awakening all at once.",
    author: {
      name: "Maya Putri",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Cultural historian & travel writer",
      location: "Yogyakarta, Indonesia",
    },
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1555400082-8c5cd5b3c3d1?w=400&h=300&fit=crop",
    ],
    location: "Borobudur, Jawa Tengah",
    readTime: 6,
    publishedAt: "2024-01-10",
    tags: ["Culture", "History", "Spirituality"],
    featured: true,
    color: "from-amber-700 to-orange-700",
  },
  {
    id: "3",
    title: "The Emerald Heart of Borneo",
    subtitle: "Into the Wild Unknown",
    excerpt:
      "Deep in the rainforests of Kalimantan, where orangutans swing through ancient canopies and rivers run like liquid emeralds, I found a world untouched by time.",
    fullExcerpt:
      "The jungle breathes with a life of its own. Every step reveals new wonders—exotic birds with feathers like jewels, plants that seem from another world, and the haunting calls of creatures that have roamed these forests for millions of years.",
    author: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Wildlife photographer & conservationist",
      location: "Singapore",
    },
    coverImage: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&h=600&fit=crop",
    images: ["https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop"],
    location: "Tanjung Puting, Kalimantan",
    readTime: 10,
    publishedAt: "2024-01-05",
    tags: ["Wildlife", "Conservation", "Adventure"],
    featured: true,
    color: "from-green-800 to-emerald-800",
  },
]

const testimonials = [
  {
    id: "1",
    quote:
      "I never imagined a simple boat ride to Raja Ampat would change my view of the world. The silence, the reef, the people... everything felt sacred.",
    author: "Sarah Wilson",
    location: "Melbourne, Australia",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    quote:
      "The stories shared here inspired my own journey to Indonesia. Now I understand why they call it the Emerald of the Equator.",
    author: "Marco Rodriguez",
    location: "Barcelona, Spain",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    quote:
      "Borobudur at sunrise wasn't just a tourist experience—it was a spiritual awakening that I'll carry with me forever.",
    author: "Yuki Tanaka",
    location: "Tokyo, Japan",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&h=400&fit=crop",
  },
]

const showcaseDestinations = [
  {
    id: "4",
    title: "Flavors of Padang Streets",
    excerpt: "A culinary adventure through the bustling streets of Padang, discovering authentic Minangkabau cuisine.",
    author: "Rudi Hartono",
    coverImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
    location: "Padang, Sumatera Barat",
    readTime: 5,
    color: "from-red-700 to-orange-600",
  },
  {
    id: "5",
    title: "Sunrise Over Bromo",
    excerpt: "The ethereal beauty of Mount Bromo at sunrise, a moment that changes your perspective on life.",
    author: "Lisa Chen",
    coverImage: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&h=400&fit=crop",
    location: "Bromo, Jawa Timur",
    readTime: 4,
    color: "from-purple-700 to-indigo-700",
  },
  {
    id: "6",
    title: "Komodo's Ancient Guardians",
    excerpt: "Face to face with the last dragons on Earth in the rugged landscapes of Komodo National Park.",
    author: "James Mitchell",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    location: "Komodo Island, NTT",
    readTime: 7,
    color: "from-stone-700 to-slate-700",
  },
]

export default function TravelStoriesContent() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 z-10" />

        <Image
          src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1920&h=1080&fit=crop"
          alt="Beautiful Indonesian Landscape"
          fill
          className="object-cover"
          priority
        />

        <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            Real Journeys.
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Real Stories.
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Explore heartfelt travel stories from adventurers discovering Indonesia's hidden wonders, ancient cultures,
            and breathtaking landscapes.
          </p>

          <div className="flex justify-center">
            <a href="#stories">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl"
              >
                Begin the Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* First Featured Story - Large Format */}
      <section id="stories" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <Badge className="bg-amber-100 text-amber-800 px-6 py-3 text-sm font-medium mb-6 cursor-default hover:bg-some-color">
              Featured Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Stories That Inspire Wanderlust</h2>
          </div>

          <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section with Overlay */}
              <div className="relative h-96 lg:h-auto overflow-hidden">
                <Image
                  src={featuredStories[0].coverImage || "/placeholder.svg"}
                  alt={featuredStories[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${featuredStories[0].color} opacity-60`} />

                {/* Floating Elements */}
                <div className="absolute top-6 left-6">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 cursor-default">Featured Story</Badge>
                </div>

                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{featuredStories[0].location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{featuredStories[0].readTime} min read</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="p-12 flex flex-col justify-center">
                <div className="flex items-center mb-8">
                  <Image
                    src={featuredStories[0].author.avatar || "/placeholder.svg"}
                    alt={featuredStories[0].author.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4 ring-4 ring-amber-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{featuredStories[0].author.name}</p>
                    <p className="text-gray-600">{featuredStories[0].author.bio}</p>
                    <p className="text-sm text-gray-500">{featuredStories[0].author.location}</p>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4">{featuredStories[0].title}</h3>
                <p className="text-xl text-amber-700 mb-6 font-medium">{featuredStories[0].subtitle}</p>
                <p className="text-gray-700 mb-8 leading-relaxed text-lg">{featuredStories[0].fullExcerpt}</p>

                {/* Story Images Preview */}
                <div className="flex gap-3 mb-8">
                  {featuredStories[0].images.slice(0, 3).map((image, index) => (
                    <div key={index} className="relative w-20 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {featuredStories[0].tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} className="bg-amber-100 text-amber-800 border-amber-200 cursor-default hover:bg-some-color">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/travel-stories/${featuredStories[0].id}`}>
                    <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-full px-6">
                      Read Full Story
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonial Section - Reduced height */}
      <section className="py-16 bg-gradient-to-r from-amber-700 to-orange-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:20px_20px]" />
        </div>

        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="text-center mb-12">
            <Quote className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Voices from the Journey</h2>
            <p className="text-lg text-white/90">What travelers say about their Indonesian adventures</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Testimonial Content - Reduced height */}
            <div className="text-white h-64 flex flex-col justify-between">
              <div>
                <blockquote className="text-xl md:text-2xl font-light italic mb-8 leading-relaxed h-24 flex items-center">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>

                <div className="flex items-center mb-6">
                  <Image
                    src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                    alt={testimonials[currentTestimonial].author}
                    width={60}
                    height={60}
                    className="rounded-full mr-4 ring-4 ring-white/30"
                  />
                  <div>
                    <p className="text-lg font-semibold">{testimonials[currentTestimonial].author}</p>
                    <p className="text-white/80 text-sm">{testimonials[currentTestimonial].location}</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Navigation */}
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Testimonial Image */}
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                alt="Testimonial"
                fill
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Second Featured Story - Different Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Content First */}
              <CardContent className="p-12 flex flex-col justify-center order-2 lg:order-1">
                <div className="flex items-center mb-8">
                  <Image
                    src={featuredStories[1].author.avatar || "/placeholder.svg"}
                    alt={featuredStories[1].author.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4 ring-4 ring-amber-100"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{featuredStories[1].author.name}</p>
                    <p className="text-gray-600">{featuredStories[1].author.bio}</p>
                    <p className="text-sm text-gray-500">{featuredStories[1].author.location}</p>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-4">{featuredStories[1].title}</h3>
                <p className="text-xl text-amber-700 mb-6 font-medium">{featuredStories[1].subtitle}</p>
                <p className="text-gray-700 mb-8 leading-relaxed text-lg">{featuredStories[1].fullExcerpt}</p>

                <div className="flex items-center text-sm text-gray-500 mb-8">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="mr-6">{featuredStories[1].location}</span>
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{featuredStories[1].readTime} min read</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {featuredStories[1].tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} className="bg-amber-100 text-amber-800 border-amber-200 cursor-default hover:bg-some-color">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/travel-stories/${featuredStories[1].id}`}>
                    <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-full px-6">
                      Read Full Story
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>

              {/* Image Section */}
              <div className="relative h-96 lg:h-auto overflow-hidden order-1 lg:order-2">
                <Image
                  src={featuredStories[1].coverImage || "/placeholder.svg"}
                  alt={featuredStories[1].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${featuredStories[1].color} opacity-60`} />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Destination Showcase Gallery - Gallery Style */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Indonesia's Hidden Gems</h2>
            <p className="text-xl text-gray-600">
              Discover the diverse beauty of our archipelago through these stunning destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* First item - larger */}
            <div className="md:col-span-2 lg:col-span-2">
              <Card className="overflow-hidden shadow-xl transition-all duration-500 h-80">
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={showcaseDestinations[0].coverImage || "/placeholder.svg"}
                    alt={showcaseDestinations[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${showcaseDestinations[0].color} opacity-70`} />

                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 cursor-default">
                      Showcase
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-2">{showcaseDestinations[0].title}</h3>
                    <p className="text-white/90 mb-3">{showcaseDestinations[0].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{showcaseDestinations[0].location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{showcaseDestinations[0].readTime} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Second item */}
            <div>
              <Card className="overflow-hidden shadow-xl transition-all duration-500 h-80">
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={showcaseDestinations[1].coverImage || "/placeholder.svg"}
                    alt={showcaseDestinations[1].title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${showcaseDestinations[1].color} opacity-70`} />

                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 cursor-default">
                      Showcase
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold mb-2">{showcaseDestinations[1].title}</h3>
                    <p className="text-white/90 text-sm mb-3">{showcaseDestinations[1].excerpt}</p>
                    <div className="flex items-center text-xs">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{showcaseDestinations[1].location}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Third item */}
            <div>
              <Card className="overflow-hidden shadow-xl transition-all duration-500 h-80">
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={showcaseDestinations[2].coverImage || "/placeholder.svg"}
                    alt={showcaseDestinations[2].title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${showcaseDestinations[2].color} opacity-70`} />

                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 cursor-default">
                      Showcase
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-bold mb-2">{showcaseDestinations[2].title}</h3>
                    <p className="text-white/90 text-sm mb-3">{showcaseDestinations[2].excerpt}</p>
                    <div className="flex items-center text-xs">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{showcaseDestinations[2].location}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Fourth item - add one more */}
            <div className="md:col-span-2">
              <Card className="overflow-hidden shadow-xl transition-all duration-500 h-80">
                <div className="relative h-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop"
                    alt="Traditional Villages"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-800 to-emerald-700 opacity-70" />

                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 cursor-default">
                      Showcase
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-2">Traditional Villages of Indonesia</h3>
                    <p className="text-white/90 mb-3">
                      Experience authentic village life and ancient customs preserved through generations
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>Various Locations</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>6 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Third Featured Story - Full Width - Fixed */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="relative h-[500px] overflow-hidden">
              <Image
                src={featuredStories[2].coverImage || "/placeholder.svg"}
                alt={featuredStories[2].title}
                fill
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${featuredStories[2].color} opacity-70`} />

              <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
                <div className="max-w-4xl">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-8 cursor-default">Wild Adventure</Badge>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">{featuredStories[2].title}</h3>
                  <p className="text-xl mb-8 text-white/90">{featuredStories[2].subtitle}</p>
                  <p className="text-lg mb-10 text-white/80 max-w-3xl mx-auto">{featuredStories[2].excerpt}</p>

                  <div className="flex items-center justify-center mb-10">
                    <Image
                      src={featuredStories[2].author.avatar || "/placeholder.svg"}
                      alt={featuredStories[2].author.name}
                      width={50}
                      height={50}
                      className="rounded-full mr-4 ring-4 ring-white/30"
                    />
                    <div className="text-left">
                      <p className="font-semibold">{featuredStories[2].author.name}</p>
                      <p className="text-white/80 text-sm">{featuredStories[2].author.bio}</p>
                    </div>
                  </div>

                  <Link href={`/travel-stories/${featuredStories[2].id}`}>
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8">
                      Explore the Wild
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Call to Action - Enhanced with traditional colors */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-amber-600 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-600 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-red-600 rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <div className="mb-10">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <Camera className="w-5 h-5 mr-2" />
              <span className="font-medium">Share Your Adventure</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Have an unforgettable journey in{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Indonesia?
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Share your story and inspire fellow travelers to explore the beauty, culture, and hidden wonders of our
            archipelago. Every journey has a story worth telling.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl"
              onClick={() => {
                window.location.href =
                  "mailto:stories@layarnusantara.com?subject=Share My Travel Story&body=Hi! I would like to share my travel story about Indonesia..."
              }}
            >
              Share Your Story
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="flex items-center text-gray-300">
              <Heart className="w-5 h-5 mr-2" />
              <span>Join our community of storytellers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
