import React, { useEffect, useState } from 'react'
import Navbar from '../utils/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CompanyOtp() {
const navigate = useNavigate()
useEffect(()=>{
  if(!localStorage.getItem("companyreg")){
    navigate("/companyregistration")
  }
})
const [number1,setNumber1] = useState("")
const [number2,setNumber2] = useState("")
const [number3,setNumber3] = useState("")
const [number4,setNumber4] = useState("")

    const numberOne = (event) => {
        setNumber1(event.target.value)
    }
    const numberTwo = (event) => {
        setNumber2(event.target.value)
    }
    const numberThree = (event) => {
        setNumber3(event.target.value)
    }
    const numberFour = (event) => {
        setNumber4(event.target.value)
    }

    const handle = async (e) => {
        e.preventDefault()
      
          try{
              const {data} = await axios.post("http://localhost:8000/companyotp", {
                      one: number1,
                      two: number2,
                      three: number3,
                      four: number4
                  }, {
                      headers: {
                          'Content-Type': "application/json"
                      }
                  });

                  if(data.ok){
                    localStorage.removeItem('companyreg')
                    navigate("/companylogin")
                  }
                
              }
                catch(err){
                  console.log(err)
                }
      
      }

  return (
    <>
    <Navbar/>
<div class="relative flex min-h-screen bg-gray-900 flex-col justify-center overflow-hidden bg-gray-50 py-12">
  <div class="bg-gray-100 relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div class="flex flex-col items-center justify-center text-center space-y-2">
        <div class="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div class="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email</p>
        </div>
      </div>

      <div>
        <form onSubmit={handle}>
          <div class="flex flex-col space-y-16">
            <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
              <div class="w-16 h-16 ">
                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" value={number1} onChange={numberOne}/>
              </div>
              <div class="w-16 h-16 ">
                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" value={number2} onChange={numberTwo}/>
              </div>
              <div class="w-16 h-16 ">
                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" value={number3} onChange={numberThree}/>
              </div>
              <div class="w-16 h-16 ">
                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" value={number4} onChange={numberFour}/>
              </div>
            </div>

            <div class="flex flex-col space-y-5">
              <div>
                <button class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                  Verify Account
                </button>
              </div>

              <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
              </div>
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

export default CompanyOtp