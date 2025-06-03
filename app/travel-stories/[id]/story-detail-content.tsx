"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, MapPin, Heart, Share2, Instagram, Globe, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface StoryDetailProps {
  story: {
    id: string
    title: string
    subtitle: string
    content: string
    author: {
      name: string
      avatar: string
      bio: string
      location: string
      social: {
        instagram: string
        website: string
      }
    }
    coverImage: string
    images: string[]
    location: string
    readTime: number
    publishedAt: string
    tags: string[]
    featured: boolean
  }
}

export default function StoryDetailContent({ story }: StoryDetailProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.subtitle,
        url: window.location.href,
      })
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image src={story.coverImage || "/placeholder.svg"} alt={story.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-8 left-8 z-20">
          <Link href="/travel-stories">
            <Button
              size="lg"
              className="bg-white/90 backdrop-blur-sm border border-white/30 text-gray-900 hover:bg-white shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Stories
            </Button>
          </Link>
        </div>

        {/* Story Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {story.tags.map((tag) => (
                <Badge key={tag} className="bg-white/20 backdrop-blur-sm text-white border-white/30 cursor-default">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">{story.title}</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-6">{story.subtitle}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{story.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{story.readTime} min read</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {new Date(story.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Author Info */}
          <Card className="mb-12 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src={story.author.avatar || "/placeholder.svg"}
                    alt={story.author.name}
                    width={80}
                    height={80}
                    className="rounded-full mr-6 ring-4 ring-amber-100"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{story.author.name}</h3>
                    <p className="text-gray-600 mb-2">{story.author.bio}</p>
                    <p className="text-sm text-gray-500">{story.author.location}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <a
                        href={`https://instagram.com/${story.author.social.instagram.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-pink-600 hover:text-pink-700 text-sm"
                      >
                        <Instagram className="w-4 h-4 mr-1" />
                        {story.author.social.instagram}
                      </a>
                      <a
                        href={`https://${story.author.social.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                      >
                        <Globe className="w-4 h-4 mr-1" />
                        Website
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Actions */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`${isLiked ? "text-red-500 border-red-500" : "text-gray-500"}`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                    {isLiked ? "Liked" : "Like"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: story.content }} />
          </div>

          {/* Story Images Gallery */}
          {story.images.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Journey Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {story.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className="relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
