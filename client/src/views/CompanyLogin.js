import React,{useState,useEffect} from 'react'
import Navbar from '../utils/Navbar'
import axios from 'axios'
import { Link, useNavigate} from 'react-router-dom'

function CompanyLogin(props) {

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
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

      }catch(e){
       console.log(e)
      }finally{
        setLoading(false);
    }
    }
    
    
  useEffect(()=>{
    fetchdata()
  },[])

    const [loginemail,setEmail] = useState("")
    const [loginpassword,setPassword] = useState("")
    const [emailError,setEmailError] = useState("")
    const [passError,setPassError] = useState("")
    useEffect(()=>{
      let login = localStorage.getItem('username')
      if(login){
      navigate("/home")
    }
    })
    
    const loginEmailChange = (e) => {
      setEmail(e.target.value)
    }
    const loginPassChange = (e) => {
      setPassword(e.target.value)
    }
    const handle = async (e) =>{
      e.preventDefault()
      setEmailError("")
      setPassError("")
      const formData = new FormData()

      formData.append('loginemail',loginemail)
      formData.append('loginpassword',loginpassword)
    
      try{
        const {data} = await axios.post("http://localhost:8000/login",formData,{
          headers:{
            "Content-Type" : "application/json"
          }
        })
        if(data.email){
          setEmailError(data.msg)
        }
        else if(data.password){
          setPassError(data.msg)
        }
        else if(data.username){
          localStorage.setItem('username', data.username);
          localStorage.setItem('publicKey', data.publicKey)
          navigate("/home")
          props.alert(true)
        }
    
      }catch(e){
        console.log(e)
      }
    }
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
    <Navbar/>
    <div class="h-screen md:flex">
	<div
		class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-500 to-blue-700 i justify-around items-center hidden">
		<div className='mb-8'>
			<h1 class="text-white font-bold text-3xl font-sans">Join Our Community </h1>
			<p class="text-white mt-1">Unlock Opportunities, Connect, and Grow Together!</p>

		</div>
		<div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
	</div>
	<div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
		<form class="bg-white" onSubmit={handle}>
			<h1 class="text-gray-800 font-bold text-2xl mb-1">Company</h1>
			<p class="text-sm font-normal text-gray-600 mb-7">Log In</p>
			
					<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
						</svg>
						<input class="pl-2 outline-none border-none" type="email" name="login_companyemail" id="" placeholder="Email Address" value={loginemail} onChange={loginEmailChange}/>
      </div>
      <p class="m-1 text-sm text-red-500">{emailError}</p>
						<div class="flex items-center border-2 py-2 px-3 rounded-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
								fill="currentColor">
								<path fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clip-rule="evenodd" />
							</svg>
							<input class="pl-2 outline-none border-none" type="password" name="" id="" placeholder="Password" value={loginpassword} onChange={loginPassChange}/>  
      </div>
      <p class="mt-1 ml-1 text-sm text-red-500">{passError}</p>
      
							<button type="submit" class="block w-full bg-blue-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Login</button>
							<Link to="/companyregistration"><span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Registration</span></Link>
		</form>
	</div>
</div>
    </>
  )
}

export default CompanyLogin