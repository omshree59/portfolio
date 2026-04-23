import type { Metadata } from "next";
import "./globals.css"; // <--- THIS IS THE MAGIC LINE

export const metadata: Metadata = {
  title: "Omshree Parida | Portfolio",
  description: "Official Portfolio of Omshree Parida - Software Engineer & Creative Developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}