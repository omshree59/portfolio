import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen relative selection:bg-orange-500/30">
      <div className="relative w-full">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <Timeline />
      <Projects />
      <Footer />
    </main>
  );
}