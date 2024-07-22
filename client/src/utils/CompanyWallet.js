import React, { useEffect, useState } from 'react'

function CompanyWallet(props) {
    const [wallet,setWallet] = useState("Connect to Wallet")
    const [connected,setConnected] = useState(false)
    const [color,setColor] = useState("primary")
    const [accept,setAccept] = useState(true)
    useEffect(() => {
      if(localStorage.getItem('companyaccount') !==null){
      setWallet(localStorage.getItem('companyaccount').slice(0,8)+"...."+localStorage.getItem('companyaccount').slice(-5,-1))
      setColor("success")
      setConnected(true)
      }
    }, [wallet,connected,color]);
    const walletConnection = async() => {
        if(window.ethereum){
            console.log("detected")
            if(connected === false){
                //Request Accounts
                try{
                    await window.ethereum.request({
                  "method": "wallet_requestPermissions",
                  "params": [
                    {
                      "eth_accounts": {}
                    }
                  ]
                });

                  try{
                    const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
                    localStorage.setItem('companyaccount',accounts[0])
                    setWallet(localStorage.getItem('companyaccount').slice(0,8)+"...."+localStorage.getItem('companyaccount').slice(-5,-1));
                    setColor("success")
                    setConnected(true)
                    props.ok(true)
                  }catch(error){
                    console.log("Error Connecting");
                  }

                }catch(error){
                    if (error.code === 4001) {
                      // User rejected the request
                      console.error("User rejected the request.");
                  }
                }
          

      }
        else{
            setWallet("Connect to Wallet")
            localStorage.removeItem('companyaccount')
            setColor("primary")
            setConnected(false)
            props.ok(false)
        }
    }
          else{
            console.log("metamask not found")
          }
    }

   
   return (
    <>
    <button class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={walletConnection}>{wallet}</button>
    </>
  )
}

export default CompanyWallet