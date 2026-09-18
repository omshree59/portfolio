"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import HeroFramer from "@/components/HeroFramer"; 
import Navbar from "@/components/Navbar"; 

// Lazy load heavy components below the fold
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const TechStack = dynamic(() => import("@/components/TechStack"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const InteractiveGallery = dynamic(() => import("@/components/InteractiveGallery"), { ssr: false });
const Timeline = dynamic(() => import("@/components/Timeline"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

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