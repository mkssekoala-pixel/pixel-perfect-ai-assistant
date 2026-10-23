import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, MessageSquare, ArrowRight } from "lucide-react";
import { Card } from "@/components/shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity Assistant" },
      { name: "description", content: "Write emails, summarize meetings and chat with an AI workplace assistant." },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      { property: "og:description", content: "Write emails, summarize meetings and chat with an AI workplace assistant." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  { to: "/email", title: "Smart Email Generator", desc: "Draft professional emails in the right tone in seconds.", icon: Mail },
  { to: "/meeting", title: "Meeting Notes Summarizer", desc: "Turn raw notes into decisions, action items and deadlines.", icon: FileText },
  { to: "/chatbot", title: "AI Chatbot", desc: "Ask workplace questions and get instant help.", icon: MessageSquare },
] as const;

function Dashboard() {
  return (
    <div>
      <div className="mb-8 rounded-2xl bg-sidebar p-6 text-sidebar-foreground shadow-soft md:p-8">
        <p className="text-sm opacity-70">Welcome back 👋</p>
        <h1 className="mt-1 text-2xl font-bold md:text-3xl">Your AI Workplace Productivity Assistant</h1>
        <p className="mt-2 max-w-xl opacity-80">Pick a tool below to save time on everyday work.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {tools.map(({ to, title, desc, icon: Icon }) => (
          <Link key={to} to={to} className="group">
            <Card className="h-full border-2 transition group-hover:border-primary">
              <div className="mb-4 inline-flex rounded-xl bg-accent p-3 text-accent-foreground"><Icon className="h-6 w-6" /></div>
              <h2 className="font-semibold text-sidebar">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
