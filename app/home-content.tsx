"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Users,
  BookOpen,
  Star,
  ArrowRight,
  Camera,
  Compass,
  Mountain,
  ChevronLeft,
  ChevronRight,
  Globe,
  Heart,
  Utensils,
  Palette,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Toast } from "@radix-ui/react-toast"
import { toast } from "sonner"

const heroSlides = [
  {
    id: 1,
    image: "/hero-1.jpeg",
    title: "Discover the Emerald of the Equator",
    subtitle: "17,000 islands of wonder await your exploration",
    location: "Raja Ampat, West Papua",
  },
  {
    id: 2,
    image: "/hero-2.jpeg",
    title: "Ancient Temples, Timeless Stories",
    subtitle: "Where spirituality meets architectural mastery",
    location: "Borobudur, Central Java",
  },
  {
    id: 3,
    image: "/hero-3.jpeg",
    title: "Into the Heart of Wilderness",
    subtitle: "Last sanctuaries of incredible biodiversity",
    location: "Tanjung Puting, Central Kalimantan",
  },
  {
    id: 4,
    image: "/hero-4.jpeg",
    title: "Land of Fire and Legends",
    subtitle: "Volcanic landscapes that shaped civilizations",
    location: "Mount Bromo, East Java",
  },
]

const featuredStories = [
  {
    id: "1",
    title: "Dawn of the Sea Wanderers",
    excerpt: "In the pristine waters of Raja Ampat, where coral gardens bloom beneath crystal waves...",
    author: "Amara Sari",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    location: "Raja Ampat, Papua",
    readTime: "8 min",
  },
  {
    id: "2",
    title: "Whispers of Ancient Stones",
    excerpt: "As dawn breaks over the ancient temple of Borobudur, the stones seem to whisper stories...",
    author: "Maya Putri",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    location: "Borobudur, Central Java",
    readTime: "6 min",
  },
  {
    id: "3",
    title: "The Emerald Heart of Borneo",
    excerpt: "Deep in the rainforests of Kalimantan, where orangutans swing through ancient canopies...",
    author: "David Chen",
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&h=400&fit=crop",
    location: "Kalimantan",
    readTime: "10 min",
  },
]

const cultureHighlights = [
  {
    id: "1",
    title: "Sacred Dance of Bali",
    description: "Where movement becomes prayer in temple ceremonies",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    region: "Bali",
  },
  {
    id: "2",
    title: "Toraja's Living Heritage",
    description: "Ancient traditions echo through generations",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    region: "South Sulawesi",
  },
  {
    id: "3",
    title: "The Wisdom of Batik",
    description: "Stories written in wax and dye",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    region: "Central Java",
  },
]

const indonesiaProvinces = [
  {
    name: "Bali",
    x: "70%",
    y: "75%",
    tourism: "Temples, Beaches, Rice Terraces",
    culture: "Hindu Ceremonies, Traditional Dance",
    culinary: "Nasi Ayam, Bebek Betutu, Lawar",
  },
  {
    name: "DKI Jakarta",
    x: "45%",
    y: "65%",
    tourism: "Museums, Shopping, Nightlife",
    culture: "Betawi Heritage, Modern Arts",
    culinary: "Kerak Telor, Soto Betawi, Gado-gado",
  },
  {
    name: "Jawa Tengah",
    x: "55%",
    y: "70%",
    tourism: "Borobudur, Prambanan, Solo",
    culture: "Javanese Court Culture, Batik",
    culinary: "Gudeg, Sate Klathak, Serabi",
  },
  {
    name: "Jawa Barat",
    x: "50%",
    y: "65%",
    tourism: "Bandung, Tea Plantations, Volcanoes",
    culture: "Sundanese Traditions, Angklung",
    culinary: "Nasi Timbel, Pepes Ikan, Karedok",
  },
  {
    name: "Sumatera Barat",
    x: "25%",
    y: "45%",
    tourism: "Lake Toba, Bukittinggi, Mentawai",
    culture: "Minangkabau Architecture, Randai",
    culinary: "Rendang, Sate Padang, Dendeng",
  },
  {
    name: "Papua",
    x: "85%",
    y: "80%",
    tourism: "Raja Ampat, Jayawijaya Mountains",
    culture: "Tribal Traditions, Koteka",
    culinary: "Papeda, Ikan Bakar, Sagu",
  },
]

export default function HomeContent() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedProvince, setSelectedProvince] = useState<any>(null)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const nextStory = () => {
    setCurrentStoryIndex((prev) => (prev + 1) % featuredStories.length)
  }

  const prevStory = () => {
    setCurrentStoryIndex((prev) => (prev - 1 + featuredStories.length) % featuredStories.length)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Dynamic Carousel */}
      <section className="relative h-[92vh] overflow-hidden">
        {/* Background Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/30" />
          </div>
        ))}

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 right-32 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        {/* Content */}
        <div className="relative z-20 h-full flex items-center justify-center pb-30">
          <div className="text-center text-white max-w-6xl mx-auto px-6">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              {heroSlides[currentSlide].title.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={
                    index === heroSlides[currentSlide].title.split(" ").length - 1 ||
                    index === heroSlides[currentSlide].title.split(" ").length - 2
                      ? "text-green-400"
                      : ""
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </h1>

            <p className="text-2xl md:text-3xl mb-8 text-gray-200 font-light">{heroSlides[currentSlide].subtitle}</p>

            <div className="flex items-center justify-center mb-12">
              <MapPin className="w-6 h-6 mr-2 text-green-400" />
              <span className="text-lg text-green-400 font-medium">{heroSlides[currentSlide].location}</span>
            </div>

            <div className="flex justify-center">
              <Link href="#explore">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full shadow-2xl"
                >
                  <Compass className="w-5 h-5 mr-2" />
                  Explore Indonesia
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation - Positioned higher */}
        {/* <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div> */}

        {/* Arrow Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">17,508</div>
              <div className="text-gray-600">Islands</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">300+</div>
              <div className="text-gray-600">Ethnic Groups</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mountain className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">400+</div>
              <div className="text-gray-600">Volcanoes</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">700+</div>
              <div className="text-gray-600">Languages</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Indonesia Map */}
      <section id="explore" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore Indonesia by Region</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Click on any province to discover its unique tourism, culture, and culinary treasures
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Map */}
            <div className="relative">
              <div className="relative w-full h-96 bg-gradient-to-br from-green-100 via-green-50 to-blue-50 rounded-2xl overflow-hidden border border-green-200">
                <div className="absolute inset-0 p-8">
                  <div className="relative w-full h-full">
                    {/* Indonesia Map SVG Background */}
                    <svg viewBox="0 0 400 300" className="w-full h-full opacity-30">
                      <path
                        d="M50 120 Q80 100 120 110 Q160 105 200 115 Q240 110 280 120 Q320 115 350 125 Q330 150 290 145 Q250 155 210 150 Q170 145 130 140 Q90 135 60 130 Z"
                        fill="#10b981"
                      />
                      <path
                        d="M70 180 Q100 170 140 175 Q180 180 220 175 Q260 170 300 180 Q280 200 240 195 Q200 205 160 200 Q120 195 90 190 Z"
                        fill="#10b981"
                      />
                      <path
                        d="M320 160 Q340 150 360 155 Q380 160 390 170 Q385 185 370 180 Q355 175 340 170 Q325 165 320 160 Z"
                        fill="#10b981"
                      />
                    </svg>

                    {/* Province Markers */}
                    {indonesiaProvinces.map((province, index) => (
                      <button
                        key={province.name}
                        onClick={() => setSelectedProvince(province)}
                        className={`absolute w-4 h-4 rounded-full transition-all duration-300 shadow-lg hover:scale-150 ${
                          selectedProvince?.name === province.name
                            ? "bg-green-700 scale-125"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                        style={{ left: province.x, top: province.y }}
                        title={province.name}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {province.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Province Information */}
            <div className="space-y-6">
              {selectedProvince ? (
                <Card className="p-8 shadow-xl border-l-4 border-l-green-500">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">{selectedProvince.name}</h3>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-lg">Tourism</h4>
                        <p className="text-gray-700">{selectedProvince.tourism}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Palette className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-lg">Art & Culture</h4>
                        <p className="text-gray-700">{selectedProvince.culture}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Utensils className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-lg">Culinary</h4>
                        <p className="text-gray-700">{selectedProvince.culinary}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="p-8 shadow-xl">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-xl font-semibold mb-2">Select a Province</h3>
                    <p>
                      Click on any point on the map to explore that region's tourism, culture, and culinary highlights.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Travel Stories Preview */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Travel Stories</h2>
              <p className="text-xl text-gray-600">Real journeys from fellow explorers</p>
            </div>
            <Link href="/travel-stories">
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg">
                View All Stories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 h-full border-0 bg-white">
              <div className="relative h-64">
                <Image
                  src={featuredStories[currentStoryIndex].image || "/placeholder.svg"}
                  alt={featuredStories[currentStoryIndex].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-amber-500 text-white border-0 shadow-lg">Featured</Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{featuredStories[currentStoryIndex].location}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{featuredStories[currentStoryIndex].title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{featuredStories[currentStoryIndex].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>By {featuredStories[currentStoryIndex].author}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredStories[currentStoryIndex].readTime}</span>
                  </div>
                  <Link href={`/travel-stories/${featuredStories[currentStoryIndex].id}`}>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                    >
                      Read More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <button
              onClick={prevStory}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all hover:shadow-2xl"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextStory}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all hover:shadow-2xl"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Culture Insights Preview */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Cultural Heritage</h2>
              <p className="text-xl text-gray-600">Discover Indonesia's living traditions</p>
            </div>
            <Link href="/culture-insights">
              <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg">
                Explore Culture
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cultureHighlights.map((culture) => (
              <Card
                key={culture.id}
                className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group border-0 h-80"
              >
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={culture.image || "/placeholder.svg"}
                    alt={culture.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-500 text-white border-0 shadow-lg">{culture.region}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{culture.title}</h3>
                    <p className="text-white/90 text-sm">{culture.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions CTA */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[length:30px_30px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Share Your Local Business with Travelers</h2>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Connect with adventurous travelers seeking authentic Indonesian experiences. From homestays to culinary
                tours, showcase what makes your region special.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/promotions">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg shadow-xl">
                    Browse Local Businesses
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/create-promotion">
                  <Button
                    size="lg"
                    className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 text-lg border-2 border-green-700"
                  >
                    List Your Business
                    <Star className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-6 ml-8">
                <div className="space-y-6">
                  <div className="relative h-36 rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop"
                      alt="Local Culinary Experience"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-44 rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=250&fit=crop"
                      alt="Traditional Homestay"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-6 mt-12">
                  <div className="relative h-44 rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=250&fit=crop"
                      alt="Cultural Experience"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-36 rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=300&h=200&fit=crop"
                      alt="Adventure Tours"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter & Final CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Never Miss an Indonesian Adventure</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the latest travel stories, cultural insights, and local discoveries delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 h-12"
              id="newsletter-email"
            />
            <Button
              className="bg-green-600 hover:bg-green-700 px-6 py-3 h-12 whitespace-nowrap"
              onClick={() => {
                const email = (document.getElementById("newsletter-email") as HTMLInputElement)?.value
                if (email) {
                  toast.success("Thank you for subscribing! We will send you our latest updates.");
                  (document.getElementById("newsletter-email") as HTMLInputElement).value = "";
                } else {
                  toast.error("Please enter a valid email address.")
                }
              }}
            >
              Subscribe
              <Heart className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
