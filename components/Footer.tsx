import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] py-12 px-6 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left side - Branding & Copyright */}
        <div className="text-zinc-500 text-sm text-center md:text-left">
          <p className="font-medium text-zinc-400 mb-1">
            Why not try ? if Try why not with me !! Let's grab the codes together 
          </p>
          <p>© {currentYear} Omshree. All rights reserved.</p>
        </div>

        {/* Right side - Social Links */}
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/omshree59" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          
          <a 
            href="https://linkedin.com/in/omshree-parida-1b0841319" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-[#0A66C2] transition-colors duration-300 transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          
          <a 
            href="https://www.instagram.com/call_me_omshree/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-[#E1306C] transition-colors duration-300 transform hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          
          <a 
            href="mailto:paridaomshree@gmail.com" 
            className="text-zinc-400 hover:text-[#EA4335] transition-colors duration-300 transform hover:scale-110"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>

      </div>
    </footer>
  );
}