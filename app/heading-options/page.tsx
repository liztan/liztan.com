import Link from "next/link"
import {
  ConceptualHeading,
  GridHeading,
  MinimalStatementHeading,
  JuddHeading,
  TypewriterHeading,
} from "@/components/heading-conceptual"
import { GalleryWallHeading } from "@/components/heading-gallery-wall"

export default function HeadingOptions() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-12 gap-4">
          {/* Main content */}
          <div className="col-span-12 md:col-span-10 md:col-start-2 px-4 md:px-0">
            {/* Header */}
            <header className="mb-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-mono tracking-widest whitespace-nowrap">
                  <Link href="/" className="hover:text-primary transition-colors">
                    LIZ TAN
                  </Link>
                </div>

                <div className="flex justify-end">
                  <nav className="flex gap-8 font-mono">
                    <Link href="/" className="text-xs tracking-widest hover:text-primary transition-colors">
                      BACK TO HOME
                    </Link>
                  </nav>
                </div>
              </div>
              <div className="border-b border-border mt-8"></div>
            </header>

            <h1 className="text-2xl font-mono mt-12 mb-16">Heading Options</h1>

            {/* Option 1 */}
            <div className="mb-24 pb-24 border-b border-border">
              <h2 className="text-xs font-mono tracking-widest mb-8">OPTION 1: CONCEPTUAL STATEMENT</h2>
              <ConceptualHeading />
            </div>

            {/* Option 2 */}
            <div className="mb-24 pb-24 border-b border-border">
              <h2 className="text-xs font-mono tracking-widest mb-8">OPTION 2: AGNES MARTIN-INSPIRED GRID</h2>
              <GridHeading />
            </div>

            {/* Option 3 */}
            <div className="mb-24 pb-24 border-b border-border">
              <h2 className="text-xs font-mono tracking-widest mb-8">OPTION 3: SOL LEWITT-INSPIRED STATEMENT</h2>
              <MinimalStatementHeading />
            </div>

            {/* Option 4 */}
            <div className="mb-24 pb-24 border-b border-border">
              <h2 className="text-xs font-mono tracking-widest mb-8">OPTION 4: DONALD JUDD-INSPIRED BLOCKS</h2>
              <JuddHeading />
            </div>

            {/* Option 5 */}
            <div className="mb-24 pb-24 border-b border-border">
              <h2 className="text-xs font-mono tracking-widest mb-8">OPTION 5: TYPEWRITER STYLE</h2>
              <TypewriterHeading />
            </div>

            {/* Option 6 */}
            <div className="mb-24">
              <h2 className="text-xs font-mono tracking-widest mb-8">OPTION 6: GALLERY WALL STYLE</h2>
              <GalleryWallHeading />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
