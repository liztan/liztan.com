"use client"

import React, { useRef, useState } from "react"
import MessageScreen2 from "./message-screen-2"
import CheckoutCard from "./checkout-card"
import DocumentationCard from "./documentation-card"

interface Project {
  id: string
  number: string
  title: string
  description: string
  imageUrl?: string
}

export function ProjectGrid3Interactive({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
      {projects.slice(0, 3).map((project, index) => (
        <ProjectGridItem key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}

function ProjectGridItem({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)

  const getProjectComponent = (title: string) => {
    switch (title.toLowerCase()) {
      case "square":
        return <MessageScreen2 isHovered={isHovered} />
      case "slack":
        return <CheckoutCard isHovered={isHovered} />
      case "mailchimp":
        return <DocumentationCard isHovered={isHovered} />
      default:
        return null
    }
  }

  const getProjectImage = (title: string) => {
    switch (title.toLowerCase()) {
      case "mailchimp":
        return "/images/mailchimp-project-new.png"
      case "slack":
        return "/images/slack-project.png"
      case "square":
        return "/images/square-project.png"
      default:
        return null
    }
  }

  const projectComponent = getProjectComponent(project.title)
  const projectImage = getProjectImage(project.title)

  return (
    <div
      ref={ref}
      className="border-r border-b border-border group cursor-default relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-8 left-8 z-10">
        <span className="text-xs font-mono text-muted-foreground">{project.number}</span>
      </div>

      <div className="block h-full">
        <div className="grid grid-rows-[400px_auto] h-full min-h-[600px]">
          {/* Project interactive component or image - fixed height */}
          <div className="px-8 pt-8 pb-6 relative overflow-hidden">
            {projectComponent ? (
              // Show interactive component - controlled by parent hover state
              <div className="w-full h-full flex items-center justify-center">
                <div className="scale-75 origin-center">{projectComponent}</div>
              </div>
            ) : (
              // Fallback to image
              <div className="w-full h-full bg-muted/30 relative overflow-hidden">
                {projectImage ? (
                  <>
                    <img
                      src={projectImage || "/placeholder.svg"}
                      alt={`${project.title} project preview`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/20" />
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xs font-mono text-muted-foreground/50">PROJECT IMAGE</span>
                  </div>
                )}

                {/* Hover overlay with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            )}
          </div>

          <div className="p-8 pt-6">
            <h3 className="text-lg font-mono mb-2 transition-colors group-hover:text-primary">{project.title}</h3>
            <p className="text-sm text-muted-foreground font-light tracking-wide">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Wrapper component that removes hover handlers from the interactive components
// and lets the parent handle hover state
function InteractiveWrapper({ component }: { component: React.ReactElement }) {
  // Clone the component and remove its hover handlers
  const clonedComponent = React.cloneElement(component, {
    onMouseEnter: undefined,
    onMouseLeave: undefined,
  })

  return clonedComponent
}
