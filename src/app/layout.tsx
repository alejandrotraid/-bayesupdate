import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "BayesUpdate",
  description: "Track your beliefs and update them with evidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f3f2ed] text-[#1a1a1a]">
        <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col overflow-hidden bg-white shadow-sm sm:my-6 sm:rounded-2xl sm:border sm:border-[#e0dfd8]">
          {children}
        </div>
      </body>
    </html>
  );
}
