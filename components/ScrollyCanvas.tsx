"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  
  // PERFORMANCE LOCK: Keeps track of the last drawn frame
  const lastRenderedFrame = useRef(-1);
  
  const frameCount = 89; 

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // TWEAKED PHYSICS: Lower mass makes it incredibly responsive to slow movements
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    mass: 0.1, 
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/sequence/frame_${i.toString().padStart(3, '0')}_delay-0.066s.png`;
      if (i === 0) img.onload = () => setFirstFrameReady(true);
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const renderCanvas = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && images[index]) {
      const img = images[index];
      if (img.width === 0) return;
      
      const dpr = window.devicePixelRatio || 1;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      if (canvas!.width !== windowWidth * dpr || canvas!.height !== windowHeight * dpr) {
        canvas!.width = windowWidth * dpr;
        canvas!.height = windowHeight * dpr;
        ctx.scale(dpr, dpr);
      }

      const scale = Math.max(windowWidth / img.width, windowHeight / img.height);
      const x = (windowWidth - img.width * scale) / 2;
      const y = (windowHeight - img.height * scale) / 2;
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      
      ctx.clearRect(0, 0, windowWidth, windowHeight);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const currentFrame = Math.floor(latest);
    // PERFORMANCE LOCK: Only draw if the integer frame actually changed
    if (currentFrame !== lastRenderedFrame.current) {
      renderCanvas(currentFrame);
      lastRenderedFrame.current = currentFrame;
    }
  });

  useEffect(() => {
    if (firstFrameReady && images.length > 0) {
      renderCanvas(0);
      lastRenderedFrame.current = 0;
    }
  }, [firstFrameReady, images]);

  useEffect(() => {
    const handleResize = () => {
       if (images.length > 0) {
         renderCanvas(Math.floor(frameIndex.get()));
       }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="relative block h-[500vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}