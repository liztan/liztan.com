import Link from "next/link"
import { User } from "lucide-react"

interface Project {
  id: string
  number: string
  title: string
  description: string
  imageUrl?: string
  aspectRatio?: "square" | "portrait" | "landscape"
}

export function ProjectGridSubtleLines({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
      {projects.map((project) => (
        <ProjectGridItem key={project.id} project={project} />
      ))}

      {/* About Me Section */}
      <AboutMeGridItem />
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
    <div className="group bg-background p-6">
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

function AboutMeGridItem() {
  return (
    <div className="group bg-background p-6">
      <div className="aspect-[4/3] bg-muted mb-4 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <User className="h-12 w-12 text-muted-foreground opacity-50" />
        </div>
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="flex items-start gap-2">
        <span className="text-xs font-mono text-muted-foreground">04</span>
        <div>
          <h3 className="text-lg font-light mb-2">About Me</h3>
          <p className="text-sm text-muted-foreground mb-3 font-light tracking-wide">
            Strategic designer with 15+ years of experience helping businesses connect with their customers.
          </p>
          <Link href="/about" className="text-xs font-mono tracking-widest text-primary hover:underline">
            READ MORE
          </Link>
        </div>
      </div>
    </div>
  )
}
