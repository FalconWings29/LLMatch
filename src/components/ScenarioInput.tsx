"use client";

import { useRef, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { EXAMPLE_PROMPTS } from "@/lib/constants";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export function ScenarioInput({ value, onChange, onSubmit, loading }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="space-y-4">
      {/* Input card */}
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] overflow-hidden transition-colors duration-300 focus-within:border-teal-500/30">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder="I want to..."
          rows={4}
          disabled={loading}
          className="w-full bg-transparent px-6 pt-6 pb-2 text-slate-200 placeholder:text-slate-600 text-[15px] leading-relaxed resize-none outline-none font-mono"
        />
        <div className="flex items-center justify-between px-5 pb-5 pt-2">
          <span className="text-slate-600 text-xs font-mono tracking-wide">
            {value.length} chars · Shift+Enter for new line
          </span>
          <button
            onClick={onSubmit}
            disabled={!value.trim() || loading}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold font-mono tracking-wide transition-all duration-200",
              value.trim() && !loading
                ? "bg-teal-400 text-[#0a0f0f] hover:bg-teal-300 shadow-lg shadow-teal-900/30"
                : "bg-white/5 text-slate-600 cursor-not-allowed"
            )}
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-black/20 border-t-black/70 rounded-full animate-spin-slow" />
                Analyzing...
              </>
            ) : (
              "Find Model →"
            )}
          </button>
        </div>
      </div>

      {/* Example chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-slate-600 text-xs font-mono mr-1 tracking-wider">Try:</span>
        {EXAMPLE_PROMPTS.map((ex) => (
          <button
            key={ex}
            onClick={() => onChange(ex)}
            className="px-3.5 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-teal-500/25 text-slate-500 hover:text-slate-300 text-xs font-mono transition-all duration-200 max-w-xs truncate"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}
