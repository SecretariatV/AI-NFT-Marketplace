# 🌐 ZeroNet – AI NFT Marketplace for Offline Interaction

> Enabling AI-powered data ownership and interaction through a decentralized NFT marketplace.

---

## 💡 Inspiration

In many regions, consistent internet access is a challenge. This digital divide locks millions out of the benefits of intelligent systems and decentralized technologies. I built **ZeroNet** to bridge that gap — empowering users to interact with AI agents offline and access data through an **AI NFT marketplace** that rewards participation and ownership.

---

## ⚙️ What It Does

**ZeroNet** enables:

* Conversational access to AI agents via SMS
* Offline interaction with on-chain AI sessions
* Publishing and monetizing datasets through an **AI NFT marketplace**
* Encrypted, token-gated data sharing via NFTs
* Ownership and access control through smart contracts and decentralized storage

The core innovation is an **AI NFT marketplace** where datasets are minted as NFTs and consumed by AI agents to grow their knowledge autonomously.

---

## 🔧 How It Works

| **Tool**                 | **Functionality**                                                                |
| ------------------------ | -------------------------------------------------------------------------------- |
| **Lit Protocol**         | Encrypts NFT-bound data; only verified owners can decrypt.                       |
| **Chainlink Functions**  | Enables smart contracts to trigger API calls for session updates.                |
| **Chainlink Automation** | Automates AI session upkeep, maintaining persistent offline communication.       |
| **Twilio**               | Provides SMS gateway for user interaction with agents.                           |
| **IPNS + Lighthouse**    | Stores and updates vector embeddings and session data in a decentralized format. |
| **The Graph**            | Indexes deployed contracts and NFT metadata for the marketplace frontend.        |

---

## 📜 Smart Contracts

| Contract            | Description                                                                         |
| ------------------- | ----------------------------------------------------------------------------------- |
| `Session.sol`       | Handles offline AI conversations and session logs via Chainlink.                    |
| `AgentFactory.sol`  | Deploys AI agents cloned from a common template.                                    |
| `AgentTemplate.sol` | Blueprint contract for modular, upgradable agents.                                  |
| `NFTFactory.sol`    | Mints NFTs representing datasets published in the **AI NFT marketplace**.           |
| `PayableNFT.sol`    | NFT contract used to enforce access control and manage payments via Lit encryption. |

---

## 🧩 Challenges I Faced

* Regional SMS delivery limits required routing through local providers.
* Coordinating decentralized storage with smart contract state updates.
* Handling fallback responses in offline testing scenarios.

---

## 🏆 Accomplishments

* Built a decentralized vector database with IPNS + Chainlink integration.
* Created a secure NFT payment gateway enabling AI-readable data ownership.
* Implemented the full lifecycle of an **AI NFT marketplace**—from minting to dataset consumption.

---

## 📚 What I Learned

* Chainlink Functions significantly expand the design space for off-chain automation.
* SMS can be a powerful interface for AI in low-connectivity areas.
* NFTs as data keys introduce new forms of permissioned AI learning and usage.

---

## 🚀 What’s Next

* Add Twilio voice input to enhance accessibility.
* Launch specialized AI agents for healthcare, agriculture, and education.
* Introduce multi-agent orchestration and collaboration.
* Integrate zero-knowledge proofs for secure data validation.
* Extend the **AI NFT marketplace** into mobile-first deployments.

---

## 🛠️ Built With

* `Chainlink`
* `LangChain`
* `Next.js`
* `OpenAI`
* `Solidity`
* `Twilio`
* `Stability`
* `TypeScript`

---

## 📬 Contact

* GitHub: [@SecretariatV](https://github.com/SecretariatV)
* Email: [oliver.b25.f@gmail.com](mailto:oliver.b25.f@gmail.com)
* Telegram: [@ares\_orb](https://t.me/ares_orb)
* Twitter (X): [@OVB\_Coder](https://x.com/OVB_Coder)
