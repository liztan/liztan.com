import Link from "next/link"

export function Option2() {
  return (
    <div className="min-h-screen bg-background">
      {/* Option 2: Minimal Top Navigation with Horizontal Line */}
      <header className="container mx-auto px-4 md:px-8 pt-8 pb-4 border-b border-border mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-sm font-mono tracking-widest">LIZ TAN</h1>
          <nav className="flex gap-6 md:gap-8">
            <Link href="#work" className="text-xs tracking-widest hover:text-primary transition-colors">
              WORK
            </Link>
            <Link href="#about" className="text-xs tracking-widest hover:text-primary transition-colors">
              ABOUT
            </Link>
            <Link href="#contact" className="text-xs tracking-widest hover:text-primary transition-colors">
              CONTACT
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 md:px-8">{/* Content would be the same as Option 1 */}</main>
    </div>
  )
}

export function Option3() {
  return (
    <div className="min-h-screen bg-background">
      {/* Option 3: Agnes Martin-inspired Minimal Grid Layout */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-12 gap-4">
          {/* Header in grid */}
          <div className="col-span-3 md:col-span-2">
            <h1 className="text-sm font-mono tracking-widest">LIZ TAN</h1>
          </div>

          <div className="col-span-9 md:col-span-10 flex justify-end">
            <nav className="flex gap-6 md:gap-8">
              <Link href="#work" className="text-xs tracking-widest hover:text-primary transition-colors">
                WORK
              </Link>
              <Link href="#about" className="text-xs tracking-widest hover:text-primary transition-colors">
                ABOUT
              </Link>
              <Link href="#contact" className="text-xs tracking-widest hover:text-primary transition-colors">
                CONTACT
              </Link>
            </nav>
          </div>

          {/* Horizontal line across all columns */}
          <div className="col-span-12 border-b border-border my-8"></div>

          {/* Content would be in grid layout */}
        </div>
      </main>
    </div>
  )
}

export function Option4() {
  return (
    <div className="min-h-screen bg-background">
      {/* Option 4: Sol LeWitt-inspired Conceptual Navigation */}
      <header className="fixed top-0 right-0 p-8 z-50">
        <nav className="flex flex-col gap-4 items-end">
          <Link
            href="#work"
            className="text-xs tracking-widest hover:text-primary transition-colors py-1 border-r-2 border-transparent hover:border-primary pr-2"
          >
            WORK
          </Link>
          <Link
            href="#about"
            className="text-xs tracking-widest hover:text-primary transition-colors py-1 border-r-2 border-transparent hover:border-primary pr-2"
          >
            ABOUT
          </Link>
          <Link
            href="#contact"
            className="text-xs tracking-widest hover:text-primary transition-colors py-1 border-r-2 border-transparent hover:border-primary pr-2"
          >
            CONTACT
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 md:px-8 pt-16">
        <h1 className="text-sm font-mono tracking-widest mb-16">LIZ TAN</h1>

        {/* Content would be the same as Option 1 */}
      </main>
    </div>
  )
}

