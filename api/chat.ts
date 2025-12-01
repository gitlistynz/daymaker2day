import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Using gemini-1.5-flash model
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userQuery, menuContext } = req.body;

    if (!userQuery) {
      return res.status(400).json({ error: 'Missing userQuery' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const systemPrompt = `You are the AI Concierge for "daymaker2day", a futuristic micro-service booking app.
We offer 25-minute and 55-minute Zoom sessions.

Here is our menu:
${menuContext}

Your task:
1. Analyze the user's mood or request.
2. Recommend 1-3 specific services from the list above that would "make their day".
3. Be brief, friendly, and futuristic in tone.
4. Do not invent services not on the list.`;

    const prompt = `${systemPrompt}\n\nUser Query: "${userQuery}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ response: text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ 
      error: 'AI service error',
      message: error.message 
    });
  }
}
