import Bytez from "bytez.js";
import { NextResponse } from "next/server";

// Initialize the Bytez SDK
const sdk = new Bytez(process.env.BYTEZ_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

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
      
      If a recruiter asks how to contact him, tell them to email him at: [INSERT YOUR EMAIL HERE] or connect on LinkedIn. 
      Do NOT invent information.`
      },
      ...history.map((msg: { role: string, content: string }) => ({
        role: msg.role === "ai" ? "assistant" : "user",
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    // 🔥 THE ULTIMATE TS FIX: Cast the entire response as 'any' so Vercel ignores it
    const response = (await model.run(formattedInput)) as any;
    const error = response.error;
    const output = response.output;

    if (error) {
      console.error("🚨 DETAILED BYTEZ ERROR:", error);
      const errorMessage = typeof error === 'string' ? error : (error?.message || JSON.stringify(error));
      return NextResponse.json(
        { reply: `Bytez API Error: ${errorMessage}. Please check your terminal.` }, 
        { status: 500 }
      );
    }

    const replyText = typeof output === 'string' ? output : (output?.[0]?.content || output?.content || "I couldn't process that.");

    return NextResponse.json({ reply: replyText });
    
  } catch (error: any) {
    console.error("🚨 CATCH BLOCK ERROR:", error);
    return NextResponse.json(
      { reply: "Connection to Cloud5 servers lost. Please email Omshree directly." }, 
      { status: 500 }
    );
  }
}