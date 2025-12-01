# Fix: Gemini API Key Issue

## Problem
The current Gemini API key is **invalid or expired**. All model requests are failing with 404 errors.

## Solution

### Step 1: Get a New API Key
1. Go to https://makersuite.google.com/app/apikey (or https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the new key

### Step 2: Update Vercel Environment Variable
1. Go to your Vercel dashboard: https://vercel.com/gitlistynz/daymaker2day
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Find `GEMINI_API_KEY` or add it if missing:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `your-new-api-key-here`
   - **Environments**: Production, Preview, Development
5. Click "Save"
6. Go to "Deployments" tab
7. Find the latest deployment and click "..." → "Redeploy"

### Step 3: Test Locally (Optional)
```powershell
$env:GEMINI_API_KEY = "your-new-api-key-here"
node test-gemini.js
```

## Current Code Status
✅ API endpoint is properly configured
✅ CORS is enabled
✅ Model name is correct (`gemini-1.5-flash`)
❌ API key needs to be updated

Once you update the API key in Vercel, the `/api/chat` endpoint will work immediately.
