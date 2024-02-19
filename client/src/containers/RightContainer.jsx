import React from 'react'
import { Outlet } from "react-router-dom"
import { Header } from '../components'

const RightContainer = () => {
  return (
    <div className='flex-1'>
      {/*Header swtion */}
      <Header/>
      <section className='w-full h-[calc(100vh-80px)]'>
        <Outlet>

        </Outlet>
      </section>
    </div>
  )
}

export default RightContainer