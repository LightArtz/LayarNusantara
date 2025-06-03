import Layout from "@/components/layout/layout"
import { createServerClient } from "@/lib/supabase"
import PaymentPage from "./payment-page"
import { notFound } from "next/navigation"

export default async function Payment({ params }: { params: { id: string } }) {
  const supabase = createServerClient()

  const { data: promotion, error } = await supabase.from("promotions").select("*").eq("id", params.id).single()

  if (error || !promotion) {
    notFound()
  }

  return (
    <Layout>
      <PaymentPage promotion={promotion} />
    </Layout>
  )
}
