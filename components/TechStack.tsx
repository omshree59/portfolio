"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// --- TERMINAL LOGIC & TYPES ---
type HistoryItem = {
  type: "input" | "output" | "error";
  text: string;
};

export default function TechStack() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "output", text: "Python 3.10.12 (main, Nov 20 2025, 15:00:00)" },
    { type: "output", text: "Type 'help()' for more information." },
  ]);
  
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  // Safely scroll only the inside of the terminal window
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history]);

  // Expanded Fake Python Execution Environment
  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      if (!cmd) return;

      const newHistory = [...history, { type: "input", text: cmd } as HistoryItem];
      let output = "";
      let isError = false;

      const lowerCmd = cmd.toLowerCase();

      // 1. Authentic Python 3 Print Error
      if (lowerCmd.startsWith("print ") && !lowerCmd.includes("(")) {
        isError = true;
        const args = cmd.slice(6).trim();
        output = `SyntaxError: Missing parentheses in call to 'print'. Did you mean print(${args})?`;
      } 
      // 2. Expanded Help Command 
      else if (lowerCmd === "help()" || lowerCmd === "help") {
        output = "Available objects: \n  - name \n  - age \n  - education \n  - skills \n  - projects \n  - hobbies \n  - about \n\nTry: print(hobbies) \nCommands: clear()";
      } 
      // 3. Clear Command
      else if (lowerCmd === "clear()" || lowerCmd === "clear") {
        setHistory([]);
        setInput("");
        return;
      } 
      // 4. Variables & Data
      else if (lowerCmd.includes("name")) {
        output = "'Omshree Parida'";
      } 
      else if (lowerCmd.includes("age")) {
        output = "21"; // Returns as a raw integer just like Python
      }
      else if (lowerCmd.includes("education")) {
        output = "'2nd-year Bachelor\\'s Degree Student'";
      }
      else if (lowerCmd.includes("hobbies")) {
        // Outputting a perfectly formatted Python list
        output = "[\n  'Gaming (Modern Warfare 3, Hogwarts Legacy)', \n  'Watching K-Dramas', \n  'Contributing to Open Source (Wagtail)', \n  'Cinematography'\n]";
      }
      else if (lowerCmd.includes("skills")) {
        output = "['Python', 'C/C++', 'Data Structures & Algorithms', 'AI/Machine Learning', 'Next.js', 'SQL']";
      } 
      else if (lowerCmd.includes("projects")) {
        output = "[\n  'CivicFix AI', \n  'Cloud9 Personal AI Chatbot', \n  'NeuralShield-AI', \n  'Ecoquest', \n  'Procrastination Timer'\n]";
      } 
      else if (lowerCmd.includes("about")) {
        output = "'Software Engineer obsessed with building intelligent, high-performance digital experiences and custom AI architectures.'";
      } 
      // 5. Fallback Error Handler
      else {
        isError = true;
        const badName = cmd.split(/[ (]/)[0]; 
        output = `Traceback (most recent call last):\n  File "<stdin>", line 1, in <module>\nNameError: name '${badName}' is not defined. Try typing 'help()'.`;
      }

      setHistory([...newHistory, { type: isError ? "error" : "output", text: output }]);
      setInput("");
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center z-20">
      
      {/* 🌌 THE 3D NEON SYNTHWAVE GRID 🌌 */}
      <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none" style={{ perspective: "1000px" }}>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-transparent via-black/90 to-black" />
        <div 
          className="absolute bottom-0 w-[200vw] h-[150vh] origin-bottom"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 255, 255, 0.4) 2px, transparent 2px),
              linear-gradient(to bottom, rgba(0, 255, 255, 0.4) 2px, transparent 2px)
            `,
            backgroundSize: "80px 80px",
            transform: "rotateX(75deg)",
            filter: "drop-shadow(0 0 8px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(0, 255, 255, 0.4))",
            animation: "gridForward 1.5s linear infinite"
          }}
        >
          <style>{`
            @keyframes gridForward {
              0% { background-position: 0 0; }
              100% { background-position: 0 80px; }
            }
          `}</style>
        </div>
      </div>

      {/* --- CONTENT ON TOP OF THE GRID --- */}
      <div className="relative z-20 text-center flex flex-col items-center w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-widest drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]">
            The Arsenal
          </h2>
          <p className="mt-4 text-cyan-400 font-mono tracking-widest uppercase text-sm drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
            System Architecture // AI // Logic
          </p>
        </motion.div>

        {/* 💻 THE INTERACTIVE PYTHON TERMINAL 💻 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-3xl h-[450px] border border-cyan-500/30 bg-[#0a0a0a]/80 backdrop-blur-xl rounded-xl shadow-[0_0_40px_rgba(0,255,255,0.15)] flex flex-col overflow-hidden text-left"
        >
          {/* Terminal Mac-style Header */}
          <div className="w-full h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-4 text-xs font-mono text-zinc-400">omshree@core-system: ~ python3</span>
          </div>

          {/* Terminal Window (Scrolls Safely) */}
          <div 
            ref={terminalContainerRef}
            className="flex-1 p-6 overflow-y-auto font-mono text-sm md:text-base cursor-text custom-scrollbar scroll-smooth"
            onClick={() => document.getElementById("terminal-input")?.focus()}
          >
            {/* Render History */}
            {history.map((item, index) => (
              <div key={index} className="mb-2 whitespace-pre-wrap">
                {item.type === "input" && (
                  <div>
                    <span className="text-cyan-400">{">>> "}</span>
                    <span className="text-white">{item.text}</span>
                  </div>
                )}
                {item.type === "output" && (
                  <div className="text-green-400 leading-relaxed">{item.text}</div>
                )}
                {item.type === "error" && (
                  <div className="text-red-400 leading-relaxed">{item.text}</div>
                )}
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center mt-2">
              <span className="text-cyan-400 mr-2">{">>>"}</span>
              <input
                id="terminal-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                autoComplete="off"
                spellCheck="false"
                className="flex-1 bg-transparent outline-none text-white font-mono caret-cyan-400"
                autoFocus
              />
            </div>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
}