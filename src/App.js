import logo from "./logo.svg";
import "./App.css";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { useState } from "react";
import { ethers } from "ethers";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [greeting, setGreeting] = useState("");

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
    </div>
  );
}

export default App;
