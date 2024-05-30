import mammoth from "mammoth";
import { parseEther, createPublicClient, http, Address, toBytes } from "viem";
import { sepolia } from "viem/chains";
import PayableNFT from "./NFT.json";
import NFTFactory from "./NFTFactory.json";

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
