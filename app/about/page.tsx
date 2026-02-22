"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"



export default function About() {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

                {/* Empty div to maintain spacing */}
                <div className="flex-1"></div>
              </div>
            </header>

            {/* About content */}
            <div className="mt-24 mb-36">
              {/* About Me Section */}
              <div className="mb-24 max-w-[600px]">
                <h2 className="text-xs font-mono tracking-widest mb-10">ABOUT ME</h2>

                <div className="mb-12 max-w-[280px]">
                  <Image
                    src="/images/liz-photo-halftone.jpg"
                    alt="Liz Tan portrait in halftone dot-matrix style"
                    width={1280}
                    height={856}
                    className="w-full h-auto"
                    priority
                  />
                </div>

                <div>
                  <div className="space-y-6 text-foreground leading-relaxed font-light tracking-wide">
                    <p>Liz here, Brooklyn-based designer.</p>

                    <p>
                      Currently at Square, I design for the Growth team, helping people discover and adopt our products.
                      Prior to Growth, I worked on Square Marketing designing AI-powered marketing tools for sellers.
                      I've also reimagined checkout flows at Slack, built design systems at Equinox, and worked with
                      clients like the Obama Foundation, The New York Post, Mailchimp, and Goldman Sachs.
                    </p>

                    <p>
                      I believe in giving users a seat at the table and crafting cohesive experiences that consider the
                      entire journey—including why{" "}
                      <Link
                        href="https://www.fastcompany.com/90611096/why-you-should-design-for-breakups-and-let-your-users-go"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        endings are a product design problem worth solving
                      </Link>
                      .
                    </p>

                    <p>
                      When not designing, you'll find me making things with my hands, exploring new places, and spending time with my{" "}
                      <Link
                        href="https://elihorne.com"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        partner
                      </Link>{" "}
                      and our two little ones.
                    </p>

                    <p className="pt-4">
                      <a href="mailto:hi@liztan.com" className="text-primary hover:underline font-mono">
                        Say hi!
                      </a>
                    </p>
                  </div>
                </div>
                </div>
            </div>


          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-10 md:col-start-2 px-4 md:px-0">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
