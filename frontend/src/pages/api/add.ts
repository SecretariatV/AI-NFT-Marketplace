import { callReadContract } from "@/utils/helpers";
import { addDocuments } from "blueband-db";
import type { NextApiRequest, NextApiResponse } from "next";
import AgentFactory from "@/contracts/abi/AgentFactory.json";
import Agent from "@/contracts/abi/Agent.json";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const uriList = ["zero-ai.wep.app"];
  const sampleText = [
    "hello world, this is a smaple test I'm hoping it works mate",
  ];
  const chunkSize = 512;
  const factoryContract = process.env
    .NEXT_PUBLIC_AGENTFACTORY_ADDRESS as `0x${string}`;
  const lightHouseKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY as string;

  try {
    //Get index of latest agent
    const agentsInfo = await callReadContract(
      factoryContract,
      "getAgentsByCreator",
      AgentFactory.abi,
      ["0x6945EE254481302AD292Dfc8F7f27c4B065Af96d" as `0x${string}`]
    );

    if (agentsInfo && agentsInfo.length > 0) {
      const length = agentsInfo.length;
      const agent = agentsInfo[length - 1];
      const address = agent.agentAddress;

      const agentInfo = await callReadContract(
        "0x5D75A8d20ddDA716e716ff2a138c06727365d247",
        "getIndexInfo",
        Agent.abi,
        []
      );

      //add document to index
      const catalogResult = await addDocuments(
        agentInfo[0],
        lightHouseKey,
        "0x5D75A8d20ddDA716e716ff2a138c06727365d247",
        uriList,
        chunkSize,
        sampleText
      );

      console.log(catalogResult);
      return res.status(200).json({ result: catalogResult });
    }
  } catch (e) {
    res.status(500).json({ e: e });
  }
};

export default handler;
