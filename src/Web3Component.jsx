import React,{useState} from 'react';
import contractAbi from './ContractABI';
import Web3 from 'web3';
// import {ethers} from 'ethers';


const Web3Component = () => {

    const [account,setAccount] = useState("");
    // const [contractData,setContractData] = useState("");
    const [error,setError] = useState("");

    const {ethereum} = window;
    const connectMetamask = async () => {
        if(window.ethereum){
            const accounts = await ethereum.request({method:"eth_requestAccounts"});
            setAccount(accounts[0]);
        }else{
            setError("Please install metamask ");
        }
    }
    const web3 = new Web3('https://goerli.infura.io/v3/679049d887954c7a8abf638550e5029e');
    // Create a contract instance
   const contract = new web3.eth.Contract(contractABI, contractAddress);
  

    const connectContract = async  () => {
      const Address = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
      const ABI = contractAbi;
     
       const contract = new web3.eth.Contract(ABI, Address);
  
      console.log(contract.address);
    }

    // const getData = async = () => {
        // const result = await contract.name();
        // setContractData(result);
    // }

    // const changeData = async = () => {
    //  await contract.approve
        
    // }

  return (
    <div>
        <button onClick={connectMetamask}>Connect To Metamask Wallet</button>
        <p>{account}</p>
        <p>{error}</p>


         <button onClick={connectContract}>Connect To Contract</button><br/>
      {/*  <button onClick={changeData}>Change Data</button>
        <button onClick={getData}>Read Data from Contract</button>
        <p>{contractData}</p>
       */}
    </div>
  )
}

export default Web3Component;
