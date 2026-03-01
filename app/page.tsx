import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import InteractiveGallery from "@/components/InteractiveGallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen selection:bg-orange-500/30">
      
      {/* 1. YOUR ORIGINAL 3D SCROLL INTRO */}
      <div className="relative w-full">
        <ScrollyCanvas />
        <Overlay />
      </div>

      {/* 2. YOUR ORIGINAL TIMELINE */}
      <Timeline />

      {/* 4. THE NEW FEATURE: YOUR CINEMATIC PHOTOS */}
      <InteractiveGallery />
      
      {/* 3. YOUR ORIGINAL PROJECTS GRID */}
      <Projects />
      
      {/* 5. YOUR FOOTER */}
      <Footer />
      
    </main>
  );
}