"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import HeroFramer from "@/components/HeroFramer"; 
import Navbar from "@/components/Navbar"; 

// Lazy load heavy components below the fold
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const TechStack = dynamic(() => import("@/components/TechStack"), { ssr: false });
const Certifications = dynamic(() => import("@/components/Certifications"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const InteractiveGallery = dynamic(() => import("@/components/InteractiveGallery"), { ssr: false });
const Timeline = dynamic(() => import("@/components/Timeline"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const CircularGallery = dynamic(() => import("@/components/CircularGallery"), { ssr: false });
const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });

const galleryItems = [
  { image: "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt1.webp", text: "Moments" },
  { image: "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt2.webp", text: "Vision" },
  { image: "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt3.webp", text: "Hustle" },
  { image: "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt4.webp", text: "Focus" },
  { image: "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt5.webp", text: "Drive" },
  { image: "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt6.webp", text: "Create" },
  { image: "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt7.webp", text: "Build" },
  { image: "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt8.webp", text: "Explore" },
  { image: "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt9.webp", text: "Inspire" },
  { image: "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt10.webp", text: "Capture" },
  { image: "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt11.webp", text: "Evolve" },
  { image: "https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/abt12.webp", text: "Engineer" },
];

// Reusable viewport reveal component for smooth 60fps scrolling
const ScrollReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="will-change-transform will-change-opacity"
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  // 🔥 The master switch that controls the rest of the website
  const [isHeroReady, setIsHeroReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  // Scroll hook for smooth hero fade-out on scroll
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  // 🔥 Lock the scrollbar while the hero is loading so users can't scroll into the void
  useEffect(() => {
    if (!isHeroReady) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isHeroReady]);

  return (
    <main className="bg-[#121212] min-h-screen selection:bg-cyan-500/30 overflow-hidden">
      
      <motion.div 
        id="home" 
        className="relative w-full h-screen will-change-opacity"
        style={shouldReduceMotion ? {} : { opacity: heroOpacity }}
      >
        <Navbar />
        {/* Pass the function that flips the switch when the iframe finishes */}
        <HeroFramer onLoaded={() => setIsHeroReady(true)} />
      </motion.div>

      {/* 🔥 THE MAGIC: These components literally do not exist until the hero is finished. 
          This saves massive bandwidth and guarantees the hero loads first! */}
      {isHeroReady && (
        <div className="relative bg-[#121212] z-10">
          <ScrollReveal>
            <About />
          </ScrollReveal>

          {/* 🔥 Circular Gallery — right after About */}
          <ScrollReveal>
            <section className="relative bg-[#050508] py-16 md:py-24 overflow-hidden">
              
              {/* ✨ Aurora WebGL Background from React Bits */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <Aurora
                  colorStops={["#06b6d4", "#f97316", "#8b5cf6"]}
                  amplitude={1.2}
                  blend={0.6}
                  speed={0.5}
                />
              </div>

              {/* Top & bottom edge fades for seamless section blending */}
              <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#121212] to-transparent z-10 pointer-events-none" />

              <div className="relative z-20 text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
                  Gallery
                </h2>
                <p className="text-zinc-500 mt-2 text-xs md:text-sm font-mono tracking-[0.2em] uppercase">
                  Drag or scroll to explore
                </p>
              </div>
              <div className="relative z-20" style={{ height: '600px', position: 'relative' }}>
                <CircularGallery
                  items={galleryItems}
                  bend={3}
                  textColor="#ffffff"
                  borderRadius={0.05}
                  scrollEase={0.03}
                  font="bold 24px sans-serif"
                />
              </div>
            </section>
          </ScrollReveal>
          
          <ScrollReveal>
            <Timeline />
          </ScrollReveal>
          
          <ScrollReveal>
            <InteractiveGallery />
          </ScrollReveal>
          
          <ScrollReveal>
            <TechStack />
          </ScrollReveal>
          
          <ScrollReveal>
            <Certifications />
          </ScrollReveal>
          
          <ScrollReveal>
            <div id="projects">
              <Projects />
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div id="contact">
              <Contact />
            </div>
          </ScrollReveal>
          
          <Footer />
        </div>
      )}
      
    </main>
  );
}