import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "LLMatch — AI Model Finder",
  description: "Describe your use case and get the perfect AI model recommendation with an optimized prompt.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-[#0a0f0f] text-slate-200 antialiased">{children}</body>
    </html>
  );
}
