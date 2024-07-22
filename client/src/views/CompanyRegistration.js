import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import Navbar from '../utils/Navbar'

function CompanyRegistration() {
  const navigate = useNavigate()
  
  useEffect(()=>{
    let login = localStorage.getItem('username')
    if(login){
    navigate("/home")
  }
  })

    const [companyName,setCompanyName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [publicKey,setPublicKey] = useState("")
    const [logo, setLogo] = useState(null); 

    const [companyNameError,setcompanyNameError] = useState("");
    const [emailError,setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("")
    const [publicKeyError,setPublicKeyError] = useState("")
    const [picError,setPicError] = useState("")

    const companyNameChange = (e)=>{
      const company_name = e.target.value;
      setCompanyName(company_name.charAt(0).toUpperCase() + company_name.slice(1))
    }
    const emailChange = (e)=>{
        setEmail(e.target.value)
    }
    const passwordChange = (e)=>{
        setPassword(e.target.value)
    }
    const publicKeyChange = (e)=>{
        setPublicKey(e.target.value)
    }
    
    const handleLogoChange = (e) => {
      setLogo(e.target.files[0]); // Update logo state with the selected file
  }

    const handle = async(e)=>{
        e.preventDefault()

        setcompanyNameError("")
        setEmailError("")
        setPasswordError("")
        setPublicKeyError("")
        setPicError("")

        const formData = new FormData();
        formData.append('logo', logo);
        formData.append('companyName', companyName);
        formData.append('email',email)
        formData.append('password',password)
        formData.append('publicKey',publicKey)
        

        
        try{
          const {data} = await axios.post("http://localhost:8000/companyregistration", formData, {
            headers:{
              'Content-Type' : 'multipart/form-data',
            }
          });
            if(data.error){
              for(var i=0;i<data.error.length;i++){
                if(data.error[i].path === "companyName"){
                    setcompanyNameError(data.error[i].msg)
                }
                else if(data.error[i].path === "email"){
                    setEmailError(data.error[i].msg)
                }
                else if(data.error[i].path === "password"){
                    setPasswordError(data.error[i].msg)
                }
                else if(data.error[i].path === "publicKey"){
                  setPublicKeyError(data.error[i].msg)
              }
            }
            }
            else if(data.msg1){
                setEmailError(data.msg1)
            }
            else if(data.company_error){
              setcompanyNameError(data.company_error)
            }
            else if(data.wrong_publickey){
              setPublicKeyError(data.wrong_publickey)
            }
            else if(data.pic){
              setPicError(data.pic)
            }
            else if (data.ok){
              localStorage.setItem("companyreg",data.companyreg)
                navigate("/companyotp")
            }
            
        }
        catch(e){
            console.log(e)
        }
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
	<div class="flex md:w-1/2 justify-center py-10 items-center bg-gray-50">
		<form class="bg-gray-50" onSubmit={handle}>
			<h1 class="text-gray-800 font-bold text-2xl mb-1">Company</h1>
			<p class="text-sm font-normal text-gray-600 mb-7">Registration</p>
			<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
						clip-rule="evenodd" />
				</svg>
				<input class="pl-2 bg-gray-50 outline-none border-none" type="text" name="company_name" id="" placeholder="Company Name" value={companyName} onChange={companyNameChange} required/>
      </div>
      <p class="m-1 text-sm text-red-500">{companyNameError}</p>
				<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
					</svg>
					<input class="pl-2 bg-gray-50 outline-none border-none "  type="text" name="public_key" id="" placeholder="Public Key" value={publicKey} onChange={publicKeyChange} required/>
      </div>
      <p class="m-1 text-sm text-red-500">{publicKeyError}</p>
					<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
							viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
						</svg>
						<input class="pl-2 bg-gray-50 outline-none border-none" type="email" name="company_email" id="" placeholder="Email Address" value={email} onChange={emailChange} required/>
      </div>
      <p class="m-1 text-sm text-red-500">{emailError}</p>
						<div class="flex items-center border-2 py-2 px-3 rounded-2xl">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
								fill="currentColor">
								<path fill-rule="evenodd"
									d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
									clip-rule="evenodd" />
							</svg>
							<input class="pl-2 bg-gray-50 outline-none border-none" type="password" name="" id="" placeholder="Password" value={password} onChange={passwordChange} required/>  
      </div>
      <p class="mt-1 ml-1 text-sm text-red-500">{passwordError}</p>
      <div class="mx-auto max-w-xs">
  <label for="example3" class="mt-3 mb-1 block text-sm font-medium text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">Upload Logo</label>
  <input id="example3" type="file" accept="image/png, image/jpg, image/jpeg" onChange={handleLogoChange} class="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 hover:file:bg-blue-700 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60" />
  <p class="m-1 text-sm text-red-500">{picError}</p>
</div>
							<button type="submit" class="block w-full bg-blue-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Register</button>
							<Link to="/companylogin"><span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">Log In</span></Link>
		</form>
	</div>
</div>
    </>
  )
}

export default CompanyRegistration