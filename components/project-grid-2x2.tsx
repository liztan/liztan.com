import Link from "next/link"

interface Project {
  id: string
  number: string
  title: string
  description: string
  imageUrl?: string
}

export function ProjectGrid2x2({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
      {projects.map((project) => (
        <ProjectGridItem key={project.id} project={project} />
      ))}

      {/* About Me Section - Now formatted exactly like a project */}
      <AboutMeGridItem number="04" />
    </div>
  )
}

function ProjectGridItem({ project }: { project: Project }) {
  return (
    <div className="group border-r border-b border-border flex flex-col min-h-[600px]">
      {/* Project number at the top */}
      <div className="p-8 pb-4">
        <span className="text-xs font-mono text-muted-foreground">{project.number}</span>
      </div>

      {/* Placeholder for image */}
      <div className="flex-grow px-8 pb-8">
        <div className="w-full h-full bg-muted/30 flex items-center justify-center">
          <span className="text-xs font-mono text-muted-foreground/50">PROJECT IMAGE</span>
        </div>
      </div>

      {/* Project details at the bottom */}
      <div className="p-8 pt-0">
        <h3 className="text-lg font-mono mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground font-light tracking-wide">{project.description}</p>
      </div>
    </div>
  )
}

function AboutMeGridItem({ number }: { number: string }) {
  return (
    <Link href="/about" className="group border-r border-b border-border flex flex-col min-h-[600px]">
      {/* Project number at the top */}
      <div className="p-8 pb-4">
        <span className="text-xs font-mono text-muted-foreground">{number}</span>
      </div>

      {/* Placeholder for content - Exactly matching the project image style */}
      <div className="flex-grow px-8 pb-8">
        <div className="w-full h-full bg-muted/30 flex items-center justify-center">
          <span className="text-xs font-mono text-muted-foreground/50">ABOUT ME</span>
        </div>
      </div>

      {/* About Me details at the bottom */}
      <div className="p-8 pt-0">
        <h3 className="text-lg font-mono mb-2">About Me</h3>
        <p className="text-sm text-muted-foreground font-light tracking-wide">
          Strategic designer with 15+ years of experience helping businesses connect with their customers.
        </p>
      </div>
    </Link>
  )
}
