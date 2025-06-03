"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, Smartphone, Copy, CheckCircle, Upload } from "lucide-react"
import Image from "next/image"
import type { Promotion } from "@/types/promotion"
import { createPayment } from "@/app/actions/promotions"
import { toast } from "sonner"

interface PaymentPageProps {
  promotion: Promotion
}

export default function PaymentPage({ promotion }: PaymentPageProps) {
  const router = useRouter()
  const [selectedDuration, setSelectedDuration] = useState(3)
  const [selectedPayment, setSelectedPayment] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [copiedText, setCopiedText] = useState("")
  const [paymentProof, setPaymentProof] = useState<string>("")
  const [isUploadingProof, setIsUploadingProof] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const durations = [
    { months: 3, price: 300000, savings: "Rp 100,000/month" },
    { months: 6, price: 540000, savings: "Rp 90,000/month" },
    { months: 12, price: 980000, savings: "Rp 80,000/month" },
  ]

  const bankDetails = {
    bankName: "Bank Central Asia (BCA)",
    accountNumber: "1234567890",
    accountName: "PT LayarNusantara Indonesia",
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(type)
    setTimeout(() => setCopiedText(""), 2000)
  }

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Maximum 5MB allowed.")
      return
    }

    setIsUploadingProof(true)
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPaymentProof(result)
      setIsUploadingProof(false)
    }
    reader.readAsDataURL(file)
  }

  const handlePayment = async () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method")
      return
    }

    if (!paymentProof) {
      toast.error("Please upload payment proof")
      return
    }

    setIsProcessing(true)

    try {
      await createPayment(promotion.id, selectedDuration, selectedPayment, paymentProof)
      toast.success("Payment submitted successfully! Your promotion will be reviewed and activated soon.")
      router.push("/promotions")
    } catch (error) {
      console.error("Error processing payment:", error)
      toast.error("Failed to process payment. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const selectedDurationData = durations.find((d) => d.months === selectedDuration)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Review your promotion details and choose payment method</p>
        </div>

        <div className="space-y-6">
          {/* Promotion Summary */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Promotion Summary</h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Title</p>
                  <p className="font-medium">{promotion.title}</p>
                </div>
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
                    Rp {promotion.min_price.toLocaleString("id-ID")} - Rp {promotion.max_price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                {promotion.images && promotion.images.length > 0 ? (
                  promotion.images
                    .slice(0, 2)
                    .map((image, index) => (
                      <Image
                        key={index}
                        src={image || "/placeholder.svg?height=100&width=120"}
                        alt={`Promotion Image ${index + 1}`}
                        width={120}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                    ))
                ) : (
                  <>
                    <Image
                      src="/placeholder.svg?height=100&width=120"
                      alt="Promotion Image 1"
                      width={120}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                    <Image
                      src="/placeholder.svg?height=100&width=120"
                      alt="Promotion Image 2"
                      width={120}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Duration Selection */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Choose Promotion Duration</h2>

              <RadioGroup
                value={selectedDuration.toString()}
                onValueChange={(value) => setSelectedDuration(Number.parseInt(value))}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {durations.map((duration) => (
                  <div key={duration.months} className="relative">
                    <RadioGroupItem
                      value={duration.months.toString()}
                      id={`duration-${duration.months}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`duration-${duration.months}`}
                      className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                        selectedDuration === duration.months
                          ? "border-green-600 bg-green-50 ring-2 ring-green-200"
                          : "border-gray-200"
                      }`}
                    >
                      <span
                        className={`text-lg font-bold ${
                          selectedDuration === duration.months ? "text-green-600" : "text-gray-700"
                        }`}
                      >
                        {duration.months} Months
                      </span>
                      <span className="text-lg font-bold text-gray-900 mt-2">
                        Rp {duration.price.toLocaleString("id-ID")}
                      </span>
                      <span
                        className={`text-sm mt-1 ${
                          selectedDuration === duration.months ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {duration.savings}
                      </span>
                      {selectedDuration === duration.months && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

              <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
                <div className="space-y-4">
                  {/* QRIS Option */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="flex items-center space-x-3 p-4 hover:bg-gray-50">
                      <RadioGroupItem value="qris" id="qris" />
                      <Label htmlFor="qris" className="flex items-center cursor-pointer flex-1">
                        <Smartphone className="w-6 h-6 mr-3 text-blue-600" />
                        <span className="font-medium">QRIS (Quick Response Code Indonesian Standard)</span>
                      </Label>
                    </div>

                    {selectedPayment === "qris" && (
                      <div className="px-4 pb-4 border-t bg-gray-50">
                        <div className="mt-4 text-center">
                          <p className="text-sm text-gray-600 mb-4">Scan QR code below with your mobile banking app</p>
                          <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
                            <Image
                              src="/placeholder.svg?height=200&width=200&text=QRIS+Code"
                              alt="QRIS Code"
                              width={200}
                              height={200}
                              className="mx-auto"
                            />
                          </div>
                          <p className="text-lg font-bold text-green-600 mt-4">
                            Total: Rp {selectedDurationData?.price.toLocaleString("id-ID")}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">Valid for 24 hours</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bank Transfer Option */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="flex items-center space-x-3 p-4 hover:bg-gray-50">
                      <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                      <Label htmlFor="bank-transfer" className="flex items-center cursor-pointer flex-1">
                        <CreditCard className="w-6 h-6 mr-3 text-green-600" />
                        <span className="font-medium">Bank Transfer</span>
                      </Label>
                    </div>

                    {selectedPayment === "bank-transfer" && (
                      <div className="px-4 pb-4 border-t bg-gray-50">
                        <div className="mt-4 space-y-4">
                          <div className="bg-white p-4 rounded-lg border">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">Bank Name</span>
                              <div className="flex items-center">
                                <span className="font-medium">{bankDetails.bankName}</span>
                                <Image
                                  src="/placeholder.svg?height=30&width=60&text=BCA"
                                  alt="Bank Logo"
                                  width={60}
                                  height={30}
                                  className="ml-2"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">Account Number</span>
                              <div className="flex items-center">
                                <span className="font-mono font-medium">{bankDetails.accountNumber}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(bankDetails.accountNumber, "account")}
                                  className="ml-2 h-8 w-8 p-0"
                                >
                                  {copiedText === "account" ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <span className="text-sm text-gray-600">Account Name</span>
                              <span className="font-medium">{bankDetails.accountName}</span>
                            </div>

                            <div className="flex items-center justify-between border-t pt-4">
                              <span className="text-sm text-gray-600">Transfer Amount</span>
                              <div className="flex items-center">
                                <span className="text-lg font-bold text-green-600">
                                  Rp {selectedDurationData?.price.toLocaleString("id-ID")}
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    copyToClipboard(selectedDurationData?.price.toString() || "", "amount")
                                  }
                                  className="ml-2 h-8 w-8 p-0"
                                >
                                  {copiedText === "amount" ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                            <p className="font-medium text-blue-800 mb-1">Transfer Instructions:</p>
                            <ol className="list-decimal list-inside space-y-1 text-blue-700">
                              <li>Transfer the exact amount to the account above</li>
                              <li>Keep your transfer receipt</li>
                              <li>Your promotion will be activated within 1-2 business days</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Proof Upload */}
          {selectedPayment && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Upload Payment Proof</h2>

                {paymentProof ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <Image
                        src={paymentProof || "/placeholder.svg"}
                        alt="Payment Proof"
                        width={300}
                        height={200}
                        className="w-full max-w-sm mx-auto rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setPaymentProof("")}
                        className="absolute top-2 right-2"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload your payment receipt/proof</p>
                    <Button type="button" variant="outline" disabled={isUploadingProof}>
                      {isUploadingProof ? "Uploading..." : "Browse Files"}
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">JPG, PNG, PDF up to 5MB</p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleProofUpload}
                  className="hidden"
                />
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col space-y-4">
            <Button
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
              disabled={isProcessing || !selectedPayment || !paymentProof}
            >
              {isProcessing ? "Processing..." : "💳 Pay & Publish Promotion"}
            </Button>

            <Button variant="ghost" onClick={() => router.back()} className="w-full text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Edit Promotion
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
