"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function About() {
  // --- Parallax Physics for the Left Side ---
  const mouseY = useMotionValue(0);
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.1 });
  
  const leftColumnY = useTransform(smoothMouseY, [0, 1000], [80, -80]);
  const rightColumnY = useTransform(smoothMouseY, [0, 1000], [-80, 80]);

  useEffect(() => {
    mouseY.set(window.innerHeight / 2);
    const handleMouseMove = (e: MouseEvent) => mouseY.set(e.clientY);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="bg-[#0a0a0a] min-h-screen py-24 md:py-32 px-6 md:px-20 flex items-center relative z-20 overflow-hidden">
      
      {/* 🏎️ CINEMATIC F1 TRACK BACKGROUND 🏎️ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Slow breathing/panning animation on the background image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/track.jpg')" }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Dark gradients to blend the image into the black background and keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] opacity-90" />
      </div>

      {/* --- CONTENT WRAPPER --- */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* LEFT SIDE: Lightning-Fast Mouse Parallax Grid */}
        <div className="flex gap-4 md:gap-8 justify-center h-[500px] md:h-[700px] overflow-hidden">
          
          <motion.div style={{ y: leftColumnY }} className="flex flex-col gap-4 md:gap-8 w-1/2 pt-12">
            <div 
              className="w-full h-[280px] md:h-[400px] rounded-2xl bg-cover bg-center transition-all duration-700 hover:sepia hover:contrast-125 hover:saturate-50 shadow-2xl"
              style={{ backgroundImage: "url(https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/about1.jpg)" }}
            />
            <div 
              className="w-full h-[280px] md:h-[400px] rounded-2xl bg-cover bg-center transition-all duration-700 hover:sepia hover:contrast-125 hover:saturate-50 shadow-2xl"
              style={{ backgroundImage: "url(https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/about2.jpg)" }}
            />
          </motion.div>

          <motion.div style={{ y: rightColumnY }} className="flex flex-col gap-4 md:gap-8 w-1/2 pb-12">
            <div 
              className="w-full h-[280px] md:h-[400px] rounded-2xl bg-cover bg-center transition-all duration-700 hover:sepia hover:contrast-125 hover:saturate-50 shadow-2xl"
              style={{ backgroundImage: "url(https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/about3.jpg)" }}
            />
            <div 
              className="w-full h-[280px] md:h-[400px] rounded-2xl bg-cover bg-center transition-all duration-700 hover:sepia hover:contrast-125 hover:saturate-50 shadow-2xl"
              style={{ backgroundImage: "url(https://raw.githubusercontent.com/omshree59/movie-assets/main/posters/about4.jpg)" }}
            />
          </motion.div>
        </div>

        {/* RIGHT SIDE: 3D Typography & Bio */}
        <div className="flex flex-col justify-center pointer-events-auto">
          
          {/* HOVER-TRIGGERED 3D TEXT CUBE */}
          <div className="perspective-[1500px] mb-10 w-full h-[260px] md:h-[280px]">
            <motion.div
              className="relative w-full h-full cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{ rotateX: -360 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              {[0, 90, 180, 270].map((deg, index) => (
                <div
                  key={index}
                  className="absolute inset-0 flex flex-col justify-center" // Removed blur and background
                  style={{
                    transform: `rotateX(${deg}deg) translateZ(135px)`, 
                    backfaceVisibility: "hidden", // THE MAGIC FIX: Hides the back text!
                    WebkitBackfaceVisibility: "hidden", 
                  }}
                >
                  <h2 className="text-6xl md:text-8xl font-black text-white uppercase leading-[0.85] tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] relative z-10 pl-4">
                    CODE. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-300 drop-shadow-lg">
                      LOGIC.
                    </span> <br />
                    VISION.
                  </h2>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Short Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="backdrop-blur-sm bg-black/20 p-6 md:p-8 rounded-2xl border border-white/5"
          >
            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-md">
              I'm Omshree Parida.
            </h3>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6 drop-shadow-md">
              A 2nd-year college student and software engineer obsessed with building intelligent, high-performance digital experiences. From developing custom AI architectures like Cloud9 to competing in high-stakes hackathons, I thrive at the intersection of complex algorithms and sleek user interfaces.
            </p>
            <p className="text-zinc-400 text-base leading-relaxed drop-shadow-md">
              When I'm not writing Python or tuning machine learning models, you'll find me contributing to open-source software, grinding in Modern Warfare 3, or studying cinematography. I don't just write code—I engineer solutions.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}