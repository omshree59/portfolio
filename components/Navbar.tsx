"use client";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-6 right-6 md:left-12 md:right-12 z-[999] flex flex-col items-end gap-2"
    >
      {/* Brand Icon / Logo */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg]">
          <img src="/brand-icon.svg" alt="Logo" className="w-6 h-6" />
        </div>
        <span className="hidden md:block font-black text-xl tracking-tighter text-white uppercase group-hover:text-cyan-400 transition-colors">
          OM<span className="text-orange-500">SHREE</span>
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-black/90 backdrop-blur-2xl border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            // 🔥 FIX: Made the default text color brighter and font-bold
            className="px-5 py-2 rounded-full text-sm font-bold text-zinc-300 hover:text-white hover:bg-white/15 transition-all duration-300"
          >
            {item.name}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}