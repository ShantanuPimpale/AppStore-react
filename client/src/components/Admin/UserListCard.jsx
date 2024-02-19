import React from 'react'
import { Avatar } from '../../assets'
import useUsers from '../../hooks/users/useUsers'
import { updateUserDataToCloud } from '../../Api'
import { toast } from 'react-toastify'

const UserListCard = ({ user }) => {
    const { data: users, isLoading, isError, refetch } = useUsers();
    const updateTheUserRole = async (role) => {
        await updateUserDataToCloud({ _id: user?.uid, role: role }).then((data) => {
            toast.success("User Role Updated Successfully!!");
            refetch();
        });
    };

    return (<div className='p-4 border border-zinc-700 rounded-md flex flex-col item-center justify-center gap-3'>
        <img src={user?.picture ? user.picture : Avatar} className="w-24 h-24 object-cover rounded-md" alt="" />

        <p className='text-xl font-semibold'>{user?.name}</p>
        <p className='text-base font-semibold'>Role : {user?.role}</p>

        {user?.role === 'admin' ? (
            <button className='tex-sm font-semibold px-3 py-1 bg-zinc-600 rounded-md cursor-pointer' onClick={() => updateTheUserRole("member")}>
                Mark as Member
            </button>
        ) : (
            <button className='tex-sm font-semibold px-3 py-1 bg-zinc-600 rounded-md cursor-pointer' onClick={() => updateTheUserRole("admin")}>
                Mark as Admin
            </button>
        )}
    </div>
    )
}

export default UserListCard
