import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../../assets'
import UserProfileContainer from '../UserProfileContainer';
import AdminLayout from '../../Layouts/AdminLayout';

function AdminHeader() {


    return (
        <div className='w-full flex items-center justify-between'>
            {/* logo*/}
            <Link to={"/"}>
                <img src={Logo} className='w-16 h-auto object-contain' alt="" />
            </Link>
            
            {/*user profile section */}
            <UserProfileContainer />
        </div>
    )
}

export default AdminHeader
