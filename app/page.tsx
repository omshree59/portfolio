"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
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

export default function Home() {
  // 🔥 The master switch that controls the rest of the website
  const [isHeroReady, setIsHeroReady] = useState(false);

  // 🔥 Lock the scrollbar while the hero is loading so users can't scroll into the void
  useEffect(() => {
    if (!isHeroReady) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isHeroReady]);

  return (
    <main className="bg-[#121212] min-h-screen selection:bg-cyan-500/30">
      
      <div id="home" className="relative w-full h-screen">
        <Navbar />
        {/* Pass the function that flips the switch when the iframe finishes */}
        <HeroFramer onLoaded={() => setIsHeroReady(true)} />
      </div>

      {/* 🔥 THE MAGIC: These components literally do not exist until the hero is finished. 
          This saves massive bandwidth and guarantees the hero loads first! */}
      {isHeroReady && (
        <div className="relative bg-[#121212]">
          <About />
          <Timeline />
          <InteractiveGallery />
          <TechStack />
          
          <div id="projects">
            <Projects />
          </div>
          
          <div id="contact">
            <Contact />
          </div>
          
          <Footer />
        </div>
      )}
      
    </main>
  );
}