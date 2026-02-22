import { QUESTIONS_PROMPT } from "@/lib/constants";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

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
    const { description } = body;

    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (description.trim().length < 10) {
      return NextResponse.json({ error: "Description too short" }, { status: 400 });
    }
    if (description.length > 2000) {
      return NextResponse.json({ error: "Description too long (max 2000 characters)" }, { status: 400 });
    }

    // ── Generate questions ───────────────────────────────────────────────────
    const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{individualDescription}}", description.trim());

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "mistralai/mixtral-8x7b-instruct",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    const message = completion?.choices?.[0]?.message?.content || "No response";
    return NextResponse.json({ result: message });

  } catch (e) {
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
