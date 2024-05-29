import mammoth from "mammoth";

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
