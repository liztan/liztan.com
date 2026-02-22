"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface DocumentationCardProps {
  isHovered?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function DocumentationCard({
  isHovered: externalHover,
  onMouseEnter,
  onMouseLeave,
}: DocumentationCardProps) {
  const [internalHover, setInternalHover] = useState(false)
  const [animationStage, setAnimationStage] = useState(0) // 0: logo, 1: circle, 2: scattered shapes, 3: organized grid

  // Use external hover state if provided, otherwise use internal
  const isHovered = externalHover !== undefined ? externalHover : internalHover

  useEffect(() => {
    if (isHovered) {
      // Stage 1: Show circle (600ms)
      const timer1 = setTimeout(() => setAnimationStage(1), 600)
      // Stage 2: Circle becomes scattered shapes (1200ms)
      const timer2 = setTimeout(() => setAnimationStage(2), 1200)
      // Stage 3: Shapes organize into grid (2000ms)
      const timer3 = setTimeout(() => setAnimationStage(3), 2000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    } else {
      setAnimationStage(0)
    }
  }, [isHovered])

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => {
        setInternalHover(true)
        onMouseEnter?.()
      }}
      onMouseLeave={() => {
        setInternalHover(false)
        onMouseLeave?.()
      }}
    >
      <div className="relative flex items-center justify-center h-full">
        {/* Mailchimp Logo - Light mode */}
        <div
          className="absolute transition-all duration-500 ease-out dark:hidden"
          style={{
            opacity: isHovered ? 0 : 1,
          }}
        >
          <Image
            src="/images/mailchimp-logo-light.svg"
            alt="Mailchimp"
            width={48}
            height={50}
            className="w-12 h-12"
          />
        </div>

        {/* Mailchimp Logo - Dark mode */}
        <div
          className="absolute transition-all duration-500 ease-out hidden dark:block"
          style={{
            opacity: isHovered ? 0 : 1,
          }}
        >
          <Image
            src="/images/mailchimp-logo-dark.svg"
            alt="Mailchimp"
            width={48}
            height={50}
            className="w-12 h-12"
          />
        </div>

        {/* Morphing shape - circle transition */}
        <div
          className="absolute bg-foreground transition-all duration-700 ease-out"
          style={{
            width: animationStage >= 1 ? "48px" : "48px",
            height: animationStage >= 1 ? "48px" : "48px",
            borderRadius: "50%",
            opacity: animationStage >= 1 && animationStage < 2 ? 1 : 0,
            transform: "translateX(0px) translateY(0px)",
          }}
        />

        {/* Grid Pattern - Black circles and squares with more spacing */}

        {/* Row 1 */}
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(-30px) translateY(-30px)"
                : animationStage >= 2
                  ? "translateX(-35px) translateY(-40px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(-10px) translateY(-30px)"
                : animationStage >= 2
                  ? "translateX(40px) translateY(-30px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(10px) translateY(-30px)"
                : animationStage >= 2
                  ? "translateX(-25px) translateY(35px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(30px) translateY(-30px)"
                : animationStage >= 2
                  ? "translateX(30px) translateY(25px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />

        {/* Row 2 */}
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(-30px) translateY(-10px)"
                : animationStage >= 2
                  ? "translateX(-40px) translateY(15px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(-10px) translateY(-10px)"
                : animationStage >= 2
                  ? "translateX(45px) translateY(-15px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(10px) translateY(-10px)"
                : animationStage >= 2
                  ? "translateX(-30px) translateY(-20px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(30px) translateY(-10px)"
                : animationStage >= 2
                  ? "translateX(20px) translateY(40px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />

        {/* Row 3 */}
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(-30px) translateY(10px)"
                : animationStage >= 2
                  ? "translateX(35px) translateY(-35px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(-10px) translateY(10px)"
                : animationStage >= 2
                  ? "translateX(-45px) translateY(-10px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(10px) translateY(10px)"
                : animationStage >= 2
                  ? "translateX(25px) translateY(-25px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(30px) translateY(10px)"
                : animationStage >= 2
                  ? "translateX(-20px) translateY(30px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />

        {/* Row 4 */}
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(-30px) translateY(30px)"
                : animationStage >= 2
                  ? "translateX(40px) translateY(35px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(-10px) translateY(30px)"
                : animationStage >= 2
                  ? "translateX(-35px) translateY(20px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "1px",
            transform:
              animationStage >= 3
                ? "translateX(10px) translateY(30px)"
                : animationStage >= 2
                  ? "translateX(15px) translateY(-40px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
        <div
          className="absolute rounded-full bg-foreground transition-all duration-800 ease-out"
          style={{
            width: "12px",
            height: "12px",
            transform:
              animationStage >= 3
                ? "translateX(30px) translateY(30px)"
                : animationStage >= 2
                  ? "translateX(-15px) translateY(-35px)"
                  : "translateX(0px) translateY(0px)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
      </div>
    </div>
  )
}
