import type { Metadata, Viewport } from "next";
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BayesUpdate",
  },
};

export const viewport: Viewport = {
  themeColor: "var(--accent)",
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
      <body className="min-h-full flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)]">
        <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col overflow-hidden bg-[var(--bg-surface)] shadow-sm sm:my-6 sm:rounded-2xl sm:border sm:border-[var(--border-strong)]">
          {children}
        </div>
      </body>
    </html>
  );
}
