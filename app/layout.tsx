import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="min-h-screen">
          <div className="h-16 sm:h-14" />
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
