export type ChatMessage = { role: "user" | "assistant"; content: string };

const ENDPOINT = "https://text.pollinations.ai/openai";

async function callOnce(systemPrompt: string, userInput: string, history: ChatMessage[]) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai",
      messages: [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: userInput },
      ],
    }),
  });
  if (res.status === 429) throw new Error("The AI service is busy right now (rate limited).");
  if (!res.ok) throw new Error(`The AI service returned an error (${res.status}).`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("The AI returned an empty response.");
  return String(text).trim();
}

/** Calls the AI; automatically retries once after 3 seconds on failure. */
export async function generateAI(
  systemPrompt: string,
  userInput: string,
  history: ChatMessage[] = [],
): Promise<string> {
  try {
    return await callOnce(systemPrompt, userInput, history);
  } catch {
    await new Promise((r) => setTimeout(r, 3000));
    return await callOnce(systemPrompt, userInput, history);
  }
}

export const friendlyError = (e: unknown) =>
  `Sorry, we couldn't get a response. ${e instanceof Error ? e.message : ""} Please try again.`.trim();
