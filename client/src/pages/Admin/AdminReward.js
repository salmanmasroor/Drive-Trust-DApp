import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react'
import AdminNavbar from "./AdminNavbar";
import AdminAchivements from "./AdminAchivements";

import AdminSessionBreak from "./AdminSessionBreak";

function AdminReward() {
  axios.defaults.withCredentials = true;

    const [paymentData, setPaymentData] = useState([]);
    const fetchData = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/paymentdata");
            console.log(data);
            setPaymentData(data.reverse()); // Store data in state variable
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

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
       <th scope="col" class="px-6 py-4 font-medium text-gray-900">Company Name</th>
       <th scope="col" class="px-28 py-4 font-medium text-gray-900">Public Key</th>
       <th scope="col" class="px-16 py-4 font-medium text-gray-900">Date & Time</th>
       <th scope="col" class="px-10 py-4 font-medium text-gray-900">Payment Recieved</th>
       <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
     </tr>
   </thead>
   <tbody class="divide-y divide-gray-100 border-t border-gray-100">
   {paymentData.map(data => (

<tr class="hover:bg-gray-50">
  <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
    <div key={data._id} class="relative pt-2 h-10 w-15">

      <div class="font-medium text-gray-700">{data.companyName}</div>

    </div>
  
  </th>
  <td class="px-10 py-4">
    <span
      class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
    >
      <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
      {data.publicKey}
    </span>
  </td>
  <td class="px-10 py-4">{data.date.toString().slice(0,10)} - {data.date.toString().slice(11,19) }</td>
  <td class="px-8 py-4">
    <div class="flex gap-2 flex-wrap justify-center">
    <span class="rounded-full bg-green-100 py-1 px-4 text-sm font-small text-green-600">{data.payment.slice(0,8)} Eth</span>
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

export default AdminReward