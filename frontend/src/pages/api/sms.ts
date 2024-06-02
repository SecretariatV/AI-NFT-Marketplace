import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { removePrefix, startsWithEthereumAddress } from "@/utils/chatHelper";
import Agent from "@/utils/Agent.json";
import { createPublicClient, getAddress, http } from "viem";
import { sepolia } from "viem/chains";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      let index;
      let newMessage;
      const smsBody = req.body.Body;
      const fromNumber = req.body.From;

      console.log(`Received SMS from ${fromNumber}: ${smsBody}`);

      if (startsWithEthereumAddress(smsBody)) {
        const address = smsBody.trim().split(" ")[0];
        const words = smsBody.trim().split(" ").slice(1).join(" ");

        newMessage = words;

        const publicClient = createPublicClient({
          chain: sepolia,
          transport: http(),
        });

        const nftContract = {
          address: getAddress(address) as `0x${string}`,
          abi: Agent.abi,
          args: [],
        };

        const agentInfo: any = await publicClient.readContract({
          ...nftContract,
          functionName: "getIndexInfo",
        });

        index = await agentInfo[0];

        if (!index || (index && index.length < 1)) {
          return res
            .status(400)
            .json({ message: "Invalid index or agent address" });
        }

        // Prepare prompt and query
        let mockPair = [{ human_message: newMessage, ai_message: null }];

        try {
          const response = await axios.post(
            `http://localhost:3000/api/chat`,
            {
              messages: [...mockPair, newMessage],
              prompt: newMessage,
              index: index,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.data;

          if (data && data.message) {
            const responseMessage = removePrefix(data.message);

            // Send the responseMessage back to the phone number
            res.status(200).json({ responseMessage: responseMessage });
          } else {
            console.error("No message in data:", data);
            res.status(500).json({ message: "No response message from API" });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          res.status(500).json({ message: "Failed to get response from API" });
        }
      } else {
        res
          .status(400)
          .json({ message: "Message does not start with an Ethereum address" });
      }
    } catch (error) {
      console.error("Internal server error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
