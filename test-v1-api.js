const apiKey = 'AIzaSyAIeyaOmytgfcX6tcV2NJ9tm43NEVNj8A0';

const models = [
  'gemini-1.5-flash',
  'gemini-1.5-pro', 
  'gemini-2.0-flash-exp',
  'gemini-pro',
  'gemini-1.5-flash-latest',
  'gemini-1.5-pro-latest'
];

async function testModel(modelName) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Say hi' }] }]
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ ${modelName} WORKS!`);
      console.log(`   Response: ${data.candidates[0].content.parts[0].text}`);
      return true;
    } else {
      const error = await response.text();
      console.log(`❌ ${modelName} - ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${modelName} - ${error.message}`);
    return false;
  }
}

async function testAll() {
  console.log('Testing v1beta API models...\n');
  for (const model of models) {
    await testModel(model);
  }
}

testAll();
