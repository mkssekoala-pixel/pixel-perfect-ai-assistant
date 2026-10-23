import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { generateAI, friendlyError } from "@/lib/ai";
import { Card, PageHeader, Spinner, ErrorBox, OutputPanel, inputCls, btnPrimary } from "@/components/shared";

export const Route = createFileRoute("/meeting")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — AI Workplace Assistant" },
      { name: "description", content: "Summarize meeting notes into decisions, action items and deadlines." },
      { property: "og:title", content: "Meeting Notes Summarizer" },
      { property: "og:description", content: "Summarize meeting notes into decisions, action items and deadlines." },
    ],
  }),
  component: MeetingPage,
});

const SYSTEM = `You are a professional meeting assistant. Summarize the meeting notes into exactly these four labelled sections, in plain text (no markdown symbols like ** or #):

SUMMARY
<2-4 sentence overview>

KEY DECISIONS
- <decision>

ACTION ITEMS
- <task> (Owner: <name or "Unassigned">)

DEADLINES
- <item>: <date or "Not specified">

Only use information from the notes. If a section has nothing, write "- None mentioned".`;

function MeetingPage() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = async () => {
    if (!notes.trim()) return setError("Please paste your meeting notes first.");
    setLoading(true); setError("");
    try { setOutput(await generateAI(SYSTEM, notes)); }
    catch (e) { setError(friendlyError(e)); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Meeting Notes Summarizer" subtitle="Paste raw notes and get a structured summary." />
      <Card>
        <textarea className={`${inputCls} min-h-64`} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste your meeting notes here…" />
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button className={btnPrimary} onClick={run} disabled={loading}><Sparkles className="h-4 w-4" /> Summarize</button>
          {loading && <Spinner text="Summarizing…" />}
        </div>
        {error && <div className="mt-4"><ErrorBox message={error} onRetry={run} /></div>}
      </Card>
      {output && <OutputPanel value={output} onChange={setOutput} onRegenerate={run} filename="meeting-summary.txt" loading={loading} />}
    </div>
  );
}
