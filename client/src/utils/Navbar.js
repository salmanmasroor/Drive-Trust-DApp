import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import CompanyWallet from './CompanyWallet';
import axios from 'axios';

function Navbar({alert}) {
  let login = localStorage.getItem('username')
const navigate = useNavigate()
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isOpen, setIsOpen] = useState(false);
const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
};


  const logout = async () => {

    try{
      const {data} = await axios.get("http://localhost:8000/logout")
      if(data.logout){
        localStorage.clear()
        navigate("/companylogin")
      }
    }catch(e){
     console.log(e)
    }

  }
  
  
  return (
    <>
     <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <Link to="/home">
        <span className="m-1 inline-flex items-center">
        <svg className="mr-1 w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 784.37 1277.39">
          <polygon className="fill-current text-gray-600" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "/>
          <polygon className="fill-current text-gray-400" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "/>
          <polygon className="fill-current text-gray-700" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "/>
          <polygon className="fill-current text-gray-400" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 "/>
          <polygon className="fill-current text-gray-900" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 "/>
          <polygon className="fill-current text-gray-700" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 "/>
        </svg>
        <span className="text-2xl text-gray-600 font-light">DriveTrust</span>
      </span>
      </Link>
          <div className="flex items-center lg:order-2">
            <div className="hidden mt-2 mr-4 sm:inline-block">
              <span></span>
            </div>
            
            {login ? (
  <>
  <div className="flex items-center justify-between lg:order-2">
  <div className="hidden mt-2 mr-4 sm:inline-block">
    <span></span>
  </div>
  <CompanyWallet ok={alert}/>
  <button onClick={logout} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
    Logout
  </button>
  <button onClick={toggleMobileMenu}
    data-collapse-toggle="mobile-menu-2" type="button"
    className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    aria-controls="mobile-menu-2" aria-expanded={isMobileMenuOpen ? "true" : "false"}>
    <span className="sr-only">Open main menu</span>
    <svg className={`w-6 h-6 ${isMobileMenuOpen ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"></path>
    </svg>
    <svg className={`w-6 h-6 ${isMobileMenuOpen ? '' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"></path>
    </svg>
  </button>
  <div className="relative inline-block"></div>
</div>
<div className={`lg:mr-48 md:mr-48 flex items-center justify-center w-full lg:flex lg:w-auto lg:order-1 ${isMobileMenuOpen ? '' : 'hidden'}`} id="mobile-menu-2">
  <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
    <li key="home">
      <Link to="/home" className="block py-2 pl-3 pr-4 text-white bg-blue-500 rounded lg:bg-transparent lg:text-blue-500 lg:p-0 dark:text-white" aria-current="page">Home</Link>
    </li>
    <li key="about">
      <Link to="/uploadcar" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-500 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Upload Car</Link>
    </li>
    <li key="companies">
      <Link to="/manage" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-500 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Manage</Link>
    </li>
    <li key="companies">
      <Link to="/request" className="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-500 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Requests</Link>
    </li>
  </ul>
</div>
          
   
  </>
) : (
  <>
   
    <Link to="/login">
      <button className="ml-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">
        User Account
      </button>
    </Link>
    
  </>
)}
    

          </div>  
    </div>
      </nav>
    </>

  );
}

export default Navbar;