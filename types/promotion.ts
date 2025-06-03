export interface Promotion {
  id: string
  title: string
  category: string
  province: string
  city: string
  min_price: number
  max_price: number
  description: string
  images: string[]
  whatsapp?: string
  instagram?: string
  status: string
  duration_months: number
  created_at: string
  updated_at: string
}

export interface PromotionPayment {
  id: string
  promotion_id: string
  duration_months: number
  amount: number
  payment_method: string
  payment_status: string
  created_at: string
}

export interface CreatePromotionData {
  title: string
  category: string
  province: string
  city: string
  min_price: number
  max_price: number
  description: string
  images: string[]
  whatsapp?: string
  instagram?: string
}
