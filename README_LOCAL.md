# Run Maverick Tutor Locally

1. Install Node.js (v20+ recommended).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Insert your Gemini API key in `.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
5. Start the local development server:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:5173` (or the port indicated in your terminal) in your browser.

> **Note:** The chat API connects directly to Google's OpenAI-compatible Gemini endpoint (`https://generativelanguage.googleapis.com/v1beta/openai/`).
