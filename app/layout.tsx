import type { Metadata } from "next";
import "./globals.css"; // <--- THIS IS THE MAGIC LINE

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Creative Developer Portfolio",
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