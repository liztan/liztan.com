import Link from "next/link"
import { ProjectGridSquare } from "@/components/project-grid-square"
import { Footer } from "@/components/layout/footer"

export default function SquareGridPage() {
  // Sample project data - reduced to 3 projects
  const projects = [
    {
      id: "project-01",
      number: "01",
      title: "Slack",
      description:
        "Enhanced Slack's checkout experience by leveraging data-driven insights to optimize the purchase process.",
    },
    {
      id: "project-02",
      number: "02",
      title: "Project Two",
      description: "A brief description of another significant project you've worked on.",
    },
    {
      id: "project-03",
      number: "03",
      title: "Project Three",
      description: "A brief description of another significant project you've worked on.",
    },
  ]

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
                Hello, I'm Liz, a strategic thinker who loves solving big problems and sweating small details. Today, I
                design at{" "}
                <Link href="https://squareup.com" className="text-primary hover:underline" target="_blank">
                  Square
                </Link>{" "}
                - working to help businesses connect with their customers.
              </p>
            </div>

            {/* Work Section */}
            <div id="work" className="mb-8">
              <h2 className="text-xs font-mono tracking-widest mb-16">SELECTED WORK</h2>
            </div>

            {/* Project Grid with 3 projects + About Me section */}
            <div className="mb-36">
              <ProjectGridSquare projects={projects} />
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
