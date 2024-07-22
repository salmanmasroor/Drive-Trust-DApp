import React, { useEffect, useState } from 'react'

function Hero(props) {
    let login = props.alertlogin
  return (
    <>
  <main class="dark:bg-gray-800 bg-white relative overflow-hidden ">
        
    <div class="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden lg:h-screen"  style={{
    backgroundImage: `url('')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

  }}>
    
        <div class="container mx-auto px-4  sm:px-12 flex flex-col relative py-16 lg:flex-row-reverse lg:justify-between">
            <div class="sm:w-full lg:w-4/5 lg:mt-2 flex flex-col relative z-20 mb-8 sm:mb-0 lg:mb-0 lg:order-2">
                <span class="w-20 h-2 bg-gray-800 dark:bg-white mb-4 sm:mb-10"></span>
                <h1 class="font-bebas-neue uppercase text-4xl sm:text-6xl font-black leading-tight dark:text-white text-gray-800">
                Welcome to <br class="sm:hidden"/> Drive Trust
                </h1>
                <p class="text-sm sm:text-base text-gray-700 dark:text-white mt-4">
                Drive Diversity, Unite Paths: Your Journey Starts Here!
                </p>
                <div class="flex mt-8">
                    <a href="/uploadcar" class="uppercase py-2 px-4 rounded-lg bg-blue-500 border-2 border-transparent text-white text-md mr-4 hover:bg-blue-400">
                        Get started
                    </a>
                  
                </div>
            </div>
{login ? <>
            <div id="toast-success"
                class="flex items-center justify-end absolute top-0 right-0 lg:-mr-12 lg:-mt-12 w-full max-w-xs p-4 mb-4 text-gray-500 bg-green-100 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 transform transition-transform duration-1000 ease-in-out lg-translate-x-full lg:-translate-x-11"
                role="alert">
                <div class="inline-flex   items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span class="sr-only">Check icon</span>
                </div>
                <div class="ml-3 text-sm font-normal">Login successfully.</div>
                <button type="button" onClick={props.ok}  class="bg-green-100  ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-teal-50 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
            </>:
        ""
}
            <div class="sm:w-full lg:w-2/5 relative flex justify-center lg:order-1 -mt-6">
          
                <img src="https://www.cars.com/images/research-illustration.png" class="max-w-xs md:max-w-xl"/>
            </div>
        </div>
       
    </div>
</main>

    </>
  )
}

export default Hero