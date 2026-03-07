"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react"; 

// 🔥 We added a prop so the Hero can tell the main page when it's done
export default function HeroFramer({ onLoaded }: { onLoaded: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadFinish = () => {
    setIsLoading(false);
    onLoaded(); // Tells app/page.tsx "I'm ready! Load the rest of the site!"
  };

  useEffect(() => {
    // Failsafe timer: if the internet is slow, force the site to show after 3 seconds
    const fallbackTimer = setTimeout(() => {
      handleLoadFinish();
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
      
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 bg-[#050505]">
          <Loader2 className="w-12 h-12 text-zinc-400 animate-spin mb-4" />
          <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest animate-pulse">
            Loading Experience...
          </p>
        </div>
      )}

      <iframe
        src="https://omshree.framer.website/"
        className={`absolute top-0 left-0 w-full border-none z-10 transition-opacity duration-1000 ease-in-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        style={{ height: 'calc(100vh + 60px)' }}
        title="Omshree Parida - Hero"
        sandbox="allow-scripts allow-same-origin"
        scrolling="no"
        onLoad={handleLoadFinish} // 🔥 Triggers the sequence when the iframe paints
      />
      
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent pointer-events-none z-20" />
    </div>
  );
}