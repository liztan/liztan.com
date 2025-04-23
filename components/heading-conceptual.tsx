import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function ConceptualHeading() {
  return (
    <div className="mt-24 mb-36">
      {/* Option 1: Conceptual Statement */}
      <div className="mb-24">
        <div className="grid grid-cols-1 gap-8">
          <div className="text-xl md:text-2xl font-mono leading-relaxed space-y-2">
            <p>CURIOUS DESIGNER</p>
            <p>THOUGHTFUL EXPLORER</p>
            <p>INTENTIONAL PROBLEM SOLVER</p>
            <p className="text-primary">CURRENTLY AT SQUARE</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function GridHeading() {
  return (
    <div className="mt-24 mb-36">
      {/* Option 2: Agnes Martin-inspired Grid */}
      <div className="border-t border-l border-border">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="border-r border-b border-border p-8 aspect-square flex items-center justify-center">
            <span className="text-sm font-mono">CURIOUS DESIGNER</span>
          </div>
          <div className="border-r border-b border-border p-8 aspect-square flex items-center justify-center">
            <span className="text-sm font-mono">THOUGHTFUL EXPLORER</span>
          </div>
          <div className="border-r border-b border-border p-8 aspect-square flex items-center justify-center">
            <span className="text-sm font-mono">INTENTIONAL PROBLEM SOLVER</span>
          </div>
          <div className="border-r border-b border-border p-8 aspect-square flex items-center justify-center text-primary">
            <span className="text-sm font-mono">CURRENTLY AT SQUARE</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MinimalStatementHeading() {
  return (
    <div className="mt-24 mb-36">
      {/* Option 3: Sol LeWitt-inspired Conceptual Statement */}
      <div className="border-l-4 border-primary pl-6 py-2">
        <div className="text-lg md:text-xl font-mono leading-relaxed space-y-2">
          <p>CURIOUS DESIGNER</p>
          <p>THOUGHTFUL EXPLORER</p>
          <p>INTENTIONAL PROBLEM SOLVER</p>
          <p>CURRENTLY AT SQUARE</p>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <Link
          href="#work"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-primary hover:underline"
        >
          VIEW WORK <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}

export function JuddHeading() {
  return (
    <div className="mt-24 mb-36">
      {/* Option 4: Donald Judd-inspired Minimal Blocks */}
      <div className="space-y-12">
        <div className="h-16 bg-primary/10 w-full"></div>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/4">
            <h2 className="text-xs font-mono tracking-widest mb-2">CURIOUS</h2>
            <p className="text-sm text-muted-foreground">Designer</p>
          </div>
          <div className="md:w-1/4">
            <h2 className="text-xs font-mono tracking-widest mb-2">THOUGHTFUL</h2>
            <p className="text-sm text-muted-foreground">Explorer</p>
          </div>
          <div className="md:w-1/4">
            <h2 className="text-xs font-mono tracking-widest mb-2">INTENTIONAL</h2>
            <p className="text-sm text-muted-foreground">Problem Solver</p>
          </div>
          <div className="md:w-1/4">
            <h2 className="text-xs font-mono tracking-widest mb-2">CURRENTLY</h2>
            <p className="text-sm text-primary">Square</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TypewriterHeading() {
  return (
    <div className="mt-24 mb-36">
      {/* Option 5: Typewriter-style Statement */}
      <div className="font-mono leading-relaxed text-lg md:text-xl lg:text-2xl space-y-1">
        <p>CURIOUS DESIGNER</p>
        <p>THOUGHTFUL EXPLORER</p>
        <p>INTENTIONAL PROBLEM SOLVER</p>
        <p className="text-primary">CURRENTLY AT SQUARE</p>
      </div>
    </div>
  )
}
