import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandMenu } from "@/components/command-menu";
import AntigravityBackground from "@/components/antigravity-background";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

import { FloatingNav } from "@/components/floating-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Future Portfolio | Cloud & Fullstack",
  description: "Senior Full-stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <AntigravityBackground />
            <CommandMenu />
            <FloatingNav />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

