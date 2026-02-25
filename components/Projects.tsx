"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";

const projects = [
  {
    title: "CivicFix AI",
    description: "An intelligent platform streamlining civic issue reporting and resolution using advanced Machine Learning algorithms.",
    tech: ["Next.js", "AI/ML", "Tailwind", "Python"],
    liveLink: "https://civic-fix-ai.vercel.app/",
    githubLink: "https://github.com/omshree59/CivicFix-AI.git",
    image: "/civic-fix-ai.png", 
    featured: true, // <-- ONLY THIS ONE STAYS TRUE
  },
  {
    title: "Cloud5 Chatbot",
    description: "A highly optimized, custom-built AI chatbot architecture engineered for streamlined, intelligent interactions.",
    tech: ["Python", "LLMs", "Data Structures"],
    liveLink: "https://cloud5bot.vercel.app/",
    githubLink: "https://github.com/omshree59/Cloud5-PersonalizedAiChatBot.git",
    image: "/cloud5bot.png",
    featured: false, // <-- CHANGED
  },
  {
    title: "Ecoquest - Sih Qualifier",
    description: "Responsive, high-performance user interfaces and frontend components engineered during my web development internship.",
    tech: ["React", "JavaScript", "CSS3"],
    liveLink: "https://eco-trivia-three.vercel.app/",
    githubLink: "",
    image: "/eco.png",
    featured: false, // <-- CHANGED
  },
  {
    title: "NeuralShield-AI",
    description: "Open-source development, Spam filtering and finding in emails and reading pdfs to summarize.",
    tech: ["Python", "Open Source", "Git"],
    liveLink: "https://neuralshield-ai.onrender.com/",
    githubLink: "https://github.com/omshree59/NeuralShield-AI.git",
    image: "/neural.png",
    featured: false, // <-- CHANGED
  },
  {
    title: "Procrastination Timer",
    description: "A sleek, interactive productivity tool engineered to combat procrastination through structured time-blocking and focus intervals.",
    tech: ["JavaScript", "HTML5", "CSS3"], // Update if needed!
    liveLink: "https://procastination-timer-dos.netlify.app/",
    githubLink: "https://github.com/omshree59/TIMERS.git",
    image: "/timer.png",
    featured: false, // <-- CHANGED
  }
];

export default function Projects() {
  return (
    <section className="min-h-screen bg-[#121212] py-32 px-6 md:px-20 z-20 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Selected Works
          </h3>
          <p className="text-zinc-400 max-w-md md:text-right">
            Hover over a project to reveal its interface. Click preview to experience it live.
          </p>
        </motion.div>
        
        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              // FIX: Made the non-featured boxes slightly shorter (min-h-[380px]) for a better Bento look
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#161616] flex flex-col justify-end ${
                project.featured ? "md:col-span-2 min-h-[500px]" : "min-h-[380px]"
              }`}
            >
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-700 ease-in-out transform scale-100 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
              
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="relative z-10 p-8 flex flex-col h-full justify-end transform transition-transform duration-500 group-hover:-translate-y-2">
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-semibold text-orange-400 bg-orange-400/10 rounded-full border border-orange-400/20 backdrop-blur-md">
                      {tech}
                    </span>
                  ))}
                </div>

                <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                  {project.title}
                </h4>
                
                {/* Made text slightly smaller on the non-featured cards so it fits nicely */}
                <p className="text-zinc-400 mb-6 max-w-2xl leading-relaxed text-sm md:text-base group-hover:text-zinc-300 transition-colors duration-300">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <a 
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                  >
                    <Eye size={16} />
                    Live Preview
                  </a>
                  
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 backdrop-blur-md border border-white/5"
                    >
                      <Github size={16} />
                      Source
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}