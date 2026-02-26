# LLMatch — AI Model Finder

Describe your use case. Get the best AI model recommendation across 100+ models — LLMs, image gen, video, audio, code, embeddings, and more — with an optimized, copy-paste-ready prompt.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Add your Anthropic API key
cp .env.example .env.local
# → open .env.local and paste your ANTHROPIC_API_KEY

# 3. Start the dev server
npm run dev
# → open http://localhost:3000
```

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS 3 + Geist fonts |
| Language | TypeScript (strict) |

## Project Structure

```
llmatch/
├── src/
│   ├── app/
│   │   ├── page.tsx               ← Main page (state + layout)
│   │   ├── layout.tsx             ← Root HTML, fonts, metadata
│   │   ├── globals.css            ← Tailwind base + grid bg + animations
│   │   └── api/analyze/route.ts  ← POST /api/analyze → calls Claude
│   ├── components/
│   │   ├── ScenarioInput.tsx      ← Textarea + Enter-to-submit + example chips
│   │   └── ResultsPanel.tsx      ← Model card + accordion reasons + prompt
│   └── lib/
│       ├── ai-analyzer.ts         ← Types + client-side fetch helper
│       ├── constants.ts           ← Example prompts + category styles
│       └── utils.ts               ← cn() Tailwind helper
├── .env.example                   ← Copy to .env.local and fill in key
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── package.json
```

## Model Coverage

80+ models across 10 categories:
- **LLMs**: Claude, GPT-4o, Gemini, Llama, Mistral, DeepSeek, Grok, Perplexity Sonar
- **Image Gen**: FLUX.1, Imagen 3, DALL-E 3, Midjourney, Ideogram, Firefly
- **Video Gen**: Sora, Veo 2, Kling, Runway Gen-3, Pika
- **Audio/TTS**: ElevenLabs, OpenAI TTS, Google WaveNet, Play.ht
- **ASR**: Whisper, Deepgram Nova 2, AssemblyAI, Rev AI
- **Music**: Suno v4, Udio, MusicGen
- **Multimodal**: GPT-4o, Gemini 1.5 Pro, Claude 3.5 Sonnet
- **Embeddings**: text-embedding-3-large, Voyage AI 3, Cohere Embed
- **Code**: Codestral, DeepSeek-Coder V2, Qwen2.5-Coder, Copilot
- **Realtime**: Gemini 2.0 Flash Live, GPT-4o Realtime, Deepgram streaming
