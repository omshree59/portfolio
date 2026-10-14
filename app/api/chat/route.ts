import Bytez from "bytez.js";
import { NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIp,
  verifyCsrfOrigin,
  sanitizeText,
} from "@/lib/security";

// Initialize Bytez SDK strictly server-side
const sdk = new Bytez(process.env.BYTEZ_API_KEY || "");

export async function POST(req: Request) {
  try {
    // 1. CSRF Origin Verification
    if (!verifyCsrfOrigin(req)) {
      return NextResponse.json(
        { error: "Forbidden: Cross-site request rejected." },
        { status: 403 }
      );
    }

    // 2. IP Rate Limiting (Max 20 requests per minute)
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`chat_${clientIp}`, 20, 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { reply: "Rate limit reached. Please wait a moment before sending more messages." },
        { status: 429 }
      );
    }

    // 3. Parse & Validate Payload
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ reply: "Invalid request payload." }, { status: 400 });
    }

    const { message, history } = body;
    const cleanMessage = sanitizeText(message, 800);

    if (!cleanMessage) {
      return NextResponse.json({ reply: "Message cannot be empty." }, { status: 400 });
    }

    // Sanitize & limit conversation history (max 10 recent messages)
    const cleanHistory = Array.isArray(history)
      ? history.slice(-10).map((msg: any) => ({
          role: msg?.role === "ai" ? "assistant" : "user",
          content: sanitizeText(msg?.content, 800),
        }))
      : [];

    const model = sdk.model("meta-llama/Meta-Llama-3-8B-Instruct");

    const formattedInput = [
      {
        role: "system",
        content: `You are Cloud5, the personal AI assistant and digital representative for Omshree Parida. 
      Your tone is professional, confident, helpful, and slightly futuristic. 
      Keep responses concise (1-3 sentences) unless asked for details.

      Here is the information you know about Omshree:
      - He is a 21-year-old 2nd-year Bachelor's degree student.
      - He is a Software Engineer specializing in AI/Machine Learning, Next.js, Python, C/C++, and Data Structures.
      - Key Projects: CivicFix AI (platform for civic issues), Cloud5 (custom AI chatbot), and NeuralShield-AI (spam filtering).
      - Experience: Cloud Arcade Program (Google Cloud), Web Dev Intern at CodSoft, Hackathon competitor (TechSpirit).
      - Hobbies: Gaming (Modern Warfare 3, Hogwarts Legacy), watching K-Dramas, cinematography, and Open Source (Wagtail).
      
      If a recruiter asks how to contact him, tell them to email him directly at paridaomshree@gmail.com or connect on LinkedIn. 
      Do NOT invent personal information or secrets.`,
      },
      ...cleanHistory,
      { role: "user", content: cleanMessage },
    ];

    const response = (await model.run(formattedInput)) as any;
    const error = response?.error;
    const output = response?.output;

    if (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Bytez API Error:", error);
      }
      return NextResponse.json(
        { reply: "Cloud5 is operating in offline mode. You can email Omshree directly at paridaomshree@gmail.com!" },
        { status: 500 }
      );
    }

    const replyText =
      typeof output === "string"
        ? output
        : output?.[0]?.content || output?.content || "I couldn't process that.";

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Chat route error:", error);
    }
    return NextResponse.json(
      { reply: "Connection to Cloud5 temporarily unavailable. Please reach Omshree at paridaomshree@gmail.com." },
      { status: 500 }
    );
  }
}