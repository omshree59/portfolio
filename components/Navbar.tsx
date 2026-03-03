"use client";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    // 🔥 FIX: 'absolute' makes it stay at the top. 'right-6 md:right-12' pushes it to the right corner.
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-6 right-6 md:right-12 z-[999]"
    >
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="px-5 py-2 rounded-full text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {item.name}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}