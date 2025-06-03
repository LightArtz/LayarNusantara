import { redirect } from "next/navigation"
import { isAdminLoggedIn, getAllPromotionsForAdmin } from "../actions/promotions"
import AdminDashboard from "./admin-dashboard"

export default async function AdminPage() {
  const isLoggedIn = await isAdminLoggedIn()

  if (!isLoggedIn) {
    redirect("/admin/login")
  }

  const promotions = await getAllPromotionsForAdmin()

  return <AdminDashboard promotions={promotions} />
}
