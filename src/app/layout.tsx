import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner'
import "./globals.css";
import Providers from "@/app/provider";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PolicyPeek",
  description: "PolicyPeek is a web application that allows users to paste and analyze Terms & Conditions and Privacy Policies before agreeing to them.",
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://peekpolicy.vercel.app',
    siteName: 'PolicyPeek',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_TOKEN,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Analytics />
          <Toaster richColors />
          {children}
        </Providers>
      </body>
    </html>
  );
}