"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, MapPin, Plus, Instagram, MessageCircle, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Promotion } from "@/types/promotion"
import { INDONESIAN_PROVINCES } from "@/lib/provinces"

interface PromotionsPageProps {
  initialPromotions: Promotion[]
}

export default function PromotionsPageContent({ initialPromotions }: PromotionsPageProps) {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions)
  const [filteredPromotions, setFilteredPromotions] = useState<Promotion[]>(initialPromotions)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    search: "",
    category: "all-categories",
    province: "all-provinces",
    priceRange: "all-prices",
    sortBy: "newest",
  })

  const itemsPerPage = 6

  // Apply filters whenever filters change
  useEffect(() => {
    let filtered = [...promotions]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (promo) =>
          promo.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          promo.description.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    // Category filter
    if (filters.category !== "all-categories") {
      filtered = filtered.filter((promo) => promo.category.toLowerCase() === filters.category)
    }

    // Province filter
    if (filters.province !== "all-provinces") {
      filtered = filtered.filter((promo) => promo.province.toLowerCase().replace(/\s+/g, "-") === filters.province)
    }

    // Price range filter
    if (filters.priceRange !== "all-prices") {
      if (filters.priceRange === "0-50000") {
        filtered = filtered.filter((promo) => promo.max_price <= 50000)
      } else if (filters.priceRange === "50000-100000") {
        filtered = filtered.filter((promo) => promo.min_price >= 50000 && promo.max_price <= 100000)
      } else if (filters.priceRange === "100000+") {
        filtered = filtered.filter((promo) => promo.min_price > 100000)
      }
    }

    // Sort
    if (filters.sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (filters.sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    } else if (filters.sortBy === "price-low") {
      filtered.sort((a, b) => a.min_price - b.min_price)
    } else if (filters.sortBy === "price-high") {
      filtered.sort((a, b) => b.min_price - a.min_price)
    }

    setFilteredPromotions(filtered)
    setCurrentPage(1)
  }, [filters, promotions])

  const totalPages = Math.ceil(filteredPromotions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentPromotions = filteredPromotions.slice(startIndex, startIndex + itemsPerPage)

  const formatPrice = (min: number, max: number) => {
    if (min === max) {
      return `Rp ${min.toLocaleString("id-ID")}/person`
    }
    return `Rp ${min.toLocaleString("id-ID")} - Rp ${max.toLocaleString("id-ID")}`
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Culinary: "bg-orange-500",
      Homestay: "bg-orange-400",
      "Craft & Art": "bg-orange-600",
      Cultural: "bg-orange-500",
    }
    return colors[category as keyof typeof colors] || "bg-orange-500"
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Local Business Promotions</h1>
              <p className="text-gray-600 mt-2">Discover authentic local experiences across Indonesia</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/create-promotion">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Promotion
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search businesses..."
                className="pl-10"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                <SelectItem value="culinary">Culinary</SelectItem>
                <SelectItem value="homestay">Homestay</SelectItem>
                <SelectItem value="craft & art">Craft & Art</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.province} onValueChange={(value) => handleFilterChange("province", value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Provinces" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-provinces">All Provinces</SelectItem>
                {INDONESIAN_PROVINCES.map((province) => (
                  <SelectItem key={province} value={province.toLowerCase().replace(/\s+/g, "-")}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange("priceRange", value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-prices">All Prices</SelectItem>
                <SelectItem value="0-50000">Under Rp 50,000</SelectItem>
                <SelectItem value="50000-100000">Rp 50,000 - Rp 100,000</SelectItem>
                <SelectItem value="100000+">Above Rp 100,000</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort By: Newest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Sort By: Newest</SelectItem>
                <SelectItem value="oldest">Sort By: Oldest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredPromotions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No promotions found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPromotions.map((promotion) => (
              <Card
                key={promotion.id}
                className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
              >
                <div className="relative">
                  <Image
                    src={promotion.images[0] || "/placeholder.svg?height=200&width=400"}
                    alt={promotion.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-medium ${getCategoryColor(promotion.category)}`}
                  >
                    {promotion.category}
                  </div>
                </div>

                <CardContent className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{promotion.title}</h3>

                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="text-sm">
                      {promotion.city}, {promotion.province}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-grow">{promotion.description}</p>

                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold text-green-600 text-sm">
                      {formatPrice(promotion.min_price, promotion.max_price)}
                    </span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700 text-white">Contact Now</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>{promotion.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <Image
                            src={promotion.images[0] || "/placeholder.svg?height=150&width=300"}
                            alt={promotion.title}
                            width={300}
                            height={150}
                            className="w-full h-48 object-cover rounded-lg"
                          />

                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                              <MapPin className="w-4 h-4 inline mr-1" />
                              {promotion.city}, {promotion.province}
                            </p>
                            <p className="text-sm font-medium text-green-600">
                              {formatPrice(promotion.min_price, promotion.max_price)}
                            </p>
                            <p className="text-sm text-gray-700">{promotion.description}</p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium">Contact Information:</h4>
                            {promotion.whatsapp && (
                              <a
                                href={`https://wa.me/${promotion.whatsapp.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-green-600 hover:text-green-700"
                              >
                                <MessageCircle className="w-4 h-4 mr-2" />
                                WhatsApp: {promotion.whatsapp}
                              </a>
                            )}
                            {promotion.instagram && (
                              <a
                                href={`https://instagram.com/${promotion.instagram.replace("@", "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-pink-600 hover:text-pink-700"
                              >
                                <Instagram className="w-4 h-4 mr-2" />
                                Instagram: {promotion.instagram}
                              </a>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ←
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              →
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
