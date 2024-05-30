import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { encodeFunctionData, getAddress, parseEther } from "viem";
import NFTFactory from "@/utils/NFTFactory.json";
import NFT from "@/utils/NFT.json";
import { PaymasterMode } from "@biconomy/account";
import { ethConnect } from "@lit-protocol/lit-node-client";
import lighthouse from "@lighthouse-web3/sdk";

export const getlitNodeClient = async () => {
  const litNodeClient = new LitJsSdk.LitNodeClient({ litNetwork: "cayenne" });
  await litNodeClient.connect();
  return litNodeClient;
};

export const deployNFTContract = async (
  ownerAddress: string,
  nonce: string,
  provider: any,
  smartAccount?: any
) => {
  if (!provider) {
    console.error("provider not set up");
    return;
  }
  const nftFactoryAddress = "0x06CB3a44C9b4BF6C4FaEEACA4976707b751fe2f5"; //process.env.NEXT_PUBLIC_NFTFACTORY_ADDRESS;
  const deployNFTCallData = encodeFunctionData({
    abi: NFTFactory.abi,
    functionName: "deployNFT",
    args: [getAddress(ownerAddress), parseEther("0.0001"), nonce],
  });

  const transaction = {
    to: nftFactoryAddress,
    from: ownerAddress,
    data: deployNFTCallData,
  };

  if (!smartAccount) {
    const transactionHash = await provider.request({
      method: "eth_sendTransaction",
      params: [transaction],
    });
    return transactionHash;
  }

  const op = await smartAccount.buildUserOp([transaction], {
    paymasterServiceData: { mode: PaymasterMode.SPONSORED },
  });
  return await smartAccount.sendUserOp(op);
};

export const getAuthSig = async (
  provider: any,
  accountAddress: string,
  chainId: string,
  nonce: string
) => {
  return await ethConnect.signAndSaveAuthMessage({
    web3: provider,
    account: accountAddress,
    chainId: 1,
    expiration: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    resources: [],
    nonce: nonce,
  });
};

export const encryptFileWithLitProtocol = async (
  authSig: any,
  ownerAddress: string,
  predictedNFTAddress: string,
  litNodeClient: any,
  file: File
) => {
  const accessControlConditions = [
    {
      contractAddress: "",
      standardContractType: "",
      chain: "ethereum",
      method: "",
      parameters: [":userAddress"],
      returnValueTest: { comparator: "=", value: ownerAddress },
    },
    { operator: "or" },
    {
      contractAddress: predictedNFTAddress,
      standardContractType: "ERC721",
      chain: "sepolia",
      method: "balanceOf",
      parameters: [":userAddress"],
      returnValueTest: { comparator: ">", value: "0" },
    },
  ];

  return await LitJsSdk.encryptToJson({
    accessControlConditions,
    authSig: authSig,
    chain: "sepolia",
    file: file,
    litNodeClient: litNodeClient,
  });
};

export const uploadEncryptedFile = async (
  encryptedJSON: any,
  authorAddress: string,
  data?: any
) => {
  const response = await lighthouse.uploadText(
    encryptedJSON,
    process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY as string
  );

  return {
    document: response.data.Hash,
    title: data.nftTitle || "",
    description: data.description || "",
    thumbnail: "",
    publishedAt: Date.now(),
    category: data.category || "",
    author: authorAddress,
  };
};

export const uploadMetadata = async (metadata: any) => {
  const response = await lighthouse.uploadText(
    JSON.stringify(metadata),
    process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY as string
  );
  return response.data.Hash;
};

export const updateNFTCID = async (
  metaDataCID: string,
  ownerAddress: string,
  provider: any,
  smartAccount?: any
) => {
  const nftFactoryAddress = process.env.NEXT_PUBLIC_NFTFACTORY_ADDRESS;
  const updateNFTCallData = encodeFunctionData({
    abi: NFT.abi,
    functionName: "setCID",
    args: [metaDataCID],
  });
  const transaction = {
    to: nftFactoryAddress,
    from: ownerAddress,
    data: updateNFTCallData,
  };

  if (!smartAccount) {
    const transactionHash = await provider.request({
      method: "eth_sendTransaction",
      params: [transaction],
    });
    return transactionHash;
  }

  const op = await smartAccount.buildUserOp([transaction], {
    paymasterServiceData: { mode: PaymasterMode.SPONSORED },
  });

  return await smartAccount.sendUserOp(op);
};
