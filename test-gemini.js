import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyBOeGw6mYWbxXtW3zlk58TIKz0tLONyRBY';

const modelsToTest = [
  'gemini-pro',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-1.5-flash-latest',
  'gemini-1.5-pro-latest'
];

async function testModels() {
  const genAI = new GoogleGenerativeAI(apiKey);
  
  for (const modelName of modelsToTest) {
    try {
      console.log(`\nTesting: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say hi');
      const response = await result.response;
      const text = response.text();
      console.log(`✅ SUCCESS: ${modelName}`);
      console.log(`   Response: ${text.substring(0, 50)}...`);
      break; // Use the first one that works
    } catch (error) {
      console.log(`❌ FAILED: ${modelName}`);
      console.log(`   Error: ${error.message.substring(0, 100)}`);
    }
  }
}

testModels();
