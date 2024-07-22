import React,{useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'
import UserSessionBreak from './UserSessionBreak'


function Companies() {

  axios.defaults.withCredentials = true;
  const navigate = useNavigate()
  const [getData,setGetData] = useState(false)
  console.log(getData+"asdsa")
  function parent(data){
    setGetData(data)
  }

  
  const [companyData,setCompanyData] = useState([])
  const [companySearchData,setCompanySearchData] = useState([])

  const companySearch = (e) => {
    e.preventDefault()
    setCompanySearchData(e.target.value)
  }

  const fetchdata =  async ()=>{
  
    try{
      const {data} = await axios.get("http://localhost:8000/companies")
      if(data.error){
        navigate("*")
      }
      setCompanyData(data)
      console.log(companyData)
    }catch(e){
     console.log(e)
    }
  }

  const search = async (e) => {
    e.preventDefault()
    const searchData = encodeURIComponent(companySearchData)
    try {
      const { data } = await axios.get(`http://localhost:8000/search/${companySearchData}`);
      console.log(data.session)
      navigate(`/companies/search/${searchData}`)
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(()=>{
    fetchdata()
    console.log(companySearchData)
  },[])
  return (
    <>
    <UserSessionBreak/>
    <Navbar alert={parent}/>
  
    <section className="bg-gray-100 py-6 py-md-5 py-xl-84">
  <div class="container mt-8">
    <div class="mx-auto max-w-7xl">
      <div class="md:flex md:justify-center">
        <div class="md:w-3/4 lg:w-2/3 xl:w-1/2">
        <h2 class="mb-4 text-2xl text-center text-black font-bold">Search Car Companies</h2>
          <p class="text-secondary mb-5 text-center leading-relaxed text-lg text-black">Discover our innovative, experienced and dedicated to helping you find the perfect car company to collaborate with.</p>
          <hr className="w-3/4 mx-auto mb-5 border-black "/>
        </div>
      </div>
    </div>
  </div>

<form onSubmit={search}>
<label
    class="mx-auto my-10 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
    for="search-bar">
    <input id="search-bar" placeholder="Search Company"
        class="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white" value={companySearchData} onChange={companySearch}/>
    <button
        class="bg-purple-700 w-full md:w-auto px-6 py-3  text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70 ">
        
        <div class="relative">

            <div
                class="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                <svg class="opacity-0 animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                        stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
            </div>

            <div class="bg-purple-700 flex items-center transition-all opacity-1 valid:"><span
                    class="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                    Search
                </span>
            </div>

        </div>
        
    </button>
</label>
</form>

 
    <div class="flex flex-wrap ml-16  ">
    {companyData.map(data => (
    <div key={data._id} class="bg-purple-500 bg-gradient-to-br from-gray-900 to-gray-900 via-purple-500 to-indigo-800 bg-gradient-stops-0 bg-gradient-stops-50 bg-gradient-stops-100   bg-opacity-10 rounded-lg overflow-hidden shadow-2xl xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 mx-4 mb-6 hover:translate-y-[-10px] transition duration-300">
      <Link to={"/companies/"+data.companyName} style={{ textDecoration: 'none' }}>
      <img class=" bg-white h-56 w-full object-cover object-end" src={"http://localhost:8000/upload/"+data.logo} alt="Home in Countryside" />
      <ul class=" divide-y rounded  py-2 px-3 text-white w ">
      <li class="flex items-center py-3 text-sm">
        <span>Name</span>
        <span class="ml-auto"><span class="rounded-full bg-purple-800 py-1 px-2 text-sm font-small text-white">{data.companyName}</span></span>
      </li>
      <li class="flex items-center py-3 text-sm">
        <span>Location</span>
        <span class="ml-auto">Faisalabad</span>
      </li>
      <li class="flex items-center py-3 text-sm">
        <span>Rating</span>
        <span class="ml-auto">
	<div class="flex items-center">
		<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
			</path>
		</svg>
		<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
			</path>
		</svg>
		<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
			</path>
		</svg>
		<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
			</path>
		</svg>
		<svg class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
			</path>
		</svg>
	</div>
</span>
      </li>
    </ul>

    </Link>
    </div>
  ))}
  </div>
</section>
<div className='pt-1 bg-gray-100'>
<Footer/>
</div>

{/*<div className='bg-gray-900'>
  <hr></hr>
<Footer/>
</div>
*/}

</>
  )
}

export default Companies