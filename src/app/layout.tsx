import type { Metadata } from "next";
import {Montserrat, Open_Sans  } from 'next/font/google'
import { Toaster } from 'sonner'
import "./globals.css";
import Providers from "@/app/provider";
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from 'next-themes'

const OpenSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-Open_Sans', 
  display: 'swap',
})

const montserrat = Montserrat({ subsets: ['latin'], weight: '400', variable: '--font-montserrat' });


export const metadata: Metadata = {
  title: "PolicyPeek — AI-Powered Terms & Conditions Analyzer",
  description: "Analyze Terms & Conditions and Privacy Policies with AI. Instantly detect hidden clauses, risks, and get simplified summaries.",
  keywords: [
    "PolicyPeek",
    "Terms and Conditions analyzer",
    "Privacy Policy summary",
    "AI legal tool",
    "legal tech",
    "data sharing",
    "GDPR",
    "legal risk analysis"
  ],
  metadataBase: new URL("https://policypeek.vercel.app"),
  openGraph: {
    title: "PolicyPeek — AI-Powered Legal Analyzer",
    description: "Instantly summarize and flag privacy risks in T&Cs and policies using AI.",
    url: "https://policypeek.vercel.app/",
    siteName: "PolicyPeek",
    images: [
      {
        url: "/logo-image.png", 
        width: 1200,
        height: 630,
        alt: "PolicyPeek AI Summary Screenshot",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PolicyPeek — Understand Legal Docs Instantly",
    description: "AI that breaks down complex legal terms into simple summaries.",
    images: ["/og-image.png"],
    creator: "@manlike_favour"
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_TOKEN || "mr6DpKGyOAKnB0eQH0DQByStxObAfiiRoG9BWEtTkAs",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
          <meta name="google-site-verification" content="mr6DpKGyOAKnB0eQH0DQByStxObAfiiRoG9BWEtTkAs" />
        </head>
      <body
        className={`${OpenSans.variable} font-OpenSans ${montserrat.variable} font-montserrat`}
      >

        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Analytics />
          <Toaster richColors />
          {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}