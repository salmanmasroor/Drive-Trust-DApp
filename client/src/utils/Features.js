import React from 'react'

function Features() {
  return (
    <>
       <div class="bg-blue-100 py-14">
    <h3 class="text-2xl tracking-widest text-blue-500 text-center">Services</h3>
    <h1 class="mt-8 text-center text-5xl text-blue-500 font-bold">Our Services</h1>

    <div class="md:flex md:justify-center md:space-x-8 md:px-14">
  
      <div class="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
        <div class="w-sm mt-12">
          <img class="w-64" src="company2.svg" alt="" />
          <div class="mt-12 text-blue-500 text-center">
            <h1 class="text-xl font-bold">Decentralized Trust</h1>
            <p class="mt-4 text-blue-500">Utilize blockchain technology to ensure trust and security in transactions and data management.</p>

          </div>
        </div>
      </div>
      <div class="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
        <div class="w-sm">
          <img class="w-64" src="company1.svg" alt="" />
          <div class="mt-4 text-blue-500 text-center">
            <h1 class="text-xl font-bold">Real-time Availability</h1>
            <p class="mt-4 text-blue-500">Instant updates on car availability and bookings, reducing wait times and maximizing utilization.</p>

          </div>
        </div>
      </div>

      <div class="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
        <div class="w-sm mt-12">
          <img class="w-64" src="company.svg" alt="" />
          <div class="mt-12 text-blue-500 text-center">
            <h1 class=" text-xl font-bold">Customer Satisfaction</h1>
            <p class="mt-4 text-blue-500">Focus on customer satisfaction through reliable service, prompt support, and easy communication channels.</p>

          </div>
        </div>
      </div>
    </div>
    
  </div>
    </>
  )
}

export default Features