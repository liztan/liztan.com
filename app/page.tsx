"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ProjectGrid3Interactive } from "@/components/project-grid-3-interactive"
import { CustomCursor } from "@/components/custom-cursor"
import { Footer } from "@/components/layout/footer"

export default function Home() {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Sample project data - clean and focused
  const projects = [
    {
      id: "project-01",
      number: "01",
      title: "Square",
      description:
        "Automated marketing campaigns that sellers can trust. Designed AI-powered tools that help small businesses create authentic marketing without losing their voice.",
    },
    {
      id: "project-02",
      number: "02",
      title: "Slack",
      description:
        "Checkout redesign that generated $6M in annual revenue. Streamlined the purchase experience and improved data collection to better understand where users were dropping off.",
    },
    {
      id: "project-03",
      number: "03",
      title: "Mailchimp",
      description:
        "Developer documentation redesign that puts the user first. Unified two flagship APIs by replacing marketing aesthetics with developer-focused design, improving engagement.",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CustomCursor />
      <div className="flex-1 container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-12 gap-4">
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
          <div className="col-span-12 md:col-span-10 md:col-start-2 px-4 md:px-0">
            {/* Header */}
            <header className="mb-8">
              <div className="flex justify-between items-center">
                {/* LIZ TAN on mobile */}
                <div className="block md:hidden text-sm font-mono tracking-widest whitespace-nowrap">
                  <Link href="/" className="hover:text-primary transition-colors" onClick={() => window.scrollTo(0, 0)}>
                    LIZ TAN
                  </Link>
                </div>

                {/* Empty div to maintain the flex layout */}
                <div className="flex-1"></div>
              </div>
              {/* Header with no border */}
            </header>

            {/* Static Heading Section */}
            <div className="mt-24 mb-36">
              <div className="font-mono leading-relaxed text-lg md:text-xl lg:text-2xl space-y-1">
                <p>CURIOUS DESIGNER</p>
                <p>INTENTIONAL PROBLEM SOLVER</p>
                <p className="text-primary">CURRENTLY AT SQUARE</p>
              </div>
            </div>

            {/* Work Section */}
            <div id="work" className="mb-8">
              <h2 className="text-xs font-mono tracking-widest mb-16">WHAT I'VE BUILT</h2>
            </div>

            {/* Project Grid - Interactive */}
            <div className="mb-36" data-project-item>
              <ProjectGrid3Interactive projects={projects} />
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
