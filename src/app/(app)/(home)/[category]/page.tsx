import { ProductListSkeleton, ProductList } from "@/modules/productss/ui/components/product-list"
import { getQueryClient, trpc } from "@/trpc/server"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { Suspense } from "react"

interface Props {
  params: {
    category: string
  }
}

const Page = async ({ params }: Props) => {
  const { category } = params

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category,
    }),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={category} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
