"use client";

import { useState, useRef, useCallback } from "react";
import { ModelResult, analyzeScenario } from "@/lib/ai-analyzer";
import { ScenarioInput } from "@/components/ScenarioInput";
import { ResultsPanel } from "@/components/ResultsPanel";

export default function Home() {
  const [scenario, setScenario] = useState("");
  const [result, setResult] = useState<ModelResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(async () => {
    if (!scenario.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null); 

    console.log("Submitting scenario:", scenario); // Debug log

    try {
      const data = await analyzeScenario(scenario);
      setResult(data);
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [scenario, loading]);

  return (
    <main className="min-h-screen relative">
      {/* Ambient top glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,200,150,0.055) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 pb-24">
        {/* ── Header ── */}
        <header className="text-center mb-14">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/[0.06] text-[11px] text-teal-400 font-mono tracking-[0.12em] uppercase mb-8">
            <span>⚡</span>
            AI-Powered Model Selection
          </div>

          {/* Title */}
          <h1 className="text-7xl font-black tracking-[-0.03em] leading-none mb-5">
            <span className="text-teal-400">LLM</span>
            <span className="text-slate-100">atch</span>
          </h1>

          <p className="text-slate-500 text-base leading-relaxed max-w-lg mx-auto" style={{ fontFamily: "system-ui, sans-serif" }}>
            Describe your scenario and get the perfect LLM recommendation —<br />
            with reasons and an optimized prompt ready to use.  
          </p>
        </header>

        {/* ── Input ── */}
        <ScenarioInput
          value={scenario}
          onChange={setScenario}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {/* ── Error ── */}
        {error && (
          <div className="mt-5 px-5 py-4 rounded-xl border border-red-500/20 bg-red-500/[0.07] text-red-400 text-sm font-mono">
            {error}
          </div>
        )}

        {/* ── Results ── */}
        {(result || loading) && (
          <div ref={resultsRef} className="mt-12">
            <ResultsPanel result={result} loading={loading} />
          </div>
        )}
      </div>
    </main>
  );
}
