"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The data for your 6 cinematic slides
const slides = [
  {
    id: 0,
    centerText: "THE VISION",
    leftLabel: "Future Goals",
    rightLabel: "Software Engineer",
    image: "/slide1.jpg",
  },
  {
    id: 1,
    centerText: "INTELLIGENCE",
    leftLabel: "AI & Machine Learning",
    rightLabel: "Algorithms & Logic",
    image: "/slide2.jpg",
  },
  {
    id: 2,
    centerText: "THE BUILDER",
    leftLabel: "C, C++ & Python",
    rightLabel: "System Architecture",
    image: "/slide3.jpg",
  },
  {
    id: 3,
    centerText: "OPEN SOURCE",
    leftLabel: "Community Contributions",
    rightLabel: "Hackathon Competitor",
    image: "/slide4.jpg",
  },
  {
    id: 4,
    centerText: "OFF SCREEN",
    leftLabel: "Modern Warfare 3",
    rightLabel: "Hogwarts Legacy",
    image: "/slide5.jpg",
  },
  {
    id: 5,
    centerText: "DOWNTIME",
    leftLabel: "Cinematography",
    rightLabel: "K-Drama Enthusiast",
    image: "/slide6.jpg",
  },
];

export default function InteractiveGallery() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative h-screen w-full bg-[#0a0a0a] text-white overflow-hidden z-20">
      
      {/* Cinematic Background Image Crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[active].image})` }}
        />
      </AnimatePresence>

      {/* Dark Vignette Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* Interface Wrapper */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto flex flex-col justify-between px-6 py-12 md:px-20 md:py-20">
        
        {/* Top Header Placeholder (Keeps spacing balanced) */}
        <div className="text-center tracking-widest text-xs font-mono text-zinc-400 uppercase">
          Chapter 02 — The Creator
        </div>

        {/* Middle Content: Menus & Center Text */}
        <div className="flex-1 flex items-center justify-between relative">
          
          {/* Left Menu */}
          <div className="flex flex-col gap-3 md:gap-5 text-xs md:text-sm tracking-wider uppercase font-medium text-zinc-500 z-20">
            {slides.map((s, i) => (
              <button 
                key={`left-${i}`}
                onClick={() => setActive(i)} 
                className={`text-left transition-all duration-300 flex items-center gap-3 ${active === i ? 'text-white translate-x-2' : 'hover:text-zinc-300 hover:translate-x-1'}`}
              >
                {active === i && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />}
                {s.leftLabel}
              </button>
            ))}
          </div>

          {/* Center Absolute Text */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none z-10 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={`title-${active}`}
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl md:text-7xl lg:text-8xl font-serif italic tracking-wider text-center text-white/90 drop-shadow-2xl"
              >
                {slides[active].centerText}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Right Menu */}
          <div className="flex flex-col gap-3 md:gap-5 text-xs md:text-sm tracking-wider uppercase font-medium text-zinc-500 items-end z-20">
            {slides.map((s, i) => (
              <button 
                key={`right-${i}`}
                onClick={() => setActive(i)} 
                className={`text-right transition-all duration-300 flex items-center gap-3 ${active === i ? 'text-white -translate-x-2' : 'hover:text-zinc-300 hover:-translate-x-1'}`}
              >
                {s.rightLabel}
                {active === i && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Progress Indicator */}
        <div className="flex items-center justify-center gap-4 text-xs tracking-widest font-mono text-zinc-400">
          <span>0{active + 1}</span>
          <div className="h-[1px] w-32 bg-white/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${((active + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <span>0{slides.length}</span>
        </div>

      </div>
    </section>
  );
}