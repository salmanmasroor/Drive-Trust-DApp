
import React, { useEffect, useState } from 'react';
import Navbar from '../utils/Navbar';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

function CompanyRequest() {
    axios.defaults.withCredentials = true;
const navigate = useNavigate();

const [getData,setGetData] = useState(false)
console.log(getData+"asdsa")
function parent(data){
  setGetData(data)
}


useEffect(() => {
  let login = localStorage.getItem('username');
  if (!login) {
    navigate("/companylogin");
  }
}, []);

const [cardata, setCarData] = useState([]);
const [showModal, setShowModal] = useState(false);
const [carIdToDelete, setCarIdToDelete] = useState(null);

const fetchdata = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/manage");
    setCarData(data);
  } catch (e) {
    console.log(e);
  }
};

useEffect(() => {
  fetchdata();
}, []);

const deleteOne = async (carid) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/manage/${carid}/delete`,fetchdata());
  } catch (e) {
    console.log(e);
  }
};


const closeModal = () => {
  setShowModal(false);
  document.body.classList.remove('overflow-y-hidden');
};

const handleEscKeyPress = (event) => {
  if (event.keyCode === 27) {
    closeModal();
  }
};

document.addEventListener('keydown', handleEscKeyPress);


  return (
    <>
    <Navbar alert={parent}/>
      <div className="container mx-auto">
      <div class="container mt-8">
    <div class="mx-auto max-w-7xl">
      <div class="md:flex md:justify-center">
        <div class="md:w-3/4 lg:w-2/3 xl:w-1/2">
          <h2 class="mb-4 text-2xl text-center text-black">Requests</h2>
          <p class="text-secondary mb-5 text-center leading-relaxed text-lg text-black">Our user request handling for car rentals focuses on swift response times and tailored solutions.</p>
          <hr className="w-3/4 mx-auto mb-5 border-black "/>
        </div>
      </div>
    </div>
  </div>
  <div className="flex flex-wrap mx-4">
  {cardata.map(user => (
    user.car.map(car => (
      <article key={car._id} className="bg-gradient-to-br from-gray-900 to-gray-900 via-purple-500 to-indigo-800 bg-gradient-stops-0 bg-gradient-stops-50 bg-gradient-stops-100 mb-4 overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl" style={{ marginRight: '15px', marginBottom: '10px' }}>    <div className="relative h-48">
    <img src={"http://localhost:8000/upload/"+car.carImage} alt="" className="w-80 h-full object-cover" />
  
      </div>

      <div className="p-4 text-white ">
        <div className="flex list-none items-center justify-between px-0 pt-1 ">
        <div className="pb-6">
          <p  className="text-md  font-medium duration-500 ease-in-out">Name: {car.carName}</p>
        </div>
        <div className="pb-6">
          <p  className="text-md  font-medium duration-500 ease-in-out">Model: {car.carModel}</p>
        </div>
        </div>

        <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-6">
          <li className="mr-4 flex items-center text-left">
            <i className="mr-2 text-2xl text-green-600">
            <img src="/speedometer.svg" className="h-5 w-5" />  
            </i>
            <span className="text-sm">{car.fuelEfficiency}km</span>
          </li>

          <li className="mr-4 flex items-center text-left">
            <i className="mr-2 text-2xl text-green-600">
              <img src="/icon.svg" className="h-4 w-4" />            </i>
            <span className="text-sm">{car.engine}</span>
          </li>

          <li className="flex items-center text-left">
            <i className="mr-2 text-2xl text-green-600">
            <img src="/car-seat.svg" className="h-5 w-5" />  
            </i>
            <span className="text-sm">{car.seatCapacity} Seats</span>
          </li>
        </ul>

        <ul className="flex list-none items-center justify-between px-0 pt-1 ">
          <li className="text-left">
            <span className="text-sm text-white">Price</span>
            <p className="m-0 text-base font-medium">
              <svg className="mr-1 w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 784.37 1277.39">
                <polygon className="fill-current text-gray-600" fillRule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 " />
                <polygon className="fill-current text-gray-400" fillRule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 " />
                <polygon className="fill-current text-gray-700" fillRule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 " />
                <polygon className="fill-current text-gray-400" fillRule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 " />
                <polygon className="fill-current text-gray-900" fillRule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 " />
                <polygon className="fill-current text-gray-700" fillRule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 " />
              </svg>{car.price} ETH
            </p>
          </li>

          <li className="text-left mt-1">
            <p className="rounded-full bg-green-200 py-1 px-2 text-sm font-medium text-green-700">{car.transmission}</p>
          </li>

          <li className="text-left">
  <Link to={"/request/"+ car._id} style={{ textDecoration: 'none' }}>
    <button className="h-10 px-3  text-white bg-gray-900 rounded-lg focus:shadow-outline hover:bg-gray-700">
      Check Requests
    </button>
  </Link>
</li>

        </ul>
      </div>
    </article>
  ))
))}

        </div>
      </div>
    </>
  )
}

export default CompanyRequest