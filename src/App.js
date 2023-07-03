import { useState } from "react";
import { ethers } from "ethers";
import Web3 from "web3";
import abi from "./ContractABI.json";

const App = () => {
  const [defaultAccount, setdefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [contractData, setContractData] = useState({
    name: "",
    totalSupply: "",
    symbol: "",
    decimals: "",
    balanceOf: "",
    allowance: "",
  });

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChanged([result[0]]);
        });
    } else {
      alert("Install MetaMask please!");
    }
  };

  const accountChanged = (accountName) => {
    setdefaultAccount(accountName);
    getUserBalance(accountName);
    getChainId(accountName);
  };

  const getUserBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accountAddress), "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  const getChainId = () => {
    window.ethereum.request({ method: "eth_chainId" }).then((network) => {
      setChainId(network);
    });
  };

  // Create a Web3 instance
  const web3 = new Web3(
    "https://goerli.infura.io/v3/679049d887954c7a8abf638550e5029e"
  );

  const contractAddress = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
  const contractABI = abi;

  // Create a contract instance
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const getContractData = async () => {
    try {
      // Call a function from the smart contract
      const name = await contract.methods.name().call();
      const totalSupply = await contract.methods.totalSupply().call();
      console.log(totalSupply);
      const decimals = await contract.methods.decimals().call();
      console.log(decimals);
      const symbol = await contract.methods.symbol().call();
      const balanceOf = await contract.methods
        .balanceOf("0x6be2d4207190457b92f16e9c2d957fe032920cb4")
        .call();
      console.log(balanceOf);
        
      const allowance = await contract.methods
        .allowance(
          "0x6be2d4207190457b92f16e9c2d957fe032920cb4",
          "0x1daeded0aaa73af942b3b17aa6b7d7ebacaf41a4"
        )
        .call();
      console.log(allowance);

      setContractData({
        name,
        totalSupply,
        decimals,
        symbol,
        balanceOf,
        allowance,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

const writeDataForApprove = async(e) => {
  e.preventDefault();
  const user = document.querySelector("#address").value;
  let amount = document.querySelector("#amount").value;
  amount = {value:ethers.utils.parseEther('0.001')};
  console.log(user,amount);

  const transaction = await contract.methods.approve(user,amount).send({from:"0x6be2d4207190457b92f16e9c2d957fe032920cb4"});
  await transaction.wait();
  console.log("transaction is done");
}

  return (
    <>
      <div style={{ margin: 50 }}>
        <button onClick={connectWallet}>connect wallet button</button>
        <p>Address: {defaultAccount}</p>
        <p>Balance:ETH {userBalance}</p>
        <p>ChainId: {chainId}</p>
        <br />
        <button onClick={getContractData}>Read Data from contract</button>
        <p>name:{contractData.name}</p>
        <p>totalSupply:{contractData.totalSupply}</p>
        <p>symbol:{contractData.symbol}</p>
        <p>decimals:{contractData.decimals}</p>
        <p>BlanceOf: goerli eth{contractData.balanceOf}</p>
        <p>Allowance:{contractData.allowance}</p>
        <br />
        <form onSubmit={writeDataForApprove}>
        <label>Address</label>
          <input type="text" id="address" placeholder="enter your address"></input>
          <label>Amount</label>
          <input type="text" id="amount" placeholder="enter amount here"></input>
          <button type="submit">Approve</button>
        </form>
      </div>
    </>
  );
};

export default App;
