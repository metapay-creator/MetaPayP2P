import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./abi";

const userLabels = [
  "User1", "User2", "User3", "User4", "User5",
  "User6", "User7", "User8", "User9", "User10"
];

const nationalWallet = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B";

// ✅ 사용자 실제 지갑 주소 직접 지정
const userAddresses = [
  "0xcAEc83c59b3FbfE65cC73828e9c89b9c07902105",
  "0x3C39f84a28673bdbA9f19eaAd26e04d95795260C",
  "0x9D2b9Acad30E1D2a0bb81e96816506C166F2076A",
  "0x37f047f304B49cE83b5630BCb1D6DF4b05eeD305",
  "0x4194b9E02e733f112b2b44f40554DAB0EA60b470",
  "0xc95132B717cFCac125423e07429e8894D18c357B",
  "0xA0831b8e8628b2C683cd98Fd17020d2376582073",
  "0x5317F13e44d02E44c899010D4Fb11985657c26D8",
  "0x4f4728FA3FF45b5459Bfb64C5CD0D78FaEBe12f6",
  "0xA80E21304603C453f416bE77b210ED0AFf400ed7",
];

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
      const userAddress = userAddresses[idx]; // ✅ 직접 주소 사용
      const income = transactions.filter(tx => tx.to === userAddress).reduce((sum, tx) => sum + tx.amount, 0);
      const outflow = transactions.filter(tx => tx.from === userAddress).reduce((sum, tx) => sum + tx.amount, 0);
      const ratio = income > 0 ? outflow / income : 0;

      if (ratio > 0.8) {
        summary.push(`⚠️ ${userLabels[idx]}: High outflow (${Math.round(ratio * 100)}%)`);
      } else if (income > 0 && outflow === 0) {
        summary.push(`⚠️ ${userLabels[idx]}: Dormant wallet`);
      } else {
        summary.push(`✅ ${userLabels[idx]}: Normal`);
      }
    });

    setAiReport(summary);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>MetaPayP2P Simulation</h1>
      <p>Connected wallet: {connectedAddress}</p>
      <p>National wallet balance: {nationalBalance}</p>

      {/* User Balances */}
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
        <button onClick={fetchBalances}>Check All Balances</button>{" "}
        <button onClick={analyzeTransactions}>Run AI Analysis</button>
      </div>

      {/* P2P Transfer */}
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

      {/* AI Report */}
      {aiReport.length > 0 && (
        <div style={{ marginTop: "2rem", textAlign: "left", maxWidth: "500px", marginInline: "auto" }}>
          <h3>AI Analysis Result</h3>
          <ul>
            {aiReport.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
