import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <>
<section class="bg-gray-900 text-white py-20 px-4">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div class="md:w-1/2 mb-10 md:mb-0">
            <h2 class="text-6xl font-bold leading-tight mb-4"><span class="text-purple-500">Decentralized</span> Car Rental System</h2>
            <p class="text-lg mb-4">Drive the Future, Share the Ride: Decentralized Car Rental for Everyone!</p>
            <Link to="/companies"><button class="bg-white text-purple-600 font-bold py-3 px-6 rounded hover:bg-purple-600 hover:text-white mt-4 ml-32 md:mt-0 md:ml-0">Get Started</button></Link>

        </div>
        <div class="md:w-1/2">
            <img src="draw.svg" alt="Hero Image" class=" w-full rounded-xl"/>
        </div>
    </div>
</section>
    </>
  )
}

export default Hero