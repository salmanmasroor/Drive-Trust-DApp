import React, { useEffect, useState } from 'react'

function Wallet(props) {
    const [wallet,setWallet] = useState("Connect to Wallet")
    const [connected,setConnected] = useState(false)
    const [color,setColor] = useState("primary")

    useEffect(() => {
      if(localStorage.getItem('account') !==null){
      setWallet(localStorage.getItem('account').slice(0,8)+"...."+localStorage.getItem('account').slice(-5,-1))
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
                    localStorage.setItem('account',accounts[0])
                    setWallet(localStorage.getItem('account').slice(0,8)+"...."+localStorage.getItem('account').slice(-5,-1));
                    setColor("success")
                    setConnected(true)
                
                    props.ok(true)
              
                    props.onSubmitOne(connected)
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
            localStorage.removeItem('account')
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
    <button class="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800" onClick={walletConnection}>{wallet}</button>
    </>
  )
}

export default Wallet