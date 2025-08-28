interface props {
    children :React.ReactNode
}
import React from 'react'
import {Navbar} from './navbar'
import { Footer } from 'react-day-picker'




const layout = ({children}:props) => {
  return (
    <div>
     <Navbar/>
     <div className='flex-1 bg-[#f4f4f0]'>
        {children}
     </div>
   <Footer/>
    </div>
  )
}

export default layout
