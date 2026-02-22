"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHoveringLink, setIsHoveringLink] = useState(false)
  const [isHoveringProject, setIsHoveringProject] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleLinkHover = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest("a, button")) {
        setIsHoveringLink(true)
      }
      if (target.closest("[data-project-item]")) {
        setIsHoveringProject(true)
      }
    }

    const handleLinkLeave = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target.closest("a, button")) {
        setIsHoveringLink(false)
      }
      if (!target.closest("[data-project-item]")) {
        setIsHoveringProject(false)
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleLinkHover)
    document.addEventListener("mouseout", handleLinkLeave)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleLinkHover)
      document.removeEventListener("mouseout", handleLinkLeave)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isVisible ? (isHoveringLink ? 1.5 : isHoveringProject ? 2 : 1) : 0,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        scale: { duration: 0.2 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className="w-full h-full bg-white rounded-full" />
      {isHoveringProject && (
        <motion.div
          className="absolute inset-0 border border-white rounded-full"
          initial={{ scale: 1 }}
          animate={{ scale: 1.5 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  )
}
