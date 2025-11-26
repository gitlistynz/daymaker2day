import { SERVICES_LIST } from "../constants";

// Lazy-load @google/genai only when an API key is present.
// This prevents build/runtime issues when running locally without a Gemini API key.
let aiClient: any = null;

const getAiClient = async () => {
  if (aiClient) return aiClient;

  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
  if (!apiKey) {
    console.warn("API_KEY is missing. AI features will be disabled.");
    return null;
  }

  try {
    // dynamic import keeps the package out of the initial bundle and avoids side-effects
    const mod = await import("@google/genai");
    const GoogleGenAI = (mod as any).GoogleGenAI || (mod as any).default || mod;
    aiClient = new GoogleGenAI({ apiKey });
    return aiClient;
  } catch (err) {
    console.error("Failed to load @google/genai dynamically:", err);
    return null;
  }
};

export const getServiceRecommendation = async (userQuery: string): Promise<string> => {
  const client = await getAiClient();
  if (!client) return "AI is currently offline. Please browse the menu manually.";

  const menuContext = SERVICES_LIST.map(s => `- ${s.title} (${s.category}): ${s.description}`).join('\n');

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User Query: "${userQuery}"`,
      config: {
        systemInstruction: `You are the AI Concierge for "daymaker2day", a futuristic micro-service booking app.
        We offer 25-minute Zoom sessions.
        
        Here is our menu:
        ${menuContext}
        
        Your task:
        1. Analyze the user's mood or request.
        2. Recommend 1-3 specific services from the list above that would "make their day".
        3. Be brief, friendly, and futuristic in tone.
        4. Do not invent services not on the list.`,
        temperature: 0.7,
      }
    });

    return response.text || "I couldn't find a perfect match, but take a look at our Wellness section!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the mainframe. Please browse the list manually.";
  }
};