"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { startSmoothPreload } from "@/lib/preloader";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Non-blocking background caching: runs without locking the main UI thread
    startSmoothPreload();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Ensure GPU acceleration
      gsap.set(".texts-container span", {
        force3D: true,
        transformPerspective: 1000,
      });

      tl.to(".texts-container", {
        duration: 0,
        opacity: 1,
        ease: "power3.out",
      })
        .from(".texts-container span", {
          duration: 1.3,
          delay: 0.4,
          y: 70,
          skewY: 10,
          stagger: 0.3,
          ease: "power3.out",
        })
        .to(".texts-container span", {
          duration: 0.9,
          delay: 0.3,
          y: -70,
          skewY: -15,
          stagger: 0.15,
          ease: "power3.inOut",
        })
        .to(
          containerRef.current,
          {
            duration: 1.2,
            height: "0vh",
            ease: "power3.inOut",
            onComplete: () => {
              onComplete();
            },
          },
          "-=0.2"
        )
        .to(containerRef.current, {
          duration: 0,
          css: { display: "none" },
        });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="preloader fixed inset-0 z-[99999] bg-[#0e1016] text-[#e4ded7] flex items-center justify-center w-full h-screen overflow-hidden select-none pointer-events-auto will-change-[height]"
      style={{
        zIndex: 99999,
        background: "#0E1016",
        color: "#e4ded7",
      }}
    >
      {/* Main Staggered Words (Exact structure and style from johnpradeep.dev) */}
      <div
        ref={textContainerRef}
        className="texts-container flex items-center justify-center gap-2 sm:gap-3 md:gap-4 overflow-hidden text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#e4ded7] opacity-0"
        style={{ height: "80px" }}
      >
        <span className="inline-block will-change-transform">Designer,</span>
        <span className="inline-block will-change-transform text-cyan-400">Developer,</span>
        <span className="inline-block will-change-transform">Dominator.</span>
      </div>
    </div>
  );
}
