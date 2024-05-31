import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = await req.body;
  const { story } = body;
  const prompt = story;

  const text_prompts = [{ text: prompt }];
  const response = await fetch(
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${process.env.STABILITY_API_KEY}`,
      },
      body: JSON.stringify({ text_prompts, samples: 1 }),
    }
  );

  if (!response.ok) {
    return res.status(response.status).json({ error: await response.text() });
  }
  const images = await response.json();
  const imageBase64 = images.artifacts[0]?.base64;

  if (!imageBase64) {
    return res.status(500).json({ error: "No image generated" });
  }

  return res.status(200).json({ image: imageBase64 });
};

export default handler;
