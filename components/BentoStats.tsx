"use client";

import { motion } from "framer-motion";
import { GitCommit, Code2, Clock, Music, MapPin, Coffee, Star, Terminal } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { GitHubCalendar } from 'react-github-calendar';
import PixelBlast from './PixelBlast';
import DepthText from './DepthText';

const TRACKS = [
  {
    title: "Starboy",
    artist: "The Weeknd, Daft Punk",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/11/71/d6/1171d6ad-3c96-e027-2af6-58028426588c/mzaf_15137631797407745471.plus.aac.p.m4a",
    cover: "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb"
  },
  {
    title: "Do Numbari",
    artist: "Dhanda Nyoliwala",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/af/1c/71/af1c711c-8655-6de9-2b88-c679d99e69c2/mzaf_18389136254125456244.plus.aac.p.m4a",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4c/54/92/4c549254-a814-eb29-5143-4c1c5e934bcd/26UM1IM01491.rgb.jpg/100x100bb.jpg"
  },
  {
    title: "Big Plans",
    artist: "Dhanda Nyoliwala",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3d/0a/81/3d0a8123-602c-cf9f-1fc7-0ef9fb7f1f49/mzaf_7237953371964289360.plus.aac.p.m4a",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/8c/ab/e0/8cabe047-7bb5-b563-2d3d-2aab4f90928b/197188154158.jpg/100x100bb.jpg"
  },
  {
    title: "Ishq Bawla",
    artist: "Dhanda Nyoliwala",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/aa/6f/10/aa6f1021-578d-ff7c-627c-d5980d4d9061/mzaf_13675149689107315142.plus.aac.p.m4a",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/41/db/43/41db43f1-a8a4-f1a5-9d21-a3c1cb709387/25UMGIM73688.rgb.jpg/100x100bb.jpg"
  }
];

export default function BentoStats() {
  const [time, setTime] = useState("");
  const [githubCommits, setGithubCommits] = useState<number | null>(null);
  
  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

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

          {/* Spotify - Wide Box (Interactive) */}
          <motion.div 
            custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }}
            onClick={() => {
              if (audioRef.current) {
                if (isPlaying) {
                  audioRef.current.pause();
                } else {
                  audioRef.current.play();
                }
                setIsPlaying(!isPlaying);
              }
            }}
            className="md:col-span-2 lg:col-span-2 bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex items-center gap-6 relative overflow-hidden backdrop-blur-md hover:bg-zinc-800/50 transition-colors cursor-pointer group/spotify"
          >
            <audio 
              ref={audioRef} 
              src={TRACKS[currentTrackIndex].preview} 
              onEnded={() => setIsPlaying(false)}
            />
            
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center shrink-0 border border-[#1DB954]/30 shadow-[0_0_15px_rgba(29,185,84,0.15)] relative z-10 transition-transform group-hover/spotify:scale-110 overflow-hidden">
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img src={TRACKS[currentTrackIndex].cover} alt="Cover" className="absolute inset-0 w-full h-full object-cover opacity-50" />
              <Music size={28} className={`text-[#1DB954] transition-all relative z-20 ${isPlaying ? 'animate-pulse scale-110' : ''}`} />
            </div>
            <div className="relative z-10 flex-1">
              <p className="text-[#1DB954] text-xs font-bold uppercase tracking-widest mb-1">
                {isPlaying ? "Now Playing" : "Tap to Play"}
              </p>
              <h4 className="text-xl font-bold text-white line-clamp-1">{TRACKS[currentTrackIndex].title}</h4>
              <p className="text-zinc-400 text-sm line-clamp-1">{TRACKS[currentTrackIndex].artist}</p>
            </div>
            
            {/* Audio Bars Animation (Only animates when playing) */}
            <div className="absolute right-8 flex items-end gap-1.5 h-10 opacity-40 z-10">
              <motion.div animate={isPlaying ? { height: ["40%", "100%", "60%", "100%", "40%"] } : { height: "20%" }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} className="w-1.5 bg-[#1DB954] rounded-full" />
              <motion.div animate={isPlaying ? { height: ["80%", "30%", "90%", "40%", "80%"] } : { height: "20%" }} transition={{ repeat: Infinity, duration: 1.0, ease: "easeInOut" }} className="w-1.5 bg-[#1DB954] rounded-full" />
              <motion.div animate={isPlaying ? { height: ["60%", "100%", "40%", "80%", "60%"] } : { height: "20%" }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} className="w-1.5 bg-[#1DB954] rounded-full" />
              <motion.div animate={isPlaying ? { height: ["30%", "70%", "40%", "90%", "30%"] } : { height: "20%" }} transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }} className="w-1.5 bg-[#1DB954] rounded-full hidden md:block" />
            </div>

            {/* Subtle Gradient Glow inside the box to tie it into the theme */}
            <div className={`absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#1DB954]/10 to-transparent pointer-events-none transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
          </motion.div>

          {/* Playlist / Heavy Rotation - Wide Box beside Spotify */}
          <motion.div 
            custom={6} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="md:col-span-1 lg:col-span-2 bg-zinc-900/50 border border-white/10 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star size={18} className="text-[#1DB954] fill-[#1DB954]/20" />
              <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Playlist</span>
            </div>
            
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {TRACKS.map((track, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    setIsPlaying(true);
                    setTimeout(() => audioRef.current?.play(), 50);
                  }}
                  className={`flex flex-col items-center gap-2 group cursor-pointer min-w-[72px] transition-opacity ${currentTrackIndex === idx ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                >
                  <div className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-colors relative ${currentTrackIndex === idx ? 'border-[#1DB954]' : 'border-white/10 group-hover:border-white/30'}`}>
                    <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 transition-colors ${currentTrackIndex === idx ? 'bg-transparent' : 'bg-black/20 group-hover:bg-transparent'}`} />
                    
                    {/* Tiny play indicator if active */}
                    {currentTrackIndex === idx && isPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="flex items-end gap-[2px] h-3">
                          <motion.div animate={{ height: ["30%", "100%", "30%"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-[#1DB954] rounded-full" />
                          <motion.div animate={{ height: ["60%", "30%", "60%"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-[#1DB954] rounded-full" />
                          <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-[#1DB954] rounded-full" />
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-medium text-center text-zinc-300 leading-tight w-full line-clamp-2 px-1">
                    {track.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
