// This is just a visual example component to show different font pairings
export default function FontExamples() {
  return (
    <div className="space-y-16 py-12 px-8">
      {/* Example 1: Space Mono + DM Sans (Clean, minimal sans-serif) */}
      <div className="border-b pb-12">
        <h2 className="text-xs tracking-widest mb-6 font-mono">OPTION 1: SPACE MONO + DM SANS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-mono mb-4">01 PROJECT TITLE</h3>
            <p className="font-dm-sans text-muted-foreground">
              This is set in DM Sans, a clean geometric sans-serif that pairs well with Space Mono while offering better
              readability. It has a minimal, precise character that aligns with Judd's aesthetic.
            </p>
          </div>
          <div className="bg-muted aspect-[4/3]"></div>
        </div>
      </div>

      {/* Example 2: Space Mono + Spectral (Modern serif) */}
      <div className="border-b pb-12">
        <h2 className="text-xs tracking-widest mb-6 font-mono">OPTION 2: SPACE MONO + SPECTRAL</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-mono mb-4">02 PROJECT TITLE</h3>
            <p className="font-spectral text-muted-foreground">
              This is set in Spectral, a modern serif with organic qualities that creates a nice contrast with Space
              Mono. It has the contemporary serif feeling you mentioned while maintaining readability.
            </p>
          </div>
          <div className="bg-muted aspect-[4/3]"></div>
        </div>
      </div>

      {/* Example 3: Space Mono + Outfit (Clean, minimal sans with more personality) */}
      <div>
        <h2 className="text-xs tracking-widest mb-6 font-mono">OPTION 3: SPACE MONO + OUTFIT</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-mono mb-4">03 PROJECT TITLE</h3>
            <p className="font-outfit text-muted-foreground">
              This is set in Outfit, a clean sans-serif with subtle character. It has excellent readability while
              maintaining a minimal aesthetic that complements Space Mono well.
            </p>
          </div>
          <div className="bg-muted aspect-[4/3]"></div>
        </div>
      </div>
    </div>
  )
}
