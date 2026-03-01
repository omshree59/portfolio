"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "CivicFix AI",
    description: "An intelligent platform streamlining civic issue reporting and resolution using advanced Machine Learning algorithms.",
    tech: ["Next.js", "AI/ML", "Tailwind", "Python"],
    liveLink: "https://civic-fix-ai.vercel.app/",
    githubLink: "https://github.com/omshree59/CivicFix-AI.git",
    image: "/civic-fix-ai.png", 
  },
  {
    title: "Cloud5 Chatbot",
    description: "A highly optimized, custom-built AI chatbot architecture engineered for streamlined, intelligent interactions.",
    tech: ["Python", "LLMs", "Data Structures"],
    liveLink: "https://cloud5bot.vercel.app/",
    githubLink: "https://github.com/omshree59/Cloud5-PersonalizedAiChatBot.git",
    image: "/cloud5bot.png",
  },
  {
    title: "Ecoquest - Sih Qualifier",
    description: "Responsive, high-performance user interfaces and frontend components engineered during my web development internship.",
    tech: ["React", "JavaScript", "CSS3"],
    liveLink: "https://eco-trivia-three.vercel.app/",
    githubLink: "",
    image: "/eco.png",
  },
  {
    title: "NeuralShield-AI",
    description: "Open-source development, Spam filtering and finding in emails and reading pdfs to summarize.",
    tech: ["Python", "Open Source", "Git"],
    liveLink: "https://neuralshield-ai.onrender.com/",
    githubLink: "https://github.com/omshree59/NeuralShield-AI.git",
    image: "/neural.png",
  },
  {
    title: "Procrastination Timer",
    description: "A sleek, interactive productivity tool engineered to combat procrastination through structured time-blocking and focus intervals.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    liveLink: "https://procastination-timer-dos.netlify.app/",
    githubLink: "https://github.com/omshree59/TIMERS.git",
    image: "/timer.png",
  }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  // 3D Curved Slider Math
  const getCardStyles = (index: number) => {
    const diff = index - currentIndex;
    const absDiff = Math.abs(diff);
    
    // If it's the center card
    if (diff === 0) {
      return {
        x: 0,
        scale: 1,
        zIndex: 30,
        opacity: 1,
        rotateY: 0,
      };
    }
    
    // If it's to the right
    if (diff > 0) {
      return {
        x: `${40 * absDiff}%`,
        scale: 1 - absDiff * 0.15,
        zIndex: 20 - absDiff,
        opacity: 1 - absDiff * 0.3,
        rotateY: -15 * absDiff,
      };
    }

    // If it's to the left
    return {
      x: `-${40 * absDiff}%`,
      scale: 1 - absDiff * 0.15,
      zIndex: 20 - absDiff,
      opacity: 1 - absDiff * 0.3,
      rotateY: 15 * absDiff,
    };
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-32 overflow-hidden relative z-20 flex flex-col justify-center">
      
      {/* Background Glow tied to the center project */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-20 w-full mb-12 flex justify-between items-end relative z-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Selected Works
          </h3>
          <p className="text-zinc-400 mt-2">Swipe or use arrows to navigate.</p>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="hidden md:flex gap-4">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      {/* The 3D Carousel */}
      <div className="relative h-[550px] w-full max-w-7xl mx-auto flex items-center justify-center perspective-[1200px]">
        <AnimatePresence initial={false}>
          {projects.map((project, index) => {
            const isCenter = currentIndex === index;
            const styles = getCardStyles(index);

            return (
              <motion.div 
                key={index}
                className="absolute w-[90%] md:w-[600px] h-[500px] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/10 bg-[#161616]"
                initial={false}
                animate={{
                  x: styles.x,
                  scale: styles.scale,
                  zIndex: styles.zIndex,
                  opacity: styles.opacity,
                  rotateY: styles.rotateY,
                }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                style={{ transformStyle: "preserve-3d" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -50) nextSlide();
                  else if (swipe > 50) prevSlide();
                }}
                onClick={() => !isCenter && setCurrentIndex(index)}
              >
                
                {/* Background Image inside the Card */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                
                {/* Dark Gradients for Text Readability */}
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent opacity-90" />
                
                {/* Content */}
                <div className={`relative z-10 p-8 flex flex-col h-full justify-end transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-semibold text-orange-400 bg-orange-400/10 rounded-full border border-orange-400/20 backdrop-blur-md">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-3xl font-bold text-white mb-3 tracking-tight drop-shadow-lg">
                    {project.title}
                  </h4>
                  
                  <p className="text-zinc-300 mb-6 max-w-md leading-relaxed drop-shadow-md">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <a 
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300"
                    >
                      <Eye size={18} />
                      Live Preview
                    </a>
                    
                    {project.githubLink && (
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-300 backdrop-blur-md border border-white/5"
                      >
                        <Github size={18} />
                        Source
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Mobile Navigation Indicators */}
      <div className="flex md:hidden justify-center items-center gap-3 mt-8 relative z-40">
        {projects.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'bg-orange-500 w-6' : 'bg-white/20'}`}
          />
        ))}
      </div>

    </section>
  );
}