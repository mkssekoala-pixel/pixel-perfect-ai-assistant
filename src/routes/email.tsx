import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { generateAI, friendlyError } from "@/lib/ai";
import { Card, PageHeader, Field, Spinner, ErrorBox, OutputPanel, inputCls, btnPrimary } from "@/components/shared";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace Assistant" },
      { name: "description", content: "Generate professional emails in a formal, friendly or persuasive tone." },
      { property: "og:title", content: "Smart Email Generator" },
      { property: "og:description", content: "Generate professional emails in a formal, friendly or persuasive tone." },
    ],
  }),
  component: EmailPage,
});

const SYSTEM = `You are an expert business communication assistant. Write a clear, professional email.
Format exactly:
Subject: <concise subject line>

<greeting>,

<body in short paragraphs covering every key point>

<closing>,
[Your Name]
Match the requested tone precisely. Do not add commentary before or after the email.`;

const tones = ["Formal", "Friendly", "Persuasive"] as const;

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [points, setPoints] = useState("");
  const [tone, setTone] = useState<(typeof tones)[number]>("Formal");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async () => {
    if (!purpose.trim()) return setError("Please enter a subject or purpose.");
    setLoading(true); setError("");
    try {
      setOutput(await generateAI(SYSTEM, `Recipient: ${recipient || "N/A"}\nSubject/Purpose: ${purpose}\nKey points:\n${points || "N/A"}\nTone: ${tone}`));
    } catch (e) { setError(friendlyError(e)); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Smart Email Generator" subtitle="Describe your email and let AI draft it for you." />
      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Recipient"><input className={inputCls} value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Hiring Manager" /></Field>
          <Field label="Subject / Purpose"><input className={inputCls} value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Follow up on project proposal" /></Field>
        </div>
        <div className="mt-4"><Field label="Key points"><textarea className={`${inputCls} min-h-28`} value={points} onChange={(e) => setPoints(e.target.value)} placeholder="One point per line" /></Field></div>
        <div className="mt-4">
          <span className="text-sm font-medium text-sidebar">Tone</span>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {tones.map((t) => (
              <button key={t} onClick={() => setTone(t)} className={`rounded-lg border px-4 py-2 text-sm transition ${tone === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-accent"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button className={btnPrimary} onClick={run} disabled={loading}><Sparkles className="h-4 w-4" /> Generate email</button>
          {loading && <Spinner />}
        </div>
        {error && <div className="mt-4"><ErrorBox message={error} onRetry={run} /></div>}
      </Card>
      {output && <OutputPanel value={output} onChange={setOutput} onRegenerate={run} filename="email.txt" loading={loading} />}
    </div>
  );
}
