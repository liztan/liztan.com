"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/layout/footer"

export default function SlackProject() {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8">
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
              <div className="border-b border-border mt-8"></div>
            </header>

            {/* Hero Section with Mockup */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-8 md:p-16 lg:p-24">
                <div className="flex justify-center">
                  <div className="max-w-4xl w-full">
                    <Image
                      src="/images/slack-checkout-mockup.jpg"
                      alt="Slack checkout experience redesign showing upgrade flow interface"
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="max-w-4xl">
              {/* Project Title */}
              <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-light mb-8">Slack</h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                  Enhance Slack's checkout experience by leveraging data-driven insights to optimize the purchase
                  process and reduce friction for upgrading teams.
                </p>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pb-16 border-b border-border">
                <div>
                  <h3 className="text-xs font-mono tracking-widest mb-4">ROLE</h3>
                  <p className="text-muted-foreground">Product Designer</p>
                </div>
                <div>
                  <h3 className="text-xs font-mono tracking-widest mb-4">TIMELINE</h3>
                  <p className="text-muted-foreground">6 months</p>
                </div>
                <div>
                  <h3 className="text-xs font-mono tracking-widest mb-4">TEAM</h3>
                  <p className="text-muted-foreground">Design, Engineering, Product</p>
                </div>
              </div>

              {/* Project Overview */}
              <div className="mb-16">
                <h2 className="text-xs font-mono tracking-widest mb-8">OVERVIEW</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed font-light tracking-wide">
                  <p>
                    Slack's checkout experience was a critical conversion point that needed optimization. Through
                    extensive user research and data analysis, we identified key friction points in the upgrade flow
                    that were preventing teams from successfully converting to paid plans.
                  </p>
                  <p>
                    The challenge was to create a streamlined, trustworthy checkout experience that would reduce
                    abandonment rates while maintaining Slack's brand values of simplicity and transparency.
                  </p>
                </div>
              </div>

              {/* Challenge */}
              <div className="mb-16">
                <h2 className="text-xs font-mono tracking-widest mb-8">CHALLENGE</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed font-light tracking-wide">
                  <p>
                    The existing checkout flow had a high abandonment rate, particularly at the payment information
                    step. Users were confused by pricing tiers, uncertain about billing cycles, and concerned about
                    commitment levels.
                  </p>
                  <p>Key issues identified through user testing and analytics:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Unclear pricing structure and billing information</li>
                    <li>Lengthy form fields causing friction</li>
                    <li>Lack of trust signals during payment</li>
                    <li>Poor mobile experience</li>
                  </ul>
                </div>
              </div>

              {/* Solution */}
              <div className="mb-16">
                <h2 className="text-xs font-mono tracking-widest mb-8">SOLUTION</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed font-light tracking-wide">
                  <p>
                    We redesigned the checkout flow with a focus on clarity, trust, and simplicity. The new design
                    features:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Clear pricing breakdown with transparent billing information</li>
                    <li>Streamlined form design with smart defaults</li>
                    <li>Enhanced security messaging and trust indicators</li>
                    <li>Mobile-optimized responsive design</li>
                    <li>Progress indicators to set expectations</li>
                  </ul>
                </div>
              </div>

              {/* Results */}
              <div className="mb-24">
                <h2 className="text-xs font-mono tracking-widest mb-8">RESULTS</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-mono text-primary mb-2">23%</div>
                    <div className="text-sm text-muted-foreground">Increase in conversion rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-mono text-primary mb-2">31%</div>
                    <div className="text-sm text-muted-foreground">Reduction in abandonment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-mono text-primary mb-2">18%</div>
                    <div className="text-sm text-muted-foreground">Faster completion time</div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed font-light tracking-wide">
                  The redesigned checkout experience significantly improved conversion rates and user satisfaction,
                  contributing to Slack's overall growth objectives while maintaining the brand's commitment to user
                  experience excellence.
                </p>
              </div>
            </div>

            {/* Project Navigation - Full width card grid with reduced bottom margin */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
                <div className="group cursor-default">
                  <div className="p-8 hover:bg-muted/20 transition-colors h-32 flex flex-col justify-between border-r border-border">
                    <span className="text-xs font-mono text-muted-foreground">02</span>
                    <h3 className="text-lg font-light group-hover:text-primary transition-colors">Square</h3>
                  </div>
                </div>
                <div className="group cursor-default">
                  <div className="p-8 hover:bg-muted/20 transition-colors h-32 flex flex-col justify-between border-r border-border">
                    <span className="text-xs font-mono text-muted-foreground">03</span>
                    <h3 className="text-lg font-light group-hover:text-primary transition-colors">Mailchimp</h3>
                  </div>
                </div>
                <div className="group cursor-default">
                  <div className="p-8 hover:bg-muted/20 transition-colors h-32 flex flex-col justify-between">
                    <span className="text-xs font-mono text-muted-foreground">04</span>
                    <h3 className="text-lg font-light group-hover:text-primary transition-colors">Equinox</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
