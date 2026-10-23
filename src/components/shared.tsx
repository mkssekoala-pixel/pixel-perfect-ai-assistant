import { Loader2, Copy, RefreshCw, Download, Check, AlertCircle } from "lucide-react";
import { useState, type ReactNode } from "react";

export const inputCls =
  "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90 disabled:opacity-50";
export const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:bg-accent disabled:opacity-50";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-secondary bg-card p-5 shadow-soft md:p-6 ${className}`}>{children}</div>;
}

export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-sidebar md:text-3xl">{title}</h1>
      <p className="mt-1 text-muted-foreground">{subtitle}</p>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-sidebar">{label}</span>
      {children}
    </label>
  );
}

export function Spinner({ text = "Generating…" }: { text?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin text-primary" /> {text}
    </div>
  );
}

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
      <AlertCircle className="h-4 w-4" />
      <span className="flex-1">{message}</span>
      <button className={btnOutline} onClick={onRetry}><RefreshCw className="h-4 w-4" /> Retry</button>
    </div>
  );
}

export function OutputPanel({
  value, onChange, onRegenerate, filename, loading,
}: { value: string; onChange: (v: string) => void; onRegenerate: () => void; filename: string; loading: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Card>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold text-sidebar">Result (editable)</h2>
        <div className="flex flex-wrap gap-2">
          <button className={btnOutline} onClick={copy}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy"}</button>
          <button className={btnOutline} onClick={onRegenerate} disabled={loading}><RefreshCw className="h-4 w-4" /> Regenerate</button>
          <button className={btnOutline} onClick={download}><Download className="h-4 w-4" /> Download</button>
        </div>
      </div>
      <textarea className={`${inputCls} min-h-80 font-mono leading-relaxed`} value={value} onChange={(e) => onChange(e.target.value)} />
    </Card>
  );
}
