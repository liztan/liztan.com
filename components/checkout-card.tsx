"use client"

import { useState, useEffect } from "react"

interface CheckoutCardProps {
  isHovered?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function CheckoutCard({ isHovered: externalHover, onMouseEnter, onMouseLeave }: CheckoutCardProps) {
  const [internalHover, setInternalHover] = useState(false)
  const [animationStage, setAnimationStage] = useState(0) // 0: logo, 1: circle, 2: spread, 3: stack

  // Use external hover state if provided, otherwise use internal
  const isHovered = externalHover !== undefined ? externalHover : internalHover

  useEffect(() => {
    if (isHovered) {
      // Stage 1: Show circle (600ms - slower)
      const timer1 = setTimeout(() => setAnimationStage(1), 600)
      // Stage 2: Show spread cards (1400ms - more time to see circle)
      const timer2 = setTimeout(() => setAnimationStage(2), 1400)
      // Stage 3: Stack cards (2800ms - much longer pause to appreciate the spread)
      const timer3 = setTimeout(() => setAnimationStage(3), 2800)

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
        {/* Slack Logo SVG - Visible by default, fades out on hover */}
        <div
          className="absolute transition-all duration-500 ease-out"
          style={{
            opacity: isHovered ? 0 : 1,
          }}
        >
          <svg
            width="48"
            height="49"
            viewBox="0 0 48 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
          >
            <path
              d="M10.0847 30.8321C10.0847 33.6074 7.81759 35.8745 5.04235 35.8745C2.2671 35.8745 0 33.6074 0 30.8321C0 28.0569 2.2671 25.7898 5.04235 25.7898H10.0847V30.8321Z"
              fill="currentColor"
            />
            <path
              d="M12.6254 30.8319C12.6254 28.0567 14.8925 25.7896 17.6677 25.7896C20.443 25.7896 22.7101 28.0567 22.7101 30.8319V43.4573C22.7101 46.2326 20.443 48.4997 17.6677 48.4997C14.8925 48.4997 12.6254 46.2326 12.6254 43.4573V30.8319Z"
              fill="currentColor"
            />
            <path
              d="M17.6677 10.5847C14.8925 10.5847 12.6254 8.31759 12.6254 5.54235C12.6254 2.7671 14.8925 0.5 17.6677 0.5C20.443 0.5 22.7101 2.7671 22.7101 5.54235V10.5847H17.6677Z"
              fill="currentColor"
            />
            <path
              d="M17.6678 13.1254C20.443 13.1254 22.7101 15.3925 22.7101 18.1677C22.7101 20.943 20.443 23.2101 17.6678 23.2101H5.04235C2.2671 23.2101 0 20.943 0 18.1677C0 15.3925 2.2671 13.1254 5.04235 13.1254H17.6678Z"
              fill="currentColor"
            />
            <path
              d="M37.9154 18.1677C37.9154 15.3925 40.1825 13.1254 42.9577 13.1254C45.733 13.1254 48.0001 15.3925 48.0001 18.1677C48.0001 20.943 45.733 23.2101 42.9577 23.2101H37.9154V18.1677Z"
              fill="currentColor"
            />
            <path
              d="M35.3746 18.1678C35.3746 20.943 33.1075 23.2101 30.3323 23.2101C27.557 23.2101 25.2899 20.943 25.2899 18.1678V5.54235C25.2899 2.7671 27.557 0.5 30.3323 0.5C33.1075 0.5 35.3746 2.7671 35.3746 5.54235V18.1678Z"
              fill="currentColor"
            />
            <path
              d="M30.3323 38.4154C33.1075 38.4154 35.3746 40.6825 35.3746 43.4577C35.3746 46.233 33.1075 48.5001 30.3323 48.5001C27.557 48.5001 25.2899 46.233 25.2899 43.4577V38.4154H30.3323Z"
              fill="currentColor"
            />
            <path
              d="M30.3323 35.8747C27.557 35.8747 25.2899 33.6076 25.2899 30.8324C25.2899 28.0571 27.557 25.79 30.3323 25.79H42.9577C45.7329 25.79 48 28.0571 48 30.8324C48 33.6076 45.7329 35.8747 42.9577 35.8747H30.3323Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Morphing shape - appears as circle when hovered, becomes rectangle */}
        <div
          className="absolute bg-foreground transition-all duration-700 ease-out"
          style={{
            width: animationStage >= 1 ? "64px" : "48px",
            height: animationStage >= 1 ? "80px" : "48px",
            borderRadius: animationStage >= 1 ? "6px" : "50%",
            opacity: animationStage >= 1 && animationStage < 2 ? 1 : 0,
            transform: "translateX(0px) translateY(0px)",
          }}
        />

        {/* Card Animation: Cards appear spread out, then stack together */}

        {/* Card 1 - Cart Page */}
        <div
          className="absolute w-16 h-20 bg-foreground transition-all duration-800 ease-out"
          style={{
            borderRadius: "6px",
            transform:
              animationStage >= 3
                ? "translateX(-2px) translateY(-1px) rotate(-1deg)"
                : animationStage >= 2
                  ? "translateX(-80px) translateY(0px) rotate(0deg)"
                  : "translateX(0px) translateY(0px) rotate(0deg)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />

        {/* Card 2 - Payment Page */}
        <div
          className="absolute w-16 h-20 bg-foreground transition-all duration-800 ease-out"
          style={{
            borderRadius: "6px",
            transform:
              animationStage >= 3
                ? "translateX(0px) translateY(0px) rotate(0deg)"
                : animationStage >= 2
                  ? "translateX(0px) translateY(0px) rotate(0deg)"
                  : "translateX(0px) translateY(0px) rotate(0deg)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />

        {/* Card 3 - Confirmation Page */}
        <div
          className="absolute w-16 h-20 bg-foreground transition-all duration-800 ease-out"
          style={{
            borderRadius: "6px",
            transform:
              animationStage >= 3
                ? "translateX(3px) translateY(2px) rotate(2deg)"
                : animationStage >= 2
                  ? "translateX(80px) translateY(0px) rotate(0deg)"
                  : "translateX(0px) translateY(0px) rotate(0deg)",
            opacity: animationStage >= 2 ? 1 : 0,
          }}
        />
      </div>
    </div>
  )
}
