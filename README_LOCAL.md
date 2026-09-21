# Run Maverick Tutor locally

1. Install Node.js LTS.
2. In this project folder run:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`.
4. Put your own Gemini API key in `.env`:
   ```env
   GEMINI_API_KEY=your_key_here
   ```
5. Start the app:
   ```bash
   npm run dev -- --port 4000
   ```
6. Open the localhost URL shown by Vite.

The chat API uses Google's OpenAI-compatible Gemini endpoint directly; it no longer requires `LOVABLE_API_KEY`.
