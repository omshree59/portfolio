"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax calculations
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -200]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);

  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [200, -200]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);

  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [200, -200]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] z-10 pointer-events-none">
      
      {/* Section 1: 0% Scroll */}
      <motion.section 
        style={{ y: y1, opacity: opacity1 }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
          Omshree  <br /> Parida.
        </h1>
        <p className="mt-6 text-xl text-zinc-400 max-w-lg">
         2nd Year College student Developing Ai Agents .
        </p>
      </motion.section>

      {/* Section 2: 30% Scroll */}
      <motion.section 
        style={{ y: y2, opacity: opacity2 }}
        className="sticky top-0 h-screen flex flex-col items-start justify-center px-10 md:px-32"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
          I build intelligent <br /> systems.
        </h2>
        <p className="mt-4 text-2xl text-orange-500 max-w-xl font-light">
          From full-stack web applications to personal AI chatbots like Cloud9.
        </p>
      </motion.section>

      {/* Section 3: 60% Scroll */}
      <motion.section 
        style={{ y: y3, opacity: opacity3 }}
        className="sticky top-0 h-screen flex flex-col items-end justify-center px-10 md:px-32 text-right"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
          Innovating with AI  <br /> & ML models .
        </h2>
        <p className="mt-4 text-2xl text-orange-500 max-w-xl font-light">
          Vibe coding , Building websites , Tech stacks-python mastering .
        </p>
      </motion.section>

    </div>
  );
}