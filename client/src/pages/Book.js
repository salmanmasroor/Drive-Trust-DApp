import React,{useState,useEffect} from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Web3, { Contract } from 'web3'
import UserSessionBreak from './UserSessionBreak'


function Book() {
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
    const  navigate = useNavigate();
    const [logo,setLogo] = useState("")
    const handleLogoChange = (e) => {
      setLogo(e.target.files[0]); // Update logo state with the selected file
  }

  
 




    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [carID,setCarID] = useState("")
    const [days,setDays] = useState("")
    const [cnic,setCnic] = useState("")
    const [address,setAddress] = useState("")
    const [offer,setOffer] = useState("")

    const [cnicpicerror,setCnicPicError] = useState("")

    const [nameError,setNameError] = useState("")
    const [emailError,setEmailError] = useState("")
    const[daysError,setDaysError] = useState("")
    const [cnicError,setCnicError] = useState("")
    const [addressError,setAddressError] = useState("")
    const [offerError,setOfferError] = useState("")

    const nameChange = (e) => {
      // Get the input value
      let newName = e.target.value;
    
      // Ensure only alphabet characters and spaces are allowed
      newName = newName.replace(/[^a-zA-Z\s]/g, ' ');
    
      // Capitalize the first letter of each name
      newName = newName.replace(/\b\w/g, (char) => char.toUpperCase());
      // Update the name state
      setName(newName);
  }
  
  
  const emailChange = (e) => {
   
    let newEmail = e.target.value;

    setEmail(newEmail);
  
}

const daysChange = (e) => {
  // Get the input value
  let newDays = e.target.value;

  // Check if the input is empty or consists of only integers
  if (newDays === '' || /^[0-9]*$/.test(newDays)) {
      // Update the days state
      setDays(newDays);
      setDaysError("")
  } else {
    setDaysError("Invalid input: Please enter only integers.")
      console.log("Invalid input: Please enter only integers.");
  }
}

const cnicChange = (e) => {
  // Get the input value
  let newCnic = e.target.value;

  // Remove any non-numeric characters
  newCnic = newCnic.replace(/\D/g, '');

  // Insert hyphens at specific positions
  if (newCnic.length > 5) {
      newCnic = newCnic.slice(0, 5) + '-' + newCnic.slice(5);
  }
  if (newCnic.length > 12) {
      newCnic = newCnic.slice(0, 12) + '-' + newCnic.slice(12, 13);
  }

  // Update the CNIC state
  setCnic(newCnic);
}

const addressChange = (e) => {
  // Get the input value
  let newAddress = e.target.value;

  // Check if the input is empty or matches the allowed pattern
  if ( /^[a-zA-Z0-9\s#]*$/.test(newAddress)) {
      // Update the address state
      setAddress(newAddress);
  } else {
      // Handle invalid input
      // You can show an error message or perform any other action
      console.log("Invalid characters in address: Only letters, numbers, spaces, and '#' symbol are allowed.");
  }
}

const offerChange = async(e) => {
  // Get the input value
  let offer1 = e.target.value;

  // Check if the input is empty or consists of only integers
  if (offer1 === '' || /^[0-9]*$/.test(offer1)) {
      // Update the days state
    
      
      setOffer(offer1);
  } else {
      // Handle invalid input
      // You can show an error message or perform any other action
      console.log("Invalid input: Please enter only integers.");
  }
}

    useEffect(()=>{
        let login = localStorage.getItem('user')
        if(!login){
            navigate("/login")
        }})

        const [Available,setAvailable] = useState(false)
        const [companyID,setCompanyID] = useState("")
        const [loading, setLoading] = useState(true);
        const [rentalHistory,setRentalHistory] = useState([])
    const params = useParams()
    console.log(params.id+" "+params.carid)
    useEffect(() => {
      setCompanyID(params.id);
    }, []);
    const fetchData = async () =>{
        try{
            const {data} = await axios.get("http://localhost:8000/companies/"+params.id+"/"+params.carid)
            setCarID(data.car[0]._id)   
            if(data.car[0].isAvailable){
              setAvailable(true)
              const contract = new web3.eth.Contract(ABI, contractAddress);
              const s= await contract.methods.rentedlist(params.carid).call();
              setRentalHistory(s)
              console.log(s)
            }
        }catch(e){
            console.log(e)
        } finally {
          // Set loading state to false when data fetching is complete
          setLoading(false);
      }
    }
    useEffect(()=>{
        fetchData()
    },[])


    const [checkWallet,setConfirmation] = useState("")
    let a = localStorage.getItem('account')
    
    const handle = async (e) => {
        e.preventDefault()
        setConfirmation("")
        setNameError("")
        setEmailError("")
        setDaysError("")
        setCnicError("")
        setAddressError("")
        setOfferError("")
        setCnicPicError("")
        if(a){
          const formData = new FormData();
          formData.append('cnic', logo);
        if(name.length == 0){
          setNameError("Name can't be Empty")
        }
        if(email.length == 0){
          setEmailError("Emaill can't be Empty")
        }
        if(days.length == 0){
          setDaysError("Days can't be Empty")
        }
        if(cnic.length == 0){
          setCnicError("Cnic can't be Empty")
        }
        if(address.length == 0){
          setAddressError("Adress can't be Empty")
        }       
        if(offer.length == 0){
          setOfferError("Offer can't be Empty")
        }
      
        if(name.length > 0 && email.length > 0 && days.length > 0 && cnic.length > 0 && address.length > 0 && offer.length > 0 ){
          const balanceWei = await web3.eth.getBalance(a);
          // Convert Wei to Ether
          const balanceEther = await web3.utils.fromWei(balanceWei, 'ether');
          if((Number(offer)*days)<Number(balanceEther)){
        try{
          const {data} = await axios.post("http://localhost:8000/book", formData, {
            headers:{
              'Content-Type' : 'multipart/form-data',
            }
          });
          console.log(data)
          if(data.pic){
            setCnicPicError(data.pic)
          }
          else if(data.ok){
            const contract = new web3.eth.Contract(ABI,contractAddress)
            const transactionParameters = {
                from: a,
                to: contractAddress, // Replace with your smart contract address
                data: contract.methods.setValue(carID,name,email,days,cnic.replace(/-/g, ""),address,offer,data.ok).encodeABI(), // ABI-encoded function call data
              }
              try {
                const transactionHash = await window.ethereum.request({
                  method: 'eth_sendTransaction',
                  params: [transactionParameters],
                });
                
              } catch (error) {
                console.error('Caught an error:', error);
                
              }
          }
        }
        catch(e){
            console.log(e)
        }
            
        }else{
          setOfferError("Amont is insufficient")
        }
      }
        
        }
        else{
            setConfirmation("Please Connect the Wallet")
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

  const [Time1, setTime1] = useState("");
  const [Time2, setTime2] = useState("");

const fetchRentData = async () => {
  try {
    console.log("fetchData")
    const contract = new web3.eth.Contract(ABI, contractAddress);
    const s = await contract.methods.sendTime(params.carid).call();
    console.log(s);
    setTime1(Number(s));

    const unixTimeSeconds = Math.floor(Date.now() / 1000);
    console.log(unixTimeSeconds);
    setTime2(unixTimeSeconds)

    if (Available === false && unixTimeSeconds > Number(s)) {
      const formData = new FormData();
      formData.append("isAvailable", true);
      const { data } = await axios.post(
        "http://localhost:8000/isAvailable/" + params.id + "/" + params.carid,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      
      console.log(data);
    }
  } catch (error) {
    console.error("Error fetching rent data:", error);
  }
};



// Ensure you handle Available, params.carid, and params.id as dependencies if they change
 
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };


    const [time, setTime] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setTime(new Date());
        fetchRentData()
      }, 1000);
    
      return () => clearInterval(intervalId);
    }, []);
    
    const formatTime = (time) => {
      return time.toLocaleTimeString();
    };
    
    // Convert time to Unix time
    const unixTime = Math.floor(time.getTime() / 1000);
    console.log(unixTime);

  return (
    <>
    <UserSessionBreak/>
    <Navbar alert={parent}/>

    {loading ? (
      <div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
 	<span class='sr-only'>Loading...</span>
  	<div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
</div>
            ) : Available ?
    <> 
    <section class="body-font bg-gray-900 text-gray-400 ">
    

  <div class="container mx-auto px-5 py-24">
  {checkWallet ?
  <div class="bg-red-100 rounded-lg py-5 px-6 mx-80 mb-4 text-base text-red-700 mb-3" role="alert">
    {checkWallet}
    </div> :
    ""
}

     

     


    <div class="mb-12 flex w-full flex-col text-center">
      <span  className='absolute  right-40'>
    <button type="button" className="relative bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full w-full md:w-auto md:inline-block text-sm" onClick={openModal}>Rental History</button>
    </span>
     {isOpen && (
       <div className="modal absolute w-full h-full top-0 left-0 flex items-center justify-center">
         <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={closeModal}></div>

         <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
         
           <div className="modal-header  p-4">
             <h4 className="modal-title text-lg font-bold">History</h4>
             <button type="button" className="close absolute top-0 right-0 p-2 m-2 rounded-full hover:bg-gray-300" onClick={closeModal}>&times;</button>
           </div>

           <div className="modal-body p-4">
             <table className="table-auto w-full">
               <thead>
            
                 <tr className="bg-gray-200">
                   <th className="px-4 py-2">User Address</th>
                   <th className="px-4 py-2">Days For Rent</th>
              
                 </tr>
               
               </thead>
               <tbody>
               {rentalHistory.map((data, index) => (
 <tr key={index}>
   <td className="border px-4 py-2">{data.useraddress.slice(0,8)}...{data.useraddress.slice(30,35)}</td>
   <td className="border px-4 py-2">{Number(data.daysForRent)}</td>
  
 </tr>
))}

               </tbody>
             </table>
           </div>

           <div className="modal-footer p-4">
             <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={closeModal}>Close</button>
           </div>
         </div>
       </div>
     )}
   

    <h1 class="title-font mb-4 text-2xl font-medium text-white sm:text-3xl">Booking For Car</h1>
    <div className='flex flex-wrap justify-center '>
    <img src='/contract.png' width="150px" className='hidden sm:block md:hidden lg:block' />
</div>
<p class="mx-auto text-base leading-relaxed lg:w-2/3 text-white">Book your car now! Whether you're planning a weekend getaway or<br/> a business trip, we've got you covered.</p>

    </div>
   
    <div class="mx-auto md:w-2/3 lg:w-1/2">
      
      <div>
      <form class="-m-2 flex flex-wrap" onSubmit={handle}>
        <div class="w-1/2 p-2">
          <div class="relative">
            <input type="text" id="name" name="name" value={name} onChange={nameChange} class="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900" placeholder="Name" />
            <label for="name" class="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Name</label>
          </div>
          <p class="m-1 text-sm text-red-500">{nameError}</p>
        </div>
        <div class="w-1/2 p-2">
          <div class="relative">
            <input type="email" id="email" name="email" value={email} onChange={emailChange} class="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900" placeholder="Email" />
            <label for="email" class="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Email</label>
          </div>
          <p class="m-1 text-sm text-red-500">{emailError}</p>
        </div>
        <div class="mt-4 w-full p-2">
          <div class="relative">
          <input type="text" id="days" name="days" value={days} onChange={daysChange} class="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900" placeholder="0-30 days for rent" />
            <label for="days" class="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Days for Rent (1-30)</label>
          </div>
          <p class="m-1 text-sm text-red-500">{daysError}</p>
        </div>
        <div class="mt-4 w-full p-2">
          <div class="relative">
          <input type="text" id="cnic" name="cnic" value={cnic} onChange={cnicChange} class="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900" placeholder="Cnic" />
            <label for="cnic" class="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Cnic (XXXXX-XXXXXX-X)</label>
          </div>
          <p class="m-1 text-sm text-red-500">{cnicError}</p>
        </div>
        <div class="mt-4 w-full p-2">
          <div class="relative">
          <input type="text" id="destination" name="destination" value={address} onChange={addressChange} class="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900" placeholder="Destination" />
            <label for="destination" class="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Destination</label>
          </div>
          <p class="m-1 text-sm text-red-500">{addressError}</p>
        </div>
        <div class="mt-4 w-full p-2">
          <div class="relative">
          <input type="text" id="offer" name="offer" value={offer} onChange={offerChange} class="peer w-full rounded border border-gray-700 bg-gray-800 bg-opacity-40 py-1 px-3 text-base leading-8 text-gray-100 placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900" placeholder="Offer" />
            <label for="offer" class="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:bg-gray-900 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Offer (How much money you want to pay [as per day])</label>
          </div>
          <p class="m-1 text-sm text-red-500">{offerError}</p>
        </div>
        <div class="mt-0 w-full p-2">
  <label for="example3" class="mt-3 mb-1 block text-sm font-medium text-gray-500 after:ml-0.5 after:text-red-500 after:content-['*']">Cnic Pic</label>
  <input id="example3" type="file" accept="image/png, image/jpg, image/jpeg" onChange={handleLogoChange}   class="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 hover:file:bg-indigo-600 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-600 focus:outline-none disabled:pointer-events-none disabled:opacity-60" />
  <p class="m-1 text-sm text-red-500">{cnicpicerror}</p>
</div>
        
        <div class="w-full p-2">
          <button class="mx-auto flex rounded border-0 bg-indigo-600 py-2 px-8 text-lg text-white hover:bg-indigo-700 focus:outline-none">Book Now</button>
        </div>
</form>

     
        <div class="mt-8 w-full border-t border-gray-800 p-2 pt-8 text-center">

          <span class="inline-flex">
            
          </span>
        </div>

      </div>
    </div>

  </div>
  </section>
  </> :
<>
<div class="h-screen overflow-hidden bg-gray-900 sm:px-20">
    <div class="z-10 flex h-full flex-col items-center justify-center space-y-4">
      <h1 class="text-center text-5xl font-bold text-red-600">Car is Not Available {}</h1>
      <h1 className='text-white'>Current Time:</h1>
      <h2 className='text-white'> current time {unixTime} - deadline {Time1}</h2>
      <Link to={`/companies/${companyID}`}
            class="px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-400 transition-all duration-200 ease-in-out">
            Go Back
        </Link>
    </div>


  </div>
  </>

    }
  


    </>
  )
}

export default Book