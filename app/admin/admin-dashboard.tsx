"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Shield, LogOut, Eye, Trash2, CheckCircle, XCircle, Clock, MapPin, Calendar } from "lucide-react"
import Image from "next/image"
import { adminLogout, updatePromotionStatus, deletePromotion, updatePaymentStatus } from "../actions/promotions"

interface AdminDashboardProps {
  promotions: any[]
}

export default function AdminDashboard({ promotions }: AdminDashboardProps) {
  const router = useRouter()
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)

  const handleLogout = async () => {
    await adminLogout()
    router.push("/admin/login")
  }

  const handleStatusUpdate = async (promotionId: string, status: string) => {
    setIsUpdating(promotionId)
    try {
      await updatePromotionStatus(promotionId, status)
      router.refresh()
    } catch (error) {
      alert("Failed to update status")
    } finally {
      setIsUpdating(null)
    }
  }

  const handlePaymentStatusUpdate = async (paymentId: string, status: string) => {
    setIsUpdating(paymentId)
    try {
      await updatePaymentStatus(paymentId, status)
      router.refresh()
    } catch (error) {
      alert("Failed to update payment status")
    } finally {
      setIsUpdating(null)
    }
  }

  const handleDelete = async (promotionId: string) => {
    setIsUpdating(promotionId)
    try {
      await deletePromotion(promotionId)
      router.refresh()
    } catch (error) {
      alert("Failed to delete promotion")
    } finally {
      setIsUpdating(null)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
      expired: "bg-gray-100 text-gray-800",
    }
    return variants[status as keyof typeof variants] || variants.pending
  }

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date()
  }

  const pendingPromotions = promotions.filter((p) => p.status === "pending")
  const activePromotions = promotions.filter((p) => p.status === "active" && !isExpired(p.expires_at))
  const expiredPromotions = promotions.filter((p) => isExpired(p.expires_at))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">LayarNusantara Management</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingPromotions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{activePromotions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <XCircle className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Expired</p>
                  <p className="text-2xl font-bold text-gray-900">{expiredPromotions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{promotions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Promotions Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Promotions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Promotion</th>
                    <th className="text-left p-4">Location</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Payment</th>
                    <th className="text-left p-4">Expires</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {promotions.map((promotion) => (
                    <tr key={promotion.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center">
                          <Image
                            src={promotion.images[0] || "/placeholder.svg?height=50&width=50"}
                            alt={promotion.title}
                            width={50}
                            height={50}
                            className="rounded-lg object-cover mr-3"
                          />
                          <div>
                            <p className="font-medium">{promotion.title}</p>
                            <p className="text-sm text-gray-600">{promotion.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {promotion.city}, {promotion.province}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={getStatusBadge(isExpired(promotion.expires_at) ? "expired" : promotion.status)}
                        >
                          {isExpired(promotion.expires_at) ? "Expired" : promotion.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        {promotion.promotion_payments?.length > 0 ? (
                          <Badge className={getStatusBadge(promotion.promotion_payments[0].payment_status)}>
                            {promotion.promotion_payments[0].payment_status}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">No payment</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(promotion.expires_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedPromotion(promotion)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{promotion.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                {/* Promotion Details */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-600">Category</p>
                                    <p className="font-medium">{promotion.category}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Location</p>
                                    <p className="font-medium">
                                      {promotion.city}, {promotion.province}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Price Range</p>
                                    <p className="font-medium">
                                      Rp {promotion.min_price.toLocaleString()} - Rp{" "}
                                      {promotion.max_price.toLocaleString()}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">Duration</p>
                                    <p className="font-medium">{promotion.duration_months} months</p>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm text-gray-600 mb-2">Description</p>
                                  <p className="text-sm">{promotion.description}</p>
                                </div>

                                {/* Images */}
                                {promotion.images?.length > 0 && (
                                  <div>
                                    <p className="text-sm text-gray-600 mb-2">Images</p>
                                    <div className="grid grid-cols-2 gap-2">
                                      {promotion.images.map((image: string, index: number) => (
                                        <Image
                                          key={index}
                                          src={image || "/placeholder.svg"}
                                          alt={`Promotion image ${index + 1}`}
                                          width={200}
                                          height={150}
                                          className="rounded-lg object-cover"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Contact Info */}
                                <div>
                                  <p className="text-sm text-gray-600 mb-2">Contact Information</p>
                                  <div className="space-y-1">
                                    {promotion.whatsapp && <p className="text-sm">WhatsApp: {promotion.whatsapp}</p>}
                                    {promotion.instagram && <p className="text-sm">Instagram: {promotion.instagram}</p>}
                                  </div>
                                </div>

                                {/* Payment Info */}
                                {promotion.promotion_payments?.length > 0 && (
                                  <div>
                                    <p className="text-sm text-gray-600 mb-2">Payment Information</p>
                                    {promotion.promotion_payments.map((payment: any) => (
                                      <div key={payment.id} className="border rounded-lg p-4 space-y-2">
                                        <div className="flex justify-between items-center">
                                          <span className="font-medium">
                                            Rp {payment.amount.toLocaleString()} - {payment.duration_months} months
                                          </span>
                                          <Badge className={getStatusBadge(payment.payment_status)}>
                                            {payment.payment_status}
                                          </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600">Method: {payment.payment_method}</p>

                                        {payment.payment_proof && (
                                          <div>
                                            <p className="text-sm text-gray-600 mb-2">Payment Proof:</p>
                                            <Image
                                              src={payment.payment_proof || "/placeholder.svg"}
                                              alt="Payment proof"
                                              width={200}
                                              height={150}
                                              className="rounded-lg object-cover border"
                                            />
                                          </div>
                                        )}

                                        {payment.payment_status === "pending" && (
                                          <div className="flex space-x-2 mt-2">
                                            <Button
                                              size="sm"
                                              onClick={() => handlePaymentStatusUpdate(payment.id, "approved")}
                                              className="bg-green-600 hover:bg-green-700"
                                            >
                                              Approve Payment
                                            </Button>
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              onClick={() => handlePaymentStatusUpdate(payment.id, "rejected")}
                                            >
                                              Reject Payment
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Admin Actions */}
                                <div className="flex space-x-2 pt-4 border-t">
                                  {promotion.status === "pending" && (
                                    <>
                                      <Button
                                        onClick={() => handleStatusUpdate(promotion.id, "active")}
                                        className="bg-green-600 hover:bg-green-700"
                                        disabled={isUpdating === promotion.id}
                                      >
                                        {isUpdating === promotion.id ? (
                                          <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Activating...
                                          </div>
                                        ) : (
                                          <>
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Activate
                                          </>
                                        )}
                                      </Button>
                                      <Button
                                        onClick={() => handleStatusUpdate(promotion.id, "rejected")}
                                        variant="outline"
                                        disabled={isUpdating === promotion.id}
                                      >
                                        {isUpdating === promotion.id ? (
                                          <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Rejecting...
                                          </div>
                                        ) : (
                                          <>
                                            <XCircle className="w-4 h-4 mr-2" />
                                            Reject
                                          </>
                                        )}
                                      </Button>
                                    </>
                                  )}

                                  {promotion.status === "active" && (
                                    <Button
                                      onClick={() => handleStatusUpdate(promotion.id, "pending")}
                                      variant="outline"
                                      disabled={isUpdating === promotion.id}
                                    >
                                      {isUpdating === promotion.id ? (
                                        <div className="flex items-center">
                                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                          Setting Pending...
                                        </div>
                                      ) : (
                                        <>
                                          <Clock className="w-4 h-4 mr-2" />
                                          Set Pending
                                        </>
                                      )}
                                    </Button>
                                  )}

                                  <Button onClick={() => handleDelete(promotion.id)} variant="destructive">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {promotion.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => handleStatusUpdate(promotion.id, "active")}
                              className="bg-green-600 hover:bg-green-700"
                              disabled={isUpdating === promotion.id}
                            >
                              {isUpdating === promotion.id ? (
                                <div className="flex items-center">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Activating...
                                </div>
                              ) : (
                                <CheckCircle className="w-4 h-4" />
                              )}
                            </Button>
                          )}

                          <Button size="sm" variant="destructive" onClick={() => handleDelete(promotion.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
