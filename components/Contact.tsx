"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import ParticleEffectWrapper from "@/components/ui/particle-effect-for-hero";

type Message = { role: "user" | "ai"; content: string };

export default function Contact() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello. I am Cloud5, Omshree's personal AI agent. He is currently coding, but I can answer any questions you have about his experience, projects, or tech stack. What would you like to know?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage, 
          history: messages.slice(1) 
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", content: "System error. Please contact Omshree directly via email." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full border-t-2 border-cyan-500/50 isolate z-[100] bg-black">
      <ParticleEffectWrapper>
        
        {/* 🔥 FIX: Added 'max-w-6xl mx-auto px-6' back to this div so it centers properly 🔥 */}
        <div className="w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center py-24 lg:py-32">
          
          {/* Left Side: Context / Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[45%] text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Sparkles size={14} /> Available 24/7
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-lg">
              Let's Talk.
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">
              Traditional contact forms are boring. I built <strong className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">Cloud5</strong>, a custom AI agent trained entirely on my resume, skills, and personality. 
            </p>
            <p className="text-zinc-500 text-sm">
              Feel free to interview it, ask about my tech stack, or request my direct contact information.
            </p>
          </motion.div>

          {/* Right Side: The Chat Window */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[55%] flex justify-center mt-10 lg:mt-0"
          >
            <div 
              className="w-full max-w-lg bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden relative z-50"
              style={{ height: '550px' }}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-20" />

              {/* Chat Header */}
              <div 
                className="w-full bg-white/5 border-b border-white/10 flex items-center px-6 gap-4 relative z-10"
                style={{ height: '80px', flexShrink: 0 }}
              >
                <div className="relative">
                  <div className="w-11 h-11 rounded-full bg-[#111] flex items-center justify-center border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <Bot size={22} className="text-cyan-400" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a0c] rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base tracking-wide leading-tight">Cloud5 AI</h3>
                  <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-wider mt-0.5">Agent Online</p>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="w-full flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-5 custom-scrollbar scroll-smooth relative z-10">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-orange-500" : "bg-[#111] border border-cyan-500/30"}`}>
                      {msg.role === "user" ? <User size={14} className="text-white" /> : <Bot size={14} className="text-cyan-400" />}
                    </div>
                    <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${msg.role === "user" ? "bg-orange-500 text-white rounded-tr-none shadow-lg shadow-orange-500/20" : "bg-white/5 text-zinc-300 rounded-tl-none border border-white/10 shadow-lg shadow-black/50"}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isLoading && (
                  <div className="flex gap-3 flex-row">
                    <div className="w-8 h-8 rounded-full bg-[#111] border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Bot size={14} className="text-cyan-400" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 rounded-tl-none border border-white/10 flex items-center gap-1.5">
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div 
                className="w-full bg-black/60 border-t border-white/10 p-4 relative z-10"
                style={{ height: '80px', flexShrink: 0 }}
              >
                <form onSubmit={sendMessage} className="relative flex items-center h-full">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Cloud5..."
                    className="w-full bg-[#111] text-white text-sm rounded-full pl-5 pr-12 py-3.5 outline-none border border-white/10 focus:border-cyan-500/50 transition-colors shadow-inner"
                    disabled={isLoading}
                  />
                  <button 
                    type="submit" 
                    disabled={!input.trim() || isLoading}
                    className="absolute right-1.5 w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-black hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_10px_rgba(6,182,212,0.4)]"
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