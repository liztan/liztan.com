import Link from "next/link"

interface Project {
  id: string
  number: string
  title: string
  description: string
  imageUrl?: string
}

export function ProjectGridRefined({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
      {projects.map((project) => (
        <ProjectGridItem key={project.id} project={project} />
      ))}

      {/* About Me Section */}
      <AboutMeGridItem number="04" />
    </div>
  )
}

function ProjectGridItem({ project }: { project: Project }) {
  return (
    <div className="group border-r border-b border-border flex flex-col min-h-[600px]">
      {/* Project number at the top */}
      <div className="p-8 pb-0">
        <span className="text-xs font-mono text-muted-foreground">{project.number}</span>
      </div>

      {/* Empty space for image (will be filled later) */}
      <div className="flex-grow">{/* This space intentionally left empty to match the inspiration */}</div>

      {/* Project details at the bottom */}
      <div className="p-8 pt-0">
        <h3 className="text-lg font-light mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground font-light tracking-wide">{project.description}</p>
      </div>
    </div>
  )
}

function AboutMeGridItem({ number }: { number: string }) {
  return (
    <div className="group border-r border-b border-border flex flex-col min-h-[600px]">
      {/* Project number at the top */}
      <div className="p-8 pb-0">
        <span className="text-xs font-mono text-muted-foreground">{number}</span>
      </div>

      {/* Empty space (will be filled with content later) */}
      <div className="flex-grow">{/* This space intentionally left empty to match the inspiration */}</div>

      {/* About Me details at the bottom */}
      <div className="p-8 pt-0">
        <h3 className="text-lg font-light mb-2">About Me</h3>
        <p className="text-sm text-muted-foreground font-light tracking-wide">
          Strategic designer with 15+ years of experience helping businesses connect with their customers.
        </p>
        <Link
          href="/about"
          className="text-xs font-mono tracking-widest text-primary hover:underline mt-3 inline-block"
        >
          READ MORE
        </Link>
      </div>
    </div>
  )
}
