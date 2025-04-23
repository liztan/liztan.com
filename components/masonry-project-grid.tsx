import Link from "next/link"

interface Project {
  id: string
  number: string
  title: string
  description: string
  imageUrl?: string
  aspectRatio?: "square" | "portrait" | "landscape"
  size?: "small" | "medium" | "large"
}

export function MasonryProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <MasonryProjectItem key={project.id} project={project} />
      ))}
    </div>
  )
}

function MasonryProjectItem({ project }: { project: Project }) {
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

  // Determine size class (for potential column spanning)
  const getSizeClass = () => {
    switch (project.size) {
      case "large":
        return "md:col-span-2"
      case "medium":
        return ""
      case "small":
      default:
        return ""
    }
  }

  return (
    <div className={`group ${getSizeClass()}`}>
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
