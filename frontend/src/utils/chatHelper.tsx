import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

export const removePrefix = (response: any) => {
  const index = response.indexOf(":");
  if (index !== -1) {
    return response.substring(index + 1).trim();
  } else {
    return response.trim();
  }
};

export async function callVectorDBQAChain(
  query: string,
  index: any,
  messages: any[] | any
) {
  const requestBody = {
    query: query,
    index: index,
    messages: messages,
  };

  try {
    const url = process.env.NEXT_PUBLIC_VECTOR_SEARCH_URL as string;
    const vectorSearchResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!vectorSearchResponse.ok) {
      throw new Error("Failed to fetch from vector-search");
    }

    const result = await vectorSearchResponse.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export function startsWithEthereumAddress(message: string) {
  const words = message.trim().split(" ");
  // Check if the first word has the length of an Ethereum address (42 characters including '0x')
  if (words.length > 0 && words[0].length === 42 && words[0].startsWith("0x")) {
    return true;
  }

  return false;
}

export const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a information provider AI agent inspired by pirate captain personality. You may express yourself 
    with nautical terms and pirate slang or adventorous tone, especially when responding to greeting. Sample:
    - Ahoy there, matey! What treasure be ye seekin' today? 
     Follow these other rules when generating an answer:
    - Always respond to greetings and start a conversation introducing yourself in 3 words maximum.
    - Your responses should never exceeed 300 characters, enough to fit not more than 2 SMS pages
    - Do not use ignore greetings from the user.
    - ignore conversation log not relevant to user's prompt. Always priotize prompts and information from given operational plan knowledge base

    INPUT DOCUMENTS: {input_documents}

    USER PROMPT: {userPrompt}
  
    CONVERSATION LOG: {messages}
 
    Final answer:`,
  ],
  new MessagesPlaceholder("messages"),
]);
