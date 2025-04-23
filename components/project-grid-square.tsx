import Link from "next/link"
import { User } from "lucide-react"

interface Project {
  id: string
  number: string
  title: string
  description: string
  imageUrl?: string
}

export function ProjectGridSquare({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {projects.map((project, index) => (
        <ProjectGridItem
          key={project.id}
          project={project}
          isEven={index % 2 === 1}
          isBottom={index >= projects.length - 2}
        />
      ))}

      {/* About Me Section */}
      <AboutMeGridItem isEven={true} isBottom={true} />
    </div>
  )
}

function ProjectGridItem({
  project,
  isEven,
  isBottom,
}: {
  project: Project
  isEven: boolean
  isBottom: boolean
}) {
  return (
    <div
      className={`
      group p-6 
      ${!isEven ? "border-r border-border" : ""} 
      ${!isBottom ? "border-b border-border" : ""}
    `}
    >
      <div className="aspect-square bg-muted mb-4 relative overflow-hidden">
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

function AboutMeGridItem({ isEven, isBottom }: { isEven: boolean; isBottom: boolean }) {
  return (
    <div
      className={`
      group p-6 
      ${!isEven ? "border-r border-border" : ""} 
      ${!isBottom ? "border-b border-border" : ""}
    `}
    >
      <div className="aspect-square bg-muted mb-4 relative overflow-hidden">
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
