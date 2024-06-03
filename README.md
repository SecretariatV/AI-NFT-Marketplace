# Zero

**Zero Internet** makes it easy to use AI agents offline by leveraging a decentralized vector-db and data marketplace on Filecoin, and managing remote conversations using Chainlink functions and automation.

### Contracts

| **Contract**              | **Description**                                                                                                                                                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [**Session.sol**]()       | Manages sessions using Chainlink automation and Chainlink functions to track offline conversations between the AI agent and a phone number.                                                                  |
| [**AgentFactory.sol**]()  | Deploys a new AI agent by cloning the `AgentTemplate.sol`.                                                                                                                                                   |
| [**AgentTemplate.sol**]() | The base contract for creating AI agents.                                                                                                                                                                    |
| [**NFTFactory.sol**]()    | Deploys new NFTs used to token-gate datasets. AI agents can consume these datasets after minting/paying for the NFTs.                                                                                        |
| [**PayableNFT.sol**]()    | NFT Contract representing a published data. It is used as an access condition while encrypting documents with Lit Protocol. So users can get access to an AI by paying and minting an NFT from the contract. |

## Tools & Integrations

- [Lighthouse.storage]()
- [Lit Protocol]()
- [Chainlink]()
- [The Graph]()

### Others

- [Next.js](), [Chakra-UI](), [Typescript]()
- [Langchain](), [OpenAI](), [Stability]()
- [Remix](), [Solidity]()
- [Twilio]()
