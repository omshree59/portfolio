"use client"; // 🔥 THE FIX: This tells Next.js it's safe to use browser-only dynamic imports here

import dynamic from "next/dynamic";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"; 

// Lazy load all heavy components below the fold to make the initial load lightning fast
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const TechStack = dynamic(() => import("@/components/TechStack"), { ssr: false });
const About = dynamic(() => import("@/components/About"), { ssr: false });
const InteractiveGallery = dynamic(() => import("@/components/InteractiveGallery"), { ssr: false });
const Timeline = dynamic(() => import("@/components/Timeline"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen selection:bg-orange-500/30">
      
      {/* 1. LOADS INSTANTLY: YOUR ORIGINAL 3D SCROLL INTRO */}
      {/* 🔥 FIX: Added id="home" so the Home button scrolls back here */}
      <div id="home" className="relative w-full">
        
        {/* Navbar placed inside the relative hero container so it stays at the top and scrolls away! */}
        <Navbar />
        
        <ScrollyCanvas />
        <Overlay />
      </div>

      {/* 2. LAZY LOADED IN THE BACKGROUND */}
      <About />
      <Timeline />
      <InteractiveGallery />
      <TechStack />
      
      {/* 🔥 FIX: Wrapped Projects in id="projects" so the nav link finds it */}
      <div id="projects">
        <Projects />
      </div>
      
      {/* 🔥 FIX: Wrapped Contact in id="contact" so the nav link finds it */}
      <div id="contact">
        <Contact />
      </div>
      
      <Footer />
      
    </main>
  );
}