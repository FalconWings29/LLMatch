"use client";

import { useState } from "react";
import { ModelResult, ModelCategory } from "@/lib/ai-analyzer";
import { CATEGORY_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  result: ModelResult | null;
  loading: boolean;
}

function getCat(cat?: string) {
  return CATEGORY_STYLES[(cat as ModelCategory) ?? "default"] ?? CATEGORY_STYLES.default;
}

export function ResultsPanel({ result, loading }: Props) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggle = (i: number) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  const copy = async () => {
    if (!result?.primary.prompt) return;
    await navigator.clipboard.writeText(result.primary.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <Skeleton />;
  if (!result) return null;

  const { primary, runner_up } = result;
  const cat = getCat(primary.category);

  return (
    <div className="space-y-4 animate-fade-up">
      {/* Main recommendation card */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden shadow-2xl shadow-black/50">

        {/* Model header */}
        <div className="px-7 pt-7 pb-6 border-b border-white/[0.05]">
          <div className="flex items-start gap-5">
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border"
              style={{ background: cat.iconBg, borderColor: cat.badgeBorder }}
            >
              {cat.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-mono tracking-[0.15em] text-teal-400 uppercase mb-1.5">Best Fit</p>
              <h2 className="text-3xl font-black tracking-tight text-slate-100 leading-none mb-3">{primary.model}</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono border border-white/10 text-slate-400 tracking-wide">
                  {primary.provider}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono border tracking-wide"
                  style={{ background: cat.badgeBg, borderColor: cat.badgeBorder, color: cat.badgeText }}
                >
                  {cat.label}
                </span>
              </div>
              {primary.access && (
                <p className="text-xs text-slate-500 mt-3 font-mono leading-relaxed">{primary.access}</p>
              )}
            </div>
          </div>
        </div>

        {/* Why this model */}
        <div className="px-7 py-6 border-b border-white/[0.05]">
          <p className="text-[11px] font-mono tracking-[0.15em] text-slate-600 uppercase mb-4">Why This Model</p>
          <div className="space-y-2.5">
            {primary.reasons.map((r, i) => (
              <div
                key={i}
                onClick={() => toggle(i)}
                className={cn(
                  "rounded-xl border cursor-pointer transition-all duration-200 overflow-hidden",
                  expanded[i]
                    ? "border-teal-500/20 bg-teal-500/[0.04]"
                    : "border-white/[0.05] bg-white/[0.02] hover:border-white/10"
                )}
              >
                <div className="flex items-center gap-3 px-5 py-3.5">
                  <span
                    className={cn(
                      "text-teal-400 text-base transition-transform duration-200 flex-shrink-0",
                      expanded[i] ? "rotate-90" : ""
                    )}
                  >
                    ›
                  </span>
                  <span className="text-sm font-bold text-slate-200 font-mono">
                    {typeof r === "string" ? `Reason ${i + 1}` : r.title}
                  </span>
                </div>
                {expanded[i] && (
                  <p className="px-5 pb-4 pl-12 text-sm text-slate-400 leading-relaxed font-mono">
                    {typeof r === "string" ? r : r.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Optimized prompt */}
        <div className="px-7 py-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-mono tracking-[0.15em] text-slate-600 uppercase">Optimized Prompt</p>
            <button
              onClick={copy}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200",
                copied
                  ? "border-teal-500/30 bg-teal-500/10 text-teal-400"
                  : "border-white/[0.08] bg-white/[0.03] text-slate-500 hover:text-slate-300 hover:border-white/15"
              )}
            >
              {copied ? "✓ Copied" : "⊡ Copy"}
            </button>
          </div>
          <div className="rounded-xl bg-black/50 border border-white/[0.05] p-5">
            <pre className="text-sm text-cyan-300/80 font-mono leading-relaxed whitespace-pre-wrap break-words">
              {primary.prompt}
            </pre>
          </div>
        </div>
      </div>

      {/* Runner-up */}
      {runner_up && (
        <div className="rounded-xl border border-white/[0.05] bg-white/[0.015] px-6 py-5">
          <p className="text-[11px] font-mono tracking-[0.15em] text-slate-600 uppercase mb-3">Runner-up</p>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-base font-bold text-slate-300 font-mono">{runner_up.model}</span>
            <span className="text-slate-600 text-sm">· {runner_up.provider}</span>
            {runner_up.category && (() => {
              const rc = getCat(runner_up.category);
              return (
                <span
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border"
                  style={{ background: rc.badgeBg, borderColor: rc.badgeBorder, color: rc.badgeText }}
                >
                  {rc.label}
                </span>
              );
            })()}
          </div>
          <p className="text-sm text-slate-500 leading-relaxed font-mono">{runner_up.reason}</p>
        </div>
      )}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-7 space-y-5 animate-pulse">
      <div className="flex gap-4">
        <div className="w-14 h-14 rounded-xl bg-white/[0.05] flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-3 w-16 bg-white/[0.05] rounded" />
          <div className="h-7 w-52 bg-white/[0.08] rounded" />
          <div className="flex gap-2">
            <div className="h-5 w-24 bg-white/[0.05] rounded-full" />
            <div className="h-5 w-32 bg-white/[0.05] rounded-full" />
          </div>
        </div>
      </div>
      <div className="space-y-2.5 pt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-white/[0.03] rounded-xl" />
        ))}
      </div>
      <div className="rounded-xl bg-black/40 p-5 space-y-2.5">
        {[100, 88, 92, 70].map((w, i) => (
          <div key={i} className="h-3 bg-white/[0.04] rounded" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}
