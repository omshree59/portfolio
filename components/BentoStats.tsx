"use client";

import { motion } from "framer-motion";
import { GitCommit, Code2, Clock, Music, MapPin, Coffee, Star, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { GitHubCalendar } from 'react-github-calendar';
import PixelBlast from './PixelBlast';
import DepthText from './DepthText';

export default function BentoStats() {
  const [time, setTime] = useState("");
  const [githubCommits, setGithubCommits] = useState<number | null>(null);

  useEffect(() => {
    // 1. Timezone clock
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: "Asia/Kolkata", 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // 2. Fetch Live GitHub Commits (Fallback for the large number)
    const fetchCommits = async () => {
      try {
        const res = await fetch("https://api.github.com/search/commits?q=author:omshree59", {
          headers: {
            "Accept": "application/vnd.github.cloak-preview"
          }
        });
        const data = await res.json();
        if (data && data.total_count !== undefined) {
          setGithubCommits(data.total_count);
        }
      } catch (err) {
        console.error("Failed to fetch GitHub stats:", err);
      }
    };
    fetchCommits();

    return () => clearInterval(interval);
  }, []);

  const bentoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="py-24 px-6 relative z-20 bg-[#0d1117] overflow-hidden">
      
      {/* Interactive GitHub-Themed PixelBlast Background */}
      <div className="absolute inset-0 pointer-events-auto z-0 opacity-40">
        <PixelBlast
          variant="square"
          pixelSize={8}
          color="#26a641" // GitHub Dark Mode Green
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pointer-events-none">
        
        <div className="mb-12 text-center md:text-left flex flex-col md:items-start items-center">
          <DepthText
            text="Stats & Life"
            layers={34}
            depth={2.4}
            faceColor="#f8fafc" // Crisp white front face
            depthColor="#26a641" // GitHub Green depth/shadow
            tilt={7.5}
            pointerTracking={true}
            smoothing={0.14}
            perspective={900}
            autoOrbit={true}
            orbitSpeed={0.35}
            fontSize="clamp(3rem, 8vw, 5rem)"
            fontWeight={900}
            shadow={true}
            className="mb-2"
          />
          <p className="text-zinc-400 mt-2 text-lg">By the numbers and behind the scenes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[160px] pointer-events-auto">
          
          {/* GitHub Commits - Large Box with Calendar */}
          <motion.div 
            custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 bg-[#0d1117] border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-110" />
            <div className="flex items-center gap-3 text-white mb-4">
              <GitCommit size={24} className="text-green-400" />
              <span className="font-bold tracking-wider uppercase text-sm">GitHub Contributions</span>
            </div>
            
            <div className="flex-1 w-full flex items-center justify-center overflow-hidden scale-90 md:scale-100 origin-left">
              <GitHubCalendar 
                username="omshree59" 
                colorScheme="dark"
                theme={{
                  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
                blockSize={12}
                blockMargin={4}
                fontSize={12}
              />
            </div>
          </motion.div>

          {/* Timezone - Square Box */}
          <motion.div 
            custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center relative overflow-hidden backdrop-blur-md"
          >
            <Clock size={28} className="text-orange-500 mb-4" />
            <h4 className="text-2xl font-bold text-white tracking-tight">{time || "Loading..."}</h4>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Local Time (IST)</p>
          </motion.div>

          {/* Location - Square Box */}
          <motion.div 
            custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex flex-col justify-center items-center relative overflow-hidden backdrop-blur-md"
          >
            <MapPin size={28} className="text-green-400 mb-4" />
            <h4 className="text-xl font-bold text-white tracking-tight">India</h4>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Current Base</p>
          </motion.div>

          {/* Lines of Code - Square Box */}
          <motion.div 
            custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md hover:bg-zinc-800/50 transition-colors"
          >
            <Code2 size={24} className="text-indigo-400" />
            <div>
              <h4 className="text-3xl font-black text-white">450k+</h4>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Lines Written</p>
            </div>
          </motion.div>

          {/* Coffee - Square Box */}
          <motion.div 
            custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md hover:bg-zinc-800/50 transition-colors"
          >
            <Coffee size={24} className="text-amber-500" />
            <div>
              <h4 className="text-3xl font-black text-white">Infinite</h4>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Cups of Coffee</p>
            </div>
          </motion.div>

          {/* Spotify - Wide Box (Moved Down) */}
          <motion.div 
            custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2 bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex items-center gap-6 relative overflow-hidden backdrop-blur-md hover:bg-zinc-800/50 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center shrink-0 border border-[#1DB954]/30 shadow-[0_0_15px_rgba(29,185,84,0.15)] relative z-10">
              <Music size={28} className="text-[#1DB954]" />
            </div>
            <div className="relative z-10">
              <p className="text-[#1DB954] text-xs font-bold uppercase tracking-widest mb-1">Currently Playing</p>
              <h4 className="text-xl font-bold text-white line-clamp-1">Starboy</h4>
              <p className="text-zinc-400 text-sm">The Weeknd, Daft Punk</p>
            </div>
            
            {/* Audio Bars Animation */}
            <div className="absolute right-8 flex items-end gap-1.5 h-10 opacity-40 z-10">
              <motion.div animate={{ height: ["40%", "100%", "60%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} className="w-1.5 bg-[#1DB954] rounded-full" />
              <motion.div animate={{ height: ["80%", "30%", "90%", "40%", "80%"] }} transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }} className="w-1.5 bg-[#1DB954] rounded-full" />
              <motion.div animate={{ height: ["60%", "100%", "40%", "80%", "60%"] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} className="w-1.5 bg-[#1DB954] rounded-full" />
              <motion.div animate={{ height: ["30%", "70%", "40%", "90%", "30%"] }} transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }} className="w-1.5 bg-[#1DB954] rounded-full hidden md:block" />
            </div>

            {/* Subtle Gradient Glow inside the box to tie it into the theme */}
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#1DB954]/5 to-transparent pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
