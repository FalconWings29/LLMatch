import { ModelCategory } from "./ai-analyzer";

// ─── Example prompts ─────────────────────────────────────────────────────────

export const EXAMPLE_PROMPTS = [
  "Summarize legal contracts and extract key clauses",
  "Generate a photorealistic product image from a description",
  "Create a 30-second promotional video from a script",
  "Clone a voice and narrate a podcast episode",
  "Transcribe and translate a customer support call in real-time",
  "Generate background music for a meditation app",
  "Build a coding assistant that completes TypeScript functions",
  "Semantic search across 10,000 support documents",
  "Answer customer questions using live web data with citations",
];

// ─── Category metadata ────────────────────────────────────────────────────────

export type CategoryStyle = {
  label: string;
  icon: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  iconBg: string;
};

export const CATEGORY_STYLES: Record<ModelCategory | "default", CategoryStyle> = {
  llm: {
    label: "Large Language Model", icon: "🧠",
    badgeBg: "rgba(139,92,246,0.12)", badgeBorder: "rgba(139,92,246,0.35)", badgeText: "#a78bfa",
    iconBg: "rgba(139,92,246,0.12)",
  },
  image_gen: {
    label: "Image Generation", icon: "🎨",
    badgeBg: "rgba(236,72,153,0.12)", badgeBorder: "rgba(236,72,153,0.35)", badgeText: "#f472b6",
    iconBg: "rgba(236,72,153,0.12)",
  },
  video_gen: {
    label: "Video Generation", icon: "🎬",
    badgeBg: "rgba(249,115,22,0.12)", badgeBorder: "rgba(249,115,22,0.35)", badgeText: "#fb923c",
    iconBg: "rgba(249,115,22,0.12)",
  },
  audio_tts: {
    label: "Text-to-Speech", icon: "🔊",
    badgeBg: "rgba(234,179,8,0.12)", badgeBorder: "rgba(234,179,8,0.35)", badgeText: "#facc15",
    iconBg: "rgba(234,179,8,0.12)",
  },
  speech_recognition: {
    label: "Speech Recognition", icon: "🎙️",
    badgeBg: "rgba(234,179,8,0.12)", badgeBorder: "rgba(234,179,8,0.35)", badgeText: "#fde047",
    iconBg: "rgba(234,179,8,0.12)",
  },
  music_gen: {
    label: "Music Generation", icon: "🎵",
    badgeBg: "rgba(239,68,68,0.12)", badgeBorder: "rgba(239,68,68,0.35)", badgeText: "#f87171",
    iconBg: "rgba(239,68,68,0.12)",
  },
  multimodal: {
    label: "Multimodal", icon: "✨",
    badgeBg: "rgba(6,182,212,0.12)", badgeBorder: "rgba(6,182,212,0.35)", badgeText: "#22d3ee",
    iconBg: "rgba(6,182,212,0.12)",
  },
  embedding: {
    label: "Embeddings", icon: "🔗",
    badgeBg: "rgba(20,184,166,0.12)", badgeBorder: "rgba(20,184,166,0.35)", badgeText: "#2dd4bf",
    iconBg: "rgba(20,184,166,0.12)",
  },
  code_gen: {
    label: "Code Generation", icon: "💻",
    badgeBg: "rgba(16,185,129,0.12)", badgeBorder: "rgba(16,185,129,0.35)", badgeText: "#34d399",
    iconBg: "rgba(16,185,129,0.12)",
  },
  realtime: {
    label: "Real-time / Streaming", icon: "⚡",
    badgeBg: "rgba(59,130,246,0.12)", badgeBorder: "rgba(59,130,246,0.35)", badgeText: "#60a5fa",
    iconBg: "rgba(59,130,246,0.12)",
  },
  default: {
    label: "AI Model", icon: "🤖",
    badgeBg: "rgba(255,255,255,0.05)", badgeBorder: "rgba(255,255,255,0.12)", badgeText: "#94a3b8",
    iconBg: "rgba(255,255,255,0.05)",
  },
};
