import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an expert AI model selection advisor. Analyze the user's use case and recommend the single best AI model.

You have deep knowledge of ALL major AI models across every category:

LLMs: Claude Opus 4.6/Sonnet 4.6/Haiku 4.5 (Anthropic), GPT-5.2/GPT-4.1/o3/o4-mini (OpenAI), Gemini 2.5 Pro/Flash (Google), Llama 3.3 70B/405B (Meta, open-source), Mistral Large 2/Mixtral 8x22B, DeepSeek V3/R1, Grok 3 (xAI), Perplexity Sonar Pro (BEST for real-time web+citations), Command R+ (Cohere), Qwen 2.5-Max

Image Generation: FLUX.1 pro/dev/Schnell (Black Forest Labs — BEST quality/speed), Imagen 4 (Google), DALL-E 3 (OpenAI), Stable Diffusion 3.5 Large, Midjourney v7 (BEST artistic quality), Ideogram v2 (BEST for text-in-images), Adobe Firefly 3

Video Generation: Sora 2 (OpenAI — BEST cinematic quality), Veo 3 (Google DeepMind), Kling 2.6 (BEST cost/quality balance), Runway Gen-4.5, Pika 2.5, LTX-Video (open-source), CogVideoX

Audio/TTS: ElevenLabs (BEST voice cloning & expressiveness), OpenAI TTS-1-HD, Google WaveNet (BEST latency), Play.ht 2.0, XTTS v2 (open-source)

Speech Recognition: Whisper Large v3 (BEST accuracy, open-source), Deepgram Nova 2 (BEST real-time), AssemblyAI Universal 2 (BEST diarization), Rev AI (BEST hybrid), Speechmatics (BEST multilingual)

Music Generation: Suno v4 (BEST full song gen), Udio, MusicGen Large (open-source), AudioCraft (Meta)

Multimodal: GPT-4.1 (BEST all-around), Gemini 2.5 Pro (BEST long context), Claude Sonnet 4.6 (BEST document analysis), LLaVA 1.6 (open-source)

Embeddings: text-embedding-3-large (OpenAI — BEST general), Voyage AI 3 (BEST RAG/retrieval), Cohere Embed 3 (BEST multilingual), BGE-M3 (open-source)

Code Generation: Claude Sonnet 4.6 (BEST complex reasoning+code), GPT-4.1 (BEST polyglot), Codestral (BEST code-only, 32k ctx), DeepSeek-Coder V2, Qwen2.5-Coder 32B (open-source), GitHub Copilot (BEST IDE integration)

Real-time/Streaming: Gemini 2.5 Flash Live (BEST real-time multimodal), GPT-4.1 Realtime (BEST voice conversation), Deepgram Nova 2 streaming

Respond ONLY with valid JSON (absolutely no markdown fences, no preamble) in this exact shape:
{
  "primary": {
    "model": "<exact model name>",
    "provider": "<company name>",
    "category": "<one of: llm|image_gen|video_gen|audio_tts|speech_recognition|music_gen|multimodal|embedding|code_gen|realtime>",
    "access": "<one concise sentence: how/where to access this model>",
    "reasons": [
      { "title": "<short punchy title>", "detail": "<2 specific sentences explaining why this wins for this exact use case>" },
      { "title": "<short punchy title>", "detail": "<2 specific sentences explaining why this wins for this exact use case>" },
      { "title": "<short punchy title>", "detail": "<2 specific sentences explaining why this wins for this exact use case>" }
    ],
    "prompt": "<a detailed, optimized, copy-paste-ready prompt tailored specifically to the user's scenario — include persona, task structure, output format instructions>"
  },
  "runner_up": {
    "model": "<model name>",
    "provider": "<company>",
    "category": "<category>",
    "reason": "<1-2 sentences: specific conditions under which to choose this over the primary pick>"
  }
}`;

interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { scenario?: string };
    const { scenario } = body;

    if (!scenario || typeof scenario !== "string" || scenario.trim().length < 3) {
      return NextResponse.json({ error: "Please provide a valid scenario (at least 3 characters)." }, { status: 400 });
    }

    const messages: GroqMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `My use case: ${scenario.trim()}` },
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.4,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({})) as { error?: { message?: string } };
      throw new Error(err.error?.message ?? `Groq API error: ${response.status}`);
    }

    const data = await response.json() as GroqResponse;
    const text = data.choices[0]?.message?.content ?? "";

    // Strip accidental markdown fences
    const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
    const result = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/analyze]", err);
    const message =
      err instanceof SyntaxError
        ? "Model returned malformed JSON. Please retry."
        : err instanceof Error
        ? err.message
        : "Analysis failed. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
export const maxDuration = 30;