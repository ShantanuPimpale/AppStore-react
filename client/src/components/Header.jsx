import React, { useState } from 'react'
import { Rewards } from '../assets'
import UserProfileContainer from './UserProfileContainer'

const Header = () => {
    const [searchTearm,setSearchTearm]=useState("");
    return (
        <div className='w-full flex items-center justify-between bg-third pl=6'>
            <img src={Rewards} className='w-64 hidden lg:block object-cover' alt="" />

            {/*Search  Bar*/}
            <div className='flex items-center justify-center bg-[#2a2a2a] rounded-full shadow-lg px-4 py-3'>
                <input type="text" placeholder='Search for Apps..' value={searchTearm} onChange={(e)=>{
                    setSearchTearm(e.target.value)
                }} className='bg-transparent outline-none border-none text-base font-medium text-textSecondary placeholder:text-textPrimary tracking-wider lg:w-64 2xl:w-96' />
            </div>

            {/*Profile Section */}
            <UserProfileContainer/>
        </div>
    )
}

export default Header
