import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"
import Chatbot from "@/components/chatbot/Chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LayarNusantara - Discover Local Indonesian Experiences",
  description: "Platform promosi bisnis lokal Indonesia untuk traveler",
  icons: {
    icon: "logo.jpeg"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <main>{children}</main>
        <Toaster position="top-right" richColors />
        <Chatbot />
      </body>
    </html>
  )
}
