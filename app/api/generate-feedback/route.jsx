import OpenAI from "openai";
import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

const FEEDBACK_PROMPT = (transcriptText, outcome) => `
You are an expert F-1 student visa interview coach. Analyze the following mock visa interview transcript and provide structured feedback.

Outcome of this interview: ${outcome}

Transcript:
${transcriptText}

Respond with ONLY a valid JSON object (no markdown, no code fences) in this exact format:
{
  "score": <integer 1-10>,
  "summary": "<2-3 sentence overall assessment>",
  "strongPoints": ["<point 1>", "<point 2>", "<point 3>"],
  "weakPoints": ["<point 1>", "<point 2>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]
}

Scoring guide:
- 9-10: Excellent — clear, confident, well-prepared answers
- 7-8: Good — mostly strong with minor issues
- 5-6: Average — some good answers but notable gaps
- 3-4: Needs work — recurring issues with clarity or credibility
- 1-2: Poor — significant problems that would likely result in denial

Be specific and actionable. Reference actual content from the transcript where possible.
`.trim();

export async function POST(request) {
  try {
    // ── Auth check ──────────────────────────────────────────────────────────
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.slice(7);
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ── Input validation ─────────────────────────────────────────────────────
    const body = await request.json();
    const { transcript, outcome } = body;

    if (!Array.isArray(transcript) || transcript.length === 0) {
      return NextResponse.json({ error: "Missing transcript" }, { status: 400 });
    }

    // ── Build transcript string ──────────────────────────────────────────────
    const transcriptText = transcript
      .map((turn) => `${turn.role === "assistant" ? "Officer Mitchell" : "Applicant"}: ${turn.text}`)
      .join("\n");

    // ── Call OpenRouter ──────────────────────────────────────────────────────
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "mistralai/mixtral-8x7b-instruct",
      messages: [{ role: "user", content: FEEDBACK_PROMPT(transcriptText, outcome || "unknown") }],
    });

    let raw = completion?.choices?.[0]?.message?.content || "";

    // Strip markdown fences defensively
    raw = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

    let feedback;
    try {
      feedback = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Failed to parse feedback" }, { status: 500 });
    }

    // Clamp score to 1–10
    feedback.score = Math.max(1, Math.min(10, Math.round(Number(feedback.score) || 5)));

    // Ensure arrays exist
    feedback.strongPoints = Array.isArray(feedback.strongPoints) ? feedback.strongPoints : [];
    feedback.weakPoints = Array.isArray(feedback.weakPoints) ? feedback.weakPoints : [];
    feedback.improvements = Array.isArray(feedback.improvements) ? feedback.improvements : [];

    return NextResponse.json({ feedback });

  } catch {
    return NextResponse.json({ error: "Failed to generate feedback" }, { status: 500 });
  }
}
