import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Trash2, Bot } from "lucide-react";
import { generateAI, friendlyError, type ChatMessage } from "@/lib/ai";
import { Card, PageHeader, ErrorBox, inputCls, btnPrimary, btnOutline } from "@/components/shared";

export const Route = createFileRoute("/chatbot")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — AI Workplace Assistant" },
      { name: "description", content: "Chat with an AI workplace assistant for quick help at work." },
      { property: "og:title", content: "AI Workplace Chatbot" },
      { property: "og:description", content: "Chat with an AI workplace assistant for quick help at work." },
    ],
  }),
  component: ChatPage,
});

const SYSTEM = `You are a helpful, friendly AI workplace assistant. Help with productivity, writing, planning, communication, and general work questions.
Keep answers concise, practical and professional. Use short bullet lists when helpful. Never ask for confidential data.`;

function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const ask = async (text: string, history: ChatMessage[]) => {
    setLoading(true); setError(""); setPending(text);
    try {
      const reply = await generateAI(SYSTEM, text, history);
      setMessages([...history, { role: "user", content: text }, { role: "assistant", content: reply }]);
      setPending("");
    } catch (e) { setError(friendlyError(e)); }
    finally { setLoading(false); }
  };

  const send = () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    ask(text, messages);
  };

  const shown: ChatMessage[] = pending ? [...messages, { role: "user", content: pending }] : messages;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageHeader title="AI Chatbot" subtitle="Your always-on workplace assistant." />
        <button className={btnOutline} onClick={() => { setMessages([]); setPending(""); setError(""); }}><Trash2 className="h-4 w-4" /> Clear chat</button>
      </div>
      <Card className="flex h-[60vh] flex-col p-0 md:p-0">
        <div className="flex-1 space-y-3 overflow-y-auto p-4 md:p-6">
          {shown.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <Bot className="mb-2 h-10 w-10 text-primary" />
              <p>Ask me anything about work — e.g. "How do I prioritize my week?"</p>
            </div>
          )}
          {shown.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${m.role === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-secondary text-foreground"}`}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-secondary px-4 py-3">
                {[0, 150, 300].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${d}ms` }} />)}
              </div>
            </div>
          )}
          {error && <ErrorBox message={error} onRetry={() => ask(pending, messages)} />}
          <div ref={endRef} />
        </div>
        <div className="flex gap-2 border-t border-secondary p-3">
          <input className={inputCls} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type your message…" disabled={loading} />
          <button className={btnPrimary} onClick={send} disabled={loading || !input.trim()} aria-label="Send"><Send className="h-4 w-4" /></button>
        </div>
      </Card>
    </div>
  );
}
