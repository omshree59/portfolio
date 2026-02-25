"use client";
import { motion } from "framer-motion";

const timelineData = [
  {
    date: "2026",
    title: "Hackathon Competitor",
    organization: "TechSpirit (Google Dev) & Code to Conquer",
    description: "Participated in high-stakes hackathons, engineering modern digital solutions and pushing the boundaries of rapid development.",
  },
  {
    date: "Early 2026",
    title: "AI/ML & Leadership Initiatives",
    organization: "PGAGI & Unstop",
    description: "Actively pursuing advanced Artificial Intelligence and Machine Learning opportunities, alongside exclusive engagements like the 1-day CEO internship program.",
  },
  {
    date: "2025 (6 Months)",
    title: "Cloud Arcade Program",
    organization: "Google Cloud",
    description: "Completed a rigorous half-year cloud architecture program, mastering Google Cloud infrastructure and earning the exclusive Arcade Legends rewards.",
  },
  {
    date: "2025 (2 Months)",
    title: "Web Development Intern",
    organization: "CodSoft",
    description: "Focused on front-end web development, building responsive user interfaces, and translating design concepts into functional code.",
  }
];

export default function Timeline() {
  return (
    <section className="bg-[#121212] py-32 px-6 md:px-20 relative z-20">
      <div className="max-w-7xl mx-auto">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          // FIX 1: Changed once: true to once: false
          viewport={{ once: false, amount: 0.3 }} 
          className="text-4xl md:text-6xl font-bold text-white mb-24 tracking-tight text-center"
        >
          The Journey
        </motion.h3>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

          <div className="space-y-16">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-orange-500 border-4 border-[#121212] -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />

                  <div className="hidden md:block w-1/2" />

                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    // FIX 2: Changed once: true to once: false
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}
                  >
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors duration-300">
                      <span className="text-orange-400 font-mono text-sm tracking-wider uppercase mb-2 block">
                        {item.date}
                      </span>
                      <h4 className="text-2xl font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <h5 className="text-lg text-zinc-300 mb-4 font-medium">
                        {item.organization}
                      </h5>
                      <p className="text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}