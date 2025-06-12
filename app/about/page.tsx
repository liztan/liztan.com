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
            {/* Header */}
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

            {/* About content */}
            <div className="mt-24 mb-36">
              {/* About Me Section */}
              <div className="flex flex-col md:flex-row gap-16">
                <div className="md:w-3/5">
                  <h2 className="text-xs font-mono tracking-widest mb-10">ABOUT ME</h2>

                  <div className="space-y-6 text-muted-foreground leading-relaxed font-light tracking-wide">
                    <p>Liz here, Brooklyn-based designer.</p>

                    <p>
                      Currently at Square, I design for the Growth team, helping people discover and adopt our products.
                      Previously, I've reimagined checkout flows at Slack, built design systems at Equinox, and worked
                      with clients like the Obama Foundation, The New York Post, Mailchimp, and Goldman Sachs.
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
                      . When not designing, you'll find me making mega-totes, traveling, or spending time with my two
                      little ones.
                    </p>

                    <p className="pt-4">
                      <Link href="mailto:hi@liztan.com" className="text-primary hover:underline font-mono">
                        Say hi!
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="md:w-2/5">
                  <div className="aspect-[3/4] relative sticky top-24 overflow-hidden">
                    <Image
                      src="/images/liz-photo.png"
                      alt="Liz Tan standing in front of a graffiti wall"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
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
