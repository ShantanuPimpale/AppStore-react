import React, { useState } from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6'
import { Flag, Logo } from '../assets';
import { ClientMenus } from '../utils/helpers';
import {ClientListMenuItem } from '../components';

const LeftContainer = () => {
    const [isClose, setIsClose] = useState(true);
    return (
        <div className={`${isClose ? "w-20 px-3" : "w-80"} py-3 relative bg-third border-r border-secondary h-full duration-200 flex flex-col items-center justify-start`}>
            {/* absolute action button */}
            <div className='absolute -right-3 px-1 py-4 bg-gradient-to-br from-heroPrimary to-heroSecondary rounded-md cursor-pointer group' onClick={() => setIsClose(!isClose)}>
                <FaChevronRight className={`text-sm text-white duration-100 ${!isClose && "rotate-[540deg]"}`} />
            </div>

            {/*top section */}
            <div className={`w-full  duration-150 inline-flex items-center justify-between gap-2 ${!isClose && "px-6"}`}>
                {/*Image container */}
                <div className='flex items-center'>
                    <img src={Logo} className='w-12 min-w-[48px] object-contain h-auto block float-left mr-5 ' alt="" />
                    <p className={`font-serif text-textPrimary font-extrabold uppercase tracking-[5px] ${isClose && "scale-0"} duration-200`}>Oasis
                        <span className='text-heroPrimary block'>
                            Bet </span></p>
                </div>

                {/*Loacation change */}
                <div className={`${isClose && "scale-0"} duration-100 relative`}>
                    <div className='flex items-center justify-center'>
                        <img src={Flag} className='w-12 h-auto object-contain ' alt="" />
                        <div className='absolute -bottom-1 -right-2 w-4 h-4 flex items-center justify-center rounded-full bg-secondary'>
                            <FaChevronDown className='text-[10px] text-gray-50'/>
                        </div>
                    </div>
                </div>
            </div>

            {/*Menu section */}
            <ul className={`pt-1 w-full ${!isClose && "px-2"}`}>
                {ClientMenus.map((menu ,index)=>(
                    <React.Fragment key={index}>
                       <ClientListMenuItem menu={menu} isClose={isClose}/>     
                    </React.Fragment>
                ))}
            </ul>

        </div>
    )
}

export default LeftContainer
