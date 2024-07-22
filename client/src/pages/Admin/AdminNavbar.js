import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function AdminNavbar() {
    const navigate = useNavigate()
    const [adminName,setAdminName] = useState("")
    const [profilepic,setProfilePic] = useState("")
    
    const fetchdata =  async ()=>{
  
        try{
          const {data} = await axios.get("http://localhost:8000/user")
          setAdminName(data[0].username)
          console.log(data[0].profilepic)
          setProfilePic(data[0].profilepic)
        }catch(e){
         console.log(e)
        }
      }
      
      
    useEffect(()=>{
      fetchdata()
    },[])

    const logout = async () => {
        try{
          const {data} = await axios.get("http://localhost:8000/logout")
          if(data.logout){
            navigate("/login")
          }
        }catch(e){
         console.log(e)
        }
      }

  return (
    <>
   {/* Sidebar */}
   <div className="relative min-h-screen flex flex-col antialiased bg-gray-50 text-gray-800">
        <div className="relative top-0 left-0 w-64 bg-gray-900 h-full shadow-lg">
            <div className="flex items-center pl-6 h-20 border-b border-gray-800">
                <img   src={"http://localhost:8000/upload/"+profilepic} alt="" className="rounded-full h-10 w-10 flex items-center justify-center mr-3 border-2 border-blue-500" />
                <div className="ml-1">
                    <p className="ml-1 text-md font-medium tracking-wide truncate text-gray-100 font-sans">{adminName}</p>
                    <div className="badge">
                        <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-800 bg-blue-100 rounded-full">Admin</span>
                    </div>
                </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
                <ul className="flex flex-col py-6 space-y-1">
                    <li className="px-5">
                        <div className="flex flex-row items-center h-8">
                            <div className="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Dashboard</div>
                        </div>
                    </li>
                    {/* Other list items */}
                    <li>
                <Link to="/admin" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                    <span class="inline-flex justify-center items-center ml-4">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    </span>
                    <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Home</span>
                </Link>
            </li>
            <li>
                <Link to="/admin/users" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                    <span class="inline-flex justify-center items-center ml-4">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                    </span>
                    <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Users</span>

                </Link>
            </li>
            <li>
                <Link to="/admin/companies" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                    <span class="inline-flex justify-center items-center ml-4">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                    </span>
                    <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Companies</span>

                </Link>
            </li>
       
            <li>
                <Link to="/admin/reward" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6">
                    <span class="inline-flex justify-center items-center ml-4">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                    </span>
                    <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Reward</span>

                </Link>
            </li>
            <li class="px-5">
            <div class="flex flex-row items-center h-8">
                <div class="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase">Settings</div>
            </div>
            </li>
          
         
            <li>
            <a href="#" onClick={logout} class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-red-500 pr-6">
                <span class="inline-flex justify-center items-center ml-4 text-red-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </span>
                <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">Logout</span>
            </a>
            </li>
                </ul>
            </div>
        </div>
    </div>

    </>
  )
}

export default AdminNavbar