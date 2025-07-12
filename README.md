> ⚠️ License Notice:
> This project is protected by copyright. Unauthorized use is strictly prohibited.  
> Contact: anioia33@gmail.com
# MetaPayP2P – Web3 Basic Income Simulation with Peer Transfers

> A circulating basic income simulation with blockchain distribution, AI behavior monitoring, and real-time peer transfers.

---

![AI Banner](public/ai-banner.png)

---

## 🌍 Why This Matters

**MetaPayP2P** demonstrates a sustainable, self-circulating basic income model—  
one that doesn’t rely on unlimited government funding or taxation.  
By combining immutable blockchain distribution with non-intrusive AI monitoring,  
MetaPay enables digital economic freedom and scalable public benefit.

---

## 🧪 Simulation Structure

- **Total: 15 rounds**
  - 10 rounds of national wallet distribution
  - 5 rounds of collection + redistribution
  - Full cycle ≈ 30 minutes (accelerated for testing)

⏱️ **Time-Compressed Simulation**
- 2 minutes simulate 1 month.
- Every 2 minutes, the national wallet distributes 500 units to 10 users.
- After each distribution, P2P transfers are allowed for 1 minute, starting 30 seconds after funds are received.
- Data is then collected, and the next round begins.
- After 10 distributions, 5 rounds of collection + redistribution follow.

---

## 📱 Test DApp Details

- A separate frontend DApp is provided for each of the 10 test users.
- You will receive a Sepolia wallet address and DApp link to participate.
- MetaMask must be connected to the Sepolia testnet.
- You must initiate at least one P2P transfer within the allowed time per round.

📌 **Requirements**
- Sepolia testnet ETH is required to cover gas fees.
- Only developers or active Web3 users may apply. Not open to general users.

🧾 **Upon Participation**
- You will receive:
  - Your wallet address and seed phrase (for simulation only)
  - A list of 10 citizen test wallet addresses
  - Access to the simulation DApp

---

## 🔁 Circulation Logic of MetaPay

![MetaPay Circulation](public/metapay-circulation.png)

---

## 🧠 AI Risk Analysis

![AI Risk Analysis](public/ai-risk-analysis.png)

---

## 🧠 Role of AI in MetaPay

MetaPay ensures immutable monthly distribution and automatic collection to guarantee fairness and sustainability.  
The AI module only analyzes peer-to-peer (P2P) transactions, offering **risk alerts** and **optimization suggestions**.

✅ **AI Capabilities:**
- Detects abnormal behaviors (e.g., always sending or never sending)
- Flags dormant wallets
- Suggests optimized transfer logic (e.g., corporate salaries, vendor payments)
- Never controls or interrupts the base circulation logic

🔒 **AI never interferes with the national wallet’s fund flow.**  
It supports user behavior transparency—not control.

This structure ensures AI is used ethically and effectively, supporting financial autonomy.

---

## 📎 Project Links

- 🌐 **DApp**: https://meta-pay-p2-p.vercel.app  
- 🧠 **Forum Post**: [MetaPay Thread on CEG Forum](https://forum.ceg.vote/t/metapay-a-circulating-basic-income-model-with-digital-currency/5537/34)  
- 🐙 **GitHub**: https://github.com/metapay-creator/MetaPayP2P  
- 🐦 **X (Twitter)**: https://x.com/metapay_creator  
- 🔗 **Smart Contract (Sepolia)**: `0xB5912A07Cd6396E1BAE87aCB8EB04B74A1fABCbD`

---

## 📩 Contact

If you want to participate, collaborate, or ask questions:

- Email: **anioia33@gmail.com**  
- Or comment on the [Forum thread](https://forum.ceg.vote/t/metapay-a-circulating-basic-income-model-with-digital-currency/5537/34)

---

## 🧰 Tech Stack

- `Solidity` smart contract on **Sepolia Testnet**
- `React + Vite` frontend with MetaMask integration
- `Ethers.js` for Web3 interaction
- JS-based AI behavior simulator (**Alith-inspired**)

---

## 🛠️ Local Development (Optional)

```bash
git clone https://github.com/metapay-creator/MetaPayP2P
cd MetaPayP2P
npm install
npm run dev

📂 Project Structure

MetaPayP2P/
├── public/
│   ├── ai-banner.png
│   ├── ai-risk-analysis.png
│   └── metapay-circulation.png
├── src/
│   ├── App.jsx
│   └── abi.js
├── README.md
...

⚖ License
MIT License
© 2025 Gyuha Yoon – MetaPay Project for HyperHack

