import React from 'react'
import useUser from '../../hooks/users/useUsers'
import { Mainloader, UserListCard } from '../../components';

const AdminUser = () => {
    const { data: users, isLoading, isError, refetch } = useUser();
    if (isLoading) {
        return <Mainloader />
    }
    return (
        <div className='w-full flex flex-wrap items-center justify-evenly gap-4 '>
            {users && users?.length > 0 ? (
                <React.Fragment>
                    {users?.map(user => (
                        <UserListCard key={user?.uid} user={user} />
                    ))}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <p>No Data</p>
                </React.Fragment>
            )}

        </div>
    )
}

export default AdminUser
