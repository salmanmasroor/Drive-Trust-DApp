import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Companies from "./pages/Companies";
import UserRegistration from "./pages/UserRegistration";
import UserLogin from "./pages/UserLogin";
import Page404 from "./pages/Page404";

import CompanyHome from "./views/CompanyHome";
import CompanyRegistration from "./views/CompanyRegistration";
import CompanyLogin from "./views/CompanyLogin";

import CompaniesCar from "./pages/CompaniesCar";
import CompanyCarUpload from "./views/CompanyCarUpload";
import Book from "./pages/Book";
import { useState,useEffect} from "react";
import CompanyManageCar from "./views/CompanyManageCar";
import CompanySearch from "./pages/CompanySearch";
import CompanyRequest from "./views/CompanyRequest";
import CompanyRequestNext from "./views/CompanyRequestNext";
import Admin from "./pages/Admin/Admin";
import AdminUser from "./pages/Admin/AdminUser";
import AdminCompanies from "./pages/Admin/AdminCompanies";
import AdminReward from "./pages/Admin/AdminReward";
import AdminProtected from "./pages/Admin/AdminProtected";
import ProtectedUser from "./pages/ProtectedUser";
import CompanyProtected from "./views/CompanyProtected";
import Otp from "./pages/Otp";
import CompanyOtp from "./views/CompanyOtp";
function App() {

  const [getData,setGetData] = useState(false)

  function parent(data){
    setGetData(data)
  }
  const close = ()=>
  {
    setGetData(false)
  }

  console.log(getData)
  
  

  return (
   <>
   <Router>
    <Routes> 
      <Route path="/signup" element={<ProtectedUser Component1={UserRegistration} />}></Route>
      <Route path="/otp" element={<ProtectedUser Component1={Otp} valuel={parent} /> }></Route>
      <Route path="/login" element={<ProtectedUser Component1={UserLogin} done={getData} />}></Route>
      <Route path="/" element={<ProtectedUser Component1={Home}/>}></Route>
      <Route path="/about" element={<ProtectedUser Component1={About}/>}></Route>
      <Route path="/companies" element={<ProtectedUser Component1={Companies}/>}></Route>
      <Route path="/companies/:id" element={<ProtectedUser Component1={CompaniesCar}/>}></Route>
      <Route path="/companies/:id/:carid/book" element={<ProtectedUser Component1={Book}/>}></Route>
      <Route path="/companies/search/:searchData" element={<ProtectedUser Component1={CompanySearch}/>}></Route>

      <Route path="/admin" element={<AdminProtected Component={Admin}/>}></Route>
      <Route path="/admin/users" element={<AdminProtected Component= {AdminUser}/>}></Route>
      <Route path="/admin/companies" element={<AdminProtected Component= {AdminCompanies}/>}></Route>
      <Route path="/admin/reward" element={<AdminProtected Component= {AdminReward}/>}></Route>


      <Route path='*' element={<Page404/>}></Route>

      <Route path="/home" element={<CompanyHome success={getData} ok={close}/>}></Route>
      <Route path="/companyregistration" element={<CompanyProtected Component2={CompanyRegistration}/>}></Route>
      <Route path="/companyotp" element={<CompanyOtp />}></Route>
      <Route path="/companylogin" element={<CompanyLogin alert={parent} />}></Route>
      
      <Route path="/uploadcar" element={<CompanyProtected Component2={CompanyCarUpload}/>}></Route>
      <Route path="/manage" element={<CompanyProtected Component2={CompanyManageCar}/>}></Route>
      <Route path="/request" element={<CompanyProtected Component2={CompanyRequest}/>}></Route>
      <Route path="/request/:carid" element={<CompanyProtected Component2={CompanyRequestNext}/>}></Route>

      
    </Routes>
   </Router>
   </>
  );
}

export default App;
