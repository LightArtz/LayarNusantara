import Layout from "@/components/layout/layout"
import { getPromotions } from "../actions/promotions"
import PromotionsPageContent from "./promotions-page-content"

export default async function PromotionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const filters = {
    category: searchParams.category as string,
    province: searchParams.province as string,
    search: searchParams.search as string,
    sortBy: searchParams.sortBy as string,
  }

  const promotions = await getPromotions(filters)

  return (
    <Layout>
      <PromotionsPageContent initialPromotions={promotions} />
    </Layout>
  )
}
