import { QUESTIONS_PROMPT } from "@/services/Constants";
import  OpenAI  from "openai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { country, description, duration } = body;

    if (!country || !description || !duration) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Build your final prompt from the template
    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace("{{theTargetCountry}}", country)
      .replace("{{individualDescription}}", description)
      .replace("{{duration}}", duration);

    // Initialize OpenRouter / OpenAI client
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    // Generate questions
    const completion = await openai.chat.completions.create({
      model: "mistralai/mixtral-8x7b-instruct",
      messages: [
        { role: "user", content: FINAL_PROMPT },
      ],
    });

    // Extract text safely
    const message = completion?.choices?.[0]?.message?.content || "No response";
    

    console.log(" Generated message:", message);
    return NextResponse.json({ result: message });

  } catch (e) {
    console.error(" Error generating questions:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
