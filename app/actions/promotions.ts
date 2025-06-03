"use server"

import { createServerClient } from "@/lib/supabase"
import type { CreatePromotionData } from "@/types/promotion"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function getPromotions(filters?: {
  category?: string
  province?: string
  search?: string
  sortBy?: string
  includeExpired?: boolean
}) {
  const supabase = createServerClient()

  let query = supabase.from("promotions").select("*")

  // Only show active and non-expired promotions for public view
  if (!filters?.includeExpired) {
    query = query.eq("status", "active").gt("expires_at", new Date().toISOString())
  }

  if (filters?.category && filters.category !== "All Categories") {
    query = query.eq("category", filters.category)
  }

  if (filters?.province && filters.province !== "All Provinces") {
    query = query.eq("province", filters.province)
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }

  if (filters?.sortBy === "newest") {
    query = query.order("created_at", { ascending: false })
  } else if (filters?.sortBy === "oldest") {
    query = query.order("created_at", { ascending: true })
  } else if (filters?.sortBy === "price_low") {
    query = query.order("min_price", { ascending: true })
  } else if (filters?.sortBy === "price_high") {
    query = query.order("min_price", { ascending: false })
  } else {
    query = query.order("created_at", { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching promotions:", error)
    return []
  }

  return data || []
}

export async function getAllPromotionsForAdmin() {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("promotions")
    .select(`
      *,
      promotion_payments (
        id,
        duration_months,
        amount,
        payment_method,
        payment_status,
        payment_proof,
        created_at
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching promotions for admin:", error)
    return []
  }

  return data || []
}

export async function createPromotion(data: CreatePromotionData) {
  const supabase = createServerClient()

  // Set default duration to 3 months and calculate expiry
  const expiresAt = new Date()
  expiresAt.setMonth(expiresAt.getMonth() + 3)

  const promotionData = {
    ...data,
    duration_months: 3,
    expires_at: expiresAt.toISOString(),
    status: "pending",
  }

  const { data: promotion, error } = await supabase.from("promotions").insert([promotionData]).select().single()

  if (error) {
    console.error("Error creating promotion:", error)
    throw new Error("Failed to create promotion")
  }

  revalidatePath("/promotions")
  return promotion
}

export async function createPayment(
  promotionId: string,
  durationMonths: number,
  paymentMethod: string,
  paymentProof?: string,
) {
  const supabase = createServerClient()

  // Calculate amount based on duration
  const amount = durationMonths === 3 ? 300000 : durationMonths === 6 ? 540000 : 980000

  // Update promotion expiry based on selected duration
  const expiresAt = new Date()
  expiresAt.setMonth(expiresAt.getMonth() + durationMonths)

  // Update promotion with new duration and expiry
  await supabase
    .from("promotions")
    .update({
      duration_months: durationMonths,
      expires_at: expiresAt.toISOString(),
    })
    .eq("id", promotionId)

  const { data: payment, error } = await supabase
    .from("promotion_payments")
    .insert([
      {
        promotion_id: promotionId,
        duration_months: durationMonths,
        amount,
        payment_method: paymentMethod,
        payment_proof: paymentProof,
        payment_status: "pending",
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error creating payment:", error)
    throw new Error("Failed to create payment")
  }

  return payment
}

export async function adminLogin(username: string, password: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single()

  if (error || !data) {
    throw new Error("Invalid credentials")
  }

  // Set admin session cookie
  cookies().set("admin_session", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 hours
  })

  return { success: true }
}

export async function adminLogout() {
  cookies().delete("admin_session")
  revalidatePath("/admin")
}

export async function isAdminLoggedIn() {
  const adminSession = cookies().get("admin_session")
  return !!adminSession?.value
}

export async function updatePromotionStatus(promotionId: string, status: string) {
  const supabase = createServerClient()

  const { error } = await supabase
    .from("promotions")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", promotionId)

  if (error) {
    console.error("Error updating promotion status:", error)
    throw new Error("Failed to update promotion status")
  }

  revalidatePath("/admin")
  revalidatePath("/")
}

export async function deletePromotion(promotionId: string) {
  const supabase = createServerClient()

  const { error } = await supabase.from("promotions").delete().eq("id", promotionId)

  if (error) {
    console.error("Error deleting promotion:", error)
    throw new Error("Failed to delete promotion")
  }

  revalidatePath("/admin")
  revalidatePath("/")
}

export async function updatePaymentStatus(paymentId: string, status: string) {
  const supabase = createServerClient()

  const { error } = await supabase.from("promotion_payments").update({ payment_status: status }).eq("id", paymentId)

  if (error) {
    console.error("Error updating payment status:", error)
    throw new Error("Failed to update payment status")
  }

  revalidatePath("/admin")
}
