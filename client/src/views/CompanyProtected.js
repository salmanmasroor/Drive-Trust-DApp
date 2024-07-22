import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


function CompanyProtected(props) {
    axios.defaults.withCredentials = true;
    const {Component2} = props
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const fetchdata =  async ()=>{
      try{
        const {data} = await axios.get("http://localhost:8000/user")
        console.log(data)

        if(data[0].isAdmin === true){
            navigate("/admin")
          }
        if(data[0].isAdmin === false){
            navigate("/")
          }
          
      /* if(data.length === 0){
          navigate("/")
        }
        
        a1 = data[0].isAdmin
  
        console.log(a1)
        
    useEffect(()=>{
    let login = localStorage.getItem('user')
    if(!login){
        navigate("/login")
    }})
        
        setLoading(false);*/
      }catch(e){
       console.log(e)
      }finally{
        setLoading(false);
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
    <div>
        <Component2/>
    </div>
  )
}

export default CompanyProtected