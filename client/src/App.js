import Web3 from 'web3';
import React, { useState, useEffect } from 'react';
import nft from "./contracts/testNFT.json";
import erc20 from "./contracts/testERC20.json"
import market from "./contracts/testMarket.json"
 
 
const web3 = new Web3()
const fromWei=(value,to)=>{
  return web3.utils.fromWei(value,to)
}
const toWei=(value,from)=>{
  return web3.utils.toWei(value,from)
}
const App = props => {
  const [windowWeb3, setWindowWeb3] = useState(null)
  const [account, setAccount] = useState("")
  const [locked, setLocked] = useState(true)
  const [balance, setBalance] = useState(0)
  const [tokenID,setTokenID]=useState()
  const [tokenPrice,setTokenPrice]=useState(0)
  const [loading,setLoading]=useState(false)
  const [amount,setAmount]=useState(0)
  const [tokenOwner,setTokenOwner]=useState("")
  const [nftInstance,setNftInstance]=useState()
  const [erc20Instance,setErc20Instance]=useState()  
  const [marketInstance,setMarketInstance]=useState()
  const [isErc20Approved,setIsErc20Approved]=useState(false)
  const [isNFTApproved,setIsNFTApproved]=useState(false)
  const [networkID,setNetworkID]=useState()

  const approveErc20 = async () => {
    try {
      
      const erc20Contract = await new windowWeb3.eth.Contract(erc20.abi, erc20.networks[networkID].address)
        await erc20Contract.methods.approve( market.networks[networkID].address,toWei(tokenPrice,"ether")).send({from:account})
      
        setIsErc20Approved(true)
      

     
    }
    catch (e) {
      console.log(e.message)
      setLoading(false)
    }
  }
  const approveNft = async () => {
    try {
      const nftContract = await new windowWeb3.eth.Contract(nft.abi, nft.networks[networkID].address)
        await nftContract.methods.setApprovalForAll( market.networks[networkID].address,true).send({from:account})
      
        setIsNFTApproved(true)
    }
    catch (e) {
      console.log(e.message)
      setLoading(false)
    }
  }

  const buyNft = async () => {
    try {
      const marketContract = await new windowWeb3.eth.Contract(market.abi, market.networks[networkID].address)
      await marketContract.methods.buyNFT( tokenID,tokenPrice).send({from:account})
    
       
    }
    catch (e) {
      console.log(e.message)
    }
  }

  useEffect(async () => {
    let networkId
    if (windowWeb3) {
      const accounts = await windowWeb3.eth.getAccounts()      
      if (typeof accounts != 'undefined' && accounts.length > 0) {
       networkId = await windowWeb3.eth.net.getId()
        console.log(networkId)        
          const account = accounts[0]         
          const erc20Contract = await new windowWeb3.eth.Contract(erc20.abi, erc20.networks[networkId].address)
          const marketContract = await new windowWeb3.eth.Contract(market.abi, market.networks[networkId].address)

          const _balance = await erc20Contract.methods.balanceOf(account).call()
          const _price=await marketContract.methods.price().call()
          const _tokenId=await marketContract.methods.tokenId().call()
          const _tokenOwner=await marketContract.methods.tokenOwner().call()
          const _isErc20Approved=await marketContract.methods.isAllowedERC20(account,_price).call()
          const _isNFTApproved=await marketContract.methods.isApprovedNFT(_tokenOwner).call()
          console.log(_isNFTApproved)
          setAccount(accounts[0])
          setBalance( fromWei(String(_balance), 'ether'))
        
          setTokenPrice(fromWei(String(_price), 'ether'))
          setTokenID(_tokenId)
          setTokenOwner(_tokenOwner)
          setIsErc20Approved(_isErc20Approved)
          setIsNFTApproved(_isNFTApproved)
          setLocked(!windowWeb3.currentProvider._state.isUnlocked)
          setNetworkID(networkId)
         
       
       
      }
      else {
        setAccount('')
        setBalance(0)
        setLocked(!windowWeb3.currentProvider._state.isUnlocked)
      }
      window.ethereum.on('networkChanged', async function (netId) {
        const accounts = await windowWeb3.eth.getAccounts()
        if (typeof accounts != 'undefined' && accounts.length > 0) {
         networkId = await windowWeb3.eth.net.getId()
          const erc20Contract = await new windowWeb3.eth.Contract(erc20.abi, erc20.networks[networkId].address)
          const marketContract = await new windowWeb3.eth.Contract(market.abi, market.networks[networkId].address)

          const _balance = await erc20Contract.methods.balanceOf(account).call()
          const _price=await marketContract.methods.price().call()
          const _tokenId=await marketContract.methods.tokenId().call()
          const _tokenOwner=await marketContract.methods.tokenOwner().call()
          const _isErc20Approved=await marketContract.methods.isAllowedERC20(account,_price).call()
          const _isNFTApproved=await marketContract.methods.isApprovedNFT(_tokenOwner).call()
          console.log(_isNFTApproved)
          setAccount(accounts[0])
          setBalance( fromWei(String(_balance), 'ether'))
          setTokenPrice(fromWei(String(_price), 'ether'))
          setTokenID(_tokenId)
          setTokenOwner(_tokenOwner)
          setIsErc20Approved(_isErc20Approved)
          setIsNFTApproved(_isNFTApproved)
          setLocked(!windowWeb3.currentProvider._state.isUnlocked) 
          setNetworkID(networkId)
          
          
           
        }
         
      });
      window.ethereum.on('accountsChanged', async function (accounts) {
        if (typeof accounts !== 'undefined' && accounts.length > 0) {
          const account = accounts[0]
          const erc20Contract = await new windowWeb3.eth.Contract(erc20.abi, erc20.networks[networkId].address)
          const marketContract = await new windowWeb3.eth.Contract(market.abi, market.networks[networkId].address)

          const _balance = await erc20Contract.methods.balanceOf(account).call()
          const _price=await marketContract.methods.price().call()
          const _tokenId=await marketContract.methods.tokenId().call()
          const _tokenOwner=await marketContract.methods.tokenOwner().call()
          const _isErc20Approved=await marketContract.methods.isAllowedERC20(account,_price).call()
          const _isNFTApproved=await marketContract.methods.isApprovedNFT(_tokenOwner).call()
          console.log(_isNFTApproved)
          setAccount(accounts[0])
          setBalance( fromWei(String(_balance), 'ether'))
          setTokenPrice(fromWei(String(_price), 'ether'))
          setTokenID(_tokenId)
          setTokenOwner(_tokenOwner)
          setIsErc20Approved(_isErc20Approved)
          setIsNFTApproved(_isNFTApproved)
          setLocked(!windowWeb3.currentProvider._state.isUnlocked)
        }
        else {
          setWindowWeb3(null)
          setAccount('')
          setBalance(0)
          setLocked(true)
          setWindowWeb3(null)
        }
      });
    } else {
      try {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)

          setWindowWeb3(new Web3(window.ethereum))
          
          // Load account
          const accounts = await window.web3.eth.getAccounts()
         networkId = await window.web3.eth.net.getId()
          const account = accounts[0]
          const erc20Contract = await new windowWeb3.eth.Contract(erc20.abi, erc20.networks[networkId].address)
          const marketContract = await new windowWeb3.eth.Contract(market.abi, market.networks[networkId].address)

          const _balance = await erc20Contract.methods.balanceOf(account).call()
          const _price=await marketContract.methods.price().call()
          const _tokenId=await marketContract.methods.tokenId().call()
          const _tokenOwner=await marketContract.methods.tokenOwner().call()
          const _isErc20Approved=await marketContract.methods.isAllowedERC20(account,_price).call()
          const _isNFTApproved=await marketContract.methods.isApprovedNFT(_tokenOwner).call()
          console.log(_isNFTApproved)
          setAccount(accounts[0])
          setBalance( fromWei(String(_balance), 'ether'))
          setTokenPrice(fromWei(String(_price), 'ether'))
          setTokenID(_tokenId)
          setTokenOwner(_tokenOwner)
          setIsErc20Approved(_isErc20Approved)
          setIsNFTApproved(_isNFTApproved)
          setLocked(!windowWeb3.currentProvider._state.isUnlocked)
          setNetworkID(networkId)
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
          setWindowWeb3(new Web3(window.web3.currentProvider))
          
          // Load account
          const accounts = await window.web3.eth.getAccounts()
         networkId = await window.web3.eth.net.getId()
          const account = accounts[0]
          const erc20Contract = await new window.web3.eth.Contract(erc20.abi, erc20.networks[networkId].address)
          const marketContract = await new window.web3.eth.Contract(market.abi, market.networks[networkId].address)

          const _balance = await erc20Contract.methods.balanceOf(account).call()
          const _price=await marketContract.methods.price().call()
          const _tokenId=await marketContract.methods.tokenId().call()
          const _tokenOwner=await marketContract.methods.tokenOwner().call()
          const _isErc20Approved=await marketContract.methods.isAllowedERC20(account,_price).call()
          const _isNFTApproved=await marketContract.methods.isApprovedNFT(_tokenOwner).call()
          console.log(_isNFTApproved)
          setAccount(accounts[0])
          setBalance( fromWei(String(_balance), 'ether'))
          setTokenPrice(fromWei(String(_price), 'ether'))
          setTokenID(_tokenId)
          setTokenOwner(_tokenOwner)
          setIsErc20Approved(_isErc20Approved)
          setIsNFTApproved(_isNFTApproved)
          setLocked(!windowWeb3.currentProvider._state.isUnlocked)
          setNetworkID(networkId)
        }
        else {
          // DO NOTHING...
        }
      }
      catch (e) {
        console.log(e.message)
      }
    }
  }, [windowWeb3]);

  const loadWeb3 = async () => {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        setWindowWeb3(new Web3(window.ethereum))
        //window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        setWindowWeb3(new Web3(window.web3.currentProvider))
         
      }
      else {
        
      }
    }
    catch (e) {
      console.log(e.message)
    }
  }

  const loadBlockchainData = async () => {

   
    // Load account
    const accounts = await window.web3.eth.getAccounts()
   const networkId = await window.web3.eth.net.getId()
    const account = accounts[0]
    const erc20Contract = await new windowWeb3.eth.Contract(erc20.abi, erc20.networks[networkId].address)
    const marketContract = await new windowWeb3.eth.Contract(market.abi, market.networks[networkId].address)

    const _balance = await erc20Contract.methods.balanceOf(account).call()
    const _price=await marketContract.methods.price().call()
    const _tokenId=await marketContract.methods.tokenId().call()
    const _tokenOwner=await marketContract.methods.tokenOwner().call()
    const _isErc20Approved=await marketContract.methods.isAllowedERC20(account,_price).call()
    const _isNFTApproved=await marketContract.methods.isApprovedNFT(_tokenOwner).call()
    console.log(_isNFTApproved)
    setAccount(accounts[0])
    setBalance( fromWei(String(_balance), 'ether'))
    setTokenPrice(fromWei(String(_price), 'ether'))
    setTokenID(_tokenId)
    setTokenOwner(_tokenOwner)
    setIsErc20Approved(_isErc20Approved)
    setIsNFTApproved(_isNFTApproved)
    setLocked(!windowWeb3.currentProvider._state.isUnlocked)
  }
  const connectWeb3 = async () => {
    await loadWeb3()
    await loadBlockchainData()
  }

  let content = (
    <React.Fragment>
      <div style={{ padding: '30px' }}>
        <h1> NFT Market</h1>
        <p>Address: {account}</p>
        <p>NFT ID: {tokenID}</p>
        <p>Token Price:{tokenPrice}</p>
        <p>Token Owner:{tokenOwner}</p>
        <p>is NFT Approved : {String(isNFTApproved)} </p>
        <p>is Amount Approved : {String(isErc20Approved)} </p>
        <p>ERC20 Balance : {balance}</p>
        <p> {!locked ? "connected" : "not connected"} </p>
        <p>
          <button onClick={connectWeb3} disabled={!locked}>connect</button>
        </p>
        <hr />
        <p>
         
          <br />
          <button id="btn1" onClick={approveErc20}>Approve ERC20</button>
          <button id="btn2" onClick={approveNft}>Approve NFT</button>
          <button id="btn3" onClick={buyNft} >Buy NFT</button>
        </p>
        
        
        
        <hr />
      </div>
    </React.Fragment>
  );
  return content;
};
export default App;