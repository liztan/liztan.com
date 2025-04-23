import Link from "next/link"

interface ProjectItemProps {
  number: string
  title: string
  description: string
  imageUrl?: string
}

export function ProjectItem({ number, title, description, imageUrl }: ProjectItemProps) {
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
