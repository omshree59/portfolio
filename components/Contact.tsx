"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Mail, CheckCircle2, AlertCircle, Loader2, X, MessageSquare, ArrowRight } from "lucide-react";
import ParticleEffectWrapper from "@/components/ui/particle-effect-for-hero";
import TextType from "./TextType";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  isConnectForm?: boolean;
  formStatus?: "idle" | "sending" | "sent" | "error";
  sentData?: { email: string; message: string };
  errorMessage?: string;
  options?: string[];
  mailtoUrl?: string;
  isSimulated?: boolean;
};

type ConnectState = {
  step: "idle" | "awaiting_email" | "awaiting_message" | "sending";
  email: string;
  message: string;
};

export default function Contact() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      content:
        "System online. I am Cloud5, Omshree's personal AI agent. You can ask me about his tech stack, his latest projects, or ask to connect directly with him. What's on your mind?",
      options: ["Connect me to Omshree ✉", "What is his tech stack? ⚡", "Tell me about his projects 🚀"]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [connectState, setConnectState] = useState<ConnectState>({
    step: "idle",
    email: "",
    message: ""
  });

  // Inline form state (for direct card entry in chat)
  const [cardEmail, setCardEmail] = useState("");
  const [cardMessage, setCardMessage] = useState("");
  const [cardError, setCardError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, isLoading, connectState.step]);

  // Helper validation functions
  const isValidEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
  };

  const extractEmail = (text: string) => {
    const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    return match ? match[0] : null;
  };

  const isConnectIntent = (userInput: string) => {
    const lower = userInput.toLowerCase().trim();
    if (/\b(cancel|exit|quit|stop)\b/.test(lower)) return false;
    return (
      /\bconnect(\s+me)?(\s+(to|with))?\s*(omshree|him)?\b/.test(lower) ||
      /\b(contact|reach|talk\s+to|speak\s+with|email|mail|message)\s*(to\s*)?omshree\b/.test(lower) ||
      /\bconnect\s*me\b/.test(lower) ||
      /\bconnect\s*to\s*omshree\b/.test(lower) ||
      /\bsend\s*(an?\s*)?(email|mail|message)\s*to\s*omshree\b/.test(lower) ||
      /\bhow\s*(can\s*i|to)\s*(connect|contact|reach|email)\s*(omshree|him)\b/.test(lower) ||
      lower === "connect" ||
      lower.includes("connect me to omshree")
    );
  };

  // Dispatch email to /api/send-email
  const executeSendEmail = async (senderEmail: string, senderMessage: string) => {
    setIsLoading(true);
    setConnectState((prev) => ({ ...prev, step: "sending" }));

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: senderEmail.trim(),
          message: senderMessage.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to deliver message.");
      }

      // Mark any connect form in chat as sent
      setMessages((prev) =>
        prev.map((msg) =>
          msg.isConnectForm
            ? {
                ...msg,
                formStatus: "sent",
                sentData: { email: senderEmail, message: senderMessage },
                isSimulated: data.simulated,
              }
            : msg
        )
      );

      const mailtoLink = `mailto:paridaomshree@gmail.com?subject=${encodeURIComponent(
        `Portfolio Message from ${senderEmail}`
      )}&body=${encodeURIComponent(senderMessage)}`;

      if (data.simulated) {
        // App password / credentials not added yet
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            role: "ai",
            content: `⚠️ Note: Credentials not configured yet in .env.local.\n\nYour message from ${senderEmail} was logged to the terminal, but to receive real emails in your Gmail inbox at paridaomshree@gmail.com, you must set EMAIL_USER and EMAIL_PASS in .env.local.\n\nYou can also click the button below to dispatch it through your email client right now:`,
            mailtoUrl: mailtoLink,
            options: ["Tell me about his projects 🚀", "What is his tech stack? ⚡"]
          },
        ]);
      } else {
        // Real live email sent!
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            role: "ai",
            content: `✅ Live email sent successfully!\n\nYour message has been delivered to Omshree at paridaomshree@gmail.com.\n\nHe will review your note and write back to ${senderEmail} soon.`,
            options: ["Tell me about his projects 🚀", "What is his tech stack? ⚡"]
          },
        ]);
      }

      setConnectState({ step: "idle", email: "", message: "" });
      setCardEmail("");
      setCardMessage("");
      setCardError("");
    } catch (err: any) {
      console.error("Error sending email:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          role: "ai",
          content: `⚠️ I encountered an issue sending your email: ${err.message || "Network error"}. You can also write directly to paridaomshree@gmail.com!`,
          options: ["Try again", "Ask another question"]
        },
      ]);
      setConnectState({ step: "idle", email: "", message: "" });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle send from the inline card inside the message
  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardEmail.trim()) {
      setCardError("Please provide your email address.");
      return;
    }
    if (!isValidEmail(cardEmail)) {
      setCardError("Please provide a valid email address (e.g. name@domain.com).");
      return;
    }
    if (!cardMessage.trim()) {
      setCardError("Please enter the details of your message.");
      return;
    }

    setCardError("");
    await executeSendEmail(cardEmail, cardMessage);
  };

  // Standard Bot responses for queries outside connection
  const generateBotResponse = (userInput: string): { reply: string; showForm?: boolean; options?: string[] } => {
    const inputLower = userInput.toLowerCase();
    const getRandom = (responses: string[]) => responses[Math.floor(Math.random() * responses.length)];
    const isMatch = (pattern: RegExp) => pattern.test(inputLower);

    // 1. Connection request check
    if (isConnectIntent(userInput)) {
      return {
        reply:
          "I can connect you directly with Omshree! Please enter your email address and message details below, and I'll send it directly to paridaomshree@gmail.com:",
        showForm: true,
      };
    }

    // 2. Small Talk & Greetings
    if (isMatch(/\b(hi|hello|hey|sup|yo|hii+|heyy+|greetings|morning|evening|afternoon)\b/)) {
      return {
        reply: getRandom([
          "Access granted! I'm Cloud5, Omshree's digital twin. What do you want to know about him?",
          "Connection established! I can tell you about Omshree's tech stack, his open-source work, or connect you directly to him. Pick one!",
          "Hey there! I'm running live on Omshree's portfolio. Ask me about his 3D web dev skills or his custom LLM architecture!"
        ]),
        options: ["Connect me to Omshree ✉", "What is his tech stack? ⚡", "What are his projects? 🚀"]
      };
    }

    if (isMatch(/\b(how are you|whats up|what's up|doing well|hows it|how's it)\b/)) {
      return {
        reply: getRandom([
          "I'm just a few lines of JavaScript, but my neural subroutines are running perfectly! How can I help you?",
          "Operating at 100% efficiency! I'm here to answer your questions about Omshree. Where should we start?"
        ]),
        options: ["Connect me to Omshree ✉", "View Tech Stack ⚡"]
      };
    }

    // 3. Projects & Work
    if (isMatch(/\b(project|projects|work|build|builds|portfolio|made|civicfix|civicfixai|git-city|cloud9|app|apps|website|software)\b/)) {
      return {
        reply: getRandom([
          "Omshree has built some wild things! 'CivicFixAI' is a civic-tech app for community issues, and 'Git-city' is a Cyberpunk 3D GitHub visualization using Three.js.",
          "You should check out 'Cloud9'—he built a custom LLM architecture from scratch without external APIs! He also develops stunning 3D web environments.",
          "He's always building. Right now he's prepping for GSoC 2026 with Wagtail, and has built 'Automated-Banking' and 'CivicFixAI'."
        ]),
        options: ["Connect me to Omshree ✉", "What is his tech stack? ⚡"]
      };
    }

    // 4. Tech Stack & Skills
    if (isMatch(/\b(skill|skills|tech|stack|language|languages|react|python|tailwind|three\.js|code|coding|framework|database|backend|frontend|ai|machine learning)\b/)) {
      return {
        reply: getRandom([
          "His core stack is dangerous: React, Next.js, Tailwind CSS, Three.js, Vite, and Python. He thrives at the intersection of complex algorithms and sleek UIs.",
          "He's a full-stack engineer with a heavy focus on AI and 3D environments. Ask him about prompt engineering, LLM architecture, or Big O notation!"
        ]),
        options: ["Connect me to Omshree ✉", "Tell me about his projects 🚀"]
      };
    }

    // 5. Education & Background
    if (isMatch(/\b(education|college|degree|cgpa|university|study|student|who is|about|background|history|learn)\b/)) {
      return {
        reply: getRandom([
          "He's currently crushing his undergrad with an 8.77 CGPA! Long term, he's looking at pursuing a Master's degree abroad in Germany.",
          "Omshree Parida is a 2nd-year software engineering student. He's an active open-source contributor and is always hunting for high-stakes hackathons."
        ]),
        options: ["Connect me to Omshree ✉", "Check his skills ⚡"]
      };
    }

    // 6. Hobbies & Interests
    if (isMatch(/\b(hobby|hobbies|fun|free time|game|games|gaming|k-drama|korean|play|outside|movie|movies|watch)\b/)) {
      return {
        reply: getRandom([
          "When he's offline, he's usually grinding Modern Warfare 3 or studying cinematography.",
          "Believe it or not, he's super into Korean dramas! He's even considered writing K-drama reviews for platforms like Wattpad and Inkitt."
        ]),
        options: ["Connect me to Omshree ✉"]
      };
    }

    // 7. General Contact info
    if (isMatch(/\b(email|reach|hire|message|linkedin|talk|call|resume|cv|social)\b/)) {
      return {
        reply: "You can reach Omshree directly at paridaomshree@gmail.com, or simply type 'Connect me to Omshree' and I will dispatch an email right to his inbox from this chatbox!",
        options: ["Connect me to Omshree ✉"]
      };
    }

    // 8. Broad / Fallback
    return {
      reply: getRandom([
        "That's a unique question! My current dataset doesn't have the exact answer, but Omshree definitely would. Ask me to connect you to Omshree to drop him a message!",
        "I'm still learning how to answer that! If you want to know more, I can dispatch an email directly to Omshree at paridaomshree@gmail.com."
      ]),
      options: ["Connect me to Omshree ✉", "Tell me about his projects 🚀"]
    };
  };

  // Main message submit handler from the chatbox bottom input
  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    // Check for cancel command during connect flow
    if (connectState.step !== "idle" && /\b(cancel|exit|quit|stop)\b/i.test(userMessage)) {
      setConnectState({ step: "idle", email: "", message: "" });
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now()), role: "user", content: userMessage },
        {
          id: String(Date.now() + 1),
          role: "ai",
          content: "Connection request cancelled. How else can I assist you?",
          options: ["Tell me about his projects 🚀", "What is his tech stack? ⚡"]
        }
      ]);
      return;
    }

    // STEP 1: If we are awaiting user's email
    if (connectState.step === "awaiting_email") {
      const detectedEmail = extractEmail(userMessage) || (isValidEmail(userMessage) ? userMessage : null);

      setMessages((prev) => [...prev, { id: String(Date.now()), role: "user", content: userMessage }]);

      if (!detectedEmail) {
        setIsLoading(true);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: String(Date.now()),
              role: "ai",
              content: "Please provide a valid email address (e.g., yourname@domain.com) so Omshree can write back to you, or type 'cancel' to exit."
            }
          ]);
          setIsLoading(false);
        }, 500);
        return;
      }

      setConnectState((prev) => ({
        ...prev,
        step: "awaiting_message",
        email: detectedEmail,
      }));
      setCardEmail(detectedEmail);

      setIsLoading(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now()),
            role: "ai",
            content: `Email noted: ${detectedEmail}.\n\nNow, please enter the details of the message you would like to send to Omshree:`
          }
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    // STEP 2: If we are awaiting the message details
    if (connectState.step === "awaiting_message") {
      setMessages((prev) => [...prev, { id: String(Date.now()), role: "user", content: userMessage }]);
      const emailToSend = connectState.email || cardEmail;
      await executeSendEmail(emailToSend, userMessage);
      return;
    }

    // Standard flow (step === "idle")
    setMessages((prev) => [...prev, { id: String(Date.now()), role: "user", content: userMessage }]);

    // Check if the user is asking to connect to Omshree
    if (isConnectIntent(userMessage)) {
      // Check if user already provided email in their sentence (e.g. "connect me to omshree, my email is test@domain.com")
      const foundEmail = extractEmail(userMessage);

      setIsLoading(true);
      setTimeout(() => {
        if (foundEmail) {
          setConnectState({
            step: "awaiting_message",
            email: foundEmail,
            message: "",
          });
          setCardEmail(foundEmail);
          setMessages((prev) => [
            ...prev,
            {
              id: String(Date.now()),
              role: "ai",
              content: `I've registered your email address (${foundEmail})! What message details would you like to send to Omshree at paridaomshree@gmail.com?`
            }
          ]);
        } else {
          setConnectState({
            step: "awaiting_email",
            email: "",
            message: "",
          });
          setMessages((prev) => [
            ...prev,
            {
              id: String(Date.now()),
              role: "ai",
              content:
                "I'd love to connect you directly with Omshree! Please fill in your email address and message details below, and I'll send it directly to paridaomshree@gmail.com:",
              isConnectForm: true,
              formStatus: "idle",
            }
          ]);
        }
        setIsLoading(false);
      }, 600);
      return;
    }

    // General Chatbot response with typing delay
    setIsLoading(true);
    const typingDelay = Math.floor(Math.random() * 400) + 400;

    setTimeout(() => {
      const { reply, showForm, options } = generateBotResponse(userMessage);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          role: "ai",
          content: reply,
          isConnectForm: showForm,
          formStatus: showForm ? "idle" : undefined,
          options
        }
      ]);

      if (showForm) {
        setConnectState({
          step: "awaiting_email",
          email: "",
          message: "",
        });
      }

      setIsLoading(false);
    }, typingDelay);
  };

  // Quick action chip click
  const handleQuickOption = (option: string) => {
    setInput(option);
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      setInput(option);
      // Directly call sendMessage with the option
      if (isLoading) return;
      setInput("");

      if (option.includes("Connect me to Omshree") || isConnectIntent(option)) {
        setMessages((prev) => [...prev, { id: String(Date.now()), role: "user", content: option }]);
        setIsLoading(true);
        setTimeout(() => {
          setConnectState({
            step: "awaiting_email",
            email: "",
            message: "",
          });
          setMessages((prev) => [
            ...prev,
            {
              id: String(Date.now()),
              role: "ai",
              content:
                "I'd love to connect you directly with Omshree! Please enter your email address and message details below so I can deliver it to paridaomshree@gmail.com:",
              isConnectForm: true,
              formStatus: "idle",
            }
          ]);
          setIsLoading(false);
        }, 500);
      } else {
        setMessages((prev) => [...prev, { id: String(Date.now()), role: "user", content: option }]);
        setIsLoading(true);
        setTimeout(() => {
          const { reply, showForm, options } = generateBotResponse(option);
          setMessages((prev) => [
            ...prev,
            {
              id: String(Date.now()),
              role: "ai",
              content: reply,
              isConnectForm: showForm,
              options
            }
          ]);
          setIsLoading(false);
        }, 500);
      }
    }, 50);
  };

  const cancelConnect = () => {
    setConnectState({ step: "idle", email: "", message: "" });
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        role: "ai",
        content: "Direct connection cancelled. Feel free to ask me anything about Omshree's skills, experience, or projects!",
        options: ["What is his tech stack? ⚡", "Tell me about his projects 🚀"]
      }
    ]);
  };

  return (
    <section className="relative w-full border-t-2 border-cyan-500/50 isolate z-[100] bg-black">
      <ParticleEffectWrapper>
        <div className="w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center py-24 lg:py-32">
          
          {/* Left Column: Description & Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[45%] text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Sparkles size={14} /> Available 24/7
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg min-h-[80px]">
              <TextType
                text="Let's Talk."
                typingSpeed={75}
                loop={false}
                showCursor={true}
                cursorCharacter="|"
                cursorClassName="text-cyan-400"
              />
            </h2>
            <div className="text-zinc-300 text-lg leading-relaxed mb-8 min-h-[90px]">
              <TextType
                text="Traditional contact forms are boring. I built Cloud5, a custom AI agent trained entirely on my resume, skills, and personality."
                typingSpeed={35}
                initialDelay={1500}
                loop={false}
                showCursor={false}
              />
            </div>
            <p className="text-zinc-500 text-sm">
              Ask Cloud5 to <span className="text-cyan-400 font-semibold">&quot;Connect me to Omshree&quot;</span> to deliver a message directly to <span className="text-zinc-300 underline underline-offset-4 decoration-cyan-500/50">paridaomshree@gmail.com</span> right from this chatbox.
            </p>
          </motion.div>

          {/* Right Column: Interactive Chatbox */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[55%] flex justify-center mt-10 lg:mt-0"
          >
            <div
              className="w-full max-w-lg bg-[#0a0a0c]/85 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden relative z-50"
              style={{ height: "570px" }}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-20" />

              {/* Chatbox Header */}
              <div
                className="w-full bg-white/5 border-b border-white/10 flex items-center px-6 gap-4 relative z-10"
                style={{ height: "76px", flexShrink: 0 }}
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-[#111] flex items-center justify-center border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <Bot size={22} className="text-cyan-400" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a0c] rounded-full animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold text-base tracking-wide leading-tight">Cloud5 AI</h3>
                    {connectState.step !== "idle" && (
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full font-mono animate-pulse">
                        DIRECT MAIL MODE
                      </span>
                    )}
                  </div>
                  <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-wider mt-0.5 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    Agent Online • Target: paridaomshree@gmail.com
                  </p>
                </div>
              </div>

              {/* Chatbox Message Stream */}
              <div className="w-full flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-4 custom-scrollbar scroll-smooth relative z-10">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`flex gap-3 max-w-[92%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          msg.role === "user" ? "bg-orange-500" : "bg-[#111] border border-cyan-500/30"
                        }`}
                      >
                        {msg.role === "user" ? <User size={14} className="text-white" /> : <Bot size={14} className="text-cyan-400" />}
                      </div>

                      {/* Content Bubble */}
                      <div
                        className={`p-4 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-orange-500 text-white rounded-tr-none shadow-lg shadow-orange-500/20"
                            : "bg-white/5 text-zinc-300 rounded-tl-none border border-white/10 shadow-lg shadow-black/50"
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.content}</p>

                        {/* Open in Email App fallback button */}
                        {msg.mailtoUrl && (
                          <div className="mt-2.5">
                            <a
                              href={msg.mailtoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500 text-black text-xs font-bold hover:bg-cyan-400 transition-all shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                            >
                              <Mail size={13} />
                              <span>Open in Gmail / Mail App ✉</span>
                            </a>
                          </div>
                        )}

                        {/* Inline Interactive Connect Form (if requested) */}
                        {msg.isConnectForm && (
                          <div className="mt-3.5 pt-3 border-t border-cyan-500/20">
                            {msg.formStatus === "sent" ? (
                              <div className={`p-3 border rounded-xl text-xs flex items-start gap-2.5 ${msg.isSimulated ? "bg-amber-500/10 border-amber-500/30 text-amber-300" : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"}`}>
                                <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${msg.isSimulated ? "text-amber-400" : "text-emerald-400"}`} />
                                <div>
                                  <p className="font-semibold">{msg.isSimulated ? "Message Logged (Console Mode)" : "Message Delivered to paridaomshree@gmail.com"}</p>
                                  {msg.sentData && (
                                    <p className="text-[11px] text-zinc-400 mt-0.5">
                                      Sender: {msg.sentData.email}
                                    </p>
                                  )}
                                  {msg.isSimulated && (
                                    <p className="text-[10px] text-amber-200/80 mt-1">
                                      To receive real emails in your Gmail inbox, add EMAIL_USER and EMAIL_PASS to .env.local.
                                    </p>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <form onSubmit={handleCardSubmit} className="space-y-2.5">
                                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 tracking-wider uppercase mb-1">
                                  <Mail size={12} /> Direct Dispatch Form
                                </div>

                                <div>
                                  <label className="block text-[11px] text-zinc-400 mb-1">Your Mail Address</label>
                                  <input
                                    type="email"
                                    value={cardEmail}
                                    onChange={(e) => {
                                      setCardEmail(e.target.value);
                                      setCardError("");
                                    }}
                                    placeholder="e.g. yourname@domain.com"
                                    disabled={isLoading}
                                    className="w-full bg-[#111] text-white text-xs rounded-lg px-3 py-2 border border-white/15 focus:border-cyan-500 outline-none transition-colors"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] text-zinc-400 mb-1">Details of the Mail</label>
                                  <textarea
                                    value={cardMessage}
                                    onChange={(e) => {
                                      setCardMessage(e.target.value);
                                      setCardError("");
                                    }}
                                    placeholder="Write your message or inquiry for Omshree here..."
                                    rows={3}
                                    disabled={isLoading}
                                    className="w-full bg-[#111] text-white text-xs rounded-lg px-3 py-2 border border-white/15 focus:border-cyan-500 outline-none transition-colors resize-none"
                                  />
                                </div>

                                {cardError && (
                                  <div className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md p-1.5">
                                    <AlertCircle size={13} />
                                    <span>{cardError}</span>
                                  </div>
                                )}

                                <button
                                  type="submit"
                                  disabled={isLoading}
                                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                  {isLoading ? (
                                    <>
                                      <Loader2 size={14} className="animate-spin" />
                                      <span>Dispatching to paridaomshree@gmail.com...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Send size={13} />
                                      <span>Send to paridaomshree@gmail.com</span>
                                    </>
                                  )}
                                </button>
                              </form>
                            )}
                          </div>
                        )}

                        {/* Quick action chips */}
                        {msg.options && msg.options.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-white/5">
                            {msg.options.map((option, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleQuickOption(option)}
                                disabled={isLoading}
                                className="text-[11px] bg-cyan-500/10 hover:bg-cyan-500/25 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 rounded-full px-3 py-1 transition-all active:scale-95 text-left flex items-center gap-1 cursor-pointer disabled:opacity-50"
                              >
                                <span>{option}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-3 flex-row items-center">
                    <div className="w-8 h-8 rounded-full bg-[#111] border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Bot size={14} className="text-cyan-400" />
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 rounded-tl-none border border-white/10 flex items-center gap-2 text-xs text-zinc-400">
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <span className="ml-1 text-cyan-400/80">
                        {connectState.step === "sending" ? "Sending to paridaomshree@gmail.com..." : "Cloud5 is typing..."}
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chatbox Bottom Input Area */}
              <div
                className="w-full bg-black/70 border-t border-white/10 p-3.5 relative z-10 flex flex-col justify-center"
                style={{ minHeight: "84px", flexShrink: 0 }}
              >
                {/* Active Connection Status Bar */}
                {connectState.step !== "idle" && (
                  <div className="flex items-center justify-between text-[11px] mb-2 px-2 text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-md py-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Mail size={12} />
                      {connectState.step === "awaiting_email" && "Step 1 of 2: Type your email address"}
                      {connectState.step === "awaiting_message" && `Step 2 of 2: Type details for ${connectState.email}`}
                      {connectState.step === "sending" && "Dispatching message to Omshree..."}
                    </span>
                    <button
                      type="button"
                      onClick={cancelConnect}
                      disabled={isLoading}
                      className="text-zinc-400 hover:text-white flex items-center gap-0.5 cursor-pointer"
                    >
                      Cancel <X size={12} />
                    </button>
                  </div>
                )}

                <form onSubmit={sendMessage} className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      connectState.step === "awaiting_email"
                        ? "Enter your mail address (e.g. name@domain.com)..."
                        : connectState.step === "awaiting_message"
                        ? "Enter message details for Omshree..."
                        : "Ask Cloud5 or type 'Connect me to Omshree'..."
                    }
                    className="w-full bg-[#111] text-white text-sm rounded-full pl-5 pr-12 py-3 outline-none border border-white/10 focus:border-cyan-500/50 transition-colors shadow-inner"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    title="Send message"
                    className="absolute right-1.5 w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-black hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_10px_rgba(6,182,212,0.4)] cursor-pointer"
                  >
                    <Send size={15} className="ml-0.5" />
                  </button>
                </form>
              </div>

            </div>
          </motion.div>

        </div>
      </ParticleEffectWrapper>
    </section>
  );
}