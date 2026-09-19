"use client";

import { useRef, useEffect } from "react";

export default function BlobCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const rendered = useRef({ x: -100, y: -100 });
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
      if (dotRef.current) {
        dotRef.current.style.opacity = "1";
      }
    };

    // Hide when leaving document or entering iframe
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null && dotRef.current) {
        dotRef.current.style.opacity = "0";
      }
    };

    // Simple lerp loop at display refresh rate — no library overhead
    const loop = () => {
      const dot = dotRef.current;
      if (dot) {
        // Lerp factor: 0.15 gives a subtle trailing feel, 1.0 = instant
        rendered.current.x += (pos.current.x - rendered.current.x) * 0.18;
        rendered.current.y += (pos.current.y - rendered.current.y) * 0.18;
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
        width: 28,
        height: 28,
        marginLeft: -14,
        marginTop: -14,
        borderRadius: "50%",
        backgroundColor: "#f5f5f0",
        zIndex: 9999,
        willChange: "transform, opacity",
        mixBlendMode: "difference",
        transition: "opacity 0.2s ease-in-out",
      }}
    />
  );
}
