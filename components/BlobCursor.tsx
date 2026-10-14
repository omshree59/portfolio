"use client";

import { useRef, useEffect } from "react";

export default function BlobCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const rendered = useRef({ x: -100, y: -100 });
  const isInitialized = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    // Hide native cursor globally
    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      // Immediately snap to mouse coordinate on first move so there is zero initial delay
      if (!isInitialized.current) {
        rendered.current.x = e.clientX;
        rendered.current.y = e.clientY;
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
        isInitialized.current = true;
      }

      if (dotRef.current) {
        dotRef.current.style.opacity = "1";
      }
    };

    // Hide when leaving document
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null && dotRef.current) {
        dotRef.current.style.opacity = "0";
      }
    };

    // High performance lerp loop at display refresh rate (120Hz/60Hz)
    const loop = () => {
      const dot = dotRef.current;
      if (dot && isInitialized.current) {
        // High responsiveness factor (0.45) prevents sluggish trailing and eliminates lag
        rendered.current.x += (pos.current.x - rendered.current.x) * 0.45;
        rendered.current.y += (pos.current.y - rendered.current.y) * 0.45;
        dot.style.transform = `translate3d(${rendered.current.x}px, ${rendered.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    rafId.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        width: 26,
        height: 26,
        marginLeft: -13,
        marginTop: -13,
        borderRadius: "50%",
        backgroundColor: "#f5f5f0",
        zIndex: 999999,
        willChange: "transform, opacity",
        mixBlendMode: "difference",
        transition: "opacity 0.15s ease-in-out",
      }}
    />
  );
}
