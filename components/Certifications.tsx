'use client';

import { motion } from 'framer-motion';
import InfiniteSpiral from './InfiniteSpiral';
import { ExternalLink, Award } from 'lucide-react';
import { PixelatedCanvas } from '@/components/ui/pixelated-canvas';

const certifications = [
  {
    title: "AWS Academy Graduate - Cloud Architecting",
    issuer: "Amazon Web Services (AWS)",
    date: "Sep 2026",
    link: "https://www.credly.com/badges/c859f74e-fdd8-40d1-9f6c-9e483c136b64/public_url",
    badgeImg: "/aws-academy-graduate-cloud-architecting-training-ba.webp"
  },
  {
    title: "Gemini Certified Student",
    issuer: "Google",
    date: "Sep 2026",
    link: "https://edu.google.accredible.com/a1177470-2dd5-4486-b8e2-81e950f2e8f8#acc.dtHbFIqg",
    badgeImg: "/gemini.webp"
  },
  {
    title: "Agentic AI Foundations Associate",
    issuer: "Oracle",
    date: "Sep 2026",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=A7B7453FC10B99BB557A513F143FC6D8A969EC2473CF264DAD01318EE0C28B8B",
    badgeImg: "/oacle badge.webp"
  },
  {
    title: "Technology Job Simulation",
    issuer: "Deloitte Australia",
    date: "Sep 2026",
    link: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/udmxiyHeqYQLkTPvf_9PBTqmSxAf6zZTseP_fu9xpTsjYdmD9wXT5_1788616729671_completion_certificate.pdf",
    badgeImg: "/deloitte technology job simulation.webp"
  },
  {
    title: "Foundations of Prompt Engineering",
    issuer: "Amazon Web Services (AWS)",
    date: "Sep 2026",
    link: "#",
    badgeImg: "/aws prompt.webp"
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM",
    date: "Aug 2026",
    link: "https://www.credly.com/badges/986d323c-7c1e-4ec3-a2a6-547de87fd8cc/public_url",
    badgeImg: "/IBM AI fundamnentals badge.webp"
  },
  {
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    date: "Aug 2026",
    link: "https://www.linkedin.com/learning/certificates/1f77d746e3370070522a4b71166948b29003f64eb8c261c01f10006dcdbff92d?trk=share_certificate",
    badgeImg: "/linkedin .webp"
  },
  {
    title: "AI Foundation Course",
    issuer: "Jio Institute",
    date: "Aug 2026",
    link: "#",
    badgeImg: "/Jio Ai Foundations.webp"
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte",
    date: "Aug 2026",
    link: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_fu9xpTsjYdmD9wXT5_1786708404313_completion_certificate.pdf",
    badgeImg: "/deloitte data analytics job simulation.webp"
  },
  {
    title: "Hedera Certified Developer",
    issuer: "The Hashgraph Association",
    date: "Aug 2026",
    link: "https://certs.hashgraphdev.com/48c2d1a9-a6ca-40b4-a2c8-154583a51a21.pdf",
    badgeImg: "/HCD ASSOCIATE.webp"
  },
  {
    title: "Hedera Certified Foundation",
    issuer: "The Hashgraph Association",
    date: "Aug 2026",
    link: "#",
    badgeImg: "/HC FOUNDATION.webp"
  },
  {
    title: "Databricks AI Agent Fundamentals",
    issuer: "Databricks",
    date: "Aug 2026",
    link: "https://credentials.databricks.com/5f8280f8-c35e-4ddc-bfaa-834110eb1f9b",
    badgeImg: "/databricks ai fundamentals badge .webp"
  },
  {
    title: "Databricks Fundamentals",
    issuer: "Databricks",
    date: "Aug 2026",
    link: "#",
    badgeImg: "/7d551976-310f-4397-a1ec-f10388701bc4.webp"
  },
  {
    title: "Databricks Generative AI Fundamentals",
    issuer: "Databricks",
    date: "Aug 2026",
    link: "#",
    badgeImg: "/databricks genai.webp"
  },
  {
    title: "AWS Academy Graduate – Cloud Foundations",
    issuer: "AWS",
    date: "Jul 2026",
    link: "https://www.credly.com/badges/413e4ce3-655a-4a6e-9cf3-96729edd0b08/public_url",
    badgeImg: "/aws-academy-graduate-cloud-foundations-training-bad (3).webp"
  },
  {
    title: "Major in Artificial Intelligence",
    issuer: "IIT Ropar",
    date: "Feb 2026",
    link: "#",
    badgeImg: "/iit.webp"
  },
  {
    title: "TCS iON Career Edge",
    issuer: "TCS",
    date: "Jul 2026",
    link: "#",
    badgeImg: "/tcs.webp"
  },
  {
    title: "Google Cloud",
    issuer: "Google Developers Group",
    date: "Jan 2026",
    link: "https://credsverse.com/credentials/9fc2638d-dcc9-49a1-8726-ac168a6f41bc",
    badgeImg: "/googlecloud.webp"
  },
  {
    title: "Neo4j Certified Professional",
    issuer: "Neo4j",
    date: "Jul 2025",
    link: "https://graphacademy.neo4j.com/c/54145f18-a7ca-418a-8f4a-89f592cd4b46/",
    badgeImg: "/neo4j.webp"
  }
];

export default function Certifications() {
  
  // Format items for the InfiniteSpiral
  const spiralItems = certifications.map((cert, index) => ({
    id: `cert-${index}`,
    href: cert.link !== "#" ? cert.link : undefined,
    target: "_blank",
    content: cert.badgeImg ? (
      <div 
        className="w-full h-full bg-[#0a0a0a] relative group overflow-hidden cursor-pointer"
        onClick={() => cert.link !== "#" && window.open(cert.link, '_blank')}
      >
        {/* Huge centered image */}
        <div className="absolute inset-0 p-4 pb-16 flex items-center justify-center">
          <img src={cert.badgeImg} alt={cert.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
        </div>
        
        {/* Gradient Text Footer */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
          <h3 className="text-sm font-bold text-white mb-2 leading-snug line-clamp-2">
            {cert.title}
          </h3>
          <div className="flex justify-between items-center">
            <p className="text-[10px] text-zinc-400 font-medium line-clamp-1">{cert.issuer}</p>
            {cert.link !== "#" && (
              <span className="flex items-center gap-1 text-[9px] font-bold tracking-widest text-[#FFD700] bg-[#FFD700]/10 px-2 py-1 rounded-full border border-[#FFD700]/20 group-hover:bg-[#FFD700]/20 transition-colors uppercase whitespace-nowrap">
                Verify Me
                <ExternalLink className="w-2 h-2" />
              </span>
            )}
          </div>
        </div>
      </div>
    ) : (
      <div 
        className="w-full h-full bg-[#0a0a0a] p-5 flex flex-col justify-between group hover:bg-[#121212] transition-colors cursor-pointer"
        onClick={() => cert.link !== "#" && window.open(cert.link, '_blank')}
      >
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden w-10 h-10">
              <Award className="w-5 h-5 text-zinc-300" />
            </div>
            {cert.link !== "#" && (
              <span className="flex items-center gap-1 text-[9px] font-bold tracking-widest text-[#FFD700] bg-[#FFD700]/10 px-2 py-1 rounded-full border border-[#FFD700]/20 group-hover:bg-[#FFD700]/20 transition-colors uppercase whitespace-nowrap">
                Verify Me
                <ExternalLink className="w-2 h-2" />
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold text-white mb-1 leading-snug line-clamp-3">
            {cert.title}
          </h3>
          <p className="text-xs text-zinc-400 font-medium line-clamp-1">
            {cert.issuer}
          </p>
        </div>
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] text-zinc-300 font-mono">
            {cert.date}
          </span>
        </div>
      </div>
    )
  }));

  return (
    <section id="certifications" className="py-24 relative z-20 overflow-hidden bg-[#050505]">
      {/* Interactive Pixelated Canvas Background */}
      {/* opacity-20 so it sits quietly in the background without overpowering the content */}
      <div className="absolute inset-0 z-0 opacity-30">
        <PixelatedCanvas
          src="/omshree-guitar.webp"
          cellSize={8} /* Increased from 4 to 8 to massively improve performance and reduce lag */
          dotScale={0.8}
          shape="square"
          backgroundColor="#000000"
          dropoutStrength={0.5}
          interactive={true}
          distortionStrength={5}
          distortionRadius={80}
          distortionMode="swirl"
          followSpeed={0.1}
          sampleAverage={false} /* Disabled to save CPU */
          tintColor="#FFD700" /* Changed to a nice golden yellow */
          tintStrength={0.15} /* Slightly increased tint strength for better warmth */
          maxFps={30} /* Capped at 30fps to keep scrolling buttery smooth */
          responsive={true}
          className="w-full h-full"
        />
        {/* Gradient overlay to ensure text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <div className="flex flex-col items-center mb-12">
          {/* 🔥 Robust SVG ClipPath Mask 🔥 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full flex justify-center mb-2"
          >
            {/* Added drop-shadow to SVG to pop out against the background */}
            <svg viewBox="0 0 1000 150" className="w-full h-auto max-w-5xl drop-shadow-2xl">
              <defs>
                <clipPath id="cert-text-mask">
                  <text 
                    x="50%" 
                    y="50%" 
                    dominantBaseline="middle" 
                    textAnchor="middle" 
                    fontSize="110" 
                    fontWeight="900" 
                    fontFamily="sans-serif" 
                    letterSpacing="-1px"
                  >
                    CERTIFICATIONS
                  </text>
                </clipPath>
              </defs>
              
              <g clipPath="url(#cert-text-mask)">
                {/* Changed base color to a rich yellow ochre */}
                <rect width="100%" height="100%" fill="#DAA520" />
                
                {/* Brand names tiled and angled inside the text */}
                <g transform="rotate(-5 500 75)">
                  <text x="50" y="40" fill="#FF9900" fontSize="28" fontWeight="bold">AWS</text>
                  <text x="180" y="40" fill="#4285F4" fontSize="28" fontWeight="bold">GOOGLE</text>
                  <text x="390" y="40" fill="#F80000" fontSize="28" fontWeight="bold">ORACLE</text>
                  <text x="600" y="40" fill="#7FBA00" fontSize="28" fontWeight="bold">MICROSOFT</text>
                  <text x="850" y="40" fill="#FF9900" fontSize="28" fontWeight="bold">AWS</text>

                  <text x="-50" y="90" fill="#00A4EF" fontSize="28" fontWeight="bold">MICROSOFT</text>
                  <text x="220" y="90" fill="#FF9900" fontSize="28" fontWeight="bold">AWS</text>
                  <text x="350" y="90" fill="#EA4335" fontSize="28" fontWeight="bold">GOOGLE</text>
                  <text x="560" y="90" fill="#F80000" fontSize="28" fontWeight="bold">ORACLE</text>
                  <text x="760" y="90" fill="#00A4EF" fontSize="28" fontWeight="bold">MICROSOFT</text>

                  <text x="80" y="140" fill="#F80000" fontSize="28" fontWeight="bold">ORACLE</text>
                  <text x="300" y="140" fill="#00A4EF" fontSize="28" fontWeight="bold">MICROSOFT</text>
                  <text x="580" y="140" fill="#FF9900" fontSize="28" fontWeight="bold">AWS</text>
                  <text x="720" y="140" fill="#34A853" fontSize="28" fontWeight="bold">GOOGLE</text>
                  <text x="940" y="140" fill="#F80000" fontSize="28" fontWeight="bold">ORACLE</text>
                </g>
              </g>
            </svg>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 font-mono text-sm tracking-widest uppercase text-center"
          >
            Validated Expertise & Continuous Learning
          </motion.p>
        </div>
      </div>

      <div style={{ height: '500px', position: 'relative', overflow: 'hidden' }}>
        <InfiniteSpiral
          items={spiralItems}
          animationMode="all"
          speed={0.3}
          radius={180}
          cardWidth={220}
          cardHeight={200}
          verticalSpacing={50}
          perspective={1000}
          cardRadius={12}
          centerScale={1.3}
          edgeBlur={3}
          cardsPerTurn={8}
          pauseOnHover
        />
      </div>
    </section>
  );
}
