import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://subhan.tech"),
  title: {
    default: "Subhan - Neural Operations Dashboard",
    template: "%s | Subhan"
  },
  description: "Personal hub for browser extensions, tactical intelligence, and web architecture. Managed by Subhan.",
  keywords: ["Browser Extensions", "Tactical Intelligence", "Neural Design", "Next.js", "Subhan", "Web Development", "AI Tools"],
  authors: [{ name: "Subhan" }],
  creator: "Subhan",
  openGraph: {
    title: "Subhan - Neural Operations Dashboard",
    description: "Personal hub for browser extensions and tactical intelligence.",
    url: "https://subhan.tech",
    siteName: "Subhan Tech",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Subhan Neural Operations Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhan - Neural Operations Dashboard",
    description: "Personal hub for browser extensions and tactical intelligence.",
    creator: "@subhan",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  alternates: {
    canonical: "/",
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans selection:bg-white/10`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
