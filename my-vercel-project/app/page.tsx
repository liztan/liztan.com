import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-12 gap-4">
          {/* Vertical LIZ TAN - desktop only */}
          <div className="hidden md:block col-span-1 relative">
            <div className="fixed top-1/2 transform -translate-y-1/2 text-sm font-mono tracking-widest writing-vertical -rotate-180">
              LIZ TAN
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-10 md:col-start-2 px-4 md:px-0">
            {/* Header */}
            <header className="mb-8">
              <div className="flex justify-between items-center">
                {/* LIZ TAN on mobile */}
                <div className="block md:hidden text-sm font-mono tracking-widest whitespace-nowrap">
                  <Link href="/" className="hover:text-primary transition-colors">
                    LIZ TAN
                  </Link>
                </div>

                <div className="flex justify-end w-full">
                  <nav className="flex gap-8 font-mono">
                    <Link href="#work" className="text-xs tracking-widest hover:text-primary transition-colors">
                      WORK
                    </Link>
                    <Link href="/about" className="text-xs tracking-widest hover:text-primary transition-colors">
                      ABOUT
                    </Link>
                  </nav>
                </div>
              </div>
              <div className="border-b border-border mt-8"></div>
            </header>

            {/* Introduction */}
            <div className="mt-24 mb-36">
              <p className="text-xl md:text-2xl leading-relaxed font-light tracking-wide">
                Hi, I'm Liz. Product designer at{" "}
                <Link href="https://squareup.com" className="text-primary hover:underline" target="_blank">
                  Square
                </Link>{" "}working on Growth. I solve problems that help our products reach more people.
              </p>
            </div>

            {/* Work Section */}
            <div id="work" className="mb-8">
              <h2 className="text-xs font-mono tracking-widest mb-16">SELECTED WORK</h2>
            </div>

            {/* Project Grid */}
            <div className="space-y-36">
              {/* Project 01 */}
              <ProjectItem
                number="01"
                title="Square"
                description="Enhanced Slack's checkout experience by leveraging data-driven insights to optimize the purchase process."
              />

              {/* Project 02 */}
              <ProjectItem
                number="02"
                title="Slack"
                description="A brief description of another significant project you've worked on."
              />

              {/* Project 03 */}
              <ProjectItem
                number="03"
                title="Mailchimp"
                description="A brief description of another significant project you've worked on."
              />
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

// Project Item Component
function ProjectItem({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="relative">
      <span className="absolute -left-8 top-0 ml-2 md:ml-0 text-xs font-mono text-muted-foreground">{number}</span>
      <div className="aspect-[16/9] bg-muted mb-6 relative overflow-hidden group">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs font-mono tracking-widest">
          PROJECT IMAGE
        </div>
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <h3 className="text-lg font-light mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-3 font-light tracking-wide max-w-xl">{description}</p>
      <Link href="#" className="text-xs font-mono tracking-widest text-primary hover:underline">
        VIEW PROJECT
      </Link>
    </div>
  )
}

// Footer Component
function Footer() {
  return (
    <div className="border-t border-border pt-8 mt-36 pb-16">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link
            href="mailto:hello@example.com"
            className="text-xs font-mono tracking-widest hover:text-primary transition-colors"
          >
            EMAIL
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="text-xs font-mono tracking-widest hover:text-primary transition-colors"
          >
            LINKEDIN
          </Link>
        </div>
        <div className="text-xs font-mono tracking-widest text-muted-foreground">
          LIZ TAN – {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
}

