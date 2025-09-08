'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import { Categories } from './categories'
import { SearchInput } from './search-input'
import { useParams } from 'next/navigation'
import { DEFAULT_BG_COLOR } from '@/modules/home/constants'
import BreadcrumbNavigation from './breadcrumbs-Navigation'

// ✅ Define proper types to avoid 'any'
interface Subcategory {
    slug: string;
    name: string;
}

interface CategoryData {
    slug: string;
    name: string;
    color?: string;
    subcategories?: Subcategory[];
}

export const SearchFilters = () => {
    const trpc = useTRPC()
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions())

    const params = useParams()
    const categoryParam = params.category as string | undefined
    const activeCategory = categoryParam || "all" // ✅ Fixed syntax error

    // ✅ Type assertion to avoid 'any'
    const typedData = data as CategoryData[]
    
    const activeCategoryData = typedData.find((category) => category.slug === activeCategory)

    const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR
    const activeCategoryName = activeCategoryData?.name || null

    const activeSubcategory = params.subcategory as string | undefined
    
    // ✅ More robust subcategory name finding with proper typing
    const activeSubcategoryName = activeSubcategory && activeCategoryData?.subcategories
        ? activeCategoryData.subcategories.find(
            (subcategory: Subcategory) => subcategory.slug === activeSubcategory
        )?.name || null
        : null

    return (
        <div 
            className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'
            style={{ backgroundColor: activeCategoryColor }}
        >
            <SearchInput />
            <div className='hidden lg:block'>
                <Categories data={typedData} />
                <BreadcrumbNavigation
                    activeCategory={activeCategory}
                    activeCategoryName={activeCategoryName}
                    activeSubcategoryName={activeSubcategoryName}
                />
            </div>
        </div>
    )
}

export const SearchFiltersSkeleton = () => {
    return (
        <div 
            className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'
            style={{ backgroundColor: "#F5F5F5" }}
        >
            <SearchInput disabled />
            <div className='hidden lg:block'>
                <div className='h-11'></div>
            </div>
        </div>
    )
}