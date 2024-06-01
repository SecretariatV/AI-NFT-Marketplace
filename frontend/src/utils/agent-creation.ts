import { createWalletClient, http, createPublicClient, getAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { createIndex, addDocuments, queryIndex } from "blueband-db";
import { uploadMetadata } from "./marketplace";
import AgentFactory from "@/utils/AgentFactory.json";
import Agent from "@/utils/Agent.json";

import { callReadContract, callWriteContract } from "./helpers";

export const createAIAgent = async (
  metaData: any,
  ownerAddress: string | `0x${string}`,
  provider: any,
  smartAccount?: any
) => {
  let agent;

  //upload data and get the cid
  const cid = await uploadMetadata(metaData);
  const factoryContract = process.env
    .NEXT_PUBLIC_AGENTFACTORY_ADDRESS as `0x${string}`;
  const lightHouseKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY as string;
  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

  //set up admin-wallet-client {this is used to submit txn for user}
  const client = createWalletClient({
    chain: sepolia,
    transport: http(),
    account: privateKeyToAccount(privateKey as `0x${string}`),
  });

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  //create a new IPNS pointer for agent's index
  const result: any = await createIndex(lightHouseKey, client as any);
  const indexName = result.ipnsId;

  //clone new agent contract
  const txn = await callWriteContract(
    provider,
    factoryContract,
    ownerAddress as `0x${string}`,
    AgentFactory.abi,
    "createAgent",
    [cid]
  );

  const wait = await publicClient.waitForTransactionReceipt({
    hash: txn,
  });

  console.log(wait);

  //retrieve address of newly created agent
  const agentInfo = await callReadContract(
    factoryContract,
    "getAgentsByCreator",
    AgentFactory.abi,
    [ownerAddress as `0x${string}`]
  );

  if (agentInfo && agentInfo.length > 0) {
    const length = agentInfo.length;
    const address = agentInfo[length - 1].agentAddress;

    //update agent contract with new Index
    const txn2 = await callWriteContract(
      provider,
      address,
      ownerAddress as `0x${string}`,
      Agent.abi,
      "createIndex",
      [indexName]
    );
    console.log("index updated on agent clone", txn2);

    const info = agentInfo[length - 1];
    agent = { ...info, indexName };
    console.log("New agent", agent);
  }
  return agent;
};

export const addDocument = async (provider: any, ownerAddress: string) => {
  let catalog;
  const uriList = ["zero-ai.wep.app"];
  const sampleText = ["hello world"];
  const chunkSize = 512;
  const factoryContract = process.env
    .NEXT_PUBLIC_AGENTFACTORY_ADDRESS as `0x${string}`;
  const lightHouseKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY as string;

  //Get index of latest agent
  const agentsInfo = await callReadContract(
    factoryContract,
    "getAgentsByCreator",
    AgentFactory.abi,
    [ownerAddress as `0x${string}`]
  );

  if (agentsInfo && agentsInfo.length > 0) {
    const length = agentsInfo.length;
    const agent = agentsInfo[length - 1];
    const address = agent.agentAddress;

    const agentInfo = await callReadContract(
      address,
      "getIndexInfo",
      Agent.abi,
      []
    );

    //add document to index
    const catalogResult = await addDocuments(
      agentInfo[0],
      lightHouseKey,
      address,
      uriList,
      chunkSize,
      sampleText
    );

    console.log(catalogResult);
    //update catalog smart contract
    if (catalogResult) {
      catalog = catalogResult;

      try {
        const txn = await callWriteContract(
          provider,
          agent.agentAddress,
          getAddress(ownerAddress),
          Agent.abi,
          "addDocument",
          [catalog.uris[0], catalog.ids[0]]
        );
        const publicClient = createPublicClient({
          chain: sepolia,
          transport: http(),
        });

        const wait = await publicClient.waitForTransactionReceipt({
          hash: txn,
        });
        console.log("New Catalog registered in smart contract:", wait);
      } catch (error) {
        console.error("Error registering document in smart contract:", error);
        throw error;
      }
    }
  }
};

export const queryDocument = async (ownerAddress: string) => {
  const query = "hello what?";
  const documentCount = 10;
  const chunkCount = 200;
  const sectionCount = 1;
  const tokens = 300;
  const format = "sections";
  const overlap = true;

  const factoryContract = process.env
    .NEXT_PUBLIC_AGENTFACTORY_ADDRESS as `0x${string}`;
  const lightHouseKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY as string;

  const agentsInfo = await callReadContract(
    factoryContract,
    "getAgentsByCreator",
    AgentFactory.abi,
    [ownerAddress as `0x${string}`]
  );

  if (agentsInfo && agentsInfo.length > 0) {
    const length = agentsInfo.length;
    const agent = agentsInfo[length - 1];
    const address = agent.agentAddress;

    const agentInfo = await callReadContract(
      address as string,
      "getIndexInfo",
      Agent.abi,
      []
    );

    try {
      const result = await queryIndex(
        agentInfo[0],
        address,
        lightHouseKey,
        query,
        documentCount,
        chunkCount,
        sectionCount,
        tokens,
        format,
        overlap
      );
      console.log("result", result[0].sections);
    } catch (e) {
      console.error("Error querying index:", e);
    }
  }
};
