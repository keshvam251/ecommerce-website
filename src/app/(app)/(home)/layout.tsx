import { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from '@/trpc/server'




import {Navbar} from './navbar'
import { Footer } from 'react-day-picker'
import { SearchFilter } from './Search-Filter'
import{Searchfilterloading}from'./Search-Filter/index'

interface props {
    children :React.ReactNode
}



const layout = async ({children}:props) => {

  const queryClient=getQueryClient();
   void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions()
  
  );
   


  return (
    <div>
     <Navbar/>
     <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Searchfilterloading/>}>
     <SearchFilter />

      </Suspense>

     </HydrationBoundary>
     <div className='flex-1 bg-[#f4f4f0]'>
        {children}
     </div>
   <Footer/>
    </div>
  )
}

export default layout
