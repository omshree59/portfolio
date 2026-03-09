"use client";
import { useState, useRef, useEffect } from "react";
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
    sector: "AUTONOMOUS_SYS",
    lapTime: "1:24.331",
    speedTrap: "312 km/h",
  },
  {
    title: "Cloud5 Chatbot",
    description: "A highly optimized, custom-built AI chatbot architecture engineered for streamlined, intelligent interactions.",
    tech: ["Python", "LLMs", "Data Structures"],
    liveLink: "https://cloud5bot.vercel.app/",
    githubLink: "https://github.com/omshree59/Cloud5-PersonalizedAiChatBot.git",
    image: "/cloud5bot.png",
    sector: "COMMS_ARRAY",
    lapTime: "1:23.876",
    speedTrap: "328 km/h",
  },
  {
    title: "Ecoquest - Sih Qualifier",
    description: "Responsive, high-performance user interfaces and frontend components engineered during my web development internship.",
    tech: ["React", "JavaScript", "CSS3"],
    liveLink: "https://eco-trivia-three.vercel.app/",
    githubLink: "",
    image: "/eco.png",
    sector: "AERO_DYNAMICS",
    lapTime: "1:25.102",
    speedTrap: "305 km/h",
  },
  {
    title: "NeuralShield-AI",
    description: "Open-source development, Spam filtering and finding in emails and reading pdfs to summarize.",
    tech: ["Python", "Open Source", "Git"],
    liveLink: "https://neuralshield-ai.onrender.com/",
    githubLink: "https://github.com/omshree59/NeuralShield-AI.git",
    image: "/neural.png",
    sector: "DEFENSE_NET",
    lapTime: "1:24.887",
    speedTrap: "318 km/h",
  },
  {
    title: "Procrastination Timer",
    description: "A sleek, interactive productivity tool engineered to combat procrastination through structured time-blocking and focus intervals.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    liveLink: "https://procastination-timer-dos.netlify.app/",
    githubLink: "https://github.com/omshree59/TIMERS.git",
    image: "/timer.png",
    sector: "CHRONO_UNIT",
    lapTime: "1:26.450",
    speedTrap: "298 km/h",
  }
];

// ── F1 TRACK GANTRY WITH SYNCED SIGNAL LIGHTS ──
type SignalPhase = 'red' | 'yellow' | 'green';

const SyncedSignalLight = ({ lightColor, phase }: { lightColor: 'red' | 'yellow' | 'green'; phase: SignalPhase }) => {
  const isActive = lightColor === phase;
  const colors = {
    red: { bg: '#ff0022', glow: '0 0 30px rgba(255,0,34,0.9), 0 0 80px rgba(255,0,34,0.5), 0 0 120px rgba(255,0,34,0.2)' },
    yellow: { bg: '#ffaa00', glow: '0 0 20px rgba(255,170,0,0.7), 0 0 50px rgba(255,170,0,0.3)' },
    green: { bg: '#00dd44', glow: '0 0 20px rgba(0,221,68,0.7), 0 0 50px rgba(0,221,68,0.3)' },
  };

  return (
    <motion.div
      className="w-6 h-6 md:w-8 md:h-8 rounded-full"
      animate={{
        backgroundColor: isActive ? colors[lightColor].bg : '#111111',
        boxShadow: isActive ? colors[lightColor].glow : '0 0 0px transparent',
        scale: isActive && lightColor === 'red' ? [1, 1.15, 1] : 1,
      }}
      transition={{ duration: isActive && lightColor === 'red' ? 0.6 : 0.3, ease: 'easeOut', repeat: isActive && lightColor === 'red' ? Infinity : 0 }}
    />
  );
};

const SyncedSignalHousing = ({ xPos, phase }: { xPos: string; phase: SignalPhase }) => (
  <div className="absolute flex flex-col items-center" style={{ left: xPos, transform: 'translateX(-50%)' }}>
    <div className="w-[2px] h-6 md:h-10 bg-zinc-600/50" />
    <div className="relative flex flex-col items-center gap-1.5 md:gap-2 p-2 md:p-3 rounded-md bg-zinc-900/80 border border-zinc-700/30 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
      <SyncedSignalLight lightColor="red" phase={phase} />
      <SyncedSignalLight lightColor="yellow" phase={phase} />
      <SyncedSignalLight lightColor="green" phase={phase} />
    </div>
  </div>
);

const TrackGantry = ({ phase }: { phase: SignalPhase }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none z-[1] flex items-start justify-center pt-[15%] md:pt-[8%] transition-opacity duration-500 ${phase === 'red' ? 'opacity-70' : 'opacity-40'}`}>
    <div className="relative w-[95%] max-w-[1100px]">
      {/* Horizontal Gantry Pole */}
      <div className="relative w-full h-[6px] md:h-[8px] bg-gradient-to-r from-zinc-800/60 via-zinc-600/50 to-zinc-800/60 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-400/20 to-transparent" />
      </div>

      {/* Support Pillars */}
      <div className="absolute -left-1 top-0 w-[4px] md:w-[6px] h-[180px] md:h-[250px] bg-gradient-to-b from-zinc-600/50 to-zinc-800/30 rounded-b-sm">
        <div className="absolute top-0 left-0 w-[1px] h-full bg-zinc-400/10" />
      </div>
      <div className="absolute -right-1 top-0 w-[4px] md:w-[6px] h-[180px] md:h-[250px] bg-gradient-to-b from-zinc-600/50 to-zinc-800/30 rounded-b-sm">
        <div className="absolute top-0 right-0 w-[1px] h-full bg-zinc-400/10" />
      </div>

      {/* Diagonal Cross-Braces */}
      {[20, 40, 60, 80].map((left, i) => (
        <div
          key={`xbrace-${i}`}
          className="absolute w-[1px] h-[60px] md:h-[80px] bg-zinc-700/20 origin-top"
          style={{ left: `${left}%`, top: '6px', transform: i % 2 === 0 ? 'rotate(30deg)' : 'rotate(-30deg)' }}
        />
      ))}

      {/* The 3 Synced Signal Housings */}
      <SyncedSignalHousing xPos="25%" phase={phase} />
      <SyncedSignalHousing xPos="50%" phase={phase} />
      <SyncedSignalHousing xPos="75%" phase={phase} />
    </div>
  </div>
);

// ── F1 CAR FLYBY (streaks across during RED phase) ──
const F1CarFlyby = () => (
  <motion.div
    className="absolute z-[5] pointer-events-none"
    style={{ top: '52%', right: '-350px', transform: 'translateY(-50%)' }}
    initial={{ x: 0, opacity: 0 }}
    animate={{ x: '-120vw', opacity: [0, 1, 1, 1, 0] }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.8, ease: [0.15, 0, 0.25, 1], times: [0, 0.03, 0.5, 0.88, 1] }}
  >
    <svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Metallic body gradient */}
        <linearGradient id="bodyGrad" x1="50" y1="30" x2="50" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff6a1a" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#b84400" />
        </linearGradient>
        {/* Exhaust fire gradient */}
        <linearGradient id="exhaustFire" x1="290" y1="50" x2="380" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffaa00" stopOpacity="0.9" />
          <stop offset="20%" stopColor="#ea580c" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#ef4444" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
        {/* Heat shimmer */}
        <linearGradient id="heatShimmer" x1="280" y1="50" x2="360" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {/* Wheel rim gradient */}
        <radialGradient id="rimGrad">
          <stop offset="0%" stopColor="#666" />
          <stop offset="70%" stopColor="#333" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>
        <filter id="exhaustGlow2">
          <feGaussianBlur stdDeviation="4" />
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="carShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* === EXHAUST & HEAT === */}
      <ellipse cx="310" cy="50" rx="70" ry="10" fill="url(#exhaustFire)" filter="url(#exhaustGlow2)" />
      <ellipse cx="300" cy="50" rx="30" ry="4" fill="#ffcc00" opacity="0.5" filter="url(#exhaustGlow2)" />
      <ellipse cx="310" cy="50" rx="50" ry="15" fill="url(#heatShimmer)" />

      <g filter="url(#carShadow)">
        {/* === REAR WING === */}
        {/* Endplates */}
        <rect x="252" y="18" width="3" height="14" rx="1" fill="#222" />
        <rect x="252" y="68" width="3" height="14" rx="1" fill="#222" />
        {/* Main wing element */}
        <rect x="253" y="20" width="8" height="60" rx="1" fill="#1a1a1a" />
        {/* DRS flap */}
        <rect x="259" y="22" width="4" height="56" rx="1" fill="#2a2a2a" />
        {/* Wing struts */}
        <rect x="248" y="38" width="6" height="3" fill="#333" />
        <rect x="248" y="59" width="6" height="3" fill="#333" />

        {/* === REAR TIRES === */}
        <rect x="228" y="12" width="22" height="16" rx="5" fill="#0a0a0a" />
        <rect x="228" y="72" width="22" height="16" rx="5" fill="#0a0a0a" />
        {/* Tire walls */}
        <rect x="230" y="14" width="18" height="12" rx="4" fill="#1a1a1a" />
        <rect x="230" y="74" width="18" height="12" rx="4" fill="#1a1a1a" />
        {/* Rims */}
        <circle cx="239" cy="20" r="4" fill="url(#rimGrad)" />
        <circle cx="239" cy="80" r="4" fill="url(#rimGrad)" />
        <circle cx="239" cy="20" r="1.5" fill="#888" />
        <circle cx="239" cy="80" r="1.5" fill="#888" />

        {/* === MAIN BODY === */}
        <path d="M 245,32 L 100,28 L 55,34 L 35,38 L 28,42 L 28,58 L 35,62 L 55,66 L 100,72 L 245,68 Z" fill="url(#bodyGrad)" />

        {/* Floor edge detail */}
        <path d="M 245,32 L 100,28 L 55,34" stroke="#ff8c3a" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M 245,68 L 100,72 L 55,66" stroke="#b84400" strokeWidth="1" fill="none" opacity="0.6" />

        {/* Engine cover spine */}
        <path d="M 245,50 L 160,50" stroke="#cc4400" strokeWidth="1.5" opacity="0.4" />

        {/* === SIDEPOD AIR INTAKES === */}
        <path d="M 155,30 L 140,32 L 140,38 L 155,36 Z" fill="#111" />
        <path d="M 155,70 L 140,68 L 140,62 L 155,64 Z" fill="#111" />
        {/* Intake highlights */}
        <path d="M 154,31 L 142,33" stroke="#ff6a1a" strokeWidth="0.5" opacity="0.7" />
        <path d="M 154,69 L 142,67" stroke="#ff6a1a" strokeWidth="0.5" opacity="0.7" />

        {/* Bargeboard / flow conditioners */}
        <rect x="110" y="30" width="1" height="6" fill="#444" />
        <rect x="110" y="64" width="1" height="6" fill="#444" />
        <rect x="105" y="31" width="1" height="5" fill="#444" />
        <rect x="105" y="64" width="1" height="5" fill="#444" />

        {/* === COCKPIT === */}
        <path d="M 140,35 L 115,38 L 112,42 L 112,58 L 115,62 L 140,65 Z" fill="#0a0a0a" />

        {/* === HALO === */}
        <path d="M 138,34 Q 125,26 110,36" stroke="#777" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 138,66 Q 125,74 110,64" stroke="#777" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 138,34 L 138,66" stroke="#777" strokeWidth="2.5" />

        {/* === DRIVER HELMET === */}
        <ellipse cx="125" cy="50" rx="6" ry="7" fill="#ffffff" />
        <ellipse cx="123" cy="48" rx="3" ry="2" fill="#ddd" />
        {/* Visor */}
        <path d="M 120,48 Q 125,45 130,48" stroke="#222" strokeWidth="2" fill="none" />

        {/* === FRONT TIRES === */}
        <rect x="48" y="18" width="18" height="14" rx="4" fill="#0a0a0a" />
        <rect x="48" y="68" width="18" height="14" rx="4" fill="#0a0a0a" />
        {/* Tire walls */}
        <rect x="50" y="20" width="14" height="10" rx="3" fill="#1a1a1a" />
        <rect x="50" y="70" width="14" height="10" rx="3" fill="#1a1a1a" />
        {/* Rims */}
        <circle cx="57" cy="25" r="3.5" fill="url(#rimGrad)" />
        <circle cx="57" cy="75" r="3.5" fill="url(#rimGrad)" />
        <circle cx="57" cy="25" r="1.2" fill="#888" />
        <circle cx="57" cy="75" r="1.2" fill="#888" />

        {/* === NOSE === */}
        <path d="M 52,40 L 30,44 L 22,47 L 22,53 L 30,56 L 52,60 Z" fill="url(#bodyGrad)" />
        {/* Nose tip */}
        <path d="M 24,47 L 18,49 L 18,51 L 24,53 Z" fill="#cc4400" />

        {/* === FRONT WING === */}
        <rect x="15" y="20" width="5" height="60" rx="1" fill="#1a1a1a" />
        {/* Wing flaps */}
        <rect x="12" y="18" width="6" height="4" rx="1" fill="#333" />
        <rect x="12" y="78" width="6" height="4" rx="1" fill="#333" />
        <rect x="10" y="15" width="8" height="3" rx="1" fill="#444" />
        <rect x="10" y="82" width="8" height="3" rx="1" fill="#444" />
        {/* Endplates */}
        <rect x="8" y="14" width="3" height="8" rx="1" fill="#555" />
        <rect x="8" y="78" width="3" height="8" rx="1" fill="#555" />

        {/* === NUMBER === */}
        <text x="175" y="55" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="monospace" opacity="0.9">{"79"}</text>

        {/* === SPONSOR STRIPE === */}
        <rect x="160" y="48" width="40" height="1" fill="#fff" opacity="0.15" />
      </g>
    </svg>

    {/* Motion blur streaks behind the car */}
    <div className="absolute top-1/2 left-full -translate-y-1/2 w-[400px] h-[3px] bg-gradient-to-r from-orange-500/60 to-transparent" />
    <div className="absolute top-[35%] left-full -translate-y-1/2 w-[300px] h-[2px] bg-gradient-to-r from-orange-400/30 to-transparent" />
    <div className="absolute top-[65%] left-full -translate-y-1/2 w-[300px] h-[2px] bg-gradient-to-r from-orange-400/30 to-transparent" />
    <div className="absolute top-[25%] left-full -translate-y-1/2 w-[150px] h-[1px] bg-gradient-to-r from-red-500/20 to-transparent" />
    <div className="absolute top-[75%] left-full -translate-y-1/2 w-[150px] h-[1px] bg-gradient-to-r from-red-500/20 to-transparent" />
  </motion.div>
);

// ── F1 Telemetry HUD for Projects ──
const ProjectsHUD = ({ currentIndex }: { currentIndex: number }) => {
  const project = projects[currentIndex];
  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 md:p-10 font-mono">
      {/* Top Bar */}
      <div className="flex justify-between items-start w-full">
        <div className="space-y-1">
          <div className="flex items-center space-x-3 text-cyan-400 text-[10px] tracking-[0.25em] uppercase">
            <div className="w-1.5 h-1.5 bg-cyan-400 animate-pulse" />
            <span>PIT_WALL / PROJECTS</span>
          </div>
          <div className="w-48 h-[1px] bg-gradient-to-r from-cyan-400/40 to-transparent" />
        </div>

        <div className="text-right space-y-1">
          <div className="text-white/40 text-[10px] tracking-widest uppercase">Sector</div>
          <div className="text-lg font-black text-white tracking-wider">{project.sector}</div>
          <div className="text-cyan-400 text-[10px] tracking-widest">
            LAP: {project.lapTime} | SPD: {project.speedTrap}
          </div>
        </div>
      </div>

      {/* Corner Brackets */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[75vh] border border-white/[0.03] opacity-60 hidden md:block">
        <div className="absolute -top-px -left-px w-5 h-5 border-t border-l border-cyan-500/60" />
        <div className="absolute -top-px -right-px w-5 h-5 border-t border-r border-cyan-500/60" />
        <div className="absolute -bottom-px -left-px w-5 h-5 border-b border-l border-cyan-500/60" />
        <div className="absolute -bottom-px -right-px w-5 h-5 border-b border-r border-cyan-500/60" />
      </div>

      {/* Bottom Data Strip */}
      <div className="flex justify-between items-end w-full">
        <div className="text-white/20 text-[10px] tracking-widest">
          NODE {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </div>
        <div className="flex items-center space-x-1">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-cyan-400/30"
              animate={{ height: [2, Math.random() * 12 + 2, 2] }}
              transition={{ duration: Math.random() * 0.8 + 0.3, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
        <div className="text-white/20 text-[10px] tracking-widest">
          SYS_OK
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [signalPhase, setSignalPhase] = useState<SignalPhase>('red');
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoRef = useRef(true);

  // Phase durations in ms
  const RED_DURATION = 2200;    // Car crosses, then card appears
  const YELLOW_DURATION = 3500; // Viewing/pause
  const GREEN_DURATION = 1300;  // About to change

  const nextSlide = () => { setDirection(1); setCurrentIndex((p) => (p === projects.length - 1 ? 0 : p + 1)); };
  const prevSlide = () => { setDirection(-1); setCurrentIndex((p) => (p === 0 ? projects.length - 1 : p - 1)); };

  // The signal-driven auto-advance cycle
  const startCycle = () => {
    // Phase 1: RED - card is hidden, just signal
    setSignalPhase('red');
    phaseTimerRef.current = setTimeout(() => {
      // Phase 2: YELLOW - card slides in, viewing/pause
      setSignalPhase('yellow');
      phaseTimerRef.current = setTimeout(() => {
        // Phase 3: GREEN - still showing, about to change
        setSignalPhase('green');
        phaseTimerRef.current = setTimeout(() => {
          if (autoRef.current) {
            // Go back to RED (card will hide), then advance after a beat
            setSignalPhase('red');
            phaseTimerRef.current = setTimeout(() => {
              if (autoRef.current) nextSlide();
            }, 800); // brief red-only moment before next project
          }
        }, GREEN_DURATION);
      }, YELLOW_DURATION);
    }, RED_DURATION);
  };

  // Start the cycle on mount and restart on every slide change
  useEffect(() => {
    startCycle();
    return () => { if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const stopAutoAdvance = () => {
    autoRef.current = false;
    if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    setSignalPhase('yellow'); // Manual mode = paused/yellow
  };

  const cardVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.85, filter: "blur(12px)" }),
    center: { x: 0, opacity: 1, scale: 1, filter: "blur(0px)", zIndex: 10 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.85, filter: "blur(12px)", zIndex: 0 }),
  };

  const showCard = signalPhase !== 'red';

  const project = projects[currentIndex];

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center z-20 py-20 md:py-0"
      style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d12 30%, #0f0f14 60%, #080810 100%)' }}
    >

      {/* ── ASPHALT TEXTURE OVERLAY ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />

      {/* ── SUBTLE TRACK LANE MARKINGS ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Center dashed line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full" style={{
          backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 60px)',
        }} />
        {/* Faint side curbs */}
        <div className="absolute top-0 left-[10%] w-[1px] h-full bg-gradient-to-b from-transparent via-red-500/[0.04] to-transparent" />
        <div className="absolute top-0 right-[10%] w-[1px] h-full bg-gradient-to-b from-transparent via-red-500/[0.04] to-transparent" />
      </div>

      {/* ── F1 GANTRY SIGNALS (synced with carousel) ── */}
      <TrackGantry phase={signalPhase} />

      {/* ── F1 CAR FLYBY (during RED phase) ── */}
      <AnimatePresence>
        {signalPhase === 'red' && <F1CarFlyby key={`car-${currentIndex}`} />}
      </AnimatePresence>

      {/* Radial vignette to keep cards readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(8,8,16,0.9)_75%)] z-[2] pointer-events-none" />

      {/* ── HUD OVERLAY ── */}
      <ProjectsHUD currentIndex={currentIndex} />

      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-40 text-center mb-10 md:mb-16 pointer-events-none"
      >
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600 tracking-tighter uppercase">
          Selected Works
        </h2>
        <p className="text-cyan-400 mt-2 text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase opacity-70">
          {"Engineering Portfolio // Race Data Feed"}
        </p>
      </motion.div>

      {/* ── HOLOGRAPHIC CARD CAROUSEL ── */}
      <div className="relative w-full max-w-5xl mx-auto h-[520px] md:h-[480px] flex items-center justify-center z-30 px-4">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {showCard && (
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, { offset }) => {
                stopAutoAdvance();
                if (offset.x < -60) nextSlide();
                else if (offset.x > 60) prevSlide();
              }}
              className="absolute w-[92%] md:w-[850px] cursor-grab active:cursor-grabbing"
            >
            {/* The Holographic Glass Card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-black/40 backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)]">

              {/* Glowing top accent line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              <div className="flex flex-col md:flex-row">
                {/* LEFT: Image Window */}
                <div className="relative w-full md:w-[55%] h-56 md:h-[420px] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  {/* Scan overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]" />

                  {/* Image corner markers */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-cyan-400/40" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-cyan-400/40" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-cyan-400/40" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-cyan-400/40" />

                  {/* Floating telemetry badge */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded font-mono text-[10px]">
                    <span className="text-cyan-400">■</span>
                    <span className="text-white/70 ml-2 tracking-widest uppercase">{project.sector}</span>
                  </div>
                </div>

                {/* RIGHT: Data Panel */}
                <div className="w-full md:w-[45%] p-6 md:p-8 flex flex-col justify-between relative">

                  {/* Subtle vertical line separator (desktop) */}
                  <div className="hidden md:block absolute left-0 top-8 bottom-8 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                  <div>
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-2.5 py-1 text-[9px] font-bold text-cyan-300 uppercase tracking-wider bg-cyan-400/5 border border-cyan-400/15 rounded-sm font-mono">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight uppercase leading-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/40 text-sm leading-relaxed mb-6 font-light">
                      {project.description}
                    </p>

                    {/* Telemetry Data Row */}
                    <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-[10px]">
                      <div className="border border-white/5 rounded-sm p-2.5">
                        <div className="text-white/30 uppercase tracking-widest mb-1">Lap Time</div>
                        <div className="text-white font-bold text-sm">{project.lapTime}</div>
                      </div>
                      <div className="border border-white/5 rounded-sm p-2.5">
                        <div className="text-white/30 uppercase tracking-widest mb-1">Speed Trap</div>
                        <div className="text-white font-bold text-sm">{project.speedTrap}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.liveLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-cyan-300 transition-colors duration-200"
                    >
                      <Eye size={14} /> Deploy
                    </a>
                    {project.githubLink && (
                      <a
                        href={project.githubLink} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-sm bg-white/5 text-white/70 text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors duration-200 border border-white/10"
                      >
                        <Github size={14} /> Source
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>

      {/* ── NAVIGATION CONTROLS ── */}
      <div className="relative z-40 flex items-center gap-6 mt-10 md:mt-14">
        <button
          onClick={() => { stopAutoAdvance(); prevSlide(); }}
          className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200 bg-black/40 backdrop-blur-sm"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { stopAutoAdvance(); setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "bg-cyan-400 w-8 shadow-[0_0_8px_rgba(0,240,255,0.4)]"
                  : "bg-white/15 w-3 hover:bg-white/30"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => { stopAutoAdvance(); nextSlide(); }}
          className="w-10 h-10 rounded-sm border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200 bg-black/40 backdrop-blur-sm"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}