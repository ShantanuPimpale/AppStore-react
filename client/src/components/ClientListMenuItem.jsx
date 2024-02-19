import { AnimatePresence,motion } from 'framer-motion';
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6';

const ClientListMenuItem = ({ menu, isClose }) => {
    const [isSubMenu, setIsSubMenu] = useState(false);
    return (
        <React.Fragment>
            <li className={`group flex items-start gap-x-4 cursor-pointer p-2 px-3 bg-Primary hover:bg-[#282828] hover: shadow-lg rounded-md w-full ${menu.spacing ? "mt-12" : "mt-4"} ${isSubMenu && "bg-[#282828]"} `}
                onClick={() => setIsSubMenu(!isSubMenu)}
            >
                <span className={`w-8 h-8 flex items-center justify-center rounded-full bg-third group-hover:bg-gradient-to-br group-hover:from-heroPrimary group-hover:to-heroSecondary ${isSubMenu && "bg-gradient-to-br from-heroPrimary to-heroSecondary"}`} >
                    {<menu.Icon className={`text-xl block float-left text-textPrimary hover:text-textSecondary ${isSubMenu && "text-textSecondary"} ${isSubMenu && "text-textSecondary"}`} />}
                </span>
                <span className={`${isClose && "hidden"} text-textPrimary group-hover: text-textSecondary text-base font-medium flex-1 duration-200 `}>{menu.title}</span>
                {menu.submenu && !isClose && (
                    <FaChevronDown className={`text-textPrimary duration-200 ${isSubMenu && "text-textSecondary rotate-180"}`} />
                )}
            </li>
            <AnimatePresence>
                    {menu.submenu && isSubMenu && !isClose && (
                        <motion.ul 
                        initial={{opacity:0,y:10}}
                        animate={{opacity:1,y:0}}
                        exit={{opacity:0,y:-10}}
                        className='bg-primary mt-2 rounded-md'>
                            {menu.subMenuItems.map((item,index)=>(
                                <li className={`group flex items-center gap-x-4 cursor-pointer py-3 px-4 w-full`}>
                                    <span>
                                       <menu.Icon className="text-xl block float-left text-textPrimary group-hover:text-heroPrimary"/>
                                    </span>
                                    <span className={`text-textPrimary group-hover:text-heroPrimary text-base font-medium flex-1 duration-200 ${isClose && "hidden"}`}>
                                        {item.title}
                                    </span>
                                </li>
                            ))}
                        </motion.ul>
                    )}
            </AnimatePresence>
        </React.Fragment>
    )
}

export default ClientListMenuItem
