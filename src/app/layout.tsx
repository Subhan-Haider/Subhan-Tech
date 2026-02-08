import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Subhan - Neural Operations Dashboard",
  description: "Personal hub for browser extensions, tactical intelligence, and web architecture. Managed by Subhan.",
  keywords: ["Browser Extensions", "Tactical Intelligence", "Neural Design", "Next.js", "Subhan"],
  authors: [{ name: "Subhan" }],
  openGraph: {
    title: "Subhan - Neural Operations Dashboard",
    description: "Personal hub for browser extensions and tactical intelligence.",
    url: "https://subhan.tech",
    siteName: "Subhan Tech",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans selection:bg-white/10`}>
        {children}
      </body>
    </html>
  );
}
