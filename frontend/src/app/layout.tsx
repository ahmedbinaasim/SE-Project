import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StudyAI - AI-Powered Study Notes",
  description: "Transform your study notes with AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="noise"></div>
        <div className="animated-gradient"></div>
        {children}
      </body>
    </html>
  )
}

