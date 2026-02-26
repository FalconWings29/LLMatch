// ─── Types ────────────────────────────────────────────────────────────────────

export type ModelCategory =
  | "llm"
  | "image_gen"
  | "video_gen"
  | "audio_tts"
  | "speech_recognition"
  | "music_gen"
  | "multimodal"
  | "embedding"
  | "code_gen"
  | "realtime";

export interface ReasonItem {
  title: string;
  detail: string;
}

export interface PrimaryModel {
  model: string;
  provider: string;
  category: ModelCategory;
  access: string;
  reasons: ReasonItem[];
  prompt: string;
}

export interface RunnerUp {
  model: string;
  provider: string;
  category: ModelCategory;
  reason: string;
}

export interface ModelResult {
  primary: PrimaryModel;
  runner_up: RunnerUp | null;
}

// ─── Client fetch ─────────────────────────────────────────────────────────────

export async function analyzeScenario(scenario: string): Promise<ModelResult> {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scenario }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<ModelResult>;
}
