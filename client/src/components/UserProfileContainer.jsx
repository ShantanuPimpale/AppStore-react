import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../assets';
import useUser from "../hooks/users/useUser";
import { BsCurrencyRupee } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa6";
import { Menus, signOutTheuser } from '../utils/helpers';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { dropdownMenu } from '../Animation';
import { PuffLoader } from 'react-spinners';

const UserProfileContainer = () => {
    const { data: user, isLoading: userLoading, isError, refetch } = useUser();
    const queryClient = useQueryClient();
    const [isHovered, setisHovered] = useState(false);
    const navigate = useNavigate(); // Get the navigate function

    const handleSignOut = () => {
        signOutTheuser(queryClient); // Call sign out function
        navigate('/', { replace: true }); // Navigate to home screen
    };

    if (userLoading) {
        return <PuffLoader color="#ff9E01" size={40} />
    }

    return (
        <div className='flex items-center justify-center gap-2 cursor-pointer relative'>
            {/*name content */}
            <div className='flex flex-col items-start justify-start gap-1'>
                <h2 className='text-lg font-bold text-textPrimary capitalize'>{user?.name}</h2>
                <div className='flex items-center justify-center gap-2'>
                    <div className='w-6 h-6 rounded-full flex items-center justify-center bg-secondary border-2 border-gray-600'>
                        <BsCurrencyRupee className='text-sm text-heroSecondary' />
                    </div>
                    {user?.walletBalance ? (
                        <React.Fragment>
                            <p className='text-lg font-semibold text-heroPrimary'>{user?.walletBalance}</p>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <p className="text-lg font-semibold text-heroPrimary">0</p>
                        </React.Fragment>
                    )}
                </div>
            </div>
            {/*Image content */}
            <div className='w-16 h-16 rounded-full p-1 flex items-center justify-center relative bg-gradient-to-b from-heroPrimary to bg-heroSecondary  ' onMouseEnter={() => setisHovered(true)} >
                <img src={user?.picture ? user?.picture : Avatar} className='w-full h-full object-cover rounded-full' alt="" />
                <div className='w-4 h-4 rounded-full bg-secondary absolute bottom-1 right-0 flex items-center justify-center border border-gray-600'>
                    <FaChevronDown className='text-[10px] text-textSecondary' />
                </div>
                {/* drop down section */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            {...dropdownMenu}
                            className=" absolute top-20 right-0 bg-secondary shadow-md flex flex-col items-center justify-center w-64 px-3 py-2 gap-4 rounded-md z-50" onMouseLeave={() => setisHovered(false)}>
                            {Menus && Menus.map((menu) => (
                                <React.Fragment>
                                    {menu.isAdmin ? (<Link  to={menu.uri}  className='PY-2 PX-1 font-semibold hover:text-heroSecondary' key={menu.id}>{menu.menu}</Link>) : (
                                        <Link to={menu.uri} className='PY-2 PX-1 font-semibold hover:text-heroSecondary' key={menu.id}>{menu.menu}</Link>
                                    )}
                                </React.Fragment>
                            ))}
                            <button type='button' onClick={handleSignOut} className='px-4 py-2 w-full rounded-md bg-texPrimary text-primary active:scale-95 transition-all ease-in-out duration-150'>signout</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default UserProfileContainer;
