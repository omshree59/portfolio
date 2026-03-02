"use client"; // 🔥 THE FIX: This tells Next.js it's safe to use browser-only dynamic imports here

import dynamic from "next/dynamic";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Footer from "@/components/Footer";
const TechStack = dynamic(() => import("@/components/TechStack"), { ssr: false });

// Lazy load all heavy components below the fold to make the initial load lightning fast
const About = dynamic(() => import("@/components/About"), { ssr: false });
const InteractiveGallery = dynamic(() => import("@/components/InteractiveGallery"), { ssr: false });
const Timeline = dynamic(() => import("@/components/Timeline"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen selection:bg-orange-500/30">
      
      {/* 1. LOADS INSTANTLY: YOUR ORIGINAL 3D SCROLL INTRO */}
      <div className="relative w-full">
        <ScrollyCanvas />
        <Overlay />
      </div>

      {/* 2. LAZY LOADED IN THE BACKGROUND */}
      <About />
      <Timeline />
      <InteractiveGallery />
      <TechStack />
      <Projects />
      <Footer />
      
    </main>
  );
}