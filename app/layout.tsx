import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Footer } from "@/components/footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "LayoffGuard - AI-Powered Career Security Platform",
  description:
    "Predict layoff risks and get personalized skill recommendations to secure your career with advanced machine learning analytics",
  keywords:
    "layoff prediction, career security, skill analysis, AI, machine learning, HR analytics, employee development",
  authors: [{ name: "LayoffGuard Team" }],
  creator: "LayoffGuard",
  publisher: "LayoffGuard",
  generator: "v0.app",
  openGraph: {
    title: "LayoffGuard - AI-Powered Career Security Platform",
    description: "Predict layoff risks and get personalized skill recommendations to secure your career",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LayoffGuard - AI-Powered Career Security Platform",
    description: "Predict layoff risks and get personalized skill recommendations to secure your career",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Suspense fallback={null}>
            <main className="flex-1">{children}</main>
          </Suspense>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
