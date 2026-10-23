import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Mail, FileText, MessageSquare, Menu, X, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/meeting", label: "Meeting Summarizer", icon: FileText },
  { to: "/chatbot", label: "AI Chatbot", icon: MessageSquare },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-background">
      {open && (
        <div className="fixed inset-0 z-30 bg-foreground/40 md:hidden" onClick={() => setOpen(false)} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-sidebar-border px-5 py-5">
          <div className="flex items-center gap-2 font-semibold">
            <Sparkles className="h-5 w-5 text-sidebar-primary" />
            <span className="leading-tight">AI Workplace<br /><span className="text-xs font-normal opacity-70">Productivity Assistant</span></span>
          </div>
          <button className="md:hidden" onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button>
        </div>
        <nav className="space-y-1 p-3">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = path === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent"}`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-secondary bg-card px-4 py-3 md:hidden">
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-md border border-border p-2">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-semibold text-sidebar">AI Workplace Assistant</span>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 p-4 md:p-8">{children}</main>
        <footer className="border-t border-secondary px-4 py-4 text-center text-xs text-muted-foreground">
          <strong>Responsible AI:</strong> AI-generated content may be inaccurate or biased. Review and edit before use. Do not enter confidential or sensitive data.
        </footer>
      </div>
    </div>
  );
}
