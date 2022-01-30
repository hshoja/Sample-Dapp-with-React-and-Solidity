import "./App.css";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import { useState } from "react";
import { ethers } from "ethers";

const greeterAddress = "0x29c3856D738EfeBc0BFC99365a915ec1a2FAf6Dc";
const tokenAddress = "0x685F3cC9bB5003993fF74714ef52B6f0e10C85ee";

function App() {
  const [greeting, setGreeting] = useState("");
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();

  //request access to the user's Metamask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        alert(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function updateGreeting(newGreeting) {
    if (!newGreeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);

      try {
        const transaction = await contract.setGreeting(newGreeting);
        console.log(transaction);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(account);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);

      try {
        const balance = await contract.balanceOf(account);
        alert("balance: ", balance);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);

      try {
        const transaction = await contract.ttransfer(userAccount, amount);
        await transaction.wait();
        console.log(
          transaction,
          ` - ${amount} Coins successfully sent to ${userAccount}`
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleSave = () => {
    updateGreeting(greeting);
  };

  return (
    <div className="App" style={{ padding: "5rem" }}>
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <div>
        <input
          onChange={(e) => setGreeting(e.target.value)}
          value={greeting}
          type="text"
        />
        <button onClick={handleSave}> Update Greeting</button>
      </div>
      <div>
        <br />
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </div>
    </div>
  );
}

export default App;
