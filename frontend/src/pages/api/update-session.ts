import { callReadContract } from '@/utils/helpers'
import type { NextApiRequest, NextApiResponse } from 'next'
import sessionContractABi from '@/contracts/abi/session.json'
import lighthouse from '@lighthouse-web3/sdk'
import { encodePacked, keccak256 } from 'viem'

type Data = { message: string }

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
  const messages = req.body.messages

  const sessionHash = await keccack(phone, agent)

  //read the contract
  const agentInfo = await callReadContract(
    sessionContract,
    'getSession',
    sessionContractABi,
    [sessionHash],
  )

  if (!agentInfo) {
    res.status(200).json({ message: 'no new update' })
  } else {
    try {
      const allKeys = await lighthouse.getAllKeys(
        process.env.LIGHTHOUSE_API_KEY as string,
      )
      const filter = allKeys.data.find((x) => x.ipnsId === agentInfo.toString())
      const ipnsKey = filter?.ipnsName
      const response = await lighthouse.uploadText(
        JSON.stringify({ data: [...messages] }),
        process.env.LIGHTHOUSE_API_KEY as string,
      )
      const pubResponse = await lighthouse.publishRecord(
        response.data.Hash,
        ipnsKey as string,
        process.env.LIGHTHOUSE_API_KEY as string,
      )

      res.status(200).json({ message: 'session updated' })
    } catch (e: any) {
      res.status(500).json({ message: e.message ?? 'error' })
    }
  }
}
