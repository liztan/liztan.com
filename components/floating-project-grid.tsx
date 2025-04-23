"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Project {
  id: string
  number: string
  title: string
  description: string
  imageUrl?: string
}

export function FloatingProjectGrid({ projects }: { projects: Project[] }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (isMobile) {
    return (
      <div className="space-y-24">
        {projects.map((project) => (
          <div key={project.id} className="relative">
            <span className="absolute -left-8 top-0 ml-2 md:ml-0 text-xs font-mono text-muted-foreground">
              {project.number}
            </span>
            <div className="aspect-[16/9] bg-muted mb-6 relative overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs font-mono tracking-widest">
                PROJECT IMAGE
              </div>
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-lg font-light mb-2">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-3 font-light tracking-wide max-w-xl">
              {project.description}
            </p>
            <Link href="#" className="text-xs font-mono tracking-widest text-primary hover:underline">
              VIEW PROJECT
            </Link>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative min-h-[800px] md:min-h-[1000px] w-full">
      {projects.map((project, index) => (
        <FloatingProject key={project.id} project={project} index={index} total={projects.length} />
      ))}
    </div>
  )
}

function FloatingProject({ project, index, total }: { project: Project; index: number; total: number }) {
  // Calculate position based on index
  const getPosition = () => {
    // Create a grid-like positioning system
    const positions = [
      { top: "5%", left: "10%" },
      { top: "15%", left: "55%" },
      { top: "45%", left: "25%" },
      { top: "60%", left: "60%" },
      { top: "30%", left: "40%" },
      { top: "70%", left: "15%" },
    ]

    return positions[index % positions.length]
  }

  // Calculate size based on index
  const getSize = () => {
    const sizes = ["w-[300px]", "w-[350px]", "w-[320px]", "w-[280px]"]
    return sizes[index % sizes.length]
  }

  const position = getPosition()
  const size = getSize()

  return (
    <motion.div
      className={`absolute ${size} transition-all duration-300 hover:z-10`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        top: position.top,
        left: position.left,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      <div className="bg-background border border-border p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow">
        <div className="relative">
          <span className="absolute -left-2 -top-2 bg-background px-1 text-xs font-mono text-muted-foreground">
            {project.number}
          </span>
        </div>
        <div className="aspect-[16/9] bg-muted mb-4 relative overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs font-mono tracking-widest">
            PROJECT IMAGE
          </div>
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <h3 className="text-lg font-light mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 font-light tracking-wide line-clamp-3">
          {project.description}
        </p>
        <Link href="#" className="text-xs font-mono tracking-widest text-primary hover:underline">
          VIEW PROJECT
        </Link>
      </div>
    </motion.div>
  )
}
