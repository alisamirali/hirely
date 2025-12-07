import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Navbar } from "@/components/general/Navbar";

import { ThemeProvider } from "@/components/general/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
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
  title: "Hirely - Find Jobs. Hire Talent.",
  description:
    "Hirely helps job seekers find the right opportunities and enables companies to discover great talent with ease. A simple, fast, and reliable platform for everyone.",
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-12">
            <Navbar />
            {children}
            <Toaster closeButton richColors />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
