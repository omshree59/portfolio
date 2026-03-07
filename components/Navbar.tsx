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
      className="absolute top-6 right-6 md:right-12 z-[999]"
    >
      {/* 🔥 FIX: Changed to bg-black/90, added a bolder border, and heavy drop shadow */}
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