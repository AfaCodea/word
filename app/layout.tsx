import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CommandMenu } from "@/components/command-menu";
import { AntigravityBackground } from "@/components/antigravity-background";

import { FloatingNav } from "@/components/floating-nav";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
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
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: "Agil Prasunza | Full-stack Developer & Cloud Architect",
    template: "%s | Agil Prasunza"
  },
  description: "Senior Full-stack Developer specializing in Next.js, TypeScript, React, AWS, and cloud architecture. Building scalable web applications and modern cloud infrastructure solutions.",
  keywords: ["full-stack developer", "cloud architect", "next.js developer", "typescript", "aws", "react developer", "cloud infrastructure", "web development", "agil prasunza"],
  authors: [{ name: "Agil Prasunza" }],
  creator: "Agil Prasunza",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Agil Prasunza | Full-stack Developer & Cloud Architect",
    description: "Portfolio showcasing full-stack development, cloud architecture, and modern web application projects",
    siteName: "Agil Prasunza Portfolio",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Agil Prasunza - Full-stack Developer Portfolio"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agil Prasunza | Full-stack Developer",
    description: "Portfolio showcasing full-stack development and cloud architecture projects",
    images: ["/og-image.jpg"],
    creator: "@yourtwitterhandle"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
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
