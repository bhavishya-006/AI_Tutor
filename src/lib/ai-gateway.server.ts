import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

/**
 * Direct Gemini provider using Google's OpenAI-compatible API.
 * This removes the dependency on the former hosted gateway.
 */
export function createGeminiProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "google-gemini",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
}
