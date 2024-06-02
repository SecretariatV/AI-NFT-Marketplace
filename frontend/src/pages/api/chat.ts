import { callVectorDBQAChain } from "@/utils/chatHelper";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.body.prompt;
  const messages = req.body.messages;
  const index = req.body.index;

  if (!query) {
    return res.status(500).json({ message: "prompt format error" });
  }

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ message: "messages format error" });
  }

  const response = await callVectorDBQAChain(query, index, messages);

  res.status(200).json({ message: response });
}
