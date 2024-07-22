import React, { useEffect, useState } from 'react';
import Navbar from '../utils/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CompanyManageCar() {
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
      const { data } = await axios.get(`http://localhost:8000/manage/${carid}/delete`);
      
    } catch (e) {
      console.log(e);
    }
  };

  const openModal = (carId) => {
    setCarIdToDelete(carId);
    setShowModal(true);
    document.body.classList.add('overflow-y-hidden');
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.classList.remove('overflow-y-hidden');
  };

  const closeModalDelete = () => {
    deleteOne(carIdToDelete);
    closeModal();
    fetchdata()
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
      <div class="container mt-8">
    <div class="mx-auto max-w-7xl">
      <div class="md:flex md:justify-center">
        <div class="md:w-3/4 lg:w-2/3 xl:w-1/2">
          <h2 class="mb-4 text-2xl text-center text-black">Manage Cars</h2>
         
          <hr className="w-3/4 mx-auto mb-5 border-black "/>
        </div>
      </div>
    </div>
  </div>

      <div className="container mx-auto">
  <div className="flex flex-wrap -mx-4">
    {cardata.map(user => (
      user.car.map(car => (
        <div key={car._id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4 relative">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              className="w-full h-64 object-cover object-center"
              src={"http://localhost:8000/upload/" + car.carImage}
              alt="Car Image"
            />
            <div className="p-4">
              <table className="w-full ">
                <tbody>
                  <tr>
                  <td className="font-semibold">Car Name:</td>
                    <td>{car.carName}</td>
                   
                  </tr>
                  <tr>
                  <td className="font-semibold">Car Model:</td>
                    <td>{car.carModel}</td>
                  </tr>
                  <tr>
                  <td className="font-semibold">Car Engine:</td>
                    <td>{car.engine}</td>
                  </tr>
                  <tr>
                  <td className="font-semibold">Car Price:</td>
                    <td>{car.price} ETH</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-center mt-5">
              <button onClick={() => openModal(car._id)}
        class="text-red-500 hover:text-red-800 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        </span>
        <span class="hidden md:inline-block">Delete</span>
    </button>
            
</div>

            </div>
          </div>
        </div>
      ))
    ))}
  </div>
</div>


      {showModal && (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
          <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
            <div className="flex justify-end p-2">
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 pt-0 text-center">
              <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to delete this car?</h3>
              <button onClick={closeModalDelete} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                Yes, I'm sure
              </button>
              <a href="#" onClick={closeModal} className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center" data-modal-toggle="delete-user-modal">
                No, cancel
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CompanyManageCar;
