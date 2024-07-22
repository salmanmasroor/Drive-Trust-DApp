import React, { useEffect,useState } from 'react'
import AdminNavbar from './AdminNavbar'
import AdminAchivements from './AdminAchivements'
import axios from 'axios'
import AdminSessionBreak from './AdminSessionBreak';

function Admin() {
  axios.defaults.withCredentials = true;

    

  return (
    <>
    <AdminSessionBreak/>
   <div className="flex h-screen bg-white">

    {/* Sidebar */}
    <AdminNavbar/>
    {/* Main content */}
    <div className="flex flex-col flex-1 overflow-y-auto">

        <AdminAchivements/>
        <div className='flex flex-wrap justify-center '>
            <div className='flex-2'>
          <div class="px-6 pt-6 2xl:container">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div>
            <div className='flex-1 pt-24'>
<img src='/dashboard.png'/>
</div>
    </div>
            <div>
            <div className='flex-1 pt-24'>
<img src='/analysis1.gif'/>
</div>
    </div>
    <div className='flex-1 pt-16'>
<img src='/analysis2.gif'/>
</div>
</div>
</div>
</div>


</div>
</div>
</div>

</>

  )
}

export default Admin