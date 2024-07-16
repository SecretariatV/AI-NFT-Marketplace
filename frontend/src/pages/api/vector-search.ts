import { AIMessage, HumanMessage } from '@langchain/core/messages'
import { Document } from 'langchain/document'
import { OpenAI } from 'langchain/llms/openai'
import { NextApiRequest, NextApiResponse } from 'next'
import { prompt } from '../../utils/chatHelper'
import { queryIndex } from 'blueband-db'

import { getAddress } from 'viem'

const openAIApiKey = process.env.OPENAI_API_KEY
const apiKey = process.env.LIGHTHOUSE_API_KEY

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const llm = new OpenAI({
    openAIApiKey: openAIApiKey as string,
  })

  const indexName = req.body.index

  const docs = await similarityVectorSearch(req.body.query, indexName)

  console.log(docs)

  const messages = req.body.messages

  let mappedMessages: any = []

  messages.forEach((message: any, index: number) => {
    if (messages && messages.length > 1 && index !== messages.length - 1) {
      if (message.human_message && 'human_message' in message) {
        mappedMessages.push(new HumanMessage(message.human_message))
      }
      if (message.ai_message && 'ai_message' in message) {
        mappedMessages.push(new AIMessage(message.ai_message))
      }
    }
  })

  mappedMessages.push(new HumanMessage(req.body.query))

  const chain = prompt.pipe(llm as any)
  const result = await chain.invoke({
    input_documents: docs,
    messages: mappedMessages,
    userPrompt: req.body.query,
  })
  res.status(200).json(result)
}

async function similarityVectorSearch(
  query: string,
  index: string,
): Promise<Document[]> {
  const documentCount = 10
  const chunkCount = 200
  const sectionCount = 3
  const tokens = 300
  const format = 'sections'
  const overlap = true

  const result = await queryIndex(
    index,
    getAddress('0x7C679Ba77Db1EF85a6B01782Ea58bEe3A1F6df96'), //WARNING: HARDCODED FOR DEMO VIDEO
    apiKey as string,
    query,
    documentCount,
    chunkCount,
    sectionCount,
    tokens,
    format,
    overlap,
  )

  const results = result[0]

  return results
}
