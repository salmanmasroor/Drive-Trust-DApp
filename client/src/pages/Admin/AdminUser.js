import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import AdminAchivements from './AdminAchivements'
import axios from 'axios'
import AdminSessionBreak from './AdminSessionBreak'
function AdminUser() {
  axios.defaults.withCredentials = true;
  
    const [userData, setUserData] = useState([]);

    const fetchData = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/userdata");
            console.log(data);
            setUserData(data); // Store data in state variable
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    const handleDelete = () => {
      // Handle delete action here
      console.log('Deleting...');
      // Close the modal after deletion
      closeModal();
    };
  
  return (
    <>
    <AdminSessionBreak/>
     <div className="flex h-screen bg-white">

{/* Sidebar */}
<AdminNavbar/>
{/* Main content */}
<div className="flex flex-col flex-1 overflow-y-auto">

<AdminAchivements/>



{/*users */}

<div class="overflow rounded-lg border border-gray-200 shadow-md m-5">
  <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Email</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Password</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
    {userData.map(data => (

      <tr class="hover:bg-gray-50">
        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
  <div key={data._id} class="relative h-10 w-10">
    <img
      class="h-full w-full rounded-full object-cover object-center"
      src={"http://localhost:8000/upload/" + data.profilepic}
      alt=""
    />
    <span class="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
  </div>
  <div class="text-sm flex items-center">
    <div class="font-medium text-gray-700 ">{data.username}</div>
  </div>
</th>

      
        <td class="px-6 py-4">{data.email}</td>
        <td class="px-6 py-4">
          <div class="flex gap-2">
            {data.password}
          </div>
        </td>
        <td class="px-6 py-4">
          <div class="flex justify-end gap-4">
          <a x-data="{ tooltip: 'Delete' }" href="#" onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
          x-tooltip="tooltip"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </a>

      {showModal && (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
          <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
            <div className="flex justify-end p-2">
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 pt-0 text-center">
              <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this car?</h3>
              <button onClick={handleDelete} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                Yes, I'm sure
              </button>
              <a href="#" onClick={closeModal} className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center" data-modal-toggle="delete-user-modal">
                No, cancel
              </a>
            </div>
          </div>
        </div>
      )}
         
          </div>
        </td>
      </tr>
    ))}
    </tbody>
  </table>
</div>


</div>
</div>
    </>
  )
}

export default AdminUser