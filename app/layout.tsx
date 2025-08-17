import type React from "react"
import type { Metadata } from "next"
import { Space_Mono, Manrope } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

// Space Mono for headings and accents
const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

// Manrope for body text
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "Liz Tan - Designer",
  description: "Strategic designer helping businesses connect with their customers",
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceMono.variable} ${manrope.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}
