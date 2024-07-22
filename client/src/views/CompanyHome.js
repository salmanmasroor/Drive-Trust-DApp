import React,{useEffect, useState} from 'react'
import Navbar from '../utils/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Hero from '../utils/Hero';
import Footer from '../utils/Footer';
import Features from '../utils/Features';

function CompanyHome(props) {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [getData,setGetData] = useState(false)
  console.log(getData+"asdsa")
  function parent(data){
    setGetData(data)
  }

  let next = props.success;
  useEffect(()=>{
    let login = localStorage.getItem('username')
    if(!login){
        navigate("/companylogin")
    }
})
console.log(next+"ssd")
  return (
    <>
    <Navbar alert={parent}/>
    <Hero alertlogin={next} ok={props.ok}/>
    <Features/>
 


  <section id="works" class="relative bg-white py-10 sm:py-16 lg:py-24">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-4xl text-blue-500 font-extrabold mx-auto md:text-6xl lg:text-5xl">How does it work?</h2>
        </div>
        <div class="relative mt-12 lg:mt-20">
            <div class="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28"><img alt="" loading="lazy" width="1000" height="500" decoding="async" data-nimg="1" class="w-full" style={{ color: 'transparent' }} src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"/>
            </div>
            <div class="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                <div>
                    <div
                        class="flex items-center justify-center w-16 h-16 mx-auto bg-blue-500 border-2 border-gray-200 rounded-full shadow">
                        <span class="text-xl font-semibold text-white">1</span>
                    </div>
                    <h3 class="mt-6 text-xl  text-blue-500 font-semibold leading-tight md:mt-10">Upload Car Detail</h3>
                    <p class="mt-4 text-base text-gray-400 md:text-lg">
                        Car Information
                    </p>
                </div>
                <div>
                    <div
                        class="flex items-center justify-center w-16 h-16 mx-auto bg-blue-500 border-2 border-gray-200 rounded-full shadow">
                        <span class="text-xl font-semibold text-white">2</span>
                    </div>
                    <h3 class="mt-6 text-xl text-blue-500 font-semibold leading-tight md:mt-10">Manage Cars</h3>
                    <p class="mt-4 text-base text-gray-400 md:text-lg">
                        Upadate and Delete Cars
                    </p>
                </div>
                <div>
                    <div
                        class="flex items-center justify-center w-16 h-16 mx-auto bg-blue-500 border-2 border-gray-200 rounded-full shadow">
                        <span class="text-xl font-semibold text-white">3</span>
                    </div>
                    <h3 class="mt-6 text-xl text-blue-500 font-semibold leading-tight md:mt-10">Requests</h3>
                    <p class="mt-4 text-base text-gray-400 md:text-lg">
                        Handle User Request
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
style={{ background: 'radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)' }}>
    </div>
</section>
  <Footer/>
    </>
  )
}

export default CompanyHome