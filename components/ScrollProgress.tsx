"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Telemetry track background */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-[1000] pointer-events-none" />
      
      {/* Telemetry line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-cyan-400 to-cyan-300 origin-left z-[1001] pointer-events-none shadow-[0_0_15px_rgba(34,211,238,0.8)]"
        style={{ scaleX }}
      >
        {/* Glow point at the end of the line */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[2px] opacity-80" />
      </motion.div>
    </>
  );
}
