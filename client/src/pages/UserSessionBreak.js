import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function UserSessionBreak() {
    axios.defaults.withCredentials = true;
  const navigate = useNavigate()

    const isLogin =  async ()=>{
      try{
        const {data} = await axios.get("http://localhost:8000/user")
        if(data.length === 0){
          navigate("/login")
        }
      }catch(e){
        console.log(e)
       }
    }
  
      useEffect(()=>{
        isLogin()
      },[])
}

export default UserSessionBreak