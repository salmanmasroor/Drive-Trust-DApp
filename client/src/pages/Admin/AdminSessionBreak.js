import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AdminSessionBreak() {
    const navigate = useNavigate()
    
    const fetchdata =  async ()=>{
      try{
        const {data} = await axios.get("http://localhost:8000/user")
        if(data.length === 0){
          navigate("/")
        }
      }catch(e){
        console.log(e)
       }
    }
  
      useEffect(()=>{
        fetchdata()
      },[])
  
}

export default AdminSessionBreak