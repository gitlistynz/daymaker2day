import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = 'AIzaSyAIeyaOmytgfcX6tcV2NJ9tm43NEVNj8A0';

const modelsToTest = [
  'gemini-2.0-flash-exp',
  'gemini-1.5-flash-8b',
  'gemini-exp-1206',
  'gemini-2.0-flash',
  'models/gemini-1.5-flash',
  'models/gemini-1.5-pro'
];

async function testModels() {
  const genAI = new GoogleGenerativeAI(apiKey);
  
  for (const modelName of modelsToTest) {
    try {
      console.log(`\nTesting: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say hi in 3 words');
      const response = await result.response;
      const text = response.text();
      console.log(`✅ SUCCESS: ${modelName}`);
      console.log(`   Response: ${text}`);
      console.log('\n🎉 USE THIS MODEL NAME IN YOUR CODE 🎉\n');
      break;
    } catch (error) {
      console.log(`❌ FAILED: ${modelName}`);
      console.log(`   Error: ${error.message.substring(0, 150)}`);
    }
  }
}

testModels();
