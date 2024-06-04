import { callReadContract } from '@/utils/helpers'
import type { NextApiRequest, NextApiResponse } from 'next'
import sessionContractABi from '@/contracts/abi/session.json'
import lighthouse from '@lighthouse-web3/sdk'
import { encodePacked, keccak256 } from 'viem'
import axios from 'axios'
import { sessionRequest } from '@/contracts/chainlink-functions/sessionRequest'

type Data = any[]

const concatenated = async (phone: string, agent: `0x${string}`) =>
  encodePacked(['string', 'address'], [phone, agent])

const keccack = async (phone: string, agent: `0x${string}`) =>
  keccak256(await concatenated(phone, agent))

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const phone = req.body.phone
  const agent = req.body.agent
  const sessionContract = '0xC6f0090f087c172f3dd320618DF3133365000976'

  const sessionHash = await keccack(phone, agent)

  console.log('session hash', sessionHash)

  //read the contract
  const agentInfo = await callReadContract(
    sessionContract,
    'getSession',
    sessionContractABi,
    [sessionHash],
  )

  if (agentInfo.length < 1) {
    console.log(agentInfo)
    //new session

    //create new session

    //CHAINLINK FUNCTIONS REQUEST
    const newSessionRequest = await sessionRequest(phone, agent)

    //Return empty array
    res.status(200).json([])
  } else {
    //old session
    //old session

    //check record for old messages
    try {
      const url = `https://gateway.lighthouse.storage/ipns/${agentInfo.toString()}`
      const response = await axios.get(url)
      const data = await response.data
      if (data) {
        console.log('Exisitng session retrieved from: ', url)
        res.status(200).json(data.data)
      }
    } catch (error: any) {
      const messageContainer = { data: [] }
      const allKeys = await lighthouse.getAllKeys(
        process.env.LIGHTHOUSE_API_KEY as string,
      )
      const filter = allKeys.data.find((x) => x.ipnsId === agentInfo.toString())
      const ipnsKey = filter?.ipnsName

      const response = await lighthouse.uploadText(
        JSON.stringify(messageContainer),
        process.env.LIGHTHOUSE_API_KEY as string,
      )
      const pubResponse = await lighthouse.publishRecord(
        response.data.Hash,
        ipnsKey as string,
        process.env.LIGHTHOUSE_API_KEY as string,
      )

      console.log('new session opened', pubResponse)

      res.status(200).json([])
    }
  }
}
