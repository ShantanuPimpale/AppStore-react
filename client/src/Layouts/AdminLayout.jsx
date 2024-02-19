import React, { useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import useUser from '../hooks/users/useUser';
import { AdminHeader, Mainloader } from '../components';
import { FaHouseChimney } from 'react-icons/fa6';

const AdminLayout = () => {
  const { data: user, isLoading: userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && (user?.role === 'member' || !user)) {
      navigate("/", { replace: true });
    }
  }, [user]);

  if (userLoading) {
    return <div><Mainloader/></div>;
  }

  return (
    <div className='w-screen h-auto flex flex-col items-center justify-start px-4 py-3'>
    <AdminHeader />
    {/* Navigational container */}
    <div className='w-full h-auto flex items-center justify-center px-4 py-4 gap-12'>

      {/* Navigational links */}
      <Link to={"/"}>
        <FaHouseChimney className='text-2xl hover:text-heroPrimary' />
      </Link>

      <NavLink 
        className={({isActive})=>`text-lg font-semibold ${isActive && "text-heroPrimary"}`}
        to={"/admin/home"}>Dashboard
      </NavLink>

      <NavLink 
        className={({isActive})=>`text-lg font-semibold ${isActive && "text-heroPrimary"}`}
        to={"/admin/apps"}>Apps
      </NavLink>
      
      <NavLink 
        className={({isActive})=>`text-lg font-semibold ${isActive && "text-heroPrimary"}`}
        to={"/admin/users"}>Users
      </NavLink>

    </div>
    <Outlet></Outlet>
  </div>
);
}

export default AdminLayout;
