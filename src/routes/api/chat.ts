import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createGeminiProvider } from "@/lib/ai-gateway.server";
import knowledge from "@/lib/knowledge.json";

const knowledgeText = (knowledge as [string, string][])
  .map(([q, a]) => `Q: ${q}\nA: ${a}`)
  .join("\n\n");

const SYSTEM_PROMPT = `You are a friendly multilingual educational assistant that explains concepts in AI, machine learning, physics, computing and general science.

You can answer in English, Hindi (हिन्दी), or Telugu (తెలుగు). Detect the user's language from their question and respond in the same language and script. If they ask "in hindi" / "in telugu" / "in english", answer in that language.

Keep answers clear, concise, and step-by-step when the question asks "how" or "steps". Use markdown formatting (lists, bold) when helpful.

Below is a reference knowledge base of example question/answer pairs you were trained on. Use them as a stylistic and factual guide, but you may go beyond them to answer related questions:

${knowledgeText}`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) {
          return new Response("Messages required", { status: 400 });
        }
        const key = process.env.GEMINI_API_KEY?.trim();
        if (
          !key ||
          key === "your_key_here" ||
          key === "your_gemini_api_key_here"
        ) {
          return new Response(
            "Missing GEMINI_API_KEY. Please configure your API key in the .env file.",
            { status: 400 },
          );
        }

        const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
        const gateway = createGeminiProvider(key);
        try {
          const result = streamText({
            model: gateway(modelName),
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(messages),
          });
          return result.toUIMessageStreamResponse({
            originalMessages: messages,
            onError: (err: unknown) => {
              console.error("Gemini stream error:", err);
              const msg = err instanceof Error ? err.message : String(err);
              if (msg.includes("Invalid Auth key") || msg.includes("API key")) {
                return "Invalid Google Gemini API key. Please get a free key from https://aistudio.google.com/ and set it in your .env file.";
              }
              return msg || "An error occurred with the AI service.";
            },
          });
        } catch (err) {
          console.error("chat error", err);
          return new Response("AI error", { status: 500 });
        }
      },
    },
  },
});
