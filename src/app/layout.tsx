import type { Metadata } from "next";
import { Inter, Roboto } from 'next/font/google'
import { Toaster } from 'sonner'
import "./globals.css";
import Providers from "@/app/provider";
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from 'next-themes'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // adjust as needed
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "PolicyPeek",
  description: "PolicyPeek is a web application that allows users to paste and analyze Terms & Conditions and Privacy Policies before agreeing to them.",
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://policypeek.vercel.app/',
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
        <head>
          <meta name="google-site-verification" content="mr6DpKGyOAKnB0eQH0DQByStxObAfiiRoG9BWEtTkAs" />
        </head>
      <body
        className={`${inter.variable} ${roboto.variable}`}
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