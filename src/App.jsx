import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./abi";

const userLabels = [
  "User1", "User2", "User3", "User4", "User5",
  "User6", "User7", "User8", "User9", "User10"
];

const nationalWallet = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [balances, setBalances] = useState([]);
  const [nationalBalance, setNationalBalance] = useState(0);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const connect = async () => {
      if (window.ethereum) {
        const _provider = new ethers.BrowserProvider(window.ethereum);
        const _signer = await _provider.getSigner();
        const address = await _signer.getAddress();
        const _contract = new ethers.Contract(contractAddress, abi, _signer);
        setProvider(_provider);
        setSigner(_signer);
        setConnectedAddress(address);
        setContract(_contract);
      } else {
        alert("Please install MetaMask.");
      }
    };
    connect();
  }, []);

  const fetchBalances = async () => {
    if (contract) {
      try {
        const [national, userBals] = await contract.checkAllBalances();
        setNationalBalance(Number(national));
        setBalances(userBals.map(b => Number(b)));
      } catch (err) {
        console.error("Error fetching balances:", err);
      }
    }
  };

  const distribute = async () => {
    if (contract) {
      const tx = await contract.distribute();
      await tx.wait();
      fetchBalances();
    }
  };

  const collect = async () => {
    if (contract) {
      const tx = await contract.collect();
      await tx.wait();
      fetchBalances();
    }
  };

  const reset = async () => {
    if (contract) {
      const tx = await contract.resetAll();
      await tx.wait();
      fetchBalances();
    }
  };

  const transfer = async () => {
    if (contract && toAddress && amount) {
      const tx = await contract.transfer(toAddress, ethers.parseUnits(amount, 0));
      await tx.wait();
      fetchBalances();
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>MetaPayP2P Simulation</h1>
      <p>Connected wallet: {connectedAddress}</p>
      <p>National wallet balance: {nationalBalance}</p>

      {/* Two rows of 5 user boxes */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
        {[0, 1, 2, 3, 4].map(idx => (
          <div key={idx} style={{ border: "1px solid #ccc", padding: "1rem", width: "150px", borderRadius: "8px" }}>
            <strong>{userLabels[idx]}</strong>
            <p>{balances[idx] ?? 0}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        {[5, 6, 7, 8, 9].map(idx => (
          <div key={idx} style={{ border: "1px solid #ccc", padding: "1rem", width: "150px", borderRadius: "8px" }}>
            <strong>{userLabels[idx]}</strong>
            <p>{balances[idx] ?? 0}</p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={distribute}>Distribute</button>{" "}
        <button onClick={collect}>Collect</button>{" "}
        <button onClick={reset}>Reset</button>{" "}
        <button onClick={fetchBalances}>Check All Balances</button>
      </div>

      {/* Transfer section */}
      <div style={{ marginTop: "2rem" }}>
        <h3>P2P Transfer</h3>
        <input
          type="text"
          placeholder="Recipient address"
          value={toAddress}
          onChange={e => setToAddress(e.target.value)}
          style={{ width: "320px" }}
        />{" "}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{ width: "100px" }}
        />{" "}
        <button onClick={transfer}>Send</button>
      </div>
    </div>
  );
}

export default App;
