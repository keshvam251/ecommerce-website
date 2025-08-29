import configPromise from '@payload-config'
import { getPayload } from 'payload'


import React from 'react'
import {Navbar} from './navbar'
import { Footer } from 'react-day-picker'
import { SearchFilter } from './Search-Filter'
import { Category } from '@/payload-types'
interface props {
    children :React.ReactNode
}



const layout = async ({children}:props) => {
const payload = await getPayload({
      config: configPromise,
    });
     const data = await payload.find({
    collection: 'categories',
    depth:2,
    pagination:false,
    where:{
      parent:{
        exists:false,
        
      },
    }
  });
 const formatedData = data.docs.map((doc: any) => ({
  ...doc,
  subcategories: (doc.subcategories?.docs ?? []).map((doc: Category) => {
    return ({
      ...(doc as Category),
    })
  }),
}))


  console.log(data,formatedData  )


  return (
    <div>
     <Navbar/>
     <SearchFilter data={formatedData}/>
     <div className='flex-1 bg-[#f4f4f0]'>
        {children}
     </div>
   <Footer/>
    </div>
  )
}

export default layout
