 import React, { useState,useEffect,useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../utils/Navbar';


function CompanyCarUpload() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const [getData,setGetData] = useState(false)
    console.log(getData+"asdsa")
    function parent(data){
      setGetData(data)
    }
  
  
    useEffect(()=>{
      let login = localStorage.getItem('username')
      if(!login){
          navigate("/companylogin")
      }
  })
      const [carName,setCarName] = useState("")
      const [carModel,setCarModel] = useState("")
      const [transmission,setTransmission] = useState("")
      const [fuelEfficiency,setFuelEfficiency] = useState("")
      const [engine,setEngine] = useState("")
      const [seats,setSeat] = useState("")
      const [price,setPrice] = useState("")
      const [carPic,setCarPic] = useState("")
      const [upload,setUpload] = useState("")
  
      const [carNameError,setCarNameError] = useState("");
      const [carModelError,setCarModelError] = useState("");
      const [transmissionError,setTransmissionError] = useState("")
      const [seatError,setSeatError] = useState("")
      const [engineError,setEngineError] = useState("")
      const [fuelEfficiencyError,setFuelEfficiencyError] = useState("")
      const [carPicError,setCarPicError] = useState("")
      const [priceError,setPriceError] = useState(false)
  
      const carNamechange = (e)=>{
          setCarName(e.target.value)
      } 
      const carModelChange = (e)=>{
          setCarModel(e.target.value)
      }
      const carpicChange = (e) => {
          setCarPic(e.target.files[0])
      }
      const handleSeatChange = (e) => {
        setSeat(e.target.value);
      };

      const handle = async (e)=>{
          e.preventDefault()
          setCarNameError("")
          setCarModelError("")
          setTransmissionError("")
          setEngineError("")
          setSeatError("")
          setFuelEfficiencyError("")
          setPriceError("")
          setCarPicError('')
          const formData = new FormData()
          formData.append("carName",carName)
          formData.append("carModel",carModel)
          formData.append("transmission",transmission)
          formData.append("fuelEfficiency",fuelEfficiency)
          formData.append("engine",engine)
          formData.append("seats",seats)
          formData.append("price",price)
          formData.append("carpic",carPic)
          try{
              const {data}= await axios.post("http://localhost:8000/uploadcar",formData,{
                  headers:{
                 
                      "Content-Type": "multipart/form-data"
                  }
              })
              if(data.save){
                setUpload(true);
                window.scrollTo({ top: 0, behavior: 'auto' })
                setCarName("")
          setCarModel("")
          setTransmission("")
          setEngine("")
          setSeat("")
          setFuelEfficiency("")
          setPrice("")
          setCarPic("")
              }
              if(data.error){
                for(var i=0;i<data.error.length;i++){
                  if(data.error[i].path === "carName"){
                      setCarNameError(data.error[i].msg)
                  }
                  else if(data.error[i].path === "carModel"){
                      setCarModelError(data.error[i].msg)
                  }
                  else if(data.error[i].path === "transmission"){
                      setTransmissionError(data.error[i].msg)
                  }
                  else if(data.error[i].path === "fuelEfficiency"){
                    setFuelEfficiencyError(data.error[i].msg)
                  }
                  else if(data.error[i].path === "seats"){
                    setSeatError(data.error[i].msg)
                }
                  else if(data.error[i].path === "engine"){
                    setEngineError(data.error[i].msg)
                }
                else if(data.error[i].path === "price"){
                  setPriceError(data.error[i].msg)
              }
                
              }
              }
              else if(data.carpic){
                setCarPicError(data.carpic)
              }
          }catch(e){
              console.log(e)
          }
  
      }


      const close = ()=>
      {
        setUpload(false)
      }
  return (
    <>
    <Navbar alert={parent}/>
 
    <div class="bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-no-repeat" style={{ backgroundImage: 'url(blob1.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center' }}>
   {upload ?
    <>
    <div id="toast-success"
                class="flex items-center justify-end absolute top-0 right-0 lg:-mr-72 mt-20 lg:w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 transform transition-transform duration-1000 ease-in-out lg:-translate-x-full lg:-translate-x-12 -mr-1 -translate-x-12"
                role="alert">
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span class="sr-only">Check icon</span>
                </div>
                <div class="ml-3 text-sm font-normal">Details uploaded successfully.</div>
                <button type="button" onClick={close} class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>

    </>:""
}
    <div class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden" >
    <div class="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase">
    Upload Your Car Details
    </div>
    <form class="py-4 px-6" onSubmit={handle}>
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="name">
            Car Name
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="car_name" type="text" value={carName} onChange={carNamechange} placeholder="Enter your name" required/>
                <p class="text-red-500">{carNameError}</p>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="email">
                Car Model
            </label>
            <select
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="car_model" name="car_model" value={carModel} onChange={carModelChange}>
    <option value="">Select the Model</option> 
    {Array.from({ length: 24 }, (_, index) => (
                      <option key={2000 + index} value={2000 + index}>{2000 + index}</option>
    ))}
</select>
<p class="text-red-500">{carModelError}</p>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="phone">
            Transmision
            </label>
            <div className="flex gap-x-4">
        <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
          <input
            className="peer hidden"
            type="radio"
            name="transmissionRadio"
            id="radioManual"
            value="Manual"
            checked={transmission === 'Manual'}
            onChange={(e)=>setTransmission(e.target.value)}
          />
          <label
            className="peer-checked:border-blue-400 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
            htmlFor="radioManual"
          >
            {' '}
          </label>
          <div className="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2"></div>
          <span className="pointer-events-none z-10">Manual</span>
        </div>
        <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
          <input
            className="peer hidden"
            type="radio"
            name="transmissionRadio"
            id="radioAutomatic"
            value="Automatic"
            checked={transmission === 'Automatic'}
            onChange={(e)=>setTransmission(e.target.value)}
          />
          <label
            className="peer-checked:border-blue-400 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
            htmlFor="radioAutomatic"
          >
            {' '}
          </label>
          <div className="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2"></div>
          <span className="pointer-events-none z-10">Automatic</span>
        </div>
      </div>
    <p class="text-red-500">{transmissionError}</p>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="date">
            Mileage
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fuelEfficiency" name="fuelEfficiency" type="text" value={fuelEfficiency} onChange={(e)=>setFuelEfficiency(e.target.value)} placeholder="Enter Car Fuel Efficiency" required/>
                <p class="text-red-500">{fuelEfficiencyError}</p>

        </div>
        
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="service">
                Engine
            </label>
            <select
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="service" name="engine" value={engine} onChange={(e)=>setEngine(e.target.value)}>
                <option value="">Select the Car Engine</option>
                <option value="Petrol">Petrol</option>
                <option value="Diseal">Diseal</option>
            </select>
            <p class="text-red-500">{engineError}</p>
        </div>
        <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="date">
          Seat Capacity
        </label>
        <div class="flex gap-x-4">
          <div class="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
            <input
              class="peer hidden"
              type="radio"
              name="seatRadio"
              id="radio4"
              value="4"
              checked={seats === '4'}
              onChange={handleSeatChange}
            />
            <label
              class="peer-checked:border-blue-400 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
              for="radio4"
            >
              {' '}
            </label>
            <div class="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2"></div>
            <span class="pointer-events-none z-10">4 Seats</span>
          </div>
          <div class="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
            <input
              class="peer hidden"
              type="radio"
              name="seatRadio"
              id="radio5"
              value="5"
              checked={seats === '5'}
              onChange={handleSeatChange}
            />
            <label
              class="peer-checked:border-blue-400 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
              for="radio5"
            >
              {' '}
            </label>
            <div class="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2"></div>
            <span class="pointer-events-none z-10">5 Seats</span>
          </div>
        </div>

    <p class="text-red-500">{seatError}</p>
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="name">
            Price
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price" type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter the price" required/>
            <p class="text-red-500">{priceError}</p>  
        </div>
       
        <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
            Upload Car Pic
            </label>
  <input id="example3" type="file"  onChange={carpicChange} class="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 hover:file:bg-gray-800 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60" />
  <p class="text-red-500">{carPicError}</p>
        </div>
        <div class="flex items-center justify-center mb-4">
            <button
                class="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                type="submit" >
                 Upload
            </button>
        </div>

    </form>
</div>
</div>

    </>
  )
}

export default CompanyCarUpload