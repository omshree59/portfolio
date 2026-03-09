"use client";

import * as THREE from "three";
import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment, Edges, Sparkles } from "@react-three/drei";
import {
  CylinderCollider,
  Physics,
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";
import { motion, AnimatePresence } from "framer-motion";

const techData = [
  { name: "React.js", img: "/images/react2.webp", rpm: "12,500", temp: "84°C", aero: "High Downforce", color: "#00f0ff" },
  { name: "Next.js", img: "/images/next2.webp", rpm: "15,000", temp: "92°C", aero: "Low Drag", color: "#ffffff" },
  { name: "Node.js", img: "/images/node2.webp", rpm: "10,200", temp: "78°C", aero: "Balanced", color: "#00ff66" },
  { name: "Express", img: "/images/express.webp", rpm: "9,800", temp: "75°C", aero: "Balanced", color: "#ff0055" },
  { name: "MongoDB", img: "/images/mongo.webp", rpm: "11,100", temp: "81°C", aero: "High Downforce", color: "#00ff66" },
  { name: "MySQL", img: "/images/mysql.webp", rpm: "10,500", temp: "80°C", aero: "High Downforce", color: "#ff9900" },
  { name: "TypeScript", img: "/images/typescript.webp", rpm: "14,200", temp: "88°C", aero: "Low Drag", color: "#0088ff" },
  { name: "JavaScript", img: "/images/javascript.webp", rpm: "14,000", temp: "89°C", aero: "Low Drag", color: "#ffea00" },
];

const techImages = techData.map(t => t.img);

// Reusing same images multiple times to create a cluster of nodes
const allNodes = [...Array(24)].map((_, i) => ({
  ...techData[i % techData.length],
  id: i,
  scale: [0.8, 1, 1.2, 0.9][Math.floor(Math.random() * 4)],
}));

const puckGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.4, 32);

type TechNodeProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  color: string;
  isHovered: boolean;
  intersecting: boolean;
  onHover: (id: number | null) => void;
  id: number;
};

function TechNode({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isHovered,
  color,
  onHover,
  id,
  intersecting
}: TechNodeProps) {
  const api = useRef<RapierRigidBody | null>(null);
  
  // Memoize the initial random spawn position below the floor!
  const initialPosition = useMemo(() => [r(25), -30, r(25)] as [number, number, number], [r]);

  useFrame(({ pointer, viewport }, delta) => {
    if (!api.current) return;
    delta = Math.min(0.1, delta);
    
    const currPos = api.current.translation();
    const posVec = new THREE.Vector3(currPos.x, currPos.y, currPos.z);
    
    const target = new THREE.Vector3();
    
    if (!intersecting) {
      // If the section is out of view, pull all nodes deep below the floor
      target.set(initialPosition[0], -30, initialPosition[2]);
    } else if (isHovered) {
      // Hovered: Aggressively pull right to the cursor, pulling forward out of the screen
      target.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        8 
      );
    } else {
      // Unhovered: Stay in a central cluster, very slightly leaning towards mouse
      target.set(
        (pointer.x * viewport.width) * 0.1,
        (pointer.y * viewport.height) * 0.1,
        0
      );
    }
    
    // Calculate direction and spring force
    const dir = target.sub(posVec);
    const dist = dir.length();
    dir.normalize();
    
    // Much stronger pull if being hovered so it aggressively snaps to cursor,
    // otherwise gentle pull so the cluster smoothly drifts. 
    // If not intersecting, let them drop fast.
    const strength = !intersecting ? (80 * delta * scale) : (isHovered ? (180 * delta * scale) : (25 * delta * scale));
    const impulse = dir.multiplyScalar(strength * dist);

    api.current.applyImpulse(impulse, true);
    
    // Add custom rotation for nodes to look like spinning turbines
    api.current.applyTorqueImpulse({ x: 0, y: (isHovered ? 5 : 1) * delta, z: 0 }, true);
  });

  return (
    <RigidBody
      linearDamping={0.7}
      angularDamping={0.1}
      friction={0.1}
      position={initialPosition}
      ref={api}
      colliders={false}
    >
      <CylinderCollider args={[0.2 * scale, 1.5 * scale]} />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={puckGeometry}
        material={material}
        rotation={[Math.PI / 2, 0, 0]}
        onPointerEnter={() => onHover(id)}
        onPointerLeave={() => onHover(null)}
      >
        <Edges scale={1.05} threshold={15} color={isHovered ? color : "#333333"} toneMapped={false} />
      </mesh>
    </RigidBody>
  );
}

function Scene({ hoveredTechIdx, setHoveredTechIdx, intersecting }: { hoveredTechIdx: number | null, setHoveredTechIdx: (idx: number | null) => void, intersecting: boolean }) {
  const textures = useTexture(techImages);

  const materials = useMemo(() => {
    return textures.map((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      // Map texture to the top and bottom of the cylinder
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        metalness: 0.8,
        roughness: 0.2,
        envMapIntensity: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      });
    });
  }, [textures]);

  return (
    <Physics gravity={[0, 0, 0]}>
      {allNodes.map((props, i) => (
        <TechNode
          key={i}
          {...props}
          material={materials[i % materials.length]}
          isHovered={hoveredTechIdx === props.id}
          intersecting={intersecting}
          onHover={setHoveredTechIdx}
        />
      ))}
    </Physics>
  );
}

const TelemetryHUD = ({ hoveredIdx }: { hoveredIdx: number | null }) => {
  const activeData = hoveredIdx !== null ? allNodes[hoveredIdx] : null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-8">
      {/* Top HUD Area */}
      <div className="flex justify-between items-start w-full">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase">
            <div className="w-2 h-2 bg-cyan-400 animate-pulse" />
            <span>SYS_SYS / ONLINE</span>
          </div>
          <div className="w-64 h-[1px] bg-gradient-to-r from-cyan-400/50 to-transparent relative">
            <div className="absolute left-0 top-0 w-8 h-[1px] bg-cyan-400 animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
        </div>

        <div className="text-right space-y-2 font-mono">
          <div className="text-white/50 text-xs tracking-widest uppercase mb-1">Session Data</div>
          <div className="text-2xl font-black text-white tracking-widest">FP1 / 2026</div>
          <div className="text-cyan-400 text-sm tracking-widest">SEC 1: GREEN</div>
        </div>
      </div>

      {/* Crosshairs & Borders */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] border border-white/5 opacity-50">
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
      </div>

      {/* Target Telemetry Panel */}
      <AnimatePresence>
        {activeData && (
          <motion.div
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            className="absolute left-12 bottom-32 bg-black/40 backdrop-blur-md border-l-4 p-6 w-80 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            style={{ borderColor: activeData.color }}
          >
            <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Target Locked</div>
            <h3 className="text-3xl font-black tracking-tighter text-white mb-6 uppercase" style={{ textShadow: `0 0 20px ${activeData.color}` }}>
              {activeData.name}
            </h3>
            
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between items-end border-b border-white/10 pb-2">
                <span className="text-white/40">ENGINE RPM</span>
                <span className="text-white font-bold">{activeData.rpm}</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-2">
                <span className="text-white/40">CORE TEMP</span>
                <span className="text-white font-bold" style={{ color: activeData.temp > "85°C" ? "#ff3333" : "#00ff66" }}>
                  {activeData.temp}
                </span>
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-2">
                <span className="text-white/40">AERO SETUP</span>
                <span className="text-white font-bold">{activeData.aero}</span>
              </div>
            </div>

            {/* Dynamic Graphing Line */}
            <div className="mt-6 h-8 w-full flex items-end space-x-1 opacity-80">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{ backgroundColor: activeData.color }}
                  animate={{ height: ["20%", `${Math.random() * 80 + 20}%`, "20%"] }}
                  transition={{ repeat: Infinity, duration: Math.random() * 0.5 + 0.2, ease: "linear" }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom HUD Area */}
      <div className="w-full flex justify-center pb-2">
        <div className="flex items-center space-x-1">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-2 h-1 bg-white/20" />
          ))}
        </div>
      </div>
    </div>
  );
};

const TechStackCanvas = () => {
  const [hoveredTechIdx, setHoveredTechIdx] = useState<number | null>(null);
  const [intersecting, setIntersecting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-[#000000] overflow-hidden flex flex-col items-center z-10 font-sans"
    >
      <TelemetryHUD hoveredIdx={hoveredTechIdx} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="absolute top-12 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none"
      >
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-600 tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          Engineering Stack
        </h2>
        <p className="text-cyan-400 mt-2 text-xs font-mono tracking-[0.3em] uppercase opacity-80">
          Telemetry Analysis Interface
        </p>
      </motion.div>

      <div className="absolute inset-0 w-full h-full cursor-crosshair z-10">
        <Canvas
          shadows
          gl={{ alpha: false, antialias: true, preserveDrawingBuffer: true }} 
          camera={{ position: [0, 0, 25], fov: 35, near: 1, far: 200 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.0)}
        >
          <color attach="background" args={["#000000"]} />
          <fog attach="fog" args={["#000000", 20, 50]} />

          <ambientLight intensity={1.5} />
          <spotLight position={[0, 10, 20]} intensity={5} penumbra={1} angle={0.8} color="#ffffff" castShadow />
          <directionalLight position={[-15, 5, 5]} intensity={4} color="#00ffff" />
          <directionalLight position={[15, 5, 5]} intensity={4} color="#ff0033" />

          <Environment preset="city" />

          <Sparkles count={400} scale={30} size={1.5} speed={1.5} opacity={0.6} color="#ffffff" />
          <Sparkles count={100} scale={30} size={3} speed={2} opacity={1} color="#00ffff" />

          <Suspense fallback={null}>
            <Scene hoveredTechIdx={hoveredTechIdx} setHoveredTechIdx={setHoveredTechIdx} intersecting={intersecting} />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Heavy vignette to focus the center */}
      <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
    </section>
  );
};

// Extremely important: This prevents Next.js from attempting to SSR the ThreeJS context
const TechStack = dynamic(() => Promise.resolve(TechStackCanvas), { 
  ssr: false 
});

export default TechStack;