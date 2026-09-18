import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zenith — AI Founder Team Startup Validation Platform",
  description: "Validate startup ideas with an autonomous team of 8 AI agents powered by RAG.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
