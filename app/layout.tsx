import type { Metadata } from "next";
import "./globals.css"; // <--- THIS IS THE MAGIC LINE

export const metadata: Metadata = {
  title: "Omshree Parida | Portfolio",
  description: "Official Portfolio of Omshree Parida - Software Engineer & Creative Developer.",
};

import ScrollProgress from "@/components/ScrollProgress";
import AmbientBackground from "@/components/AmbientBackground";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans text-white bg-[#121212] relative">
        <AmbientBackground />
        
        {children}
      </body>
    </html>
  );
}