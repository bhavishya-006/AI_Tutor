# GitHub Pages deployment

1. Create a GitHub repository and push this project to the `main` branch.
2. In GitHub: Settings -> Pages -> Build and deployment -> Source: GitHub Actions.
3. Push to `main`. The workflow in `.github/workflows/deploy-pages.yml` builds and publishes the static frontend.
4. GitHub Pages cannot execute the `/api/chat` server route or keep `GEMINI_API_KEY` secret. The chat backend must be deployed separately on a server/serverless host and the frontend must call that backend.

For local development, create `.env` and set `GEMINI_API_KEY=...`, then run `npm run dev`.
