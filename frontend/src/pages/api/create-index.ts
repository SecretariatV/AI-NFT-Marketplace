import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let indexName: string = "";
  const response = await axios.get('http://localhost:4040/create');
  const { index } = response.data;
  console.log('Index created:', index);


  console.log("creating new index for document, and returning this index");
  res.status(200).json({ index: indexName });
}

