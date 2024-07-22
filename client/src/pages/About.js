import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function About() {
    axios.defaults.withCredentials = true;
    const [getData,setGetData] = useState(false)
    console.log(getData+"asdsa")
    function parent(data){
      setGetData(data)
    }
    const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('username')){
      navigate("/home")
    }
  })
  return (
    <>
    <Navbar alert={parent}/>
    <div class="sm:flex items-center max-w-screen-xl">
    <div class="sm:w-1/2 p-10">
        <div class="image object-center text-center">
            <img src="rent.png"/>
        </div>
    </div>
    <div class="sm:w-1/2 p-5">
        <div class="text">
            <span class="text-gray-500 border-b-2 border-purple-600 uppercase">About us</span>
            <h2 class="my-4 font-bold text-3xl  sm:text-4xl ">Unlock the Road to Freedom with <span class="text-purple-600">Decentralized Car Rentals</span>
            </h2>
            <p class="text-gray-700 text-justify">
    At Drive Trust, we're revolutionizing the way you travel with our decentralized car rental platform. Say goodbye to traditional rental hassles and hello to seamless, secure, and transparent experiences. Welcome to the next generation of car rentals. Welcome to Drive Trust.
</p>
        </div>
    </div>
</div>
    </>
  )
}

export default About