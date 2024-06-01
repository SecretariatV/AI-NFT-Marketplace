import mammoth from "mammoth";
import {
  parseEther,
  createPublicClient,
  http,
  Address,
  WalletClient,
  encodeFunctionData,
} from "viem";
import { sepolia } from "viem/chains";
import NFTFactory from "./NFTFactory.json";
import NFT from "./NFT.json";
import { privateKeyToAccount } from "viem/accounts";

/**
 * Shortens an Ethereum address to a more readable format.
 * @param address The full Ethereum address to shorten.
 * @returns The shortened Ethereum address.
 */
export function shortenAddress(address: string): string {
  if (!address || address.length < 10) {
    return address; // Return original if too short to shorten
  }
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

/**
 * Converts a timestamp to a human-readable date string.
 * @param timestamp - The timestamp to convert.
 * @returns A string representing the date in 'YYYY-MM-DD HH:mm:ss' format.
 */
export function convertTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const extractTextFromFile = async (
  file: ArrayBuffer
): Promise<string> => {
  try {
    const result = await mammoth.extractRawText({ arrayBuffer: file });
    return result.value;
  } catch (error) {
    console.error("Error extracting text:", error);
    return "";
  }
};

export const fetchContent = async (hash: string) => {
  try {
    const response = await fetch(
      `https://gateway.lighthouse.storage/ipfs/${hash}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch content");
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
};

export const computeCreate2Address = async (
  owner: Address | string | any,
  price: string,
  nounce: string
) => {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const data = await publicClient.readContract({
    address: process.env.NEXT_PUBLIC_NFTFACTORY_ADDRESS as `0x${string}`,
    abi: NFTFactory.abi,
    functionName: "computeAddress",
    args: [parseEther(price), owner as `0x${string}`, nounce],
  });

  console.log("computed address: ", data);

  return data as string;
};

export const getDetailsFromNFTContract = async (nftAddress: string) => {
  let data;
  try {
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(),
    });

    const nftContract = {
      address: nftAddress as `0x${string}`,
      abi: NFT.abi,
    };

    const [mintPrice, tokenCounter, author, cid] = await Promise.all([
      publicClient.readContract({
        ...nftContract,
        functionName: "mintPrice",
      }),
      publicClient.readContract({
        ...nftContract,
        functionName: "tokenCounter",
      }),
      publicClient.readContract({
        ...nftContract,
        functionName: "authorAddress",
      }),
      publicClient.readContract({
        ...nftContract,
        functionName: "cid",
      }),
    ]);

    data = {
      mintPrice,
      tokenCounter,
      author,
      cid,
    };
  } catch (error) {
    console.error("Error fetching CID:", error);
    return null;
  }

  return data;
};

export const callWriteContract = async (
  provider: any,
  contractAddress: `0x${string}`,
  ownerAddress: `0x${string}`,
  abi: any,
  functionName: string,
  args: any[]
) => {
  try {
    const callData = encodeFunctionData({
      abi,
      functionName,
      args: args,
    });

    const transaction = {
      to: contractAddress,
      from: ownerAddress,
      data: callData,
    };

    const transactionHash = await provider.request({
      method: "eth_sendTransaction",
      params: [transaction],
    });
    return transactionHash;
  } catch (error) {
    console.error("Error saving catalog to smart contract:", error);
    throw error;
  }
};

export const callReadContract = async (
  contract: string,
  functionName: string,
  abi: any[],
  args: any[]
) => {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const nftContract = {
    address: contract as `0x${string}`,
    abi: abi,
    args,
  };

  const value = publicClient.readContract({
    ...nftContract,
    functionName: functionName,
  });
  return value;
};

export async function generateUrl(text: string) {
  try {
    const blob = new Blob([text], { type: "text/plain" });
    const tempUrl = URL.createObjectURL(blob);
    return tempUrl;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
