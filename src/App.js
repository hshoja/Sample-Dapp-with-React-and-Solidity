import "./App.css";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import ERCToken from "./artifacts/contracts/ERCToken.sol/ERCToken.json";
import { useState } from "react";
import { ethers } from "ethers";

const greeterAddress = "0x29c3856D738EfeBc0BFC99365a915ec1a2FAf6Dc";
const tokenAddress = "0x685F3cC9bB5003993fF74714ef52B6f0e10C85ee";
const ercTokenAddress = "0xF7FCa76C055e95Bc8DE3FD491Db71Cc88323C516";

function App() {
  const [greeting, setGreeting] = useState("");
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();
  const [amountERC, setAmountERC] = useState();
  const [userAccountERC, setUserAccountERC] = useState();

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

  async function getBalanceERC() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(account);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        ercTokenAddress,
        ERCToken.abi,
        provider
      );

      try {
        const balance = await contract.balanceOf(account);
        console.log("balance: ", parseInt(balance._hex, 16));
        console.log(balance);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function sendCoinsERC() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        ercTokenAddress,
        ERCToken.abi,
        signer
      );

      try {
        const transaction = await contract.transfer(userAccountERC, amountERC);
        await transaction.wait();
        console.log(
          transaction,
          ` - ${amountERC} Coins successfully sent to ${userAccountERC}`
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
      <div>
        <br />
        <button onClick={getBalanceERC}>Get Balance ERC</button>
        <button onClick={sendCoinsERC}>Send Coins ERC</button>
        <input
          onChange={(e) => setUserAccountERC(e.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(e) => setAmountERC(e.target.value)}
          placeholder="Amount"
        />
      </div>
    </div>
  );
}

export default App;
