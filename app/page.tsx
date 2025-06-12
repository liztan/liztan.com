"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8 min-h-screen flex flex-col">
        <div className="grid grid-cols-12 gap-4 flex-1">
          {/* Vertical LIZ TAN - desktop only */}
          <div className="hidden md:block col-span-1 relative">
            <Link
              href="/"
              className="fixed top-1/2 transform -translate-y-1/2 text-sm font-mono tracking-widest writing-vertical -rotate-180 hover:text-primary transition-colors"
              onClick={() => window.scrollTo(0, 0)}
            >
              LIZ TAN
            </Link>
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-10 md:col-start-2 px-4 md:px-0 flex flex-col min-h-full">
            {/* Header - clean and minimal */}
            <header className="mb-8">
              <div className="flex justify-between items-center">
                {/* LIZ TAN on mobile */}
                <div className="block md:hidden text-sm font-mono tracking-widest whitespace-nowrap">
                  <Link href="/" className="hover:text-primary transition-colors" onClick={() => window.scrollTo(0, 0)}>
                    LIZ TAN
                  </Link>
                </div>

                {/* Empty div to maintain layout */}
                <div className="flex-1"></div>
              </div>
            </header>

            {/* Static Heading Section - now aligned with about page */}
            <div className="mt-24 mb-4">
              <div className="font-mono leading-relaxed text-lg md:text-xl lg:text-2xl space-y-1 mb-6">
                <p>CURIOUS DESIGNER</p>
                <p>INTENTIONAL PROBLEM SOLVER</p>
                <p className="text-primary">CURRENTLY AT SQUARE</p>
              </div>

              {/* Work note below the heading - mono font in muted grey */}
              <p className="font-mono text-sm tracking-wide text-muted-foreground">Work available upon request</p>
            </div>

            {/* Empty flex space to push footer down */}
            <div className="flex-1"></div>

            {/* Footer anchored to bottom */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
