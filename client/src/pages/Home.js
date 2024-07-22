import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import axios from 'axios'
import Features from '../components/Features'
import CallToAction from '../components/CallToAction'
import Portfolio from '../components/Portfolio'
import { useNavigate } from 'react-router-dom'
function Home() {
  const [getData,setGetData] = useState(false)
  console.log(getData+"asdsa")
  function parent(data){
    setGetData(data)
  }
  axios.defaults.withCredentials = true;
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('username')){
      navigate("/home")
    }
  })
  return (
    <>
   <Navbar alert={parent}/>
   <Hero/>
   <Features/>
   <Portfolio/>

   <Footer/>
    </>
    
  )
}

export default Home