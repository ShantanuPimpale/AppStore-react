import React from 'react'
import useUser from '../hooks/users/useUser';
import useApps from '../hooks/apps/useApps';
import { Mainloader } from '../components';
import { LeftContainer, RightContainer } from '../containers';

const Layout = () => {
  
    const {data:user,isLoading:userLoading,isError:userError,refetch:userFetch}=useUser();
    const {data:apps,isLoading:appsLoading,isError:appsError,refetch:appsRefetch}=useApps();

    if(userLoading || appsLoading){
      return <Mainloader/>
    }
  return (
    
   <main className='w-screen h-screen flex flex-1 items-start justify-start'>
    {/*Left section */}
  <LeftContainer/>    


    {/*right section */}
    <RightContainer/>
   </main>
  )
}

export default Layout
