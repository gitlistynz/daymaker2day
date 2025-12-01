import { SERVICES_LIST } from "../constants";

export const getServiceRecommendation = async (userQuery: string): Promise<string> => {
  const menuContext = SERVICES_LIST.map(s => `- ${s.title} (${s.category}): ${s.description}`).join('\n');

  try {
    // In production (deployed), use the API endpoint
    // In development, use the API endpoint too (will be proxied by Vite or Vercel)
    const apiUrl = import.meta.env.DEV 
      ? '/api/chat' 
      : 'https://daymaker2day.vercel.app/api/chat';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userQuery,
        menuContext
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.response || "I couldn't find a perfect match, but take a look at our menu!";
  } catch (error: any) {
    console.error("AI Service Error:", error);
    return "Connection issue. Please browse the list manually.";
  }
};