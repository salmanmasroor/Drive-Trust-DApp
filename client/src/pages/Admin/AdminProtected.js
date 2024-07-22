import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AdminProtected(props) {
    axios.defaults.withCredentials = true;
    const {Component} = props
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    let a1 = false;
    const fetchdata =  async ()=>{
      try{
        const {data} = await axios.get("http://localhost:8000/user")
       if(data.length === 0){
          navigate("/")
        }
        a1 = data[0].isAdmin
  
        console.log(a1)
        
        if(a1 === false){
          navigate("/")
        }
        setLoading(false);
      }catch(e){
       console.log(e)
      }
    }
    
    
  useEffect(()=>{
    fetchdata()
  },[])
  
    if (loading) {
      return  <div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
      <span class='sr-only'>Loading...</span>
       <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
     <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
     <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
   </div>
    }
  
  return (
    <>
    <Component/>
    </>
  )
}

export default AdminProtected