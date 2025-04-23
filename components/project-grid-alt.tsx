import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Project {
  id: string
  number: string
  title: string
  description: string
  imageUrl?: string
  aspectRatio?: "square" | "portrait" | "landscape"
}

export function ProjectGridAlt({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <ProjectGridItem key={project.id} project={project} />
      ))}

      {/* About Me Section - Alternative Style */}
      <AboutMeGridItemAlt />
    </div>
  )
}

function ProjectGridItem({ project }: { project: Project }) {
  // Determine aspect ratio class
  const getAspectRatioClass = () => {
    switch (project.aspectRatio) {
      case "square":
        return "aspect-square"
      case "portrait":
        return "aspect-[3/4]"
      case "landscape":
      default:
        return "aspect-[4/3]"
    }
  }

  return (
    <div className="group">
      <div className={`${getAspectRatioClass()} bg-muted mb-4 relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs font-mono tracking-widest">
          PROJECT IMAGE
        </div>
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="flex items-start gap-2">
        <span className="text-xs font-mono text-muted-foreground">{project.number}</span>
        <div>
          <h3 className="text-lg font-light mb-2">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 font-light tracking-wide">{project.description}</p>
          <Link href="#" className="text-xs font-mono tracking-widest text-primary hover:underline">
            VIEW PROJECT
          </Link>
        </div>
      </div>
    </div>
  )
}

function AboutMeGridItemAlt() {
  return (
    <div className="group border border-border">
      <div className="aspect-[4/3] relative overflow-hidden flex items-center justify-center p-8">
        <div className="text-left max-w-xs">
          <span className="text-xs font-mono text-muted-foreground block mb-4">04</span>
          <h3 className="text-lg font-light mb-4">About Me</h3>
          <p className="text-sm text-muted-foreground mb-6 font-light tracking-wide">
            Strategic designer with 15+ years of experience helping businesses connect with their customers.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-primary hover:underline"
          >
            READ MORE <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
