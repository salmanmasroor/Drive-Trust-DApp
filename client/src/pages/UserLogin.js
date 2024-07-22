import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

function UserLogin({done}) {

    const navigate = useNavigate()
    useEffect(()=>{
      if(localStorage.getItem('username')){
        navigate("/home")
      }if(localStorage.getItem('user')){
        navigate("/")
      }
    })
  
    const [emaillogin,setEmailLogin] = useState("")
    const [passlogin,setPassLogin] = useState("")
    const [emailError,setEmailError] = useState("")
    const [passError,setPassError] = useState("")
    let registered = done
    const emailloginChange = (event) => {
        setEmailLogin(event.target.value)
    }
    const passloginChange = (event) => {
        setPassLogin(event.target.value)
    }
    const handle = async (e) => {
      e.preventDefault()
      setEmailError("")
      setPassError("")
        try{
            const {data} = await axios.post("http://localhost:8000/userlogin", {
                    emaillogin: emaillogin,
                    passlogin: passlogin
                }, {
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
              
                if(data.email){
                  setEmailError(data.msg)
                }
                else if(data.password){
                  setPassError(data.msg)
                }
                else if(data.user){
                
                if(data.isAdmin){
                    navigate('/admin')
                }
                else{
                    localStorage.setItem('user',data.user)
                    navigate('/')
                }
                
              }
            }
              catch(err){
                console.log(err)
              }

    }

  return (
    <>
       <Navbar/>
       {registered ? (
  <div className="font-regular ml-64 mt-2  absolute block w-3/5 rounded-lg bg-green-500 p-4 text-base leading-5 text-white opacity-100">
    Successfully Registered
  </div>
) : (
  null
)}

<div class="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
    <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1000px' }}>

        <div class="md:flex w-full">
            <div class="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
                <img src="electric-car.gif" class="mt-12"/>
            </div>
            <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
                <div class="text-center mb-10">
                    <h1 class="font-bold text-3xl text-gray-900">Login</h1>
                    <p>Enter your information to log in</p>
                </div>
                <form onSubmit={handle}>
                <div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Email</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input type="email" name="loginemail"class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@gmail.com" value={emaillogin} onChange={emailloginChange} required/>
                            </div>
                            <p className={`text-red-500`}>{emailError}</p>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-12">
                            <label for="" class="text-xs font-semibold px-1">Password</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input type="password" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" value={passlogin} onChange={passloginChange} required/>
                            </div>
                            <p className={`text-red-500`}>{passError}</p>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">LOG IN</button>
                        </div>
                    </div>
                    <div class="flex justify-center -mx-3">
                    <Link to="/signup" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Sign Up</Link>   
                    </div>
                    <div class="flex justify-center -mx-3">
                    <Link to="/companylogin" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Company Login</Link>   
                    </div>
                    


                </div>
                </form>
            </div>
        </div>
    </div>
</div>

    </>
  )
}

export default UserLogin