"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function PeekingCat() {
  const triggerRef = useRef(null);
  const isInView = useInView(triggerRef, { margin: "0px 0px 50px 0px" });
  
  // Track mouse position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1) relative to screen center
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate eye offsets (max 6px movement)
  const eyeOffsetX = mousePos.x * 6;
  const eyeOffsetY = mousePos.y * 6;

  return (
    <>
      {/* Invisible Trigger Div at the very bottom of the document */}
      <div ref={triggerRef} className="absolute bottom-0 w-full h-4 pointer-events-none" />

      {/* The Fixed Peeking Cat */}
      <motion.div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        initial={{ y: "100%" }}
        animate={{ y: isInView ? "20%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          {/* Purple Cat SVG */}
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
            {/* Ears */}
            <path d="M40 90 L20 20 L80 60 Z" fill="#9d86f7" />
            <path d="M160 90 L180 20 L120 60 Z" fill="#9d86f7" />
            
            {/* Head */}
            <path d="M30 60 C 30 60, 100 40, 170 60 C 190 100, 190 160, 170 200 C 100 210, 30 200, 30 200 C 10 160, 10 100, 30 60 Z" fill="#b09af8" />
            
            {/* Eyes - Whites */}
            <ellipse cx="75" cy="110" rx="20" ry="25" fill="white" transform="rotate(-15 75 110)" />
            <ellipse cx="125" cy="110" rx="20" ry="25" fill="white" transform="rotate(15 125 110)" />
            
            {/* Eyes - Pupils (Dynamic) */}
            <ellipse cx={80 + eyeOffsetX} cy={110 + eyeOffsetY} rx="10" ry="14" fill="#121212" transform={`rotate(-15 ${80 + eyeOffsetX} ${110 + eyeOffsetY})`} />
            <ellipse cx={120 + eyeOffsetX} cy={110 + eyeOffsetY} rx="10" ry="14" fill="#121212" transform={`rotate(15 ${120 + eyeOffsetX} ${110 + eyeOffsetY})`} />
            
            {/* Eyes - Highlights (Dynamic) */}
            <circle cx={84 + eyeOffsetX} cy={104 + eyeOffsetY} r="4" fill="white" />
            <circle cx={116 + eyeOffsetX} cy={104 + eyeOffsetY} r="4" fill="white" />

            {/* Nose */}
            <path d="M95 135 Q 100 140 105 135 L 100 145 Z" fill="#ffb6c1" />

            {/* Mouth (Cute "w") */}
            <path d="M90 145 Q 95 152 100 145 Q 105 152 110 145" stroke="#121212" strokeWidth="2" strokeLinecap="round" fill="none" />
            
            {/* Whiskers */}
            <line x1="20" y1="120" x2="45" y2="125" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="135" x2="45" y2="135" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
            
            <line x1="180" y1="120" x2="155" y2="125" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
            <line x1="185" y1="135" x2="155" y2="135" stroke="#121212" strokeWidth="2" strokeLinecap="round" />

            {/* Little Paws Peeking */}
            <circle cx="45" cy="190" r="15" fill="#9d86f7" />
            <circle cx="155" cy="190" r="15" fill="#9d86f7" />
          </svg>
        </div>
      </motion.div>
    </>
  );
}
