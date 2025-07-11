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
  const [transactions, setTransactions] = useState([]);
  const [aiReport, setAiReport] = useState([]);

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
      setTransactions([]);
      setAiReport([]);
      fetchBalances();
    }
  };

  const transfer = async () => {
    if (contract && toAddress && amount) {
      const tx = await contract.transfer(toAddress, ethers.parseUnits(amount, 0));
      await tx.wait();
      setTransactions(prev => [...prev, { from: connectedAddress, to: toAddress, amount: Number(amount) }]);
      fetchBalances();
    }
  };

  const analyzeTransactions = () => {
    const summary = [];

    balances.forEach((_, idx) => {
      const userAddress = userLabels[idx];
      const address = contract.users ? contract.users[idx] : null;
      const income = transactions.filter(tx => tx.to === address).reduce((sum, tx) => sum + tx.amount, 0);
      const outflow = transactions.filter(tx => tx.from === address).reduce((sum, tx) => sum + tx.amount, 0);
      const ratio = income > 0 ? outflow / income : 0;

      if (ratio > 0.8) {
        summary.push(`${userLabels[idx]}: High outflow (${Math.round(ratio * 100)}%)`);
      } else if (income > 0 && outflow === 0) {
        summary.push(`${userLabels[idx]}: Dormant wallet`);
      } else {
        summary.push(`${userLabels[idx]}: Normal`);
      }
    });

    setAiReport(summary);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>MetaPayP2P Simulation</h1>
      <p>Connected wallet: {connectedAddress}</p>
      <p>National wallet balance: {nationalBalance}</p>

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

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={distribute}>Distribute</button>{" "}
        <button onClick={collect}>Collect</button>{" "}
        <button onClick={reset}>Reset</button>{" "}
        <button onClick={fetchBalances}>Check All Balances</button>{" "}
        <button onClick={analyzeTransactions}>Run AI Analysis</button>
      </div>

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

      {/* ✅ 수정된 AI 분석 결과 표시 */}
      {aiReport.length > 0 && (
        <div style={{ marginTop: "2rem", textAlign: "center", maxWidth: "600px", marginInline: "auto" }}>
          <h3>AI Analysis Result</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "4rem", flexWrap: "wrap" }}>
            <ul style={{ listStyleType: "none", padding: 0, textAlign: "left" }}>
              {aiReport.slice(0, 5).map((line, idx) => (
                <li key={idx}>✅ {line}</li>
              ))}
            </ul>
            <ul style={{ listStyleType: "none", padding: 0, textAlign: "left" }}>
              {aiReport.slice(5).map((line, idx) => (
                <li key={idx + 5}>✅ {line}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
