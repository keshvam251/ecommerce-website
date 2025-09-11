import { ProductListSkeleton, ProductList } from "@/modules/productss/ui/components/product-list"
import { getQueryClient, trpc } from "@/trpc/server"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { Suspense } from "react"

interface Props {
  params: {
    subcategory: string
  }
}

const Page = async ({ params }: Props) => {
  const { subcategory } = params

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category:subcategory
    }),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={subcategory} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
