<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1Yo5Kuw_ahmreojbQRPB8A4cGdUQBzouJ

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploying

Below are two simple ways to deploy this app: GitHub Pages (automated via GitHub Actions) and Vercel.

GitHub Pages (recommended for a simple static site):

- Push your code to GitHub (example PowerShell commands):

```powershell
git add .
git commit -m "Prepare site for deployment"
# replace <your-repo-url> with your Git remote
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

- The repository contains a GitHub Actions workflow (`.github/workflows/gh-pages.yml`) that will automatically run on pushes to `main` or `master`. It builds the app and publishes the `dist` folder to the `gh-pages` branch. After the workflow succeeds:
   - In your repository Settings → Pages, point the site source to the `gh-pages` branch (root). The site will be available at `https://<your-username>.github.io/<your-repo>/`.

Vercel (recommended for previews and production with automatic routing):

- Option A — Connect the GitHub repo in the Vercel dashboard:
   - Import the project from GitHub.
   - For Build Command use: `npm run build`
   - For Output Directory use: `dist`
   - Vercel will automatically build and deploy on pushes.

- Option B — Use the Vercel CLI locally (you'll need to install the CLI first):

```powershell
npm i -g vercel
vercel login
vercel # follow prompts (select project, set build command: npm run build, output: dist)
vercel --prod
```

Notes:
- The repository includes `vercel.json` which sets Vercel to use `@vercel/static-build` and serve the `dist` folder. No further config is required when importing in the dashboard.
- If you use the Gemini AI features, set your `GEMINI_API_KEY` secret in GitHub Actions (Repository → Settings → Secrets → Actions) named `GEMINI_API_KEY` and/or set it in Vercel project Environment Variables.

