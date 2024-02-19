import React from 'react'
import {PuffLoader} from "react-spinners"

const Mainloader = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <PuffLoader color="#ff9E01" size={80}/>
    </div>
  )
}

export default Mainloader
