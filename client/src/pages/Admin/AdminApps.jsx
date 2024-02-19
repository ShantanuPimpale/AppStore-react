import React from 'react'
import { NewApp,ListOfApps } from '../../containers'



const AdminApps = () => {
  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-2'>
      {/*left section */}
     <NewApp></NewApp>

     {/* Right section */}
     <ListOfApps></ListOfApps>
    </div>
  )
}

export default AdminApps
