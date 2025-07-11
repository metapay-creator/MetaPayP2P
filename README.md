# MetaPayP2P – Web3 Basic Income Simulation with Peer Transfers

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

📱 **Test DApp Details**
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

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
