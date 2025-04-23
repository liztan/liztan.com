import Link from "next/link"

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-12 gap-4">
          {/* Vertical LIZ TAN - desktop only */}
          <div className="hidden md:block col-span-1 relative">
            <Link
              href="/"
              className="fixed top-1/2 transform -translate-y-1/2 text-sm font-mono tracking-widest writing-vertical -rotate-180 hover:text-primary transition-colors"
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
                  <Link href="/" className="hover:text-primary transition-colors">
                    LIZ TAN
                  </Link>
                </div>

                <div className="flex justify-end w-full">
                  <nav className="flex gap-8 font-mono">
                    <Link href="/#work" className="text-xs tracking-widest hover:text-primary transition-colors">
                      WORK
                    </Link>
                    <Link href="/about" className="text-xs tracking-widest text-primary transition-colors">
                      ABOUT
                    </Link>
                  </nav>
                </div>
              </div>
              <div className="border-b border-border mt-8"></div>
            </header>

            {/* About content */}
            <div className="mt-24 mb-16">
              <h2 className="text-3xl md:text-4xl leading-relaxed font-mono mb-16">About</h2>

              <div className="flex flex-col md:flex-row gap-16 mb-24">
                <div className="md:w-1/2">
                  <div className="aspect-[3/4] bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs font-mono tracking-widest">
                      YOUR PHOTO
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <section className="mb-12">
                    <h3 className="text-xs font-mono tracking-widest mb-6">THE DESIGNER</h3>
                    <p className="text-muted-foreground leading-relaxed font-light tracking-wide mb-6">
                      I have obsessed over design for more than 15 years, here are some important things I've learned
                      along the way:
                    </p>
                    <DesignerPoints />
                  </section>
                </div>
              </div>

              {/* The Writer Section */}
              <WriterSection />

              {/* The Person Section */}
              <PersonSection />
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

// Designer Points Component
function DesignerPoints() {
  const points = [
    "I am exhaustive in research and brainstorming sessions. And exacting when it comes time to edit and refine the work.",
    "I value collaboration. I respect the expertise and perspective that my teammates bring to the table.",
    "My best work comes from balancing great user experience and business goals.",
  ]

  return (
    <ul className="space-y-4 list-none">
      {points.map((point, index) => (
        <li key={index} className="flex gap-2 text-muted-foreground leading-relaxed font-light tracking-wide">
          <span className="text-primary">•</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  )
}

// Writer Section Component
function WriterSection() {
  const articles = [
    {
      title: "Designing for the Breakup",
      description: "Why endings are a product design problem worth solving.",
      date: "March 5, 2021",
      source: "Fastcodesign.com & Postlight.com",
      url: "https://www.fastcodesign.com",
    },
    {
      title: "Giving the User a Seat at the Table",
      description: '"Know your audience" holds true in product design, too.',
      date: "April 28, 2021",
      source: "Postlight.com",
      url: "https://www.postlight.com",
    },
    {
      title: "Say This Three Times Fast: Parenting, Promotion, Pandemic",
      description: "When home and work collide, just put one foot in front of the other.",
      date: "September 8, 2020",
      source: "Postlight.com",
      url: "https://www.postlight.com",
    },
  ]

  return (
    <section className="mb-16">
      <h3 className="text-xs font-mono tracking-widest mb-6">THE WRITER</h3>

      <div className="space-y-8">
        {articles.map((article, index) => (
          <div key={index}>
            <Link href={article.url} target="_blank" className="text-primary hover:underline font-mono">
              {article.title}
            </Link>
            <p className="text-muted-foreground leading-relaxed font-light tracking-wide mt-1">{article.description}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {article.date} - {article.source}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// Person Section Component
function PersonSection() {
  return (
    <section>
      <h3 className="text-xs font-mono tracking-widest mb-6">THE PERSON</h3>
      <p className="text-muted-foreground leading-relaxed font-light tracking-wide mb-4">Based in Brooklyn, NY.</p>
      <p className="text-muted-foreground leading-relaxed font-light tracking-wide">
        My quarantine hobby was sewing clothes for toddlers. Lately, I've been deconstructing and sewing multiple tote
        bags into one giant one, I call them mega-totes. When time and resources allow, I love traveling and opening
        myself to new experiences and cultures.
      </p>
    </section>
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
