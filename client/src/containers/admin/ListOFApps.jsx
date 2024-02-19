import React from 'react'
import useApps from '../../hooks/apps/useApps'
import { PuffLoader } from 'react-spinners';
import {AdminAppListcard} from '../../components';


const ListOFApps = () => {
  const { data:apps, isLoading, isError, refetch } = useApps();

  if (isLoading) {
    return <PuffLoader color="#ff9E01" size={40} />
  }
  return (
    <div className='w-full h-auto grid grid-cols-1 lg:grid-cols-2 gap-4'>
     {apps?.length > 0 && apps ? 
     (<React.Fragment>
      {apps.map((app)=>(
        <AdminAppListcard key={app?._id} data={app}/>
      ))}
     </React.Fragment>)
     :
     (<React.Fragment>
      <p>No data</p>
     </React.Fragment>)}
    </div>
  )
}

export default ListOFApps
