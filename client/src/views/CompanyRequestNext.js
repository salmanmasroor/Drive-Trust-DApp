import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Web3, { Contract } from 'web3'
import Navbar from '../utils/Navbar'
import axios from 'axios'
function CompanyRequestNext() {
  const [getData,setGetData] = useState(false)
  console.log(getData+"asdsa")
  function parent(data){
    setGetData(data)
  }

    const web3 = new Web3("HTTP://127.0.0.1:7545")
    const contractAddress = "0xBDACbDfE42bA03e0e1d299b4570cB76a5d726002"
    const ABI =[
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_carid",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "_useraddress",
            "type": "address"
          }
        ],
        "name": "accept",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_carid",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_rentalDays",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_cnic",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_location",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "_offer",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_cnicpic",
            "type": "string"
          }
        ],
        "name": "setValue",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_carid",
            "type": "string"
          }
        ],
        "name": "rentedlist",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "useraddress",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "daysForRent",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              }
            ],
            "internalType": "struct CarRental.Detail[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_carid",
            "type": "string"
          }
        ],
        "name": "sendTime",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_carid",
            "type": "string"
          }
        ],
        "name": "showValues",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "email",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "rentalDays",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "cnic",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "location",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "offer",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "cnicpic",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "publicKey",
                "type": "address"
              }
            ],
            "internalType": "struct CarRental.User[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
    const navigate = useNavigate()
    const params = useParams();
    console.log(params.carid)
    const [requests,setRequests] = useState([])
    const fetchData = async () =>{
        try{
    
            const contract = new web3.eth.Contract(ABI, contractAddress);
            const showData = await contract.methods.showValues(params.carid).call();
            console.log(showData);
            setRequests(showData)
                
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        fetchData()
    },[])

    requests.map(data =>{
        console.log(data.name)
    })

    const [payment,setPayment] = useState(false)
    let a = localStorage.getItem('companyaccount')
    let companyName = localStorage.getItem('username')
    

    const b = params.carid
    const acceptRequest = async (UserPublicKey,offeramount,days,useremail) => {
      const contract = new web3.eth.Contract(ABI, contractAddress);
      const transactionParameters = {
          from: a, // Replace with the sender's address
          to: contractAddress, // Replace with your smart contract address
          data: contract.methods.accept(b,UserPublicKey).encodeABI(), // ABI-encoded function call data
      };
      try {
          const transactionHash = await window.ethereum.request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
          });
    
          // After successfully sending the transaction, make a request to update the car status
          try {
            const response = await axios.get(`http://localhost:8000/rented/${b}`);
            console.log(response.data);
            
          } catch (e) {
            console.log(e);
          }
          const offeramountInEther = parseFloat(offeramount*days);
          console.log(offeramountInEther)
          const offeramountInWei = web3.utils.toWei(offeramountInEther.toString(), "ether");
          
          await web3.eth.sendTransaction({
              from: UserPublicKey,
              to: a,
              value: offeramountInWei
          });
          
          const fivepercentInEther = 0.05 * offeramountInEther;
          const fivepercentInWei = web3.utils.toWei(fivepercentInEther.toString(), "ether");
          
      
          await web3.eth.sendTransaction({
              from: a,
              to: "0xf91Edabc961D50cd40Ee365feb23850be1A43B52",
              value: fivepercentInWei
          });
          setPayment(true)
      
          window.scrollTo({ top: 0, behavior: 'auto' })
          const formData = new FormData();
    
    // Append the image file to the FormData object
  
    // Append other form fields to the FormData object
    formData.append('companyName', companyName);
    formData.append('publicKey', a);
    formData.append('payment', fivepercentInEther);
    formData.append('useremail',useremail );

          const {data} = await axios.post("http://localhost:8000/record", formData, {
          headers: {
            'Content-Type': 'application/json' // Set the content type to multipart/form-data
          }
        });
        
        console.log(data)
        
       
      } catch (error) {
          console.error('Caught an error:', error);
      }
    };

    const closeModal = () => {
      navigate('/request')
    };
    
  return (
    <>
    <Navbar alert={parent}/>
    {payment ? 
    <>
    <div class="flex min-h-screen items-center justify-center bg-gray-100">
  <div class="rounded-lg bg-gray-50 px-16 py-14">
    <div class="flex justify-center">
      <div class="rounded-full bg-green-200 p-6">
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      </div>
    </div>
    <h3 class="my-4 text-center text-3xl font-semibold text-gray-700">Payment!!!</h3>
    <p class="w-[230px] text-center font-normal text-gray-600">Recieved</p>
    <button class="mx-auto mt-10 block rounded-xl border-4 border-transparent bg-orange-400 px-6 py-3 text-center text-base font-medium text-orange-100 outline-8 hover:outline hover:duration-300" onClick={closeModal}>OK</button>
  </div>
  </div>
  </>
  : <>
  <section className="bg-gray-100 py-10">
  <div className="flex flex-wrap mx-10">
    {requests.map((data, index) => (
      <div key={index} className="m-4">
        <div className="bg-white overflow-hidden shadow rounded-lg border w-96">
          <div className="flex justify-center items-center">
            <div className="p-5 w-80 h-64">
              <img
                src={"http://localhost:8000/upload/" + data.cnicpic}
                alt="User Image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-4 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.name}
                </dd>
              </div>
              <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.email}
                </dd>
              </div>
              <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Days for Rent</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {Number(data.rentalDays)} Days
                </dd>
              </div>
              <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Destination</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.location}
                </dd>
              </div>
              <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Offer</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {Number(data.offer)} ETH
                </dd>
              </div>
              <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Public Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-all">
                  {data.publicKey}
                </dd>
              </div>
              <div className="py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Request</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <button onClick={(e) => acceptRequest(data.publicKey,data.offer,data.rentalDays,data.email)} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
                    Accept
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
  </>

  }
    

    </>

  )
}

export default CompanyRequestNext