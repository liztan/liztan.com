import Link from "next/link"

export function Footer() {
  return (
    <div className="pt-8 mt-36 pb-16">
      <div className="border-t border-border pt-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Link href="/about" className="text-xs font-mono tracking-widest hover:text-primary transition-colors">
              ABOUT
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="text-xs font-mono tracking-widest hover:text-primary transition-colors"
            >
              LINKEDIN
            </Link>
          </div>
          <div className="text-xs font-mono tracking-widest text-muted-foreground">2025</div>
        </div>
      </div>
    </div>
  )
}
