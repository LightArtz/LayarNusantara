"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Instagram, X, ArrowLeft } from "lucide-react"
import { createPromotion } from "../actions/promotions"
import type { CreatePromotionData } from "@/types/promotion"
import Image from "next/image"
import { INDONESIAN_PROVINCES } from "@/lib/provinces"
import Link from "next/link"

export default function CreatePromotionForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [formData, setFormData] = useState<CreatePromotionData>({
    title: "",
    category: "",
    province: "",
    city: "",
    min_price: 0,
    max_price: 0,
    description: "",
    images: [],
    whatsapp: "",
    instagram: "",
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.province) newErrors.province = "Province is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.min_price || formData.min_price <= 0) newErrors.min_price = "Valid minimum price is required"
    if (!formData.max_price || formData.max_price <= 0) newErrors.max_price = "Valid maximum price is required"
    if (formData.min_price > formData.max_price)
      newErrors.max_price = "Maximum price must be greater than minimum price"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (uploadedImages.length === 0) newErrors.images = "At least one image is required"
    if (!formData.whatsapp && !formData.instagram) newErrors.contact = "At least one contact method is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (uploadedImages.length + files.length > 5) {
      alert("Maximum 5 images allowed")
      return
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum 5MB allowed.`)
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedImages((prev) => [...prev, result])
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, result],
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    if (!agreedToTerms) {
      alert("Please agree to the Terms and Conditions")
      return
    }

    setIsSubmitting(true)

    try {
      const promotion = await createPromotion(formData)
      router.push(`/payment/${promotion.id}`)
    } catch (error) {
      console.error("Error creating promotion:", error)
      alert("Failed to create promotion. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof CreatePromotionData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="absolute top-8 left-8">
        <Link href="/promotions">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Promotions
          </Button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Promotion</h1>
          <p className="text-gray-600">Share your business with travelers across Indonesia</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Promotion Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promotion Title*</label>
                <Input
                  placeholder="Enter your business or promotion title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Category and Province */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category*</label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Culinary">Culinary</SelectItem>
                      <SelectItem value="Homestay">Homestay</SelectItem>
                      <SelectItem value="Craft & Art">Craft & Art</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                      <SelectItem value="Adventure">Adventure</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Province*</label>
                  <Select value={formData.province} onValueChange={(value) => handleInputChange("province", value)}>
                    <SelectTrigger className={errors.province ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select Province" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDONESIAN_PROVINCES.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
                </div>
              </div>

              {/* City/Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City/Region*</label>
                <Input
                  placeholder="Enter city or region"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range*</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="number"
                      placeholder="Minimum Price"
                      value={formData.min_price || ""}
                      onChange={(e) => handleInputChange("min_price", Number.parseInt(e.target.value) || 0)}
                      className={errors.min_price ? "border-red-500" : ""}
                    />
                    {errors.min_price && <p className="text-red-500 text-sm mt-1">{errors.min_price}</p>}
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Maximum Price"
                      value={formData.max_price || ""}
                      onChange={(e) => handleInputChange("max_price", Number.parseInt(e.target.value) || 0)}
                      className={errors.max_price ? "border-red-500" : ""}
                    />
                    {errors.max_price && <p className="text-red-500 text-sm mt-1">{errors.max_price}</p>}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
                <Textarea
                  placeholder="Describe your business or promotion..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              {/* Upload Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images*</label>

                {/* Image Preview */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          width={150}
                          height={100}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors ${
                    errors.images ? "border-red-500" : "border-gray-300"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop your images here, or</p>
                  <Button type="button" variant="outline">
                    Browse Files
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Maximum 5 images, up to 5MB each ({uploadedImages.length}/5)
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
              </div>

              {/* Contact Methods */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Contact Methods*</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-bold">W</span>
                      </div>
                      <span className="text-sm font-medium">WhatsApp</span>
                    </div>
                    <Input
                      placeholder="+62 xxx xxxx xxxx"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Instagram className="w-6 h-6 text-pink-500 mr-2" />
                      <span className="text-sm font-medium">Instagram</span>
                    </div>
                    <Input
                      placeholder="@username"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange("instagram", e.target.value)}
                    />
                  </div>
                </div>
                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <span className="text-blue-600 hover:underline cursor-pointer">Terms and Conditions</span> and confirm
                  that all information provided is accurate.
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "✓ Submit Promotion"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
