import { SERVICES_LIST } from "../constants";

// Lazy-load @google/genai only when an API key is present.
// This prevents build/runtime issues when running locally without a Gemini API key.
let aiClient: any = null;

const getAiClient = async () => {
  if (aiClient) return aiClient;

  // Vite exposes env vars prefixed with VITE_ as import.meta.env
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  console.log("API Key check:", apiKey ? `Key found (${apiKey.substring(0, 10)}...)` : 'NO KEY FOUND');
  
  if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY is missing. AI features will be disabled.");
    return null;
  }

  try {
    // dynamic import keeps the package out of the initial bundle and avoids side-effects
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    aiClient = new GoogleGenerativeAI(apiKey);
    console.log("AI Client initialized successfully");
    return aiClient;
  } catch (err) {
    console.error("Failed to load @google/generative-ai:", err);
    return null;
  }
};

export const getServiceRecommendation = async (userQuery: string): Promise<string> => {
  const client = await getAiClient();
  if (!client) return "AI is currently offline. Please browse the menu manually.";

  const menuContext = SERVICES_LIST.map(s => `- ${s.title} (${s.category}): ${s.description}`).join('\n');

  try {
    const model = client.getGenerativeModel({ model: 'gemini-pro' });
    
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

    return text || "I couldn't find a perfect match, but take a look at our menu!";
  } catch (error: any) {
    console.error("Gemini API Error Details:", {
      message: error.message,
      status: error.status,
      error: error
    });
    return `Connection issue. Please browse the list manually.`;
  }
};