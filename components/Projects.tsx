"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "CivicFix AI",
    description: "An intelligent platform streamlining civic issue reporting and resolution using advanced Machine Learning algorithms.",
    tech: ["Next.js", "AI/ML", "Tailwind", "Python"],
    liveLink: "https://civic-fix-ai.vercel.app/",
    githubLink: "https://github.com/omshree59/CivicFix-AI.git",
    image: "/civic-fix-ai.png", 
  },
  {
    title: "Cloud5 Chatbot",
    description: "A highly optimized, custom-built AI chatbot architecture engineered for streamlined, intelligent interactions.",
    tech: ["Python", "LLMs", "Data Structures"],
    liveLink: "https://cloud5bot.vercel.app/",
    githubLink: "https://github.com/omshree59/Cloud5-PersonalizedAiChatBot.git",
    image: "/cloud5bot.png",
  },
  {
    title: "Ecoquest - Sih Qualifier",
    description: "Responsive, high-performance user interfaces and frontend components engineered during my web development internship.",
    tech: ["React", "JavaScript", "CSS3"],
    liveLink: "https://eco-trivia-three.vercel.app/",
    githubLink: "",
    image: "/eco.png",
  },
  {
    title: "NeuralShield-AI",
    description: "Open-source development, Spam filtering and finding in emails and reading pdfs to summarize.",
    tech: ["Python", "Open Source", "Git"],
    liveLink: "https://neuralshield-ai.onrender.com/",
    githubLink: "https://github.com/omshree59/NeuralShield-AI.git",
    image: "/neural.png",
  },
  {
    title: "Procrastination Timer",
    description: "A sleek, interactive productivity tool engineered to combat procrastination through structured time-blocking and focus intervals.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    liveLink: "https://procastination-timer-dos.netlify.app/",
    githubLink: "https://github.com/omshree59/TIMERS.git",
    image: "/timer.png",
  }
];

// --- HIGH-SPEED TRACK MATH ---
const trackPaths = [
  "M -200,700 C 300,700 400,200 800,200 C 1200,200 1300,700 1800,700", // Outer Lane
  "M -200,730 C 320,730 430,230 800,230 C 1170,230 1280,730 1800,730", // Middle Lane
  "M -200,760 C 340,760 460,260 800,260 C 1140,260 1260,760 1800,760", // Inner Lane
];

const lightTrails = [
  { id: 1, lane: 0, color: "#ea580c", length: 400, gap: 1600, duration: 4.5, delay: 0, width: 6 },
  { id: 2, lane: 0, color: "#ffffff", length: 100, gap: 1600, duration: 4.5, delay: 2.2, width: 4 },
  { id: 3, lane: 2, color: "#ef4444", length: 500, gap: 1400, duration: 3.8, delay: 0.5, width: 8 },
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

  const getCardStyles = (index: number) => {
    const diff = index - currentIndex;
    const absDiff = Math.abs(diff);
    
    if (diff === 0) return { x: 0, scale: 1, zIndex: 30, opacity: 1, rotateY: 0 };
    if (diff > 0) return { x: `${45 * absDiff}%`, scale: 1 - absDiff * 0.15, zIndex: 20 - absDiff, opacity: 1 - absDiff * 0.4, rotateY: -12 * absDiff };
    return { x: `-${45 * absDiff}%`, scale: 1 - absDiff * 0.15, zIndex: 20 - absDiff, opacity: 1 - absDiff * 0.4, rotateY: 12 * absDiff };
  };

  return (
    <section className="min-h-screen bg-[#020202] py-32 overflow-hidden relative z-20 flex flex-col justify-center">
      
      {/* 🏎️ THE RACING TRACK & F1 CARS BACKGROUND 🏎️ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full absolute inset-0 opacity-80">
          <defs>
            {/* The mathematical paths for the track lanes */}
            <path id="lane-0" d={trackPaths[0]} />
            <path id="lane-1" d={trackPaths[1]} />
            <path id="lane-2" d={trackPaths[2]} />
            
            {/* Glow effect for the F1 car exhausts */}
            <filter id="exhaustGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Base Track Lines */}
          <use href="#lane-0" fill="none" stroke="#ffffff" strokeWidth="1" className="opacity-[0.05]" />
          <use href="#lane-1" fill="none" stroke="#ffffff" strokeWidth="1" className="opacity-[0.05]" />
          <use href="#lane-2" fill="none" stroke="#ffffff" strokeWidth="1" className="opacity-[0.05]" />

          {/* Glowing Light Trails (Other cars/data streams) */}
          {lightTrails.map((trail) => {
            const dashTotal = trail.length + trail.gap;
            return (
              <motion.path
                key={`trail-${trail.id}`}
                d={trackPaths[trail.lane]}
                fill="none" stroke={trail.color} strokeWidth={trail.width} strokeLinecap="round"
                strokeDasharray={`${trail.length} ${trail.gap}`}
                style={{ filter: `drop-shadow(0 0 12px ${trail.color})` }}
                animate={{ strokeDashoffset: [dashTotal, 0] }}
                transition={{ duration: trail.duration, repeat: Infinity, ease: "linear", delay: trail.delay }}
              />
            );
          })}

          {/* 🏎️ F1 CAR 1 (Papaya Orange - Middle Lane) 🏎️ */}
          <g>
            {/* SVG Top-Down F1 Car Shape */}
            <g className="scale-[0.8]">
              {/* Exhaust Glow */}
              <ellipse cx="-25" cy="0" rx="15" ry="6" fill="#ea580c" filter="url(#exhaustGlow)" className="opacity-80" />
              {/* Tires */}
              <rect x="-14" y="-12" width="10" height="6" fill="#111" rx="2"/>
              <rect x="-14" y="6" width="10" height="6" fill="#111" rx="2"/>
              <rect x="10" y="-11" width="8" height="5" fill="#111" rx="2"/>
              <rect x="10" y="6" width="8" height="5" fill="#111" rx="2"/>
              {/* Wings */}
              <rect x="-18" y="-9" width="4" height="18" fill="#222" rx="1"/>
              <rect x="18" y="-8" width="4" height="16" fill="#222" rx="1"/>
              {/* Body */}
              <path d="M -15,-4 L 12,-3 L 20,-1 L 20,1 L 12,3 L -15,4 Z" fill="#ea580c"/>
              <circle cx="-2" cy="0" r="3" fill="#ffffff"/>
            </g>
            {/* The Magic: Animates the car along the SVG path */}
            <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
              <mpath href="#lane-1" />
            </animateMotion>
          </g>

          {/* 🏎️ F1 CAR 2 (Icy Cyan - Inner Lane, slightly faster) 🏎️ */}
          <g>
            <g className="scale-[0.8]">
              <ellipse cx="-25" cy="0" rx="15" ry="6" fill="#06b6d4" filter="url(#exhaustGlow)" className="opacity-80" />
              <rect x="-14" y="-12" width="10" height="6" fill="#111" rx="2"/>
              <rect x="-14" y="6" width="10" height="6" fill="#111" rx="2"/>
              <rect x="10" y="-11" width="8" height="5" fill="#111" rx="2"/>
              <rect x="10" y="6" width="8" height="5" fill="#111" rx="2"/>
              <rect x="-18" y="-9" width="4" height="18" fill="#222" rx="1"/>
              <rect x="18" y="-8" width="4" height="16" fill="#222" rx="1"/>
              <path d="M -15,-4 L 12,-3 L 20,-1 L 20,1 L 12,3 L -15,4 Z" fill="#06b6d4"/>
              <circle cx="-2" cy="0" r="3" fill="#ffffff"/>
            </g>
            <animateMotion dur="5.2s" repeatCount="indefinite" rotate="auto">
              <mpath href="#lane-2" />
            </animateMotion>
          </g>

        </svg>

        {/* Heavy dark vignette to keep the center readable */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_80%)] z-10" />
      </div>
      {/* ------------------------- */}


      <div className="max-w-7xl mx-auto px-6 md:px-20 w-full mb-12 flex justify-between items-end relative z-40">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
            Selected Works
          </h3>
          <p className="text-zinc-400 mt-2 drop-shadow-md">Swipe or use arrows to navigate.</p>
        </motion.div>

        <div className="hidden md:flex gap-4">
          <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 bg-[#111]">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 bg-[#111]">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      {/* 📦 THE REDESIGNED "BENTO" 3D CAROUSEL 📦 */}
      <div className="relative h-[550px] w-full max-w-7xl mx-auto flex items-center justify-center perspective-[1200px] z-30">
        <AnimatePresence initial={false}>
          {projects.map((project, index) => {
            const isCenter = currentIndex === index;
            const styles = getCardStyles(index);

            return (
              <motion.div 
                key={index}
                className="absolute w-[90%] md:w-[580px] h-[520px] rounded-[2rem] overflow-hidden cursor-grab active:cursor-grabbing border border-white/10 bg-[#0a0a0c] shadow-[0_30px_60px_rgba(0,0,0,0.9)] flex flex-col"
                initial={false}
                animate={{ x: styles.x, scale: styles.scale, zIndex: styles.zIndex, opacity: styles.opacity, rotateY: styles.rotateY }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -50) nextSlide();
                  else if (offset.x > 50) prevSlide();
                }}
                onClick={() => !isCenter && setCurrentIndex(index)}
              >
                
                {/* TOP HALF: THE CLEAN IMAGE WINDOW */}
                <div className="w-full h-[55%] p-3 pb-0">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 bg-[#111]">
                    <div 
                      className={`absolute inset-0 bg-cover bg-top transition-transform duration-1000 ${isCenter ? 'scale-105' : 'scale-100'}`}
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    {/* Inner shadow to make the image look set into the screen */}
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none" />
                  </div>
                </div>
                
                {/* BOTTOM HALF: THE GUARANTEED-READABLE TEXT AREA */}
                <div className="w-full h-[45%] p-6 md:px-8 flex flex-col justify-between bg-[#0a0a0c] relative z-10">
                  
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-[10px] md:text-xs font-bold text-orange-400 uppercase tracking-wider bg-orange-500/10 rounded-full border border-orange-500/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                      {project.title}
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-4">
                    <a 
                      href={project.liveLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-orange-500 hover:text-white transition-colors duration-300"
                    >
                      <Eye size={16} /> Live Preview
                    </a>
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 text-white text-sm font-semibold hover:bg-white/15 transition-colors duration-300 border border-white/10"
                      >
                        <Github size={16} /> Source
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex md:hidden justify-center items-center gap-3 mt-8 relative z-40">
        {projects.map((_, i) => (
          <button key={i} onClick={() => setCurrentIndex(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'bg-orange-500 w-6' : 'bg-white/20'}`} />
        ))}
      </div>

    </section>
  );
}